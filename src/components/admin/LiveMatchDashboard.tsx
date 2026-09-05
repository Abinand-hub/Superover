import React from 'react';
import { CricketMatch, UserPredictionSlip } from '../../types';
import { Activity, Users, Wallet, Trophy, Eye, TrendingUp } from 'lucide-react';
import { formatINR } from '../../utils/payoutCalculator';

interface LiveMatchDashboardProps {
  liveMatches: CricketMatch[];
  allSlips: UserPredictionSlip[];
  onViewEntries: (matchId: string) => void;
}

export const LiveMatchDashboard: React.FC<LiveMatchDashboardProps> = ({ liveMatches, allSlips, onViewEntries }) => {
  if (liveMatches.length === 0) {
    return (
      <div className="p-8 text-center bg-[#0D122B] border border-[#1A223E] rounded-2xl">
        <Activity className="w-12 h-12 text-slate-700 mx-auto mb-3" />
        <h3 className="text-white font-bold">No Live Matches</h3>
        <p className="text-slate-400 text-sm mt-1">There are currently no active matches running.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {liveMatches.map(match => {
        // Calculate match metrics
        const matchSlips = allSlips.filter(s => s.matchId === match.id);
        
        const bronzeEntries = matchSlips.filter(s => s.entryFee <= 25).length;
        const silverEntries = matchSlips.filter(s => s.entryFee > 25 && s.entryFee <= 50).length;
        const goldEntries = matchSlips.filter(s => s.entryFee > 50).length;
        
        const totalEntries = matchSlips.length;
        const poolCollected = matchSlips.reduce((sum, s) => sum + s.entryFee, 0);
        
        // Mocking estimated payouts and streaks since live stat verification isn't fully integrated here
        // In a real app, this would be calculated from real-time API event streams
        const estPayoutMultiplier = 0.8; // Rough estimation that 80% gets paid back in a typical distribution
        const poolToBePaid = poolCollected * estPayoutMultiplier; 
        const liveProfit = poolCollected - poolToBePaid;

        // Mocking streaks based on random distribution for demonstration
        const streaks3 = Math.floor(totalEntries * 0.4);
        const streaks4 = Math.floor(totalEntries * 0.2);
        const streaks5 = Math.floor(totalEntries * 0.05);

        return (
          <div key={match.id} className="bg-[#0D122B] rounded-2xl border border-emerald-500/20 overflow-hidden shadow-lg shadow-emerald-500/5">
            {/* Match Header */}
            <div className="p-5 border-b border-[#1A223E] bg-[#050816]/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  <span className="text-emerald-400 text-xs font-black tracking-widest uppercase">LIVE NOW</span>
                </div>
                <h3 className="text-lg font-black text-white">{match.title}</h3>
                <p className="text-xs text-slate-400">{match.series} • {new Date(match.startTime).toLocaleTimeString()}</p>
              </div>
              <button 
                onClick={() => onViewEntries(match.id)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-md shadow-indigo-600/20"
              >
                <Eye className="w-4 h-4" />
                View {totalEntries} Entries
              </button>
            </div>

            {/* Metrics Grid */}
            <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#080C1D] p-4 rounded-xl border border-[#1A223E]">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-bold mb-2">
                  <Users className="w-4 h-4 text-indigo-400" />
                  TOTAL ENTRIES
                </div>
                <div className="text-2xl font-black text-white">{totalEntries}</div>
                <div className="mt-2 text-[10px] flex gap-2">
                  <span className="text-amber-700">Bronze: {bronzeEntries}</span>
                  <span className="text-slate-400">Silver: {silverEntries}</span>
                  <span className="text-amber-400">Gold: {goldEntries}</span>
                </div>
              </div>

              <div className="bg-[#080C1D] p-4 rounded-xl border border-[#1A223E]">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-bold mb-2">
                  <Wallet className="w-4 h-4 text-sky-400" />
                  TOTAL POOL
                </div>
                <div className="text-2xl font-black text-white">{formatINR(poolCollected)}</div>
                <div className="mt-2 text-[10px] text-slate-500">
                  Total entry fees collected
                </div>
              </div>

              <div className="bg-[#080C1D] p-4 rounded-xl border border-[#1A223E]">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-bold mb-2">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  EST. PAYOUT
                </div>
                <div className="text-2xl font-black text-amber-500">{formatINR(poolToBePaid)}</div>
                <div className="mt-2 text-[10px] text-slate-500">
                  Projected liability
                </div>
              </div>

              <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20 relative overflow-hidden">
                <TrendingUp className="w-24 h-24 absolute -bottom-6 -right-6 text-emerald-500/10" />
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-2 relative z-10">
                  RETAINED BALANCE
                </div>
                <div className="text-2xl font-black text-emerald-400 relative z-10">{formatINR(liveProfit)}</div>
                <div className="mt-2 text-[10px] text-emerald-500/60 relative z-10">
                  Pool minus projected payouts
                </div>
              </div>
            </div>

            {/* Streaks Tracking */}
            <div className="px-5 pb-5">
              <div className="bg-[#080C1D] p-4 rounded-xl border border-[#1A223E]">
                <h4 className="text-xs font-black text-white mb-3 tracking-widest uppercase">Live User Streaks</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-slate-400 text-[10px] font-bold">3/6 CORRECT</div>
                    <div className="text-lg font-black text-white">{streaks3} Users</div>
                    <div className="w-full bg-[#1A223E] h-1.5 rounded-full mt-1.5 overflow-hidden">
                      <div className="bg-sky-500 h-full rounded-full" style={{ width: `${(streaks3/totalEntries)*100}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-[10px] font-bold">4/6 CORRECT</div>
                    <div className="text-lg font-black text-white">{streaks4} Users</div>
                    <div className="w-full bg-[#1A223E] h-1.5 rounded-full mt-1.5 overflow-hidden">
                      <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${(streaks4/totalEntries)*100}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="text-amber-500 text-[10px] font-bold">5/6 CORRECT</div>
                    <div className="text-lg font-black text-amber-500">{streaks5} Users</div>
                    <div className="w-full bg-amber-500/20 h-1.5 rounded-full mt-1.5 overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full animate-pulse" style={{ width: `${(streaks5/totalEntries)*100}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        );
      })}
    </div>
  );
};
