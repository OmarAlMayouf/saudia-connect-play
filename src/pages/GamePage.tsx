import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  GameState,
  HistoryEntry,
  LobbySettings,
  revealCard,
  Team,
  createGame,
  toggleHighlight,
} from "@/lib/gameState";
import GameBoard from "@/components/game/GameBoard";
import Lobby from "@/components/game/Lobby";
import GameHeader from "@/components/game/GameHeader";
import GameOverDialog from "@/components/game/GameOverDialog";
import TeamSidebar from "@/components/game/TeamSidebar";
import HistorySidebar from "@/components/game/HistorySidebar";
import HintInput from "@/components/game/HintInput";
import TurnTransition from "@/components/game/TurnTransition";
import AssassinModal from "@/components/game/AssassinModal";
import TimerEndedModal from "@/components/game/TimerEndedModal";
import patternBg from "@/assets/pattern-bg.png";
import { listenToGame, updateGameSession } from "@/lib/gameService";
import { formatArabicWordCount, getGuessInstruction } from "@/lib/utils";
import { useGameHistory } from "@/hooks/useGameHistory";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { History, ChevronLeft } from "lucide-react";

const GamePage = () => {
  const { roomCode } = useParams<{ roomCode: string }>();
  const navigate = useNavigate();
  const [game, setGame] = useState<GameState | null>(null);
  const [showTransition, setShowTransition] = useState(false);
  const [transitionTeam, setTransitionTeam] = useState<Team>("red");
  const [timerEndedModal, setTimerEndedModal] = useState<{
    team: Team;
    phase: "hint" | "guessing";
  } | null>(null);
  const playerId = sessionStorage.getItem("playerId") || "";

  useEffect(() => {
    if (!roomCode) return;
    const unsubscribe = listenToGame(roomCode, (data) => setGame(data));
    return () => unsubscribe();
  }, [roomCode]);

  const saveGame = useCallback(async (newState: GameState) => {
    setGame(newState);
    await updateGameSession(newState.roomCode, newState);
  }, []);

  const appendHistory = (
    currentGame: GameState,
    entry: HistoryEntry,
  ): HistoryEntry[] => [...(currentGame.history ?? []), entry];

  const clearHighlights = (state: GameState): GameState => ({
    ...state,
    cards: state.cards.map((c) => ({ ...c, highlighted: false })),
  });

  const handleStartGame = () => {
    if (!game) return;
    const ls = game.lobbySettings;
    const maxTime =
      ls?.timeLimitEnabled && ls?.spymasterTimerEnabled
        ? ls.spymasterDuration
        : 0;
    const newState = {
      ...game,
      phase: "playing" as const,
      turnPhase: "hint" as const,
      maxTime,
      timer: maxTime,
    };
    saveGame(newState);
    setTransitionTeam("red");
    setShowTransition(true);
  };

  const handleSubmitHint = (word: string, count: number) => {
    if (!game) return;
    const ls = game.lobbySettings;
    const normalTimerOn = ls?.timeLimitEnabled && ls?.normalTimerEnabled;
    const guessingMaxTime = normalTimerOn ? ls.normalDuration : 0;
    const hintEntry: HistoryEntry = {
      type: "hint",
      team: game.currentTeam,
      word,
      amount: count,
      timestamp: Date.now(),
    };
    saveGame({
      ...game,
      turnPhase: "guessing",
      currentHint: { word, count },
      guessesRemaining: count + 1,
      maxTime: guessingMaxTime,
      timer: guessingMaxTime,
      history: appendHistory(game, hintEntry),
    });
  };

  const handleCardClick = (index: number) => {
    if (!game || game.phase !== "playing" || game.turnPhase !== "guessing")
      return;
    const currentPlayer = game.players.find((p) => p.id === playerId);
    if (!currentPlayer) return;
    if (currentPlayer.team !== game.currentTeam) return;
    if (currentPlayer.isSpymaster) return;

    const card = game.cards[index];
    if (card.revealed) return;

    const guessEntry: HistoryEntry = {
      type: "guess",
      player: currentPlayer.name,
      word: card.word.word,
      color: card.type,
      timestamp: Date.now(),
    };

    const prevTeam = game.currentTeam;
    let newState = revealCard(game, index);

    // Correct timer for hint phase
    if (newState.phase === "playing" && newState.turnPhase === "hint") {
      const ls = game.lobbySettings;
      const spymasterMaxTime =
        ls?.timeLimitEnabled && ls?.spymasterTimerEnabled
          ? ls.spymasterDuration
          : 0;
      newState = {
        ...newState,
        timer: spymasterMaxTime,
        maxTime: spymasterMaxTime,
      };
    }

    newState = { ...newState, history: appendHistory(newState, guessEntry) };

    if (card.type === "assassin") {
      // Save the revealed card state (keeping phase "playing" so GameOverDialog
      // does NOT appear yet) AND set assassinReveal so every client shows the modal.
      const intermediateState: GameState = {
        ...newState,
        phase: "playing",
        assassinReveal: {
          losingTeam: prevTeam,
          word: card.word.word,
          triggeredAt: Date.now(),
        },
      };
      saveGame(intermediateState);
      // The actual "finished" state is committed by each client's modal onComplete
      // (only the host should do it to avoid race conditions — handled below).
    } else {
      // Normal card: save immediately so flip plays in real-time for all
      saveGame(newState);

      // Delay turn transition by 700ms to let the flip finish
      setTimeout(() => {
        if (newState.phase === "playing" && newState.currentTeam !== prevTeam) {
          // Clear highlights now that the turn has switched
          saveGame(clearHighlights(newState));
          setTransitionTeam(newState.currentTeam);
          setShowTransition(true);
        }
      }, 700);
    }
  };

  const handleRightClick = (index: number) => {
    if (!game) return;

    const player = game.players.find((p) => p.id === playerId);

    if (!player) return;

    const canHighlight =
      game.turnPhase === "guessing" &&
      player.team === game.currentTeam &&
      !player.isSpymaster;

    if (!canHighlight) return;

    saveGame(toggleHighlight(game, index));
  };

  const handleEndTurn = () => {
    if (!game) return;
    const nextTeam = game.currentTeam === "red" ? "blue" : "red";
    const ls = game.lobbySettings;
    const spymasterMaxTime =
      ls?.timeLimitEnabled && ls?.spymasterTimerEnabled
        ? ls.spymasterDuration
        : 0;
    const turnEndEntry: HistoryEntry = {
      type: "turn_end",
      team: game.currentTeam,
      reason: "manual",
      timestamp: Date.now(),
    };
    saveGame(
      clearHighlights({
        ...game,
        currentTeam: nextTeam,
        timer: spymasterMaxTime,
        maxTime: spymasterMaxTime,
        turnPhase: "hint",
        currentHint: null,
        guessesRemaining: 0,
        history: appendHistory(game, turnEndEntry),
      }),
    );
    setTransitionTeam(nextTeam);
    setShowTransition(true);
  };

  const handleRestart = () => {
    const player = game.players.find((p) => p.id === playerId);
    if (!game || !player) return;
    const newGame = createGame(player.name);
    newGame.roomCode = game.roomCode;
    newGame.players = game.players;
    newGame.hostId = game.hostId;
    saveGame(newGame);
  };

  const handleSwitchTeam = (pId: string, team: Team) => {
    if (!game) return;
    const players = game.players.map((p) =>
      p.id === pId ? { ...p, team } : p,
    );
    saveGame({ ...game, players });
  };

  const handleSettingsChange = (settings: LobbySettings) => {
    if (!game) return;
    saveGame({ ...game, lobbySettings: settings });
  };

  const handleToggleSpymaster = (pId: string) => {
    if (!game) return;
    const player = game.players.find((p) => p.id === pId);
    if (!player) return;
    const players = game.players.map((p) => {
      if (p.id === pId) return { ...p, isSpymaster: !p.isSpymaster };
      if (p.team === player.team && p.isSpymaster)
        return { ...p, isSpymaster: false };
      return p;
    });
    saveGame({ ...game, players });
  };

  const currentPlayer = game?.players.find((p) => p.id === playerId);
  const isHost = currentPlayer?.isHost;
  const { history } = useGameHistory(game);

  // Tracks whether we are currently showing the assassin modal locally
  const [assassinModalActive, setAssassinModalActive] = useState(false);
  // Remember which triggeredAt we already handled so we don't re-show
  const handledAssassinTs = useRef<number | null>(null);

  useEffect(() => {
    if (!game?.assassinReveal) return;
    const { triggeredAt } = game.assassinReveal;
    if (handledAssassinTs.current === triggeredAt) return;
    // Wait for the card-flip animation before showing the modal
    const t = setTimeout(() => {
      handledAssassinTs.current = triggeredAt;
      setAssassinModalActive(true);
    }, 650);
    return () => clearTimeout(t);
  }, [game?.assassinReveal]);

  const handleAssassinModalDone = useCallback(async () => {
    setAssassinModalActive(false);
    if (!game || !isHost) return;
    // Only the host commits the "finished" state and clears assassinReveal
    const finishedState: GameState = {
      ...game,
      phase: "finished",
      assassinReveal: null,
    };
    await updateGameSession(game.roomCode, finishedState);
  }, [game, isHost]);

  useEffect(() => {
    if (!game || !isHost) return;
    if (game.phase !== "playing") return;
    if (!game.maxTime || game.maxTime === 0) return;

    const ls = game.lobbySettings;
    const spymasterTimerOn = ls?.timeLimitEnabled && ls?.spymasterTimerEnabled;
    const normalTimerOn = ls?.timeLimitEnabled && ls?.normalTimerEnabled;

    const isHintPhase = game.turnPhase === "hint";
    const isGuessingPhase = game.turnPhase === "guessing";

    if (isHintPhase && !spymasterTimerOn) return;
    if (isGuessingPhase && !normalTimerOn) return;

    const interval = setInterval(async () => {
      if (game.timer <= 0) {
        const nextTeam = game.currentTeam === "red" ? "blue" : "red";
        const nextSpymasterMaxTime = spymasterTimerOn
          ? ls.spymasterDuration
          : 0;
        const turnEndEntry: HistoryEntry = {
          type: "turn_end",
          team: game.currentTeam,
          reason: "timeout",
          timestamp: Date.now(),
        };

        setTimerEndedModal({
          team: game.currentTeam,
          phase: isHintPhase ? "hint" : "guessing",
        });

        await updateGameSession(game.roomCode, {
          currentTeam: nextTeam,
          timer: nextSpymasterMaxTime,
          maxTime: nextSpymasterMaxTime,
          turnPhase: "hint",
          currentHint: null,
          guessesRemaining: 0,
          cards: game.cards.map((c) => ({ ...c, highlighted: false })),
          history: appendHistory(game, turnEndEntry),
        });
      } else {
        await updateGameSession(game.roomCode, { timer: game.timer - 1 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [game, isHost, playerId]);

  if (!game) return null;

  const isSpymaster = currentPlayer?.isSpymaster || false;
  const isMyTeamTurn = currentPlayer?.team === game.currentTeam;
  const isCurrentTeamSpymaster = isSpymaster && isMyTeamTurn;
  const canGuess = game.turnPhase === "guessing";
  const canEndTurn = canGuess && isMyTeamTurn && !isSpymaster;

  return (
    <div className="min-h-screen flex flex-col relative bg-background">
      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url(${patternBg})`,
          backgroundSize: "300px",
        }}
      />

      <div className="relative z-10 flex flex-col min-h-screen">
        {game.phase === "lobby" && (
          <Lobby
            game={game}
            playerId={playerId}
            onStart={handleStartGame}
            onSwitchTeam={handleSwitchTeam}
            onToggleSpymaster={handleToggleSpymaster}
            onSettingsChange={handleSettingsChange}
          />
        )}

        {game.phase === "playing" && (
          <>
            <GameHeader game={game} />

            {/* ── Main play area ── */}
            <div className="flex-1 flex overflow-hidden">
              {/* Desktop left sidebar — teams */}
              <div className="hidden md:flex flex-col w-48 p-3 gap-3 shrink-0">
                <TeamSidebar game={game} team="red" />
                <TeamSidebar game={game} team="blue" />
              </div>

              {/* Main content */}
              <div className="flex-1 flex flex-col min-w-0 min-h-0">
                {/* Status / hint banners */}
                <div className="px-2 sm:px-3 pt-2 sm:pt-3 space-y-2">
                  {/* Waiting for other team */}
                  {!isCurrentTeamSpymaster && currentPlayer && !isMyTeamTurn && (
                    <div className="bg-secondary/50 border border-border/40 rounded-xl py-2 px-4 text-center">
                      <span className="text-muted-foreground text-sm font-medium">
                        ⏳ بانتظار دور الفريق الآخر
                      </span>
                    </div>
                  )}

                  {/* Hint input (spymaster) */}
                  {game.turnPhase === "hint" && isCurrentTeamSpymaster && (
                    <HintInput
                      currentTeam={game.currentTeam}
                      onSubmitHint={handleSubmitHint}
                    />
                  )}

                  {/* Waiting for hint (non-spymaster, own team) */}
                  {game.turnPhase === "hint" &&
                    !isCurrentTeamSpymaster &&
                    isMyTeamTurn && (
                      <div
                        className={`border rounded-xl py-2 px-4 text-center animate-pulse ${
                          game.currentTeam === "red"
                            ? "bg-team-red/5 border-team-red/20"
                            : "bg-team-blue/5 border-team-blue/20"
                        }`}
                      >
                        <span className="text-sm text-muted-foreground">
                          بانتظار التلميح من رئيس الفريق...
                        </span>
                      </div>
                    )}

                  {/* Current hint during guessing */}
                  {game.turnPhase === "guessing" && game.currentHint && (
                    <div
                      className={`border rounded-xl py-2 px-4 text-center ${
                        game.currentTeam === "red"
                          ? "bg-team-red/5 border-team-red/20"
                          : "bg-team-blue/5 border-team-blue/20"
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5">
                        <span className="text-xs text-muted-foreground">التلميح:</span>
                        <span className="font-bold text-base text-foreground">
                          {game.currentHint.word}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ({formatArabicWordCount(game.currentHint.count)})
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {getGuessInstruction(
                            game.currentHint.count,
                            game.players.filter(
                              (p) =>
                                p.team === game.currentTeam && !p.isSpymaster,
                            ).length,
                          )}
                        </span>
                        <span className="text-gold font-semibold text-xs">
                          · {game.guessesRemaining} متبقي
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <GameBoard
                  cards={game.cards}
                  isSpymaster={isSpymaster}
                  onCardClick={handleCardClick}
                  currentPlayer={currentPlayer}
                  onRightClick={handleRightClick}
                  currentTeam={game.currentTeam}
                  canGuess={canGuess}
                />

                {/* ── End turn button (md+ only) ── */}
                {canEndTurn && (
                  <div className="hidden md:flex justify-center px-3 pb-3 pt-2 shrink-0">
                    <button
                      onClick={handleEndTurn}
                      className={`flex items-center gap-2 text-sm font-bold px-6 py-2.5 rounded-xl border transition-all duration-150 active:scale-95 shadow-sm ${
                        game.currentTeam === "red"
                          ? "bg-team-red/10 border-team-red/40 text-team-red hover:bg-team-red/20 hover:border-team-red/60"
                          : "bg-team-blue/10 border-team-blue/40 text-team-blue hover:bg-team-blue/20 hover:border-team-blue/60"
                      }`}
                    >
                      إنهاء الدور
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* ── Mobile bottom bar ── */}
                <div className="md:hidden flex items-center justify-between gap-2 px-2 pb-2 pt-1 border-t border-border/30 bg-card/60 backdrop-blur-sm shrink-0">
                  {/* Compact team scores */}
                  <div className="flex items-center gap-2">
                    <TeamSidebar game={game} team="red" compact />
                    <TeamSidebar game={game} team="blue" compact />
                  </div>

                  {/* End turn — center, only for eligible players */}
                  {canEndTurn ? (
                    <button
                      onClick={handleEndTurn}
                      className={`flex items-center gap-1 text-xs font-bold px-3 py-2 rounded-xl border transition-all duration-150 active:scale-95 shrink-0 ${
                        game.currentTeam === "red"
                          ? "bg-team-red/10 border-team-red/40 text-team-red hover:bg-team-red/20"
                          : "bg-team-blue/10 border-team-blue/40 text-team-blue hover:bg-team-blue/20"
                      }`}
                    >
                      إنهاء الدور
                      <ChevronLeft className="w-3 h-3" />
                    </button>
                  ) : (
                    <div className="flex-1" />
                  )}

                  {/* History sheet trigger */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <button
                        className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl border border-border/60 bg-background/60 hover:bg-secondary/80 transition-all duration-150 active:scale-95 shrink-0"
                        aria-label="عرض سجل اللعبة"
                      >
                        <History className="w-3.5 h-3.5" />
                        السجل
                      </button>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="h-[70dvh] p-0 rounded-t-2xl">
                      <HistorySidebar history={history} />
                    </SheetContent>
                  </Sheet>
                </div>
              </div>

              {/* Desktop right sidebar — history */}
              <div className="hidden md:flex flex-col w-44 lg:w-64 p-3 shrink-0">
                <HistorySidebar history={history} />
              </div>
            </div>
          </>
        )}

        {game.phase === "finished" && (
          <GameOverDialog
            winner={game.winner}
            scores={game.scores}
            onRestart={handleRestart}
            onHome={() => navigate("/")}
          />
        )}
      </div>

      {showTransition && (
        <TurnTransition
          team={transitionTeam}
          onComplete={() => setShowTransition(false)}
        />
      )}

      {assassinModalActive && game.assassinReveal && (
        <AssassinModal
          losingTeam={game.assassinReveal.losingTeam}
          word={game.assassinReveal.word}
          isLosingTeam={currentPlayer?.team === game.assassinReveal.losingTeam}
          onComplete={handleAssassinModalDone}
        />
      )}

      {timerEndedModal && (
        <TimerEndedModal
          key={`${timerEndedModal.team}-${timerEndedModal.phase}`}
          team={timerEndedModal.team}
          phase={timerEndedModal.phase}
          onComplete={() => {
            const nextTeam = timerEndedModal.team === "red" ? "blue" : "red";
            setTimerEndedModal(null);
            setTransitionTeam(nextTeam);
            setShowTransition(true);
          }}
        />
      )}
    </div>
  );
};

export default GamePage;
