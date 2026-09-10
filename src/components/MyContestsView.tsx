import React, { useState, useMemo, useEffect } from 'react';
import { 
  Trophy, 
  Clock, 
  Sparkles, 
  ChevronRight,
  ChevronDown,
  Flame, 
  Edit3,
  Folder,
  FolderOpen,
  Layers
} from 'lucide-react';
import { CricketMatch, UserAccount, UserPredictionSlip } from '../types';
import { formatINR, settlePredictionSlip } from '../utils/payoutCalculator';

interface MyContestsViewProps {
  user: UserAccount;
  slips: UserPredictionSlip[];
  matches: CricketMatch[];
  onViewSlipDetails: (match: CricketMatch, slip: UserPredictionSlip) => void;
  onEditSlip?: (match: CricketMatch, slip: UserPredictionSlip) => void;
  onGoToLobby: () => void;
}

interface GroupedMatchContest {
  matchKey: string;
  match: CricketMatch;
  matchTitle: string;
  series: string;
  matchStatus: string;
  slips: UserPredictionSlip[];
  totalStake: number;
  totalWonAmount: number;
  hasWonAny: boolean;
  hasActive: boolean;
  maxPotentialWin: number;
  latestSubmittedAt: string;
}

export const MyContestsView: React.FC<MyContestsViewProps> = ({
  user,
  slips,
  matches,
  onViewSlipDetails,
  onEditSlip,
  onGoToLobby,
}) => {
  const [slipFilter, setSlipFilter] = useState<'ALL' | 'ACTIVE' | 'SETTLED'>('ALL');
  const [expandedMatchKeys, setExpandedMatchKeys] = useState<Set<string>>(new Set());

  const matchMap = useMemo(() => {
    const map = new Map<string, CricketMatch>();
    matches.forEach((m) => {
      if (m.id) map.set(String(m.id), m);
      if ((m as any)._id) map.set(String((m as any)._id), m);
      if ((m as any).apiId) map.set(String((m as any).apiId), m);
      if (m.title) map.set(m.title.toLowerCase().trim(), m);
    });
    return map;
  }, [matches]);

  // User-specific filtering & dynamic settlement calculation
  const currentUserId = (user.id || (user as any)._id || '').toString();
  const userSlips = useMemo(() => {
    return slips
      .filter((s) => {
        if (!currentUserId || currentUserId === 'u_guest') return true;
        const slipUserId = (s.userId || (s as any).user || '').toString();
        return !slipUserId || slipUserId === currentUserId;
      })
      .map((s) => {
        const match = matchMap.get(String(s.matchId)) || (s.matchTitle ? matchMap.get(s.matchTitle.toLowerCase().trim()) : undefined);
        if (match && (match.status === 'COMPLETED' || (match.actualResults?.answers && Object.keys(match.actualResults.answers).length > 0))) {
          if (s.status === 'PENDING' || s.status === 'LIVE' || s.streakCount === undefined) {
            const { settledSlip } = settlePredictionSlip(s, match, match.actualResults || { answers: {} });
            return settledSlip;
          }
        }
        return s;
      });
  }, [slips, currentUserId, matchMap]);

  const filteredSlips = userSlips.filter((s) => {
    if (slipFilter === 'ACTIVE') return s.status === 'PENDING' || s.status === 'LIVE';
    if (slipFilter === 'SETTLED') return s.status === 'WON' || s.status === 'LOST';
    return true;
  });

  // Group user's multiple entries by match folder
  const groupedMatchContests = useMemo(() => {
    const map = new Map<string, GroupedMatchContest>();

    filteredSlips.forEach((slip) => {
      const matchKey = (slip.matchId || slip.matchTitle || 'unknown_match').toString();
      const match = matchMap.get(String(slip.matchId)) || ({
        id: slip.matchId,
        title: slip.matchTitle || 'Contested Match',
        series: slip.series || 'Cricket Contest',
        format: 'T20',
        status: (slip.status === 'WON' || slip.status === 'LOST') ? 'COMPLETED' : 'UPCOMING',
        team1: { name: slip.team1Code || 'Team 1', code: slip.team1Code || 'T1', logo: '' },
        team2: { name: slip.team2Code || 'Team 2', code: slip.team2Code || 'T2', logo: '' },
        venue: 'SuperOver Arena',
        startTime: slip.matchStartTime || slip.submittedAt,
        totalPool: 100000,
        totalEntries: 10,
        entryFee: slip.entryFee || 50,
        questions: [],
        squadTeam1: [],
        squadTeam2: [],
      } as unknown as CricketMatch);

      const stake = slip.totalPayable || (slip.entryFee ? (slip.freeHit ? slip.entryFee + (slip.freeHitFee || 10) : slip.entryFee) : 50);
      const isWon = slip.status === 'WON';
      const isPending = slip.status === 'PENDING' || slip.status === 'LIVE';
      const wonAmt = isWon ? (slip.payoutAmount || 0) : 0;
      const potentialWin = (slip.entryFee || 50) * (slip.wheelMultiplier || 100);

      if (!map.has(matchKey)) {
        map.set(matchKey, {
          matchKey,
          match,
          matchTitle: slip.matchTitle || match.title || 'Cricket Contest',
          series: slip.series || match.series || 'Cricket Contest',
          matchStatus: match.status || 'UPCOMING',
          slips: [],
          totalStake: 0,
          totalWonAmount: 0,
          hasWonAny: false,
          hasActive: false,
          maxPotentialWin: 0,
          latestSubmittedAt: slip.submittedAt || new Date().toISOString()
        });
      }

      const group = map.get(matchKey)!;
      group.slips.push(slip);
      group.totalStake += stake;
      group.totalWonAmount += wonAmt;
      if (isWon) group.hasWonAny = true;
      if (isPending) group.hasActive = true;
      group.maxPotentialWin = Math.max(group.maxPotentialWin, potentialWin);
      if (slip.submittedAt && new Date(slip.submittedAt) > new Date(group.latestSubmittedAt)) {
        group.latestSubmittedAt = slip.submittedAt;
      }
    });

    return Array.from(map.values());
  }, [filteredSlips, matchMap]);

  // Keep expanded states updated
  useEffect(() => {
    setExpandedMatchKeys(new Set(groupedMatchContests.map(g => g.matchKey)));
  }, [groupedMatchContests.length]);

  const toggleMatchExpanded = (key: string) => {
    setExpandedMatchKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const expandAll = () => {
    setExpandedMatchKeys(new Set(groupedMatchContests.map(g => g.matchKey)));
  };

  const collapseAll = () => {
    setExpandedMatchKeys(new Set());
  };

  return (
    <div className="space-y-4">
      {/* Contested Matches Sub-Header & Filters */}
      <div className="flex items-center justify-between gap-3 flex-wrap p-4 rounded-2xl bg-[#0D122B] border border-[#1A223E] shadow-sm">
        <div className="flex items-center gap-2 flex-wrap">
          {[
            { id: 'ALL', label: `All (${userSlips.length} Entries • ${groupedMatchContests.length} Matches)` },
            { id: 'ACTIVE', label: `Active / Live (${userSlips.filter((s) => s.status === 'PENDING' || s.status === 'LIVE').length})` },
            { id: 'SETTLED', label: `Settled (${userSlips.filter((s) => s.status === 'WON' || s.status === 'LOST').length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSlipFilter(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                slipFilter === tab.id
                  ? 'bg-gradient-to-r from-[#FF6B00] to-[#FF8800] text-slate-950 font-black shadow-md shadow-[#FF6B00]/25'
                  : 'bg-[#080C1D] text-slate-300 hover:text-white border border-[#1A223E]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 ml-auto">
          {groupedMatchContests.length > 1 && (
            <div className="flex items-center gap-1 text-xs font-bold">
              <button
                type="button"
                onClick={expandAll}
                className="px-2.5 py-1 rounded-lg bg-[#080C1D] text-slate-300 hover:text-white border border-[#1A223E] transition-colors"
              >
                Expand All
              </button>
              <button
                type="button"
                onClick={collapseAll}
                className="px-2.5 py-1 rounded-lg bg-[#080C1D] text-slate-300 hover:text-white border border-[#1A223E] transition-colors"
              >
                Collapse All
              </button>
            </div>
          )}

          <button
            onClick={onGoToLobby}
            className="text-xs font-black text-[#FF6B00] hover:text-[#FFAA00] flex items-center gap-1 transition-colors"
          >
            <span>+ Predict New Match</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Contested Matches Slips List (Grouped By Match Folders) */}
      {groupedMatchContests.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-[#0D122B] border border-[#1A223E] space-y-4 shadow-xl">
          <div className="w-14 h-14 rounded-2xl bg-[#131A38] text-slate-400 mx-auto flex items-center justify-center">
            <Trophy className="w-7 h-7 text-[#FFAA00]" />
          </div>
          <div>
            <h3 className="text-lg font-black text-white font-display">No Contested Matches</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              You haven't placed any predictions under this filter. Select an upcoming match from the lobby to play!
            </p>
          </div>
          <button
            onClick={onGoToLobby}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#FF8800] text-slate-950 font-black text-xs inline-flex items-center gap-1.5 shadow-lg shadow-[#FF6B00]/25 hover:brightness-110 active:scale-95 transition-all"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>Go to Match Lobby</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {groupedMatchContests.map((group) => {
            const match = group.match;
            const isExpanded = expandedMatchKeys.has(group.matchKey);
            const isCompleted = match?.status === 'COMPLETED' || (!group.hasActive && group.slips.every(s => s.status === 'WON' || s.status === 'LOST'));
            const isLive = match?.status === 'LIVE' || (!isCompleted && group.slips.some(s => s.status === 'LIVE'));

            return (
              <div
                key={group.matchKey}
                className={`rounded-3xl border transition-all overflow-hidden shadow-lg ${
                  group.hasWonAny
                    ? 'bg-gradient-to-b from-[#FF6B00]/10 via-[#0D122B] to-[#0D122B] border-[#FF6B00]/40'
                    : isLive
                    ? 'bg-[#0D122B] border-red-500/40'
                    : 'bg-[#0D122B] border-[#1A223E] hover:border-[#2A355E]'
                }`}
                id={`match-folder-${group.matchKey}`}
              >
                {/* MATCH FOLDER HEADER / PARENT CARD */}
                <div 
                  onClick={() => toggleMatchExpanded(group.matchKey)}
                  className="p-4 sm:p-5 cursor-pointer select-none transition-colors hover:bg-[#131A38]/40"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {/* Left: Series, Status, Folder Badge, Match Title */}
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded bg-[#131A38] text-[#FFAA00] text-[10px] font-extrabold uppercase border border-[#1A223E]">
                          {group.series}
                        </span>

                        {/* Match Status Badge */}
                        {isCompleted ? (
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase border border-emerald-500/30 flex items-center gap-1">
                            MATCH COMPLETED
                          </span>
                        ) : isLive ? (
                          <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 text-[10px] font-black uppercase border border-rose-500/30 flex items-center gap-1 animate-pulse">
                            🔴 LIVE MATCH
                          </span>
                        ) : match?.status === 'LOCKED' ? (
                          <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 text-[10px] font-black uppercase border border-amber-500/30">
                            IN PLAY
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 text-[10px] font-black uppercase border border-sky-500/30">
                            UPCOMING
                          </span>
                        )}

                        {/* Folder Entry Count Badge */}
                        <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-indigo-500/25 to-purple-500/25 text-indigo-300 text-[10px] font-black border border-indigo-500/40 inline-flex items-center gap-1">
                          {isExpanded ? <FolderOpen className="w-3 h-3 text-[#FFAA00]" /> : <Folder className="w-3 h-3 text-[#FFAA00]" />}
                          {group.slips.length} {group.slips.length === 1 ? 'Entry Placed' : 'Entries Placed'}
                        </span>
                      </div>

                      <h3 className="text-lg font-black text-white font-display">
                        {group.matchTitle}
                      </h3>

                      <div className="flex items-center gap-3 text-xs text-slate-400 pt-0.5 flex-wrap">
                        <span className="font-bold text-slate-200">
                          Total Invested: <strong className="text-white">₹{group.totalStake.toLocaleString()}</strong> ({group.slips.length} slips)
                        </span>
                        <span>•</span>
                        <span className="text-slate-400">
                          {new Date(group.latestSubmittedAt).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>

                    {/* Right: Summary & Expand CTA */}
                    <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 pt-3 sm:pt-0 border-[#1A223E]">
                      <div className="text-left sm:text-right">
                        {group.hasWonAny ? (
                          <div>
                            <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-slate-950 text-xs font-black inline-flex items-center gap-1 shadow-md shadow-emerald-500/25">
                              <Trophy className="w-3.5 h-3.5 text-slate-950" />
                              WON TOTAL
                            </span>
                            <span className="text-base font-black text-[#4ADE80] block mt-0.5">
                              +{formatINR(group.totalWonAmount)} Credited
                            </span>
                          </div>
                        ) : group.hasActive ? (
                          <div>
                            <span className="px-2.5 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 text-xs font-bold inline-flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" /> {isLive ? 'In Play / Live' : 'Awaiting Results'}
                            </span>
                            <span className="text-[10px] text-amber-400 font-bold block mt-1">
                              Max Win: {formatINR(group.maxPotentialWin)}
                            </span>
                          </div>
                        ) : (
                          <div>
                            <span className="px-2.5 py-1 rounded-full bg-rose-500/15 text-rose-400 text-xs font-black border border-rose-500/30 inline-flex items-center gap-1">
                              SETTLED: LOST
                            </span>
                            <span className="text-[10px] text-slate-500 block mt-0.5">
                              All {group.slips.length} entries completed
                            </span>
                          </div>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleMatchExpanded(group.matchKey);
                        }}
                        className="px-3.5 py-2 rounded-xl bg-[#131A38] hover:bg-[#1A223E] text-white text-xs font-bold flex items-center gap-1.5 border border-[#1A223E] hover:border-[#FFAA00]/40 transition-all ml-2"
                      >
                        {isExpanded ? <FolderOpen className="w-3.5 h-3.5 text-[#FFAA00]" /> : <Folder className="w-3.5 h-3.5 text-[#FFAA00]" />}
                        <span>{isExpanded ? 'Collapse' : `View ${group.slips.length} Slips`}</span>
                        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isExpanded ? 'rotate-180 text-white' : ''}`} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* EXPANDED INDIVIDUAL SLIPS ACCORDION (1 Folder Per Match) */}
                {isExpanded && (
                  <div className="p-4 sm:p-5 pt-0 border-t border-[#1A223E]/80 space-y-3 bg-[#080C1D]/60 animate-in fade-in duration-150">
                    <div className="flex items-center justify-between text-xs text-slate-400 font-bold px-1 pt-3 pb-1 border-b border-[#1A223E]">
                      <span className="flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-[#FFAA00]" />
                        <span>Individual Entries for this Match ({group.slips.length})</span>
                      </span>
                      <span className="text-[11px] text-slate-500">Click inspect on any slip to check your predictions</span>
                    </div>

                    {group.slips.map((slip, slipIdx) => {
                      const isSlipWon = slip.status === 'WON';
                      const isSlipPending = slip.status === 'PENDING' || slip.status === 'LIVE';

                      return (
                        <div
                          key={slip.id}
                          className={`p-4 rounded-2xl border transition-all ${
                            isSlipWon
                              ? 'bg-[#0D122B] border-emerald-500/40 shadow-sm'
                              : isSlipPending
                              ? 'bg-[#0D122B] border-[#1A223E]'
                              : 'bg-[#070A18] border-[#1A223E]/60'
                          }`}
                          id={`slip-card-${slip.id}`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            {/* Left: Entry Number, Slip ID, Paid stake */}
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-black border border-indigo-500/30">
                                  Entry #{slipIdx + 1}
                                </span>
                                <span className="text-[11px] text-slate-300 font-mono font-bold">
                                  Slip #{slip.id.slice(-6).toUpperCase()}
                                </span>
                                <span className="text-slate-600">•</span>
                                <span className="text-[11px] text-slate-400">
                                  {new Date(slip.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>

                              <div className="flex items-center gap-2 text-xs text-slate-400 pt-0.5 flex-wrap">
                                <span className="font-bold text-slate-200">
                                  {slip.freeHit || (slip.totalPayable && slip.totalPayable > slip.entryFee) ? (
                                    <>
                                      Paid: <strong className="text-white">{formatINR(slip.totalPayable || (slip.entryFee + (slip.freeHitFee || 10)))}</strong>
                                      <span className="text-[10px] text-amber-400 font-semibold ml-1">
                                        ({formatINR(slip.entryFee)} + {formatINR(slip.freeHitFee || (slip.totalPayable ? slip.totalPayable - slip.entryFee : 10))} Spin)
                                      </span>
                                    </>
                                  ) : (
                                    <>Entry Fee: <strong className="text-white">{formatINR(slip.entryFee)}</strong></>
                                  )}
                                </span>
                                <span>•</span>
                                <span className="text-slate-400">6 Questions Predicted</span>
                              </div>
                            </div>

                            {/* Right: Outcome status & CTAs */}
                            <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 pt-2.5 sm:pt-0 border-[#1A223E]">
                              <div className="text-left sm:text-right">
                                {isSlipPending ? (
                                  <div>
                                    <span className="text-xs font-bold text-slate-300 block">
                                      Max Win: {formatINR(slip.entryFee * (slip.wheelMultiplier || 100))} ({slip.wheelMultiplier || 100}X)
                                    </span>
                                  </div>
                                ) : isSlipWon ? (
                                  <div>
                                    <span className="text-xs font-black text-[#4ADE80] block">
                                      +{formatINR(slip.payoutAmount || 0)} Credited ({slip.multiplierWon}X)
                                    </span>
                                    <span className="text-[10px] text-slate-400 block font-mono">
                                      {slip.streakCount ?? 0}/6 Streak ({slip.correctCount ?? 0} Correct)
                                    </span>
                                  </div>
                                ) : (
                                  <div>
                                    <span className="text-xs text-rose-400 font-bold block">
                                      No Win ({slip.streakCount ?? 0}/6 Streak)
                                    </span>
                                  </div>
                                )}
                              </div>

                              <div className="flex items-center gap-2">
                                {/* Swap Players / Edit Lineup strictly before match start */}
                                {isSlipPending && match?.status === 'UPCOMING' && new Date(match.startTime || (match as any).matchStartTime || 0).getTime() > Date.now() && onEditSlip && (
                                  <button
                                    onClick={() => onEditSlip(match, slip)}
                                    className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#FF8800] hover:brightness-110 text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-md shadow-[#FF6B00]/25 transition-all"
                                    id={`btn-edit-slip-${slip.id}`}
                                  >
                                    <Edit3 className="w-3.5 h-3.5" />
                                    <span>Swap Players</span>
                                  </button>
                                )}

                                {/* View Picks Details CTA */}
                                {match && (
                                  <button
                                    onClick={() => onViewSlipDetails(match, slip)}
                                    className="px-3 py-1.5 rounded-xl bg-[#131A38] hover:bg-[#1A223E] text-white text-xs font-bold flex items-center gap-1 border border-[#1A223E] hover:border-[#FF6B00]/40 transition-all"
                                    id={`btn-view-slip-${slip.id}`}
                                  >
                                    <span>Inspect Picks</span>
                                    <ChevronRight className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

