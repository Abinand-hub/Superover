import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Download, 
  RefreshCw, 
  ChevronRight, 
  Search, 
  ShieldCheck, 
  Users, 
  DollarSign, 
  Lock, 
  Eye, 
  X, 
  Copy, 
  Check, 
  Sparkles,
  ArrowDownRight,
  Filter
} from 'lucide-react';
import { CricketMatch, UserPredictionSlip, UserAccount } from '../../types';
import { calculatePotentialPayout } from '../../utils/payoutCalculator';

interface LiveMarketAnalysisProps {
  matches: CricketMatch[];
  slips: UserPredictionSlip[];
  users?: UserAccount[];
}

export const LiveMarketAnalysis: React.FC<LiveMarketAnalysisProps> = ({ matches, slips, users = [] }) => {
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
  const [funnelFilters, setFunnelFilters] = useState<Record<string, string>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // User Inspector Modal State
  const [inspectorData, setInspectorData] = useState<{
    questionId: string;
    questionTitle: string;
    questionNumber: number;
    optionValue: string;
    slipsList: UserPredictionSlip[];
  } | null>(null);
  const [userSearchFilter, setUserSearchFilter] = useState<string>('');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // -------------------------------------------------------------------------
  // SCREEN 1: LIVE MARKET ANALYSIS (List Page)
  // Columns: Match ID | Match Name | Total Entries | Total Collection | Status | Action
  // -------------------------------------------------------------------------
  const renderMatchList = () => {
    const totalPlatformEntries = slips.length;
    const totalPlatformCollection = slips.reduce((sum, s) => sum + (s.totalPayable || s.entryFee || 0), 0);

    return (
      <div className="space-y-6 animate-in fade-in duration-200">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-black uppercase tracking-wider">
                ⚡ ORGANIZER RISK INTELLIGENCE
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5 font-display">
              <TrendingUp className="w-6 h-6 text-[#FF6B00]" />
              Live Market Analysis
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Select a match to inspect prediction funnels, user picks distribution, and simulate real-time platform liability.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-[#0D122B] border border-[#1A223E] text-right">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Total Slips</span>
              <span className="text-sm sm:text-base font-black text-white font-mono">{totalPlatformEntries.toLocaleString()}</span>
            </div>
            <div className="p-3 rounded-xl bg-[#0D122B] border border-[#1A223E] text-right">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Gross Pool</span>
              <span className="text-sm sm:text-base font-black text-emerald-400 font-mono">₹{totalPlatformCollection.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Matches Table as per PRD Screen 1 */}
        <div className="bg-[#0D122B] border border-[#1A223E] rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs whitespace-nowrap">
              <thead className="bg-[#131A38] text-slate-400 border-b border-[#1A223E] uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-black">Match ID</th>
                  <th className="px-6 py-4 font-black">Match Name</th>
                  <th className="px-6 py-4 font-black">Total Entries</th>
                  <th className="px-6 py-4 font-black">Total Collection</th>
                  <th className="px-6 py-4 font-black">Status</th>
                  <th className="px-6 py-4 font-black text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A223E]">
                {matches.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                      No active or published matches available.
                    </td>
                  </tr>
                ) : (
                  matches.map((match) => {
                    const matchSlips = slips.filter(s => s.matchId === match.id);
                    const totalEntries = matchSlips.length;
                    const totalCollection = matchSlips.reduce((sum, s) => sum + (s.totalPayable || s.entryFee || 0), 0);
                    const isLive = match.status === 'LIVE';
                    const isCompleted = match.status === 'COMPLETED';
                    const isLocked = match.status === 'LOCKED';

                    return (
                      <tr key={match.id} className="hover:bg-[#131A38]/50 transition-colors">
                        <td className="px-6 py-4 font-mono text-[11px] text-slate-400">
                          <button
                            onClick={() => copyToClipboard(match.id)}
                            className="flex items-center gap-1.5 hover:text-white transition-colors"
                            title="Click to copy full ID"
                          >
                            <span>{match.id.substring(0, 10)}...</span>
                            {copiedId === match.id ? (
                              <Check className="w-3 h-3 text-emerald-400" />
                            ) : (
                              <Copy className="w-3 h-3 text-slate-500 hover:text-slate-300" />
                            )}
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="font-black text-white text-sm">
                              {match.team1?.code || 'T1'} vs {match.team2?.code || 'T2'}
                            </span>
                            <span className="text-[10px] text-slate-400 truncate max-w-xs">
                              {match.title} • {match.series}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-slate-200 font-mono font-bold">
                          {totalEntries.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-emerald-400 font-mono font-black text-sm">
                          ₹{totalCollection.toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase flex items-center gap-1 w-max ${
                            isLive ? 'bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse' :
                            isCompleted ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                            isLocked ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                            'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                          }`}>
                            {isLive && <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping"></span>}
                            {isCompleted && '✓ '}
                            {match.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => {
                              setSelectedMatchId(match.id);
                              setFunnelFilters({});
                            }}
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#FF6B00] to-[#FF8800] hover:brightness-110 text-slate-950 font-black text-xs rounded-xl transition-all shadow-md shadow-[#FF6B00]/25 active:scale-95"
                            id={`btn-view-funnel-${match.id}`}
                          >
                            <TrendingUp className="w-3.5 h-3.5" />
                            <span>View Funnel Analysis</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // -------------------------------------------------------------------------
  // SCREEN 2: LIVE FUNNEL ANALYSIS (Detail Page)
  // -------------------------------------------------------------------------
  const renderFunnelAnalysis = () => {
    const match = matches.find(m => m.id === selectedMatchId);
    if (!match) return null;

    const matchSlips = slips.filter(s => s.matchId === match.id);
    const totalEntries = matchSlips.length;
    const totalCollection = matchSlips.reduce((sum, s) => sum + (s.totalPayable || s.entryFee || 0), 0);
    const avgEntry = totalEntries > 0 ? totalCollection / totalEntries : 0;

    // Helper: Normalize answer strings for robust comparison
    const normalizeAnswer = (ans: any): string => {
      if (ans === undefined || ans === null) return '';
      if (typeof ans === 'object') return (ans.answerText || ans.answerId || '').trim().toLowerCase();
      return String(ans).trim().toLowerCase();
    };

    // Calculate remaining slips that matched the filters up to question index `qIndex`
    const getRemainingSlipsAtQuestion = (qIndex: number): UserPredictionSlip[] => {
      return matchSlips.filter(slip => {
        for (let i = 0; i < qIndex; i++) {
          const pastQ = match.questions[i];
          const filterAns = funnelFilters[pastQ.id];
          if (!filterAns) return false; 
          const userAns = slip.answers?.[pastQ.id];
          if (normalizeAnswer(userAns) !== normalizeAnswer(filterAns)) return false;
        }
        return true;
      });
    };

    // Multipliers according to PRD V8:
    // Streak 1: 0X
    // Streak 2: 0X
    // Streak 3: 0.5X
    // Streak 4: 3X
    // Streak 5: 10X
    // Streak 6: 50X (or wheelMultiplier)
    const getMultiplierForStreak = (streak: number): number => {
      switch (streak) {
        case 1: return 0;
        case 2: return 0;
        case 3: return 0.5;
        case 4: return 3;
        case 5: return 10;
        case 6: return 50;
        default: return 0;
      }
    };

    // Calculate Grand Simulated Liability Payout
    let grandPayout = 0;
    
    // For each slip, determine how many consecutive questions from Q1 it matches under current funnelFilters
    matchSlips.forEach(slip => {
      let currentStreak = 0;
      for (let i = 0; i < match.questions.length; i++) {
        const q = match.questions[i];
        const selectedFilter = funnelFilters[q.id];
        if (!selectedFilter) break; // Filter path ended
        
        const userAns = slip.answers?.[q.id];
        if (normalizeAnswer(userAns) === normalizeAnswer(selectedFilter)) {
          currentStreak++;
        } else {
          break; // Strict consecutive streak broken
        }
      }

      if (currentStreak >= 3) {
        const payout = calculatePotentialPayout(
          slip.entryFee || 50,
          currentStreak,
          slip.wheelMultiplier || 50,
          !!slip.freeHit
        );
        grandPayout += payout;
      }
    });

    const netProfit = totalCollection - grandPayout;

    // AUTO RISK ALERT SYSTEM (Per PRD)
    // 🟢 GREEN SAFE: Net Profit > 0
    // 🟡 YELLOW WARNING: Total Payout > 70% of Collection
    // 🔴 RED HIGH RISK: Net Profit < 0 (Loss Alert)
    let riskStatus: 'SAFE' | 'WARNING' | 'HIGH_RISK' = 'SAFE';
    let riskLabel = 'SAFE';
    let riskMessage = `SAFE - Profit ₹${netProfit.toLocaleString()}`;

    if (netProfit < 0) {
      riskStatus = 'HIGH_RISK';
      riskLabel = 'HIGH RISK - LOSS ALERT!';
      riskMessage = `LOSS ALERT! Payout (₹${grandPayout.toLocaleString()}) exceeds Collection (₹${totalCollection.toLocaleString()}). Multipliers locked; contest locking recommended.`;
    } else if (grandPayout > totalCollection * 0.7 && totalCollection > 0) {
      riskStatus = 'WARNING';
      riskLabel = 'WARNING - 70% THRESHOLD';
      riskMessage = `WARNING - Payout is ${(totalCollection > 0 ? (grandPayout / totalCollection * 100).toFixed(1) : '70')}% of collection (₹${grandPayout.toLocaleString()}).`;
    } else {
      riskStatus = 'SAFE';
      riskLabel = 'GREEN SAFE';
      riskMessage = `SAFE - Profit margin is healthy (+₹${netProfit.toLocaleString()}).`;
    }

    // Export Final Qualifying Users / Winners CSV
    const handleExportFinalWinners = () => {
      const qCount = match.questions.length;
      const finalSlips = getRemainingSlipsAtQuestion(qCount);

      const csvContent = "data:text/csv;charset=utf-8," 
        + "Slip_ID,User_Name,Phone,Entry_Fee_INR,Wheel_Multiplier,Free_Hit,Consecutive_Streak,Calculated_Payout_INR,Submitted_At\n"
        + finalSlips.map(s => {
          const payout = calculatePotentialPayout(s.entryFee || 50, qCount, s.wheelMultiplier || 50, !!s.freeHit);
          return `${s.id},${s.userName || 'User'},${s.userPhone || 'N/A'},${s.entryFee || 50},${s.wheelMultiplier || 50}X,${s.freeHit ? 'YES' : 'NO'},${qCount},${payout},${s.submittedAt || 'N/A'}`;
        }).join("\n");
      
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `winners_${match.team1?.code}_vs_${match.team2?.code}_Q${qCount}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    return (
      <div className="space-y-6 animate-in fade-in duration-200">
        {/* Back Button & Match Title Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1A223E]">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                setSelectedMatchId(null);
                setFunnelFilters({});
              }}
              className="w-10 h-10 rounded-xl bg-[#0D122B] hover:bg-[#131A38] border border-[#1A223E] flex items-center justify-center text-slate-300 hover:text-white transition-colors flex-shrink-0"
              title="Back to matches list"
              id="btn-back-to-market-list"
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-black tracking-wider uppercase border border-indigo-500/30">
                  LIVE FUNNEL ANALYSIS
                </span>
                <span className="text-xs text-slate-400 font-mono">ID: {match.id.substring(0, 10)}...</span>
              </div>
              <h2 className="text-lg sm:text-2xl font-black text-white font-display">
                {match.team1?.name} vs {match.team2?.name} ({match.team1?.code} vs {match.team2?.code})
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setFunnelFilters({})}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 border border-slate-700"
              id="btn-reset-funnel-filters"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>

            {Object.keys(funnelFilters).length > 0 && (
              <button 
                onClick={handleExportFinalWinners}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black transition-all flex items-center gap-1.5 shadow-md shadow-emerald-600/30"
                id="btn-export-winners-csv"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Qualifying Users</span>
              </button>
            )}
          </div>
        </div>

        {/* Top Header KPI Cards: Match, Entries, Avg Entry, Total Collection */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
          <div className="p-4 rounded-2xl bg-[#0D122B] border border-[#1A223E] shadow-sm">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Total Entries</span>
            <span className="text-xl sm:text-2xl font-black text-white font-mono">{totalEntries.toLocaleString()}</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Participating User Slips</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#0D122B] border border-[#1A223E] shadow-sm">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Avg Entry Fee</span>
            <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">₹{Math.round(avgEntry).toLocaleString()}</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Per Prediction Slip</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#0D122B] border border-[#1A223E] shadow-sm">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Total Collection</span>
            <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">₹{totalCollection.toLocaleString()}</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Gross Contest Pool</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#0D122B] border border-[#1A223E] shadow-sm">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Simulated Liability</span>
            <span className="text-xl sm:text-2xl font-black text-[#FFAA00] font-mono">₹{grandPayout.toLocaleString()}</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Total Potential Payout</span>
          </div>
        </div>

        {/* Profit Card & Auto Risk Alert System Card (Per PRD) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* PROFIT CARD: Collection - Payout = Profit */}
          <div className="p-5 rounded-2xl bg-[#0D122B] border border-[#1A223E] relative overflow-hidden shadow-lg space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Simulated Net Profit</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-300 border border-slate-700">
                Collection - Payout = Profit
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className={`text-3xl sm:text-4xl font-black font-mono tracking-tight ${
                netProfit >= 0 ? 'text-emerald-400' : 'text-rose-500'
              }`}>
                {netProfit >= 0 ? '+' : '-'}₹{Math.abs(netProfit).toLocaleString()}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-[#080C1D] border border-[#1A223E] text-xs font-mono text-slate-300 flex items-center justify-between">
              <span>Collection: <strong className="text-emerald-400">₹{totalCollection.toLocaleString()}</strong></span>
              <span className="text-slate-500">-</span>
              <span>Payout: <strong className="text-[#FFAA00]">₹{grandPayout.toLocaleString()}</strong></span>
              <span className="text-slate-500">=</span>
              <span>Net: <strong className={netProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}>₹{netProfit.toLocaleString()}</strong></span>
            </div>
          </div>

          {/* AUTO RISK ALERT SYSTEM */}
          <div className={`p-5 rounded-2xl border relative overflow-hidden shadow-lg flex flex-col justify-between ${
            riskStatus === 'SAFE' 
              ? 'bg-emerald-950/20 border-emerald-500/40 shadow-emerald-500/5' 
              : riskStatus === 'WARNING'
              ? 'bg-amber-950/20 border-amber-500/40 shadow-amber-500/5'
              : 'bg-rose-950/30 border-rose-500/60 shadow-rose-500/10'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Auto Risk Alert System</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                riskStatus === 'SAFE' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                riskStatus === 'WARNING' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                'bg-rose-500/20 text-rose-300 border border-rose-500/40'
              }`}>
                {riskLabel}
              </span>
            </div>

            <div className="flex items-center gap-3.5 my-1">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 text-2xl border ${
                riskStatus === 'SAFE' ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' :
                riskStatus === 'WARNING' ? 'bg-amber-500/20 border-amber-500/40 text-amber-400 animate-pulse' :
                'bg-rose-500/20 border-rose-500/50 text-rose-400 animate-bounce'
              }`}>
                {riskStatus === 'SAFE' ? <ShieldCheck className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
              </div>
              <div>
                <h4 className={`text-base font-black ${
                  riskStatus === 'SAFE' ? 'text-emerald-400' :
                  riskStatus === 'WARNING' ? 'text-amber-400' :
                  'text-rose-400'
                }`}>
                  {riskStatus === 'SAFE' ? '🟢 GREEN SAFE' : riskStatus === 'WARNING' ? '🟡 YELLOW WARNING' : '🔴 RED HIGH RISK'}
                </h4>
                <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                  {riskMessage}
                </p>
              </div>
            </div>

            {riskStatus === 'HIGH_RISK' && (
              <div className="mt-2 pt-2 border-t border-rose-500/20 text-[11px] text-rose-300 font-bold flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" />
                <span>Multipliers locked. Admin locking recommended to prevent further liability exposure.</span>
              </div>
            )}
          </div>
        </div>

        {/* FUNNEL FLOW (With Payout Progression Q1 -> Q6) */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#0D122B] border border-[#1A223E] space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1A223E]">
            <div>
              <h3 className="text-base font-black text-white flex items-center gap-2 font-display">
                <TrendingUp className="w-5 h-5 text-[#FF6B00]" />
                Live Prediction Funnel Flow (Q1 to Q6)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Click any option to simulate official question outcomes and watch user qualification drop-offs and streak payouts.
              </p>
            </div>
            
            <span className="text-xs text-slate-400 font-mono">
              Rule: Q1 &ge; Q2 &ge; Q3 &ge; Q4 &ge; Q5 &ge; Q6
            </span>
          </div>

          <div className="space-y-5">
            {match.questions.map((q, i) => {
              const qIndex = i;
              const isFirstQuestion = i === 0;
              const hasPreviousFilter = isFirstQuestion || !!funnelFilters[match.questions[i - 1].id];

              // If previous question not selected, this stage is locked until admin picks path
              if (!hasPreviousFilter) {
                return (
                  <div key={q.id} className="p-4 rounded-xl bg-[#080C1D]/60 border border-[#1A223E] opacity-60 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-slate-800 text-slate-400 flex items-center justify-center text-xs font-black">
                        Q{i + 1}
                      </span>
                      <span className="text-xs font-bold text-slate-400">
                        {q.title} ({q.shortTitle})
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-bold">
                      Select Q{i} answer above to unlock funnel
                    </span>
                  </div>
                );
              }

              // Filtered slips entering this question stage
              const eligibleSlipsForStage = getRemainingSlipsAtQuestion(qIndex);
              const totalEligibleCount = eligibleSlipsForStage.length;

              // Group counts by distinct answers
              const optionSlipsMap: Record<string, UserPredictionSlip[]> = {};
              eligibleSlipsForStage.forEach(slip => {
                const ans = slip.answers?.[q.id] || 'Unanswered';
                if (!optionSlipsMap[ans]) optionSlipsMap[ans] = [];
                optionSlipsMap[ans].push(slip);
              });

              const sortedOptions = Object.entries(optionSlipsMap).sort((a, b) => b[1].length - a[1].length);

              const selectedOption = funnelFilters[q.id];
              const currentStreak = i + 1;
              const multiplier = getMultiplierForStreak(currentStreak);

              // Calculate tier payout for users qualifying this question
              const qualifyingSlips = selectedOption ? (optionSlipsMap[selectedOption] || []) : [];
              const qualifyingCount = qualifyingSlips.length;
              
              let tierPayout = 0;
              qualifyingSlips.forEach(s => {
                tierPayout += calculatePotentialPayout(s.entryFee || 50, currentStreak, s.wheelMultiplier || 50, !!s.freeHit);
              });

              return (
                <div key={q.id} className="space-y-2 relative">
                  {/* Connector arrow */}
                  {i > 0 && (
                    <div className="flex items-center justify-center -my-2 text-slate-600">
                      <ArrowDownRight className="w-4 h-4 text-[#FF6B00]/70" />
                    </div>
                  )}

                  <div className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                    selectedOption 
                      ? 'bg-gradient-to-r from-indigo-950/40 via-[#0D122B] to-[#0D122B] border-indigo-500/50 shadow-md shadow-indigo-500/10' 
                      : 'bg-[#080C1D] border-[#1A223E]'
                  }`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3.5 pb-2.5 border-b border-[#1A223E]">
                      <div className="flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded-xl bg-[#FF6B00]/20 text-[#FF8800] border border-[#FF6B00]/40 flex items-center justify-center text-xs font-black">
                          Q{i + 1}
                        </span>
                        <div>
                          <h4 className="text-sm font-black text-white">
                            {q.title} <span className="text-slate-400 font-normal">({q.shortTitle})</span>
                          </h4>
                          <span className="text-[11px] text-slate-400">
                            Pool entering Q{i + 1}: <strong className="text-white font-mono">{totalEligibleCount} users</strong>
                          </span>
                        </div>
                      </div>

                      {selectedOption && (
                        <div className="flex items-center gap-3 self-end sm:self-auto">
                          <div className="text-right">
                            <span className="text-[10px] text-slate-400 uppercase font-bold block">
                              Streak {currentStreak} ({multiplier}X Tier Payout)
                            </span>
                            <span className="text-sm sm:text-base font-black font-mono text-emerald-400">
                              {qualifyingCount} users • ₹{tierPayout.toLocaleString()}
                            </span>
                          </div>

                          <button
                            onClick={() => {
                              setInspectorData({
                                questionId: q.id,
                                questionTitle: q.title,
                                questionNumber: i + 1,
                                optionValue: selectedOption,
                                slipsList: qualifyingSlips,
                              });
                            }}
                            className="px-3 py-1.5 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 border border-indigo-500/40 text-xs font-black transition-colors flex items-center gap-1.5"
                            title="Inspect qualified users"
                          >
                            <Users className="w-3.5 h-3.5" />
                            <span>Inspect {qualifyingCount} Users</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Option Cards / Buttons */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                      {sortedOptions.length === 0 ? (
                        <div className="col-span-full p-4 rounded-xl bg-[#0D122B] text-center text-slate-500 text-xs">
                          No remaining users in this branch of the funnel.
                        </div>
                      ) : (
                        sortedOptions.map(([optName, optSlips]) => {
                          const isSelected = selectedOption === optName;
                          const count = optSlips.length;
                          const percentage = totalEligibleCount > 0 ? (count / totalEligibleCount) * 100 : 0;

                          return (
                            <div
                              key={optName}
                              className={`p-3 rounded-xl border transition-all flex flex-col justify-between gap-2 ${
                                isSelected 
                                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 border-indigo-400 text-white shadow-lg shadow-indigo-600/30 ring-2 ring-indigo-400/50' 
                                  : 'bg-[#0D122B] border-[#1A223E] hover:border-slate-700 hover:bg-[#131A38]'
                              }`}
                            >
                              <div className="flex items-start justify-between gap-2">
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newFilters = { ...funnelFilters };
                                    newFilters[q.id] = optName;
                                    // Clear downstream filters because funnel path changed
                                    for (let j = i + 1; j < match.questions.length; j++) {
                                      delete newFilters[match.questions[j].id];
                                    }
                                    setFunnelFilters(newFilters);
                                  }}
                                  className="text-left flex-1 min-w-0"
                                >
                                  <span className={`text-xs font-black block truncate ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                                    {optName}
                                  </span>
                                  <span className={`text-[11px] font-mono mt-0.5 block ${isSelected ? 'text-indigo-200' : 'text-slate-400'}`}>
                                    <strong>{count}</strong> users ({percentage.toFixed(1)}%)
                                  </span>
                                </button>

                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setInspectorData({
                                      questionId: q.id,
                                      questionTitle: q.title,
                                      questionNumber: i + 1,
                                      optionValue: optName,
                                      slipsList: optSlips,
                                    });
                                  }}
                                  className={`p-1.5 rounded-lg text-xs transition-colors flex-shrink-0 ${
                                    isSelected 
                                      ? 'bg-white/20 hover:bg-white/30 text-white' 
                                      : 'bg-[#080C1D] hover:bg-slate-800 text-slate-400 hover:text-white border border-[#1A223E]'
                                  }`}
                                  title="Inspect who selected this answer"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              {/* Progress bar */}
                              <div className="w-full h-1.5 bg-slate-800/80 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full rounded-full transition-all duration-300 ${
                                    isSelected ? 'bg-white' : 'bg-[#FF6B00]'
                                  }`}
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* PRD Summary Strip */}
          <div className="p-4 rounded-2xl bg-[#080C1D] border border-[#1A223E] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
              <span className="text-slate-400">
                Grand Payout = <strong className="text-[#FFAA00] font-black">₹{grandPayout.toLocaleString()}</strong>
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">
                Collection = <strong className="text-emerald-400 font-black">₹{totalCollection.toLocaleString()}</strong>
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">
                Simulated Profit = <strong className={`font-black ${netProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>₹{netProfit.toLocaleString()}</strong>
              </span>
            </div>

            <button 
              onClick={() => setFunnelFilters({})}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors flex items-center gap-1.5 self-start sm:self-auto"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Clear Funnel Simulation</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* USER INSPECTOR MODAL: "I want to see which user selected this answer"     */}
        {/* ========================================================================= */}
        {inspectorData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-3xl bg-[#0D122B] border border-[#1A223E] rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4 max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#1A223E]">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-white font-display">
                      Users Who Picked: <span className="text-[#FFAA00]">{inspectorData.optionValue}</span>
                    </h3>
                    <p className="text-xs text-slate-400">
                      Q{inspectorData.questionNumber}: {inspectorData.questionTitle} • {inspectorData.slipsList.length} User Slips
                    </p>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    setInspectorData(null);
                    setUserSearchFilter('');
                  }}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={userSearchFilter}
                  onChange={(e) => setUserSearchFilter(e.target.value)}
                  placeholder="Search users by name, phone, or slip ID..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Users List Table */}
              <div className="overflow-y-auto flex-1 pr-1 space-y-2">
                {(() => {
                  const filteredList = inspectorData.slipsList.filter(s => {
                    if (!userSearchFilter) return true;
                    const q = userSearchFilter.toLowerCase();
                    return (
                      (s.userName || '').toLowerCase().includes(q) ||
                      (s.userPhone || '').toLowerCase().includes(q) ||
                      (s.userId || '').toLowerCase().includes(q) ||
                      (s.id || '').toLowerCase().includes(q)
                    );
                  });

                  if (filteredList.length === 0) {
                    return (
                      <div className="p-8 text-center text-slate-500 text-xs">
                        No matching users found for "{userSearchFilter}".
                      </div>
                    );
                  }

                  return (
                    <div className="border border-[#1A223E] rounded-xl overflow-hidden">
                      <table className="w-full text-left text-xs whitespace-nowrap">
                        <thead className="bg-[#131A38] text-slate-400 uppercase text-[10px] tracking-wider border-b border-[#1A223E]">
                          <tr>
                            <th className="px-4 py-3">User Name & Phone</th>
                            <th className="px-4 py-3">Selected Pick</th>
                            <th className="px-4 py-3">Entry Fee</th>
                            <th className="px-4 py-3">Wheel Mult</th>
                            <th className="px-4 py-3">Free Hit</th>
                            <th className="px-4 py-3 text-right">Slip ID</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A223E] font-mono text-[11px]">
                          {filteredList.map((s) => (
                            <tr key={s.id} className="hover:bg-[#131A38]/40 transition-colors">
                              <td className="px-4 py-3 font-sans">
                                <span className="font-bold text-white block">{s.userName || 'Anonymous Fan'}</span>
                                <span className="text-[10px] text-slate-400 font-mono">{s.userPhone || s.userId || 'N/A'}</span>
                              </td>
                              <td className="px-4 py-3 text-emerald-400 font-sans font-bold">
                                {inspectorData.optionValue}
                              </td>
                              <td className="px-4 py-3 text-slate-200">
                                ₹{s.entryFee || 50}
                              </td>
                              <td className="px-4 py-3 text-[#FFAA00] font-bold">
                                {s.wheelMultiplier || 50}X
                              </td>
                              <td className="px-4 py-3">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  s.freeHit ? 'bg-amber-500/20 text-amber-300' : 'text-slate-500'
                                }`}>
                                  {s.freeHit ? 'ACTIVE' : 'NO'}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-right text-slate-500 text-[10px]">
                                {s.id.substring(0, 8)}...
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                })()}
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-[#1A223E]">
                <span className="text-xs text-slate-400">
                  Total Shown: <strong>{inspectorData.slipsList.length} users</strong>
                </span>
                <button
                  onClick={() => {
                    setInspectorData(null);
                    setUserSearchFilter('');
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors"
                >
                  Close Inspector
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {!selectedMatchId ? renderMatchList() : renderFunnelAnalysis()}
    </div>
  );
};
