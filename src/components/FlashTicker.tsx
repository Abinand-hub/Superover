import React from 'react';
import { Sparkles, Radio } from 'lucide-react';

interface FlashTickerProps {
  message?: string;
  badge?: string;
  isActive?: boolean;
}

export const FlashTicker: React.FC<FlashTickerProps> = ({
  message = '⚡ Mega Jackpot Live: Predict 6 Stats in CSK vs MI & Win up to 500X Instant Cash! Guaranteed UPI Payouts within 5 minutes.',
  badge = 'News 📰',
  isActive = true,
}) => {
  if (!isActive || !message || message.trim() === '') {
    return null;
  }

  // Construct item with clean separator for infinite seamless marquee loop
  const repeatedItems = [message, message, message, message];

  return (
    <div className="w-full relative overflow-hidden rounded-xl bg-gradient-to-r from-[#0C142B] via-[#0E1B38] to-[#0A1024] border border-sky-500/30 shadow-lg shadow-black/40 p-1.5 sm:p-2 flex items-center gap-2.5 sm:gap-3 group select-none">
      <style>{`
        @keyframes superoverTickerMarquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .so-ticker-track {
          display: inline-flex;
          width: max-content;
          will-change: transform;
          animation: superoverTickerMarquee 28s linear infinite;
        }
        .so-ticker-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Glow background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 via-amber-500/5 to-transparent pointer-events-none"></div>

      {/* Fixed Left Badge (Matches Screenshot: "News 📰") */}
      <div className="relative z-20 shrink-0 flex items-center gap-1.5 px-3 py-1 sm:py-1.5 rounded-lg bg-gradient-to-r from-[#1D3A6B] via-[#254B8C] to-[#1E3B70] text-sky-100 border border-sky-400/40 font-black text-xs sm:text-sm shadow-md shadow-sky-950/60 tracking-tight">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping inline-block sm:hidden"></span>
        <span className="font-extrabold flex items-center gap-1">
          {badge}
        </span>
      </div>

      {/* Edge Shadow Fade for smooth entry/exit */}
      <div className="absolute left-[85px] sm:left-[110px] top-0 bottom-0 w-8 bg-gradient-to-r from-[#0C142B] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#0A1024] to-transparent z-10 pointer-events-none"></div>

      {/* Marquee Track Container */}
      <div className="overflow-hidden flex-1 relative py-0.5">
        <div className="so-ticker-track cursor-default">
          {/* First loop segment */}
          <div className="inline-flex items-center">
            {repeatedItems.map((item, idx) => (
              <span key={`first-${idx}`} className="inline-flex items-center text-[#FFE270] font-bold text-xs sm:text-sm tracking-wide drop-shadow-[0_0_12px_rgba(255,226,112,0.45)] mr-8 whitespace-nowrap">
                {item} <span className="text-amber-400/70 ml-8">✦</span>
              </span>
            ))}
          </div>
          {/* Duplicated seamless loop segment */}
          <div className="inline-flex items-center" aria-hidden="true">
            {repeatedItems.map((item, idx) => (
              <span key={`second-${idx}`} className="inline-flex items-center text-[#FFE270] font-bold text-xs sm:text-sm tracking-wide drop-shadow-[0_0_12px_rgba(255,226,112,0.45)] mr-8 whitespace-nowrap">
                {item} <span className="text-amber-400/70 ml-8">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
