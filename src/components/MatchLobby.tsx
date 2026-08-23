import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Clock, 
  MapPin, 
  Users, 
  Flame, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Filter, 
  Lock, 
  Calendar,
  AlertCircle
} from 'lucide-react';
import { CricketMatch, MatchStatus, UserPredictionSlip } from '../types';
import { formatINR } from '../utils/payoutCalculator';

interface MatchLobbyProps {
  matches: CricketMatch[];
  userSlips: UserPredictionSlip[];
  onSelectMatchToPlay: (match: CricketMatch, fee?: number) => void;
  onViewMatchResult: (match: CricketMatch, slip?: UserPredictionSlip) => void;
}

export const MatchLobby: React.FC<MatchLobbyProps> = ({
  matches,
  userSlips,
  onSelectMatchToPlay,
  onViewMatchResult,
}) => {
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'IPL' | 'INTL' | 'UPCOMING' | 'COMPLETED'>('ALL');
  const [now, setNow] = useState<Date>(new Date());

  // Update clock every second for precise countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredMatches = matches.filter((m) => {
    if (activeFilter === 'IPL') return m.series.includes('IPL');
    if (activeFilter === 'INTL') return m.series.includes('ICC') || m.series.includes('Championship');
    if (activeFilter === 'UPCOMING') return m.status === 'UPCOMING';
    if (activeFilter === 'COMPLETED') return m.status === 'COMPLETED';
    return true;
  });

  const getCountdownString = (startTimeIso: string, lockTimeIso: string, status: MatchStatus) => {
    if (status === 'COMPLETED') return 'Match Ended & Settled';
    if (status === 'LOCKED' || status === 'LIVE') return 'Submissions Locked • Match Live';

    const lockDate = new Date(lockTimeIso).getTime();
    const diffMs = lockDate - now.getTime();

    if (diffMs <= 0) {
      return 'Locking now...';
    }

    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const diffSecs = Math.floor((diffMs % (1000 * 60)) / 1000);

    if (diffHrs > 24) {
      const days = Math.floor(diffHrs / 24);
      return `Locks in ${days}d ${diffHrs % 24}h`;
    }

    return `Locks in ${String(diffHrs).padStart(2, '0')}h ${String(diffMins).padStart(2, '0')}m ${String(diffSecs).padStart(2, '0')}s`;
  };

  return (
    <div className="space-y-6">
      {/* Header & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display flex items-center gap-2.5">
            <Flame className="w-6 h-6 text-[#FF6B00] fill-[#FF6B00]" />
            Match Lobby
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Pick an upcoming match, choose your entry fee, and select the 6 key match stats.
          </p>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {[
            { id: 'ALL', label: 'All Matches' },
            { id: 'IPL', label: 'IPL 2026' },
            { id: 'INTL', label: 'International' },
            { id: 'UPCOMING', label: 'Upcoming' },
            { id: 'COMPLETED', label: 'Settled & Results' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeFilter === tab.id
                  ? 'bg-gradient-to-r from-[#FF6B00] to-[#FF8800] text-white shadow-md shadow-[#FF6B00]/30'
                  : 'bg-[#0D122B] text-slate-300 hover:bg-[#131A38] border border-[#1A223E]'
              }`}
              id={`filter-tab-${tab.id.toLowerCase()}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Match Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredMatches.map((match) => {
          const userSlipsForMatch = userSlips.filter((s) => s.matchId === match.id);
          const hasUserEntered = userSlipsForMatch.length > 0;
          const isLocked = match.status === 'LOCKED' || match.status === 'LIVE';
          const isCompleted = match.status === 'COMPLETED';

          return (
            <div
              key={match.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden flex flex-col justify-between ${
                match.isFeatured
                  ? 'bg-gradient-to-b from-[#0D122B] to-[#080B1A] border-[#FF6B00]/35 shadow-xl shadow-black/40 hover:border-[#FF6B00]/70'
                  : 'bg-[#0D122B]/90 border-[#1A223E] hover:border-[#253058] shadow-lg shadow-black/30'
              }`}
              id={`match-card-${match.id}`}
            >
              {/* Card Top Banner: Series & Countdown */}
              <div>
                <div className="px-4 py-2.5 bg-[#080C1D] border-b border-[#1A223E] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 truncate">
                    <span className="px-1.5 py-0.5 rounded bg-[#131A38] text-[#FF6B00] font-black text-[10px] uppercase border border-[#FF6B00]/20">
                      {match.format}
                    </span>
                    <span className="font-bold text-slate-200 truncate max-w-[140px] sm:max-w-[180px]">
                      {match.series}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs">
                    {isCompleted ? (
                      <span className="px-2 py-0.5 rounded-full bg-[#131A38] text-slate-300 font-bold text-[11px] flex items-center gap-1 border border-[#1A223E]">
                        <CheckCircle2 className="w-3 h-3 text-[#4ADE80]" /> Settled
                      </span>
                    ) : isLocked ? (
                      <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 font-bold text-[11px] flex items-center gap-1 animate-pulse">
                        <Lock className="w-3 h-3" /> Locked
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-[#FF6B00]/15 text-[#FFAA00] border border-[#FF6B00]/30 font-bold text-[11px] flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#FF6B00]" />
                        {getCountdownString(match.startTime, match.lockTime, match.status)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Team Clash Banner */}
                <div className="p-5">
                  <div className="flex items-center justify-between gap-4">
                    {/* Team 1 */}
                    <div className="flex-1 flex flex-col items-center text-center">
                      <div 
                        className="w-14 h-14 rounded-2xl p-1 flex items-center justify-center text-2xl shadow-inner relative border"
                        style={{ backgroundColor: `${match.team1.color}20`, borderColor: match.team1.color }}
                      >
                        <span className="filter drop-shadow">{match.team1.flagOrLogo}</span>
                        <div 
                          className="absolute -bottom-1 text-[9px] font-black px-1.5 py-0.2 rounded text-white shadow-sm"
                          style={{ backgroundColor: match.team1.color }}
                        >
                          {match.team1.code}
                        </div>
                      </div>
                      <span className="text-xs font-bold text-white mt-2 line-clamp-1">
                        {match.team1.name}
                      </span>
                    </div>

                    {/* VS Badge */}
                    <div className="flex flex-col items-center">
                      <span className="w-8 h-8 rounded-full bg-[#131A38] border border-[#1A223E] text-slate-400 text-xs font-black flex items-center justify-center shadow-md">
                        VS
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium mt-1">
                        {new Date(match.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    {/* Team 2 */}
                    <div className="flex-1 flex flex-col items-center text-center">
                      <div 
                        className="w-14 h-14 rounded-2xl p-1 flex items-center justify-center text-2xl shadow-inner relative border"
                        style={{ backgroundColor: `${match.team2.color}20`, borderColor: match.team2.color }}
                      >
                        <span className="filter drop-shadow">{match.team2.flagOrLogo}</span>
                        <div 
                          className="absolute -bottom-1 text-[9px] font-black px-1.5 py-0.2 rounded text-white shadow-sm"
                          style={{ backgroundColor: match.team2.color }}
                        >
                          {match.team2.code}
                        </div>
                      </div>
                      <span className="text-xs font-bold text-white mt-2 line-clamp-1">
                        {match.team2.name}
                      </span>
                    </div>
                  </div>

                  {/* Venue & Pool stats */}
                  <div className="mt-4 pt-3 border-t border-[#1A223E] flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-1 text-[11px] truncate max-w-[170px]">
                      <MapPin className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                      <span className="truncate">{match.venue}, {match.city}</span>
                    </div>

                    <div className="flex items-center gap-1 font-bold text-slate-300">
                      <Users className="w-3.5 h-3.5 text-[#FF6B00]" />
                      <span>{match.totalEntries.toLocaleString()} entries</span>
                    </div>
                  </div>

                  {/* User already submitted badge */}
                  {hasUserEntered && (
                    <div className="mt-3 px-3 py-1.5 rounded-lg bg-[#4ADE80]/10 border border-[#4ADE80]/30 flex items-center justify-between text-xs">
                      <span className="text-[#4ADE80] font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {userSlipsForMatch.length} Slip{userSlipsForMatch.length > 1 ? 's' : ''} Submitted
                      </span>
                      {isCompleted && (
                        <span className="text-[#FFAA00] font-black">
                          {userSlipsForMatch[0].status === 'WON' 
                            ? `Won ${formatINR(userSlipsForMatch[0].payoutAmount || 0)} (${userSlipsForMatch[0].multiplierWon}X)` 
                            : '0 / Payout'}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Actions & Entry Tiers */}
              <div className="p-4 bg-[#080C1D] border-t border-[#1A223E]">
                {isCompleted ? (
                  <button
                    onClick={() => onViewMatchResult(match, userSlipsForMatch[0])}
                    className="w-full py-2.5 rounded-xl bg-[#131A38] hover:bg-[#1A223E] text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-all border border-[#1A223E] hover:border-[#253058] shadow"
                    id={`btn-view-results-${match.id}`}
                  >
                    <span>View Official Results & Slips</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : isLocked ? (
                  <button
                    onClick={() => onViewMatchResult(match, userSlipsForMatch[0])}
                    className="w-full py-2.5 rounded-xl bg-[#131A38] text-slate-400 font-bold text-xs flex items-center justify-center gap-1.5 cursor-not-allowed border border-[#1A223E]"
                    disabled
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Auto locks 1 minute before scheduled time</span>
                  </button>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-slate-400 font-semibold">Choose Entry:</span>
                      <div className="flex items-center gap-1.5">
                        {match.entryFees.map((fee) => (
                          <button
                            key={fee}
                            onClick={() => onSelectMatchToPlay(match, fee)}
                            className="px-2.5 py-1 rounded-lg bg-[#0D122B] hover:bg-[#FF6B00]/20 text-slate-200 hover:text-[#FFAA00] text-xs font-black border border-[#1A223E] hover:border-[#FF6B00]/50 transition-colors"
                            title={`Play with ₹${fee} entry to gain up to 500X rewards`}
                          >
                            ₹{fee}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectMatchToPlay(match, 25)}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#FF6B00] via-[#FF8800] to-[#FFAA00] hover:brightness-110 active:scale-[0.99] text-white font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-[#FF6B00]/30"
                      id={`btn-play-match-${match.id}`}
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Crack 6 Stats (Gain up to 500X)</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
