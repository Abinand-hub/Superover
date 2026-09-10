import React, { useState, useMemo, useEffect } from 'react';
import {
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  CheckCircle2,
  Download,
  RefreshCw,
  ChevronRight,
  ChevronDown,
  Folder,
  FolderOpen,
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
  Filter,
  Trophy,
  Award,
  Wallet,
  ArrowUpRight
} from 'lucide-react';
import { CricketMatch, UserPredictionSlip, UserAccount } from '../../types';
import { calculatePotentialPayout, checkAnswerMatch, settlePredictionSlip, getUserAnswerFromSlip } from '../../utils/payoutCalculator';

interface LiveMarketAnalysisProps {
  matches: CricketMatch[];
  slips: UserPredictionSlip[];
  users?: UserAccount[];
  initialView?: 'LIVE' | 'FINISHED';
}

export const LiveMarketAnalysis: React.FC<LiveMarketAnalysisProps> = ({
  matches,
  slips,
  users = [],
  initialView = 'LIVE'
}) => {
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
  const [funnelFilters, setFunnelFilters] = useState<Record<string, string>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [marketView, setMarketView] = useState<'LIVE' | 'FINISHED'>(initialView);

  useEffect(() => {
    if (initialView) {
      setMarketView(initialView);
    }
  }, [initialView]);

  // Winnings Table Filter State
  const [winningsFilter, setWinningsFilter] = useState<'ALL' | 'WINNERS_ONLY' | 'TOP_TIER'>('ALL');
  const [winningsSearch, setWinningsSearch] = useState<string>('');

  // User Inspector Modal State
  const [inspectorData, setInspectorData] = useState<{
    questionId: string;
    questionTitle: string;
    questionNumber: number;
    optionValue: string;
    slipsList: UserPredictionSlip[];
  } | null>(null);
  const [userSearchFilter, setUserSearchFilter] = useState<string>('');

  // Slip Answers Inspection Modal State
  const [selectedSlipForAnswers, setSelectedSlipForAnswers] = useState<{
    slip: UserPredictionSlip;
    streak?: number;
    multiplier?: number;
    winningsINR?: number;
    hasWon?: boolean;
  } | null>(null);

  // Expanded User Folders in Funnel Breakdown
  const [expandedUserKeys, setExpandedUserKeys] = useState<Set<string>>(new Set());

  const toggleUserExpanded = (userKey: string) => {
    setExpandedUserKeys(prev => {
      const next = new Set(prev);
      if (next.has(userKey)) next.delete(userKey);
      else next.add(userKey);
      return next;
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Auto-initialize official settled path if match is completed and no custom filters are chosen
  React.useEffect(() => {
    if (selectedMatchId) {
      const m = matches.find(x => x.id === selectedMatchId);
      if (m?.status === 'COMPLETED' && m.actualResults?.answers) {
        const autoFilters: Record<string, string> = {};
        const allPlayers = [...(m.squadTeam1 || []), ...(m.squadTeam2 || [])];
        const pMap = new Map(allPlayers.map((p) => [p.id, p]));

        m.questions?.forEach((q, idx) => {
          const actualResult = m.actualResults?.answers?.[q.id] || (m.actualResults?.answers as any)?.[`q${idx + 1}`] || (m.actualResults?.answers as any)?.[String(idx + 1)];
          if (actualResult) {
            const val = typeof actualResult === 'object' && actualResult !== null
              ? (actualResult.answerText || actualResult.answerId)
              : actualResult;
            if (val) {
              const p = pMap.get(String(val));
              autoFilters[q.id] = p ? p.name : String(val);
            }
          }
        });
        setFunnelFilters(autoFilters);
      } else {
        setFunnelFilters({});
      }
    }
  }, [selectedMatchId]);

  // Helper: Normalize answer strings for robust comparison
  const normalizeAnswer = (ans: any): string => {
    if (ans === undefined || ans === null) return '';
    if (typeof ans === 'object') return (ans.answerText || ans.answerId || '').trim().toLowerCase();
    return String(ans).trim().toLowerCase();
  };

  // Multipliers according to PRD V8:
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

  // -------------------------------------------------------------------------
  // SCREEN 1: LIVE MARKET ANALYSIS & FINISHED EVENTS ARCHIVE (List Page)
  // Columns: Match ID | Match Name | Total Entries | Total Collection | Status | Action
  // -------------------------------------------------------------------------
  const renderMatchList = () => {
    const liveMatches = matches.filter(m => m.status !== 'COMPLETED');
    const finishedMatches = matches.filter(m => m.status === 'COMPLETED');
    const displayedMatches = marketView === 'LIVE' ? liveMatches : finishedMatches;

    const displayedMatchIds = new Set(displayedMatches.map(m => m.id));
    const relevantSlips = slips.filter(s => displayedMatchIds.has(s.matchId));
    const totalPlatformEntries = relevantSlips.length;
    const totalPlatformCollection = relevantSlips.reduce((sum, s) => sum + (s.totalPayable || s.entryFee || 0), 0);

    return (
      <div className="space-y-6 animate-in fade-in duration-200">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${marketView === 'LIVE'
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30'
                }`}>
                {marketView === 'LIVE' ? '⚡ LIVE & OPEN CONTESTS (NON-SETTLED)' : '🏁 SETTLED & COMPLETED EVENTS ARCHIVE'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5 font-display">
              {marketView === 'LIVE' ? (
                <>
                  <TrendingUp className="w-6 h-6 text-[#FF6B00]" />
                  Live Market Analysis
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  Finished Events Archive
                </>
              )}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {marketView === 'LIVE'
                ? 'Select an active match to inspect prediction funnels, user picks distribution, and simulate real-time platform liability & user winnings.'
                : 'Inspect completed and settled fixtures to audit official outcomes, payouts distributed to winners, and net organizer profit.'}
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

        {/* Matches Table / Cards */}
        <div className="bg-[#0D122B] border border-[#1A223E] rounded-2xl overflow-hidden shadow-xl">
          {/* Mobile Card List (Zero Horizontal Scroll / Swipe Needed) */}
          <div className="block md:hidden p-3.5 space-y-3">
            {displayedMatches.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs">
                {marketView === 'LIVE'
                  ? 'No active or open matches available right now. Create a match or view Finished Events Archive.'
                  : 'No finished or settled events archived yet.'}
              </div>
            ) : (
              displayedMatches.map((match) => {
                const matchSlips = slips.filter(s => s.matchId === match.id);
                const totalEntries = matchSlips.length;
                const totalCollection = matchSlips.reduce((sum, s) => sum + (s.totalPayable || s.entryFee || 0), 0);
                const isLive = match.status === 'LIVE';
                const isCompleted = match.status === 'COMPLETED';
                const isLocked = match.status === 'LOCKED';

                return (
                  <div
                    key={match.id}
                    className="p-4 rounded-xl bg-[#080C1D] border border-[#1A223E] space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-black text-white text-base font-display">
                            {match.team1?.code || 'T1'} vs {match.team2?.code || 'T2'}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase flex items-center gap-1 ${isLive ? 'bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse' :
                            isCompleted ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                              isLocked ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                                'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                            }`}>
                            {isLive && <span className="w-1 h-1 rounded-full bg-red-400 animate-ping"></span>}
                            {isCompleted && '✓ '}
                            {match.status}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400 block mt-0.5">
                          {match.title} • {match.series}
                        </span>
                      </div>

                      <button
                        onClick={() => copyToClipboard(match.id)}
                        className="flex items-center gap-1 text-[10px] text-slate-500 hover:text-slate-300 font-mono bg-[#131A38] px-2 py-1 rounded-lg border border-[#1A223E]"
                        title="Copy Match ID"
                      >
                        <span>{match.id.substring(0, 6)}...</span>
                        {copiedId === match.id ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3 text-slate-400" />
                        )}
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-[#131A38]">
                      <div className="p-2 bg-[#0D122B] rounded-lg border border-[#1A223E]/80">
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">Total Slips</span>
                        <span className="text-sm font-black text-white font-mono">{totalEntries.toLocaleString()}</span>
                      </div>
                      <div className="p-2 bg-[#0D122B] rounded-lg border border-[#1A223E]/80">
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">Collection</span>
                        <span className="text-sm font-black text-emerald-400 font-mono">₹{totalCollection.toLocaleString()}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedMatchId(match.id);
                        setFunnelFilters({});
                      }}
                      className="w-full py-2.5 px-3 bg-gradient-to-r from-[#FF6B00] to-[#FF8800] hover:brightness-110 active:scale-[0.98] text-slate-950 font-black text-xs rounded-xl transition-all shadow-md shadow-[#FF6B00]/25 flex items-center justify-center gap-1.5"
                    >
                      <TrendingUp className="w-4 h-4 text-slate-950" />
                      <span>{marketView === 'LIVE' ? 'View Funnel Analysis' : 'View Settled Analysis & Payouts'}</span>
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Desktop Data Table (Hidden on Mobile) */}
          <div className="hidden md:block overflow-x-auto">
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
                {displayedMatches.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                      {marketView === 'LIVE'
                        ? 'No active or open matches available right now. Create a match or view Finished Events Archive.'
                        : 'No finished or settled events archived yet.'}
                    </td>
                  </tr>
                ) : (
                  displayedMatches.map((match) => {
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
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase flex items-center gap-1 w-max ${isLive ? 'bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse' :
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
                            <span>{marketView === 'LIVE' ? 'View Funnel Analysis' : 'View Settled Analysis & Payouts'}</span>
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

    const allPlayers = [...(match.squadTeam1 || []), ...(match.squadTeam2 || [])];
    const playerMap = new Map(allPlayers.map((p) => [p.id, p]));

    const resolveDisplayName = (rawAns: string, qType?: string): string => {
      if (!rawAns || rawAns === 'Unanswered') return 'Unanswered';

      const p = playerMap.get(rawAns);
      if (p) return `${p.name} (${p.team || ''})`;

      for (const [id, player] of playerMap.entries()) {
        if (id.toLowerCase() === rawAns.toLowerCase()) {
          return `${player.name} (${player.team || ''})`;
        }
      }

      const matchSquad = rawAns.match(/^p_([a-z0-9]+)_(\d+)$/i);
      if (matchSquad) {
        const tCode = matchSquad[1].toUpperCase();
        const idx = parseInt(matchSquad[2], 10) - 1;
        const squad = tCode === match.team1?.code?.toUpperCase() ? match.squadTeam1 : match.squadTeam2;
        if (squad && squad[idx]) {
          return `${squad[idx].name} (${squad[idx].team || tCode})`;
        }
      }

      if (match.team1 && rawAns.toUpperCase() === match.team1.code?.toUpperCase()) return match.team1.name;
      if (match.team2 && rawAns.toUpperCase() === match.team2.code?.toUpperCase()) return match.team2.name;

      return rawAns;
    };

    // Calculate remaining slips that matched the filters up to question index `qIndex`
    const getRemainingSlipsAtQuestion = (qIndex: number): UserPredictionSlip[] => {
      return matchSlips.filter(slip => {
        for (let i = 0; i < qIndex; i++) {
          const pastQ = match.questions[i];
          const filterAns = funnelFilters[pastQ.id];
          if (!filterAns) continue; // If no filter was chosen for this past question, all users remain eligible
          const userAns = getUserAnswerFromSlip(slip.answers, pastQ.id, i);
          const userDisplay = resolveDisplayName(userAns, pastQ.type);

          const isMatch = (userDisplay && userDisplay.trim().toLowerCase() === filterAns.trim().toLowerCase()) ||
            checkAnswerMatch(userAns, filterAns, filterAns, playerMap);
          if (!isMatch) return false;
        }
        return true;
      });
    };

    // Calculate each slip's effective streak and winnings (in ₹ Rupees)
    // If funnelFilters has selections, evaluate against simulated path; else evaluate against official results if settled
    const isCustomFunnelActive = Object.keys(funnelFilters).length > 0;

    const evaluatedSlipsWithWinnings = matchSlips.map(slip => {
      if (!isCustomFunnelActive && match.status === 'COMPLETED' && match.actualResults) {
        const settled = settlePredictionSlip(slip, match, match.actualResults);
        const payout = (slip.payoutAmount !== undefined && slip.payoutAmount > 0) ? slip.payoutAmount : settled.payoutAmount;
        return {
          slip,
          streak: settled.settledSlip.streakCount || 0,
          multiplier: settled.multiplier || 0,
          winningsINR: payout,
          hasWon: payout > 0,
        };
      }

      // Live or Custom Funnel Simulation:
      let streak = 0;
      let isStreakBroken = false;
      const questionsCount = match.questions.length;

      for (let i = 0; i < questionsCount; i++) {
        const q = match.questions[i];
        const filterVal = funnelFilters[q.id];
        const officialVal = match.actualResults?.answers?.[q.id];
        const targetAns = filterVal || (typeof officialVal === 'object' ? (officialVal?.answerText || officialVal?.answerId) : officialVal);

        if (!targetAns) break;

        const userAns = getUserAnswerFromSlip(slip.answers, q.id, i);
        const userDisplay = resolveDisplayName(userAns, q.type);
        const isCorrect = (userDisplay && userDisplay.trim().toLowerCase() === String(targetAns).trim().toLowerCase()) ||
          checkAnswerMatch(userAns, String(targetAns), String(targetAns), playerMap);

        if (isCorrect) {
          if (!isStreakBroken) streak++;
        } else {
          isStreakBroken = true;
          break;
        }
      }

      const mult = getMultiplierForStreak(streak);
      const calculatedPayout = streak >= 3
        ? calculatePotentialPayout(slip.entryFee || 50, streak, slip.wheelMultiplier || 50, !!slip.freeHit)
        : 0;

      return {
        slip,
        streak,
        multiplier: mult,
        winningsINR: calculatedPayout,
        hasWon: calculatedPayout > 0,
      };
    });

    // Grand Simulated / Settled Payout
    const grandPayout = evaluatedSlipsWithWinnings.reduce((sum, item) => sum + item.winningsINR, 0);
    const totalWinnersCount = evaluatedSlipsWithWinnings.filter(item => item.hasWon).length;
    const highestPayoutINR = evaluatedSlipsWithWinnings.reduce((max, item) => Math.max(max, item.winningsINR), 0);
    const netProfit = totalCollection - grandPayout;

    // AUTO RISK ALERT SYSTEM (Per PRD)
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

    // Export User Winnings & Slips CSV
    const handleExportUserWinnings = () => {
      const csvContent = "data:text/csv;charset=utf-8,"
        + "Slip_ID,User_Name,Phone,User_ID,Entry_Fee_INR,Consecutive_Streak,Multiplier_Tier,Winnings_Won_INR,Wheel_Multiplier,Free_Hit,Status,Submitted_At\n"
        + evaluatedSlipsWithWinnings.map(item => {
          const s = item.slip;
          return `${s.id},${s.userName || 'User'},${s.userPhone || 'N/A'},${s.userId || 'N/A'},${s.entryFee || 50},${item.streak}/6,${item.multiplier}X,${item.winningsINR},${s.wheelMultiplier || 50}X,${s.freeHit ? 'YES' : 'NO'},${item.hasWon ? 'WON' : 'NO_WIN'},${s.submittedAt || 'N/A'}`;
        }).join("\n");

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `user_winnings_${match.team1?.code}_vs_${match.team2?.code}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    // Group all slips for this match by user (1 Folder per User)
    const groupedUsersWithWinnings = (() => {
      const groupsMap = new Map<string, {
        userKey: string;
        userName: string;
        userPhone: string;
        userId: string;
        entriesCount: number;
        totalStake: number;
        totalWinningsINR: number;
        bestStreak: number;
        bestMultiplier: number;
        freeHitCount: number;
        hasWon: boolean;
        entries: Array<{
          slip: UserPredictionSlip;
          streak: number;
          multiplier: number;
          winningsINR: number;
          hasWon: boolean;
          entryIndex: number;
        }>;
      }>();

      evaluatedSlipsWithWinnings.forEach(item => {
        const s = item.slip;
        const key = (s.userId || s.userPhone || s.userName || `user_${s.id}`).trim().toLowerCase();
        const stake = s.totalPayable || (s.entryFee ? (s.freeHit ? s.entryFee + (s.freeHitFee || 10) : s.entryFee) : 50);

        if (!groupsMap.has(key)) {
          groupsMap.set(key, {
            userKey: key,
            userName: s.userName || 'SuperOver Fan',
            userPhone: s.userPhone || '',
            userId: s.userId || '',
            entriesCount: 0,
            totalStake: 0,
            totalWinningsINR: 0,
            bestStreak: 0,
            bestMultiplier: 0,
            freeHitCount: 0,
            hasWon: false,
            entries: []
          });
        }

        const group = groupsMap.get(key)!;
        group.entriesCount += 1;
        group.totalStake += stake;
        group.totalWinningsINR += item.winningsINR;
        group.bestStreak = Math.max(group.bestStreak, item.streak);
        group.bestMultiplier = Math.max(group.bestMultiplier, item.multiplier);
        if (s.freeHit) group.freeHitCount += 1;
        if (item.hasWon) group.hasWon = true;
        group.entries.push({
          ...item,
          entryIndex: group.entriesCount
        });
      });

      return Array.from(groupsMap.values());
    })();

    const expandAllUsers = () => {
      setExpandedUserKeys(new Set(groupedUsersWithWinnings.map(g => g.userKey)));
    };

    const collapseAllUsers = () => {
      setExpandedUserKeys(new Set());
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
                <span className={`px-2 py-0.5 rounded text-[10px] font-black tracking-wider uppercase border ${match.status === 'COMPLETED'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
                  }`}>
                  {match.status === 'COMPLETED' ? '🏁 SETTLED FIXTURE & PAYOUT AUDIT' : 'LIVE FUNNEL & RISK SIMULATOR'}
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

            <button
              onClick={handleExportUserWinnings}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black transition-all flex items-center gap-1.5 shadow-md shadow-emerald-600/30"
              id="btn-export-winnings-csv"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export User Winnings (CSV)</span>
            </button>
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
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Total User Winnings</span>
            <span className="text-xl sm:text-2xl font-black text-[#FFAA00] font-mono">₹{grandPayout.toLocaleString()}</span>
            <span className="text-[10px] text-emerald-400 font-bold block mt-0.5">{totalWinnersCount} Users Won Cash</span>
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
              <span className={`text-3xl sm:text-4xl font-black font-mono tracking-tight ${netProfit >= 0 ? 'text-emerald-400' : 'text-rose-500'
                }`}>
                {netProfit >= 0 ? '+' : '-'}₹{Math.abs(netProfit).toLocaleString()}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-[#080C1D] border border-[#1A223E] text-xs font-mono text-slate-300 flex items-center justify-between">
              <span>Collection: <strong className="text-emerald-400">₹{totalCollection.toLocaleString()}</strong></span>
              <span className="text-slate-500">-</span>
              <span>User Winnings: <strong className="text-[#FFAA00]">₹{grandPayout.toLocaleString()}</strong></span>
              <span className="text-slate-500">=</span>
              <span>Net: <strong className={netProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}>₹{netProfit.toLocaleString()}</strong></span>
            </div>
          </div>

          {/* AUTO RISK ALERT SYSTEM */}
          <div className={`p-5 rounded-2xl border relative overflow-hidden shadow-lg flex flex-col justify-between ${riskStatus === 'SAFE'
            ? 'bg-emerald-950/20 border-emerald-500/40 shadow-emerald-500/5'
            : riskStatus === 'WARNING'
              ? 'bg-amber-950/20 border-amber-500/40 shadow-amber-500/5'
              : 'bg-rose-950/30 border-rose-500/60 shadow-rose-500/10'
            }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Auto Risk Alert System</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${riskStatus === 'SAFE' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                riskStatus === 'WARNING' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                  'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                }`}>
                {riskLabel}
              </span>
            </div>

            <div className="flex items-center gap-3.5 my-1">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 text-2xl border ${riskStatus === 'SAFE' ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' :
                riskStatus === 'WARNING' ? 'bg-amber-500/20 border-amber-500/40 text-amber-400 animate-pulse' :
                  'bg-rose-500/20 border-rose-500/50 text-rose-400 animate-bounce'
                }`}>
                {riskStatus === 'SAFE' ? <ShieldCheck className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
              </div>
              <div>
                <h4 className={`text-base font-black ${riskStatus === 'SAFE' ? 'text-emerald-400' :
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

        {/* ========================================================================= */}
        {/* SECTION: USER ENTRIES BREAKDOWN (1 FOLDER PER USER)                      */}
        {/* ========================================================================= */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#0D122B] border border-emerald-500/40 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1A223E]">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <Folder className="w-5 h-5 text-[#FF6B00]" />
                <h3 className="text-base font-black text-white font-display">
                  User Entries & Payouts Breakdown
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black border border-emerald-500/30">
                  {groupedUsersWithWinnings.length} Unique Users • {matchSlips.length} Total Slips
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                All entries for each user are grouped into 1 folder. Click any folder to expand and audit their specific slips.
              </p>
            </div>

            {/* Filter Tabs, Search & Expand Controls */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={expandAllUsers}
                className="px-2.5 py-1.5 rounded-lg bg-[#131A38] hover:bg-[#1A223E] text-slate-300 hover:text-white text-xs font-bold border border-[#1A223E] transition-colors flex items-center gap-1 cursor-pointer"
              >
                <FolderOpen className="w-3.5 h-3.5 text-amber-400" />
                <span>Expand All</span>
              </button>
              <button
                type="button"
                onClick={collapseAllUsers}
                className="px-2.5 py-1.5 rounded-lg bg-[#131A38] hover:bg-[#1A223E] text-slate-300 hover:text-white text-xs font-bold border border-[#1A223E] transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Folder className="w-3.5 h-3.5 text-slate-400" />
                <span>Collapse All</span>
              </button>

              <div className="flex rounded-xl bg-[#080C1D] border border-[#1A223E] p-1 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setWinningsFilter('ALL')}
                  className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${winningsFilter === 'ALL' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                >
                  All ({groupedUsersWithWinnings.length})
                </button>
                <button
                  type="button"
                  onClick={() => setWinningsFilter('WINNERS_ONLY')}
                  className={`px-3 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${winningsFilter === 'WINNERS_ONLY' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                >
                  <Award className="w-3 h-3" />
                  <span>Winners ({groupedUsersWithWinnings.filter(u => u.hasWon).length})</span>
                </button>
              </div>

              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={winningsSearch}
                  onChange={(e) => setWinningsSearch(e.target.value)}
                  placeholder="Search user name/phone..."
                  className="pl-8 pr-3 py-1.5 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 w-44 sm:w-56"
                />
              </div>
            </div>
          </div>

          {/* User Folders List (1 Folder Per User) */}
          <div className="space-y-3">
            {(() => {
              const filteredGroups = groupedUsersWithWinnings.filter((group) => {
                if (winningsFilter === 'WINNERS_ONLY' && !group.hasWon) return false;
                if (winningsSearch) {
                  const q = winningsSearch.toLowerCase();
                  const matchName = (group.userName || '').toLowerCase().includes(q);
                  const matchPhone = (group.userPhone || '').toLowerCase().includes(q);
                  const matchId = (group.userId || '').toLowerCase().includes(q);
                  const matchSlip = group.entries.some(e => e.slip.id.toLowerCase().includes(q));
                  return matchName || matchPhone || matchId || matchSlip;
                }
                return true;
              });

              if (filteredGroups.length === 0) {
                return (
                  <div className="p-8 text-center text-slate-500 text-xs bg-[#080C1D] rounded-xl border border-[#1A223E]">
                    No users found matching current filters.
                  </div>
                );
              }

              return filteredGroups.map((group) => {
                const isExpanded = expandedUserKeys.has(group.userKey);
                const hasWon = group.hasWon;

                return (
                  <div
                    key={group.userKey}
                    className={`rounded-2xl border transition-all overflow-hidden ${
                      hasWon
                        ? 'bg-[#080C1D] border-emerald-500/40 shadow-md shadow-emerald-500/10'
                        : 'bg-[#080C1D] border-[#1A223E]'
                    }`}
                  >
                    {/* User Folder Header (Clickable to Expand / Collapse) */}
                    <div
                      onClick={() => toggleUserExpanded(group.userKey)}
                      className={`p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 cursor-pointer transition-colors ${
                        isExpanded ? 'bg-[#131A38]/70 border-b border-[#1A223E]' : 'hover:bg-[#131A38]/40'
                      }`}
                    >
                      {/* Left: Identity & Entries Count */}
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm font-mono shrink-0 ${
                          hasWon ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-[#131A38] text-slate-300 border border-[#1A223E]'
                        }`}>
                          {(group.userName || 'U')[0].toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-extrabold text-white text-sm">{group.userName}</span>
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FF6B00]/15 text-[#FF8800] border border-[#FF6B00]/30 text-[10px] font-black">
                              <Folder className="w-3 h-3" />
                              <span>{group.entriesCount} {group.entriesCount === 1 ? 'Entry' : 'Entries'}</span>
                            </span>
                            {group.freeHitCount > 0 && (
                              <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
                                {group.freeHitCount} Spin Wheel
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-400 font-mono block mt-0.5">
                            {group.userPhone || group.userId || 'N/A'}
                          </span>
                        </div>
                      </div>

                      {/* Right: Aggregated Stats & Toggle */}
                      <div className="flex items-center gap-4 self-end md:self-auto flex-wrap">
                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 block uppercase font-bold">Total Stake</span>
                          <span className="text-xs sm:text-sm font-black text-white font-mono">₹{group.totalStake.toLocaleString()}</span>
                        </div>

                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 block uppercase font-bold">Best Streak</span>
                          <span className={`text-xs sm:text-sm font-black font-mono ${group.bestStreak >= 3 ? 'text-amber-400' : 'text-slate-300'}`}>
                            {group.bestStreak}/6 {group.bestMultiplier > 0 ? `(${group.bestMultiplier}X)` : ''}
                          </span>
                        </div>

                        <div className="text-right min-w-[90px]">
                          <span className="text-[10px] text-slate-400 block uppercase font-bold">Total Won</span>
                          {hasWon ? (
                            <span className="text-xs sm:text-sm font-black text-emerald-400 font-mono flex items-center justify-end gap-1">
                              <Sparkles className="w-3 h-3 text-emerald-400" />
                              +₹{group.totalWinningsINR.toLocaleString()}
                            </span>
                          ) : (
                            <span className="text-xs font-mono text-slate-500">₹0</span>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleUserExpanded(group.userKey);
                          }}
                          className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all border ${
                            isExpanded
                              ? 'bg-[#FF6B00] text-slate-950 border-[#FF6B00] shadow-sm shadow-[#FF6B00]/20'
                              : 'bg-[#131A38] text-slate-300 hover:text-white border-[#1A223E]'
                          }`}
                        >
                          <span>{isExpanded ? 'Collapse' : `Expand (${group.entriesCount})`}</span>
                          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                        </button>
                      </div>
                    </div>

                    {/* Expanded Individual Entries List */}
                    {isExpanded && (
                      <div className="p-4 bg-[#080C1D] border-t border-[#1A223E] space-y-2.5">
                        <div className="text-[11px] font-bold text-slate-400 flex items-center justify-between pb-2 border-b border-[#1A223E]">
                          <span>Individual Prediction Entries submitted by <strong>{group.userName}</strong>:</span>
                          <span className="text-slate-500">Click &quot;View Answers&quot; on any entry to see Q1-Q6 picks</span>
                        </div>

                        <div className="space-y-2">
                          {group.entries.map((entryItem, entryIdx) => {
                            const slip = entryItem.slip;
                            const stake = slip.totalPayable || (slip.entryFee ? (slip.freeHit ? slip.entryFee + (slip.freeHitFee || 10) : slip.entryFee) : 50);
                            const entryWon = entryItem.hasWon;

                            return (
                              <div
                                key={slip.id || entryIdx}
                                className={`p-3 rounded-xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-3 transition-colors ${
                                  entryWon
                                    ? 'bg-emerald-950/20 border-emerald-500/30'
                                    : 'bg-[#0D122B] border-[#1A223E]'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <span className="px-2 py-0.5 rounded-md bg-[#131A38] text-slate-300 font-black text-xs border border-[#1A223E] font-mono">
                                    Entry #{entryIdx + 1}
                                  </span>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs font-mono font-bold text-slate-200">
                                        Slip #{slip.id ? slip.id.substring(0, 8).toUpperCase() : `SLIP_${entryIdx + 1}`}
                                      </span>
                                      {slip.submittedAt && (
                                        <span className="text-[10px] text-slate-500">
                                          • {new Date(slip.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                      )}
                                    </div>
                                    <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                                      <span>Stake: <strong>₹{stake}</strong> {slip.freeHit ? `(₹${slip.entryFee} + ₹${slip.freeHitFee || 10} Spin)` : ''}</span>
                                      <span>•</span>
                                      <span>Streak: <strong className={entryItem.streak >= 3 ? 'text-amber-400' : 'text-slate-300'}>{entryItem.streak}/6</strong></span>
                                      <span>•</span>
                                      <span>Tier: <strong>{entryItem.multiplier > 0 ? `${entryItem.multiplier}X` : '0X'}</strong></span>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center gap-3 self-end md:self-auto">
                                  <div className="text-right">
                                    {entryWon ? (
                                      <span className="text-xs font-black text-emerald-400 font-mono">
                                        +₹{entryItem.winningsINR.toLocaleString()}
                                      </span>
                                    ) : (
                                      <span className="text-xs font-mono text-slate-500">₹0</span>
                                    )}
                                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-black uppercase block mt-0.5 ${
                                      entryWon ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-500'
                                    }`}>
                                      {entryWon ? 'WON' : 'NO WIN'}
                                    </span>
                                  </div>

                                  <button
                                    type="button"
                                    onClick={() => setSelectedSlipForAnswers({
                                      slip: slip,
                                      streak: entryItem.streak,
                                      multiplier: entryItem.multiplier,
                                      winningsINR: entryItem.winningsINR,
                                      hasWon: entryItem.hasWon
                                    })}
                                    className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#FF6B00]/20 to-[#FF8800]/20 hover:from-[#FF6B00]/40 hover:to-[#FF8800]/40 text-[#FF8800] hover:text-white border border-[#FF6B00]/40 font-sans font-bold text-xs transition-all shadow-sm active:scale-95 cursor-pointer flex items-center gap-1.5"
                                  >
                                    <Eye className="w-3.5 h-3.5" />
                                    <span>View Answers</span>
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              });
            })()}
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
                Simulate match outcomes question-by-question to see how many users survive each streak tier and calculate platform liability.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-mono">
                Rule: Q1 &ge; Q2 &ge; Q3 &ge; Q4 &ge; Q5 &ge; Q6
              </span>
            </div>
          </div>

          {/* Explanation Info Box */}
          <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/30 text-xs flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
            <div className="text-slate-300 leading-relaxed">
              <strong className="text-white">What is this Funnel?</strong> In SuperOver, users only win cash by scoring consecutive right answers from Q1 onwards. Clicking any answer below simulates that match result and shows how many users qualify for that tier (Q1 $\rightarrow$ Q2 $\rightarrow$ Q3 $\rightarrow$ Q4 $\rightarrow$ Q5 $\rightarrow$ Q6) and how much cash winnings they receive.
            </div>
          </div>

          <div className="space-y-5">
            {match.questions.map((q, i) => {
              const qIndex = i;
              const isFirstQuestion = i === 0;
              const hasPreviousFilter = isFirstQuestion || !!funnelFilters[match.questions[i - 1].id];

              // Filtered slips entering this question stage
              const eligibleSlipsForStage = getRemainingSlipsAtQuestion(qIndex);
              const totalEligibleCount = eligibleSlipsForStage.length;

              // Group counts by distinct answers
              const optionSlipsMap: Record<string, UserPredictionSlip[]> = {};
              eligibleSlipsForStage.forEach(slip => {
                const rawAns = getUserAnswerFromSlip(slip.answers, q.id, i);
                const ans = resolveDisplayName(rawAns, q.type);
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

                  <div className={`p-4 sm:p-5 rounded-2xl border transition-all ${selectedOption
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
                              className={`p-3 rounded-xl border transition-all flex flex-col justify-between gap-2 ${isSelected
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
                                  className={`p-1.5 rounded-lg text-xs transition-colors flex-shrink-0 ${isSelected
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
                                  className={`h-full rounded-full transition-all duration-300 ${isSelected ? 'bg-white' : 'bg-[#FF6B00]'
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
                            <th className="px-4 py-3 font-bold">User Name & Phone</th>
                            <th className="px-4 py-3 font-bold">Selected Pick</th>
                            <th className="px-4 py-3 font-bold">Entry Fee</th>
                            <th className="px-4 py-3 font-bold">Wheel Mult</th>
                            <th className="px-4 py-3 font-bold">Free Hit</th>
                            <th className="px-4 py-3 font-bold text-right">Potential Payout (₹)</th>
                            <th className="px-4 py-3 font-bold text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A223E] font-mono text-[11px]">
                          {filteredList.map((s) => {
                            const currentStreak = inspectorData.questionNumber;
                            const potentialINR = currentStreak >= 3
                              ? calculatePotentialPayout(s.entryFee || 50, currentStreak, s.wheelMultiplier || 50, !!s.freeHit)
                              : 0;

                            return (
                              <tr key={s.id} className="hover:bg-[#131A38]/40 transition-colors">
                                <td className="px-4 py-3 font-sans">
                                  <span className="font-bold text-white block">{s.userName || 'Anonymous Fan'}</span>
                                  <span className="text-[10px] text-slate-400 font-mono">{s.userPhone || s.userId || 'N/A'}</span>
                                </td>
                                <td className="px-4 py-3 text-emerald-400 font-sans font-bold">
                                  {inspectorData.optionValue}
                                </td>
                                <td className="px-4 py-3 text-slate-200">
                                  {s.freeHit || (s.totalPayable && s.totalPayable > (s.entryFee || 25)) ? (
                                    <div>
                                      <span className="font-bold text-white">₹{s.totalPayable || ((s.entryFee || 25) + (s.freeHitFee || 10))}</span>
                                      <span className="text-[10px] text-amber-400 block font-normal">(₹{s.entryFee || 25} + ₹{s.freeHitFee || 10})</span>
                                    </div>
                                  ) : (
                                    <span>₹{s.entryFee || 50}</span>
                                  )}
                                </td>
                                <td className="px-4 py-3 text-[#FFAA00] font-bold">
                                  {s.wheelMultiplier || 50}X
                                </td>
                                <td className="px-4 py-3">
                                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${s.freeHit ? 'bg-amber-500/20 text-amber-300' : 'text-slate-500'
                                    }`}>
                                    {s.freeHit ? 'ACTIVE' : 'NO'}
                                  </span>
                                </td>
                                <td className="px-4 py-3 text-right">
                                  <span className={`font-bold ${potentialINR > 0 ? 'text-emerald-400 text-xs' : 'text-slate-500'}`}>
                                    {potentialINR > 0 ? `+₹${potentialINR.toLocaleString()}` : '₹0'}
                                  </span>
                                </td>
                                <td className="px-4 py-3 text-center">
                                  <button
                                    onClick={() => setSelectedSlipForAnswers({
                                      slip: s,
                                      streak: currentStreak,
                                      winningsINR: potentialINR,
                                      hasWon: potentialINR > 0
                                    })}
                                    className="px-2.5 py-1 rounded-lg bg-[#FF6B00]/20 hover:bg-[#FF6B00]/35 text-[#FF8800] hover:text-white border border-[#FF6B00]/40 text-[10px] font-sans font-bold transition-all flex items-center gap-1 mx-auto"
                                    title="View full slip answers"
                                  >
                                    <Eye className="w-3 h-3" />
                                    <span>All Answers</span>
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
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

        {/* ========================================================================= */}
        {/* SLIP ANSWERS INSPECTION MODAL: Inspect all Q1 to Q6 answers for a user   */}
        {/* ========================================================================= */}
        {selectedSlipForAnswers && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
            <div className="w-full max-w-2xl bg-[#0D122B] border border-[#1A223E] rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4 max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200">
              {/* Modal Top Header */}
              <div className="flex items-start justify-between pb-3.5 border-b border-[#1A223E] gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#FF6B00]/30 to-[#FF8800]/20 border border-[#FF6B00]/50 text-[#FF8800] flex items-center justify-center font-black text-base font-mono flex-shrink-0 shadow-lg shadow-[#FF6B00]/20">
                    {(selectedSlipForAnswers.slip.userName || 'U')[0].toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base sm:text-lg font-black text-white truncate font-display">
                        {selectedSlipForAnswers.slip.userName || 'SuperOver Fan'}
                      </h3>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${selectedSlipForAnswers.hasWon
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : 'bg-slate-800 text-slate-400'
                        }`}>
                        {selectedSlipForAnswers.hasWon ? `Won ₹${selectedSlipForAnswers.winningsINR} (${selectedSlipForAnswers.multiplier}X)` : 'No Win'}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-slate-400 font-mono mt-0.5">
                      <span>{selectedSlipForAnswers.slip.userPhone || selectedSlipForAnswers.slip.userId || 'N/A'}</span>
                      <span>•</span>
                      <span className="text-slate-500">Slip ID: {selectedSlipForAnswers.slip.id.slice(0, 10)}...</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedSlipForAnswers(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors flex-shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Slip Stats Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-[#080C1D] border border-[#1A223E]">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Total Entry Stake</span>
                  <span className="text-sm font-black text-white font-mono">
                    ₹{selectedSlipForAnswers.slip.totalPayable || ((selectedSlipForAnswers.slip.entryFee || 25) + (selectedSlipForAnswers.slip.freeHit ? (selectedSlipForAnswers.slip.freeHitFee || 10) : 0))}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#080C1D] border border-[#1A223E]">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Free Hit Status</span>
                  <span className={`text-sm font-black font-mono ${selectedSlipForAnswers.slip.freeHit ? 'text-amber-400' : 'text-slate-400'}`}>
                    {selectedSlipForAnswers.slip.freeHit ? `ACTIVE (${selectedSlipForAnswers.slip.wheelMultiplier || 50}X)` : 'NO'}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#080C1D] border border-[#1A223E]">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Consecutive Streak</span>
                  <span className="text-sm font-black text-emerald-400 font-mono">
                    {selectedSlipForAnswers.streak || 0} / {match.questions.length} Correct
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#080C1D] border border-[#1A223E]">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Payout Amount</span>
                  <span className={`text-sm font-black font-mono ${selectedSlipForAnswers.hasWon ? 'text-emerald-400' : 'text-slate-400'}`}>
                    ₹{selectedSlipForAnswers.winningsINR || 0}
                  </span>
                </div>
              </div>

              {/* Match Context Banner */}
              <div className="p-2.5 rounded-xl bg-indigo-950/20 border border-indigo-500/20 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-indigo-400 font-bold">🏏 Fixture:</span>
                  <span className="text-white font-bold">{match.team1?.name || match.team1?.code} vs {match.team2?.name || match.team2?.code}</span>
                  <span className="text-slate-400">({match.series})</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">
                  {selectedSlipForAnswers.slip.submittedAt ? new Date(selectedSlipForAnswers.slip.submittedAt).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' }) : ''}
                </span>
              </div>

              {/* Questions & Answers List */}
              <div className="overflow-y-auto flex-1 space-y-2.5 pr-1 custom-scrollbar">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <span>Submitted Predictions for All {match.questions.length} Questions:</span>
                </h4>

                {match.questions.map((q, idx) => {
                  const userRawAns = getUserAnswerFromSlip(selectedSlipForAnswers.slip.answers, q.id, idx);
                  const userDisplayAns = resolveDisplayName(userRawAns, q.type);

                  const filterVal = funnelFilters[q.id];
                  const officialVal = match.actualResults?.answers?.[q.id];
                  const targetAns = filterVal || (typeof officialVal === 'object' ? (officialVal?.answerText || officialVal?.answerId) : officialVal);

                  let isCorrect: boolean | null = null;
                  if (targetAns) {
                    isCorrect = (userDisplayAns && userDisplayAns.trim().toLowerCase() === String(targetAns).trim().toLowerCase()) ||
                      checkAnswerMatch(userRawAns, String(targetAns), String(targetAns), playerMap);
                  }

                  return (
                    <div
                      key={q.id}
                      className={`p-3.5 rounded-2xl border transition-all ${isCorrect === true
                          ? 'bg-emerald-950/20 border-emerald-500/40'
                          : isCorrect === false
                            ? 'bg-rose-950/15 border-rose-500/30'
                            : 'bg-[#080C1D] border-[#1A223E]'
                        }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-start gap-2.5 min-w-0">
                          <span className="w-6 h-6 rounded-lg bg-[#FF6B00]/20 text-[#FF8800] border border-[#FF6B00]/40 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                            Q{idx + 1}
                          </span>
                          <div className="min-w-0">
                            <h5 className="text-xs font-bold text-white truncate">
                              {q.title}
                            </h5>
                            <span className="text-[10px] text-slate-400 block truncate">
                              {q.subtitle || q.shortTitle}
                            </span>
                          </div>
                        </div>

                        {/* Status indicator */}
                        {isCorrect === true && (
                          <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-black uppercase flex items-center gap-1 shrink-0">
                            <CheckCircle className="w-3 h-3" /> Correct
                          </span>
                        )}
                        {isCorrect === false && (
                          <span className="px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[10px] font-black uppercase flex items-center gap-1 shrink-0">
                            <X className="w-3 h-3" /> Incorrect
                          </span>
                        )}
                        {isCorrect === null && (
                          <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 text-[10px] font-bold uppercase shrink-0">
                            Pending
                          </span>
                        )}
                      </div>

                      {/* Answer details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 pt-2 border-t border-[#131A38] text-xs">
                        <div className="p-2 rounded-xl bg-[#0D122B] border border-[#1A223E]">
                          <span className="text-[10px] text-slate-400 block uppercase font-bold">User's Selected Answer:</span>
                          <span className="text-xs font-black text-amber-400 block mt-0.5 break-words">
                            {userDisplayAns || 'Not Answered'}
                          </span>
                        </div>

                        {targetAns && (
                          <div className="p-2 rounded-xl bg-[#0D122B] border border-[#1A223E]">
                            <span className="text-[10px] text-slate-400 block uppercase font-bold">
                              {match.status === 'COMPLETED' ? 'Official Outcome:' : 'Simulated Target:'}
                            </span>
                            <span className="text-xs font-black text-emerald-400 block mt-0.5 break-words">
                              {String(targetAns)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-[#1A223E]">
                <button
                  onClick={() => copyToClipboard(JSON.stringify(selectedSlipForAnswers.slip, null, 2))}
                  className="px-3 py-2 rounded-xl bg-[#131A38] hover:bg-[#1A223E] text-slate-300 text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                  <span>Copy Raw JSON</span>
                </button>

                <button
                  onClick={() => setSelectedSlipForAnswers(null)}
                  className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors"
                >
                  Close
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
