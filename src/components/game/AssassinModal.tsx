import { useEffect, useState } from "react";
import { Team } from "@/lib/gameState";

interface AssassinModalProps {
  losingTeam: Team;
  word: string;
  onComplete: () => void;
  /** Whether the viewer's own team is the losing (assassin-choosing) team */
  isLosingTeam?: boolean;
}

const AssassinModal = ({
  losingTeam,
  word,
  onComplete,
  isLosingTeam,
}: AssassinModalProps) => {
  const [phase, setPhase] = useState<"enter" | "hold" | "exit">("enter");

  useEffect(() => {
    const hold = setTimeout(() => setPhase("hold"), 100);
    const exit = setTimeout(() => setPhase("exit"), 3200);
    const done = setTimeout(() => onComplete(), 3700);
    return () => {
      clearTimeout(hold);
      clearTimeout(exit);
      clearTimeout(done);
    };
  }, [onComplete]);

  const isRed = losingTeam === "red";

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center
        transition-opacity duration-500
        ${phase === "enter" ? "opacity-0" : phase === "hold" ? "opacity-100" : "opacity-0"}
        bg-black/90 backdrop-blur-md
      `}
    >
      {/* Pulsing skull glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-gray-900 blur-3xl opacity-80 animate-pulse" />
      </div>

      <div
        className={`
          relative z-10 text-center px-10 py-12 rounded-3xl border border-gray-700
          bg-gray-950 shadow-2xl max-w-sm w-full mx-4
          transform transition-all duration-500
          ${phase === "hold" ? "scale-100 opacity-100" : "scale-90 opacity-0"}
        `}
      >
        {/* Skull */}
        <div
          className="text-7xl mb-5 animate-bounce"
          style={{ animationDuration: "1.5s" }}
        >
          💀
        </div>

        {/* Word */}
        <div className="text-white/40 text-sm font-medium mb-1">
          {isLosingTeam ? "اخترتم" : "اختاروا"}
        </div>
        <div className="text-white text-2xl font-black mb-4 tracking-wide">
          {word}
        </div>

        {/* Divider */}
        <div className="w-16 h-px bg-gray-700 mx-auto mb-4" />

        {/* Losing team */}
        <p className="text-gray-400 text-sm font-medium mb-2">بطاقة القاتل!</p>
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-base ${
            isRed
              ? "bg-team-red/20 text-team-red border border-team-red/30"
              : "bg-team-blue/20 text-team-blue border border-team-blue/30"
          }`}
        >
          {isRed ? "الفريق الأحمر" : "الفريق الأزرق"} خسر
        </div>

        {/* Progress bar */}
        <div className="mt-6 w-full h-0.5 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gray-500 rounded-full"
            style={{ animation: "shrink 3.2s linear forwards" }}
          />
        </div>
      </div>

      <style>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};

export default AssassinModal;
