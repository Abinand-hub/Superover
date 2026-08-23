import React, { useState } from 'react';
import { Award, Zap, ShieldCheck, CheckCircle2, TrendingUp, Sparkles, ChevronRight, HelpCircle } from 'lucide-react';
import { formatINR, PAYOUT_TIERS } from '../utils/payoutCalculator';

interface PayoutRuleBannerProps {
  onOpenRules: () => void;
  onSelectMatchQuick?: () => void;
}

export const PayoutRuleBanner: React.FC<PayoutRuleBannerProps> = ({ onOpenRules, onSelectMatchQuick }) => {
  const [selectedFee, setSelectedFee] = useState<number>(25);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0D122B] via-[#0A0F24] to-[#1A0F05] border border-[#FF6B00]/25 shadow-2xl shadow-black/50 p-5 sm:p-6 mb-8">
      {/* Glow highlight effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF6B00]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-[#4ADE80]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left: Value Proposition */}
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6B00]/15 border border-[#FF6B00]/30 text-[#FF6B00] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Skill + Luck Cricket Gaming
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
            Predict 6 Match Stats. <br className="hidden sm:inline" />
            Win Up To <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] via-[#FF8800] to-[#FFAA00]">100X Cash</span>.
          </h2>
          
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            Answer 6 simple stats before match start — Top Batter, Top Bowler, Striker, Economy, 6s, and Wickets. 
            Get at least 3 correct to win cash.
          </p>

          {/* Quick interactive tier selector */}
          <div className="mt-4 flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-400 font-medium">Select Entry Fee:</span>
            {[25, 50, 100].map((fee) => (
              <button
                key={fee}
                onClick={() => setSelectedFee(fee)}
                className={`px-3.5 py-1 rounded-lg text-xs font-extrabold transition-all ${
                  selectedFee === fee
                    ? 'bg-gradient-to-r from-[#FF6B00] to-[#FF8800] text-white shadow-md shadow-[#FF6B00]/30 scale-105'
                    : 'bg-[#131A38] text-slate-300 hover:bg-[#1A223E] border border-[#1A223E]'
                }`}
                id={`btn-calc-fee-${fee}`}
              >
                ₹{fee} Entry
              </button>
            ))}
            <button
              onClick={onOpenRules}
              className="ml-auto text-xs text-[#FFAA00] hover:text-[#FF8800] flex items-center gap-1 font-bold underline-offset-4 hover:underline"
            >
              <HelpCircle className="w-3.5 h-3.5" /> Payout Rules
            </button>
          </div>
        </div>

        {/* Right: Dynamic Multiplier Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 lg:w-auto flex-shrink-0">
          {/* 6/6 correct card */}
          <div className="rounded-xl p-3 bg-gradient-to-b from-[#FF6B00]/20 to-[#FF6B00]/5 border border-[#FF6B00]/40 shadow-lg text-center relative overflow-hidden group hover:border-[#FF6B00] transition-colors">
            <div className="absolute top-0 right-0 bg-[#FF6B00] text-white text-[9px] font-black px-1.5 py-0.5 rounded-bl">
              JACKPOT
            </div>
            <div className="text-xs font-bold text-[#FF6B00] uppercase tracking-wider">6 / 6 Correct</div>
            <div className="text-2xl font-black text-white mt-0.5 font-display">100X</div>
            <div className="text-sm font-extrabold text-[#FFAA00] mt-1 bg-[#FF6B00]/20 rounded-md py-0.5 border border-[#FF6B00]/30">
              {formatINR(selectedFee * 100)}
            </div>
            <div className="text-[10px] text-slate-400 mt-1">10,000% Gross Return</div>
          </div>

          {/* 5/6 correct card */}
          <div className="rounded-xl p-3 bg-[#0D122B] border border-[#4ADE80]/30 text-center relative hover:border-[#4ADE80]/60 transition-colors">
            <div className="text-xs font-bold text-[#4ADE80] uppercase tracking-wider">5 / 6 Correct</div>
            <div className="text-2xl font-black text-white mt-0.5 font-display">10X</div>
            <div className="text-sm font-extrabold text-[#4ADE80] mt-1 bg-[#4ADE80]/15 rounded-md py-0.5 border border-[#4ADE80]/20">
              {formatINR(selectedFee * 10)}
            </div>
            <div className="text-[10px] text-slate-400 mt-1">1,000% Return</div>
          </div>

          {/* 4/6 correct card */}
          <div className="rounded-xl p-3 bg-[#0D122B] border border-sky-500/30 text-center relative hover:border-sky-400/60 transition-colors">
            <div className="text-xs font-bold text-sky-400 uppercase tracking-wider">4 / 6 Correct</div>
            <div className="text-2xl font-black text-white mt-0.5 font-display">3X</div>
            <div className="text-sm font-extrabold text-sky-300 mt-1 bg-sky-500/15 rounded-md py-0.5 border border-sky-500/20">
              {formatINR(selectedFee * 3)}
            </div>
            <div className="text-[10px] text-slate-400 mt-1">300% Return</div>
          </div>

          {/* 3/6 correct card */}
          <div className="rounded-xl p-3 bg-[#0D122B] border border-[#1A223E] text-center relative hover:border-slate-600 transition-colors">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">3 / 6 Correct</div>
            <div className="text-2xl font-black text-white mt-0.5 font-display">0.5X</div>
            <div className="text-sm font-extrabold text-slate-200 mt-1 bg-[#131A38] rounded-md py-0.5 border border-[#1A223E]">
              {formatINR(selectedFee * 0.5)}
            </div>
            <div className="text-[10px] text-slate-400 mt-1">50% Refund Guard</div>
          </div>
        </div>
      </div>

      {/* Trust & Guarantee bottom badges */}
      <div className="mt-5 pt-4 border-t border-[#1A223E] flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="flex items-center gap-1.5 text-slate-300 font-medium">
            <CheckCircle2 className="w-4 h-4 text-[#4ADE80]" /> Instant UPI Settlements
          </span>
          <span className="flex items-center gap-1.5 text-slate-300 font-medium">
            <CheckCircle2 className="w-4 h-4 text-[#4ADE80]" /> Auto-locks 10m before toss
          </span>
          <span className="flex items-center gap-1.5 text-slate-300 font-medium">
            <CheckCircle2 className="w-4 h-4 text-[#4ADE80]" /> No complex fantasy point systems
          </span>
        </div>

        {onSelectMatchQuick && (
          <button
            onClick={onSelectMatchQuick}
            className="text-[#FF6B00] font-bold hover:text-[#FFAA00] flex items-center gap-1 ml-auto transition-colors"
          >
            Browse Available Matches <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
