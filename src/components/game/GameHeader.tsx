import { GameState } from "@/lib/gameState";
import { Timer } from "lucide-react";

interface GameHeaderProps {
  game: GameState;
}

const GameHeader = ({ game }: GameHeaderProps) => {
  const minutes = Math.floor(game.timer / 60);
  const seconds = game.timer % 60;
  const isLowTime = game.timer <= 15;
  const isGuessing = game.turnPhase === "guessing";
  const isHint = game.turnPhase === "hint";
  const showTimer = game.maxTime > 0 && (isGuessing || isHint);
  const isRed = game.currentTeam === "red";

  return (
    <div className="bg-card/80 backdrop-blur-sm border-b border-border/50 px-3 py-2 sticky top-0 z-20">
      <div className="max-w-4xl mx-auto flex flex-wrap items-center gap-x-3 gap-y-1.5">
        {/* Team badge */}
        <span
          className={`shrink-0 text-xs font-bold px-3 py-1.5 rounded-full transition-colors ${
            isRed
              ? "bg-team-red text-team-red-foreground"
              : "bg-team-blue text-team-blue-foreground"
          }`}
        >
          {isRed ? "الأحمر" : "الأزرق"}
        </span>

        {/* Hint badge */}
        <div className="flex-1 min-w-0 flex items-center gap-2 overflow-hidden">
          {game.currentHint ? (
            <div className="flex items-center gap-1.5 bg-secondary/80 rounded-xl px-2.5 py-1.5 min-w-0 overflow-hidden max-w-full">
              <span className="font-bold text-sm text-foreground truncate">
                {game.currentHint.word}
              </span>
              <span className="text-xs text-muted-foreground shrink-0">
                ({game.currentHint.count})
              </span>
              {isGuessing && (
                <span className="text-xs font-semibold text-gold shrink-0">
                  · {game.guessesRemaining} متبقي
                </span>
              )}
            </div>
          ) : (
            <span className="text-xs text-muted-foreground truncate">
              {isHint ? "في انتظار التلميح..." : ""}
            </span>
          )}
        </div>

        {/* Timer + End turn row — always right-aligned */}
        <div className="flex items-center gap-2 shrink-0 mr-auto">
          {showTimer && (
            <div
              className={`flex items-center gap-1 font-mono font-bold text-base tabular-nums transition-colors ${
                isLowTime ? "text-destructive animate-pulse" : "text-foreground"
              }`}
            >
              <Timer
                className={`w-3.5 h-3.5 ${isLowTime ? "text-destructive" : "text-muted-foreground"}`}
              />
              {minutes}:{seconds.toString().padStart(2, "0")}
            </div>
          )}

          {/* end-turn moved to bottom bar on mobile */}
        </div>
      </div>
    </div>
  );
};

export default GameHeader;
