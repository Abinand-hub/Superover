import React, { useState } from 'react';
import { 
  Trophy, 
  Clock, 
  Sparkles, 
  ChevronRight,
  Flame, 
  Edit3
} from 'lucide-react';
import { CricketMatch, UserAccount, UserPredictionSlip } from '../types';
import { formatINR } from '../utils/payoutCalculator';

interface MyContestsViewProps {
  user: UserAccount;
  slips: UserPredictionSlip[];
  matches: CricketMatch[];
  onViewSlipDetails: (match: CricketMatch, slip: UserPredictionSlip) => void;
  onEditSlip?: (match: CricketMatch, slip: UserPredictionSlip) => void;
  onGoToLobby: () => void;
}

export const MyContestsView: React.FC<MyContestsViewProps> = ({
  user,
  slips,
  matches,
  onViewSlipDetails,
  onEditSlip,
  onGoToLobby,
}) => {
  const [slipFilter, setSlipFilter] = useState<'ALL' | 'ACTIVE' | 'WON' | 'COMPLETED'>('ALL');

  const matchMap = new Map(matches.map((m) => [m.id, m]));

  // User-specific filtering
  const currentUserId = (user.id || (user as any)._id || '').toString();
  const userSlips = slips.filter((s) => {
    if (!currentUserId || currentUserId === 'u_guest') return true;
    const slipUserId = (s.userId || (s as any).user || '').toString();
    return !slipUserId || slipUserId === currentUserId;
  });

  const filteredSlips = userSlips.filter((s) => {
    if (slipFilter === 'ACTIVE') return s.status === 'PENDING' || s.status === 'LIVE';
    if (slipFilter === 'WON') return s.status === 'WON';
    if (slipFilter === 'COMPLETED') return s.status === 'WON' || s.status === 'LOST';
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Contested Matches Sub-Header & Filters */}
      <div className="flex items-center justify-between gap-3 flex-wrap p-4 rounded-2xl bg-[#0D122B] border border-[#1A223E] shadow-sm">
        <div className="flex items-center gap-2 flex-wrap">
          {[
            { id: 'ALL', label: `All (${userSlips.length})` },
            { id: 'ACTIVE', label: `Active / Live (${userSlips.filter((s) => s.status === 'PENDING' || s.status === 'LIVE').length})` },
            { id: 'WON', label: `Won Cash (${userSlips.filter((s) => s.status === 'WON').length})` },
            { id: 'COMPLETED', label: `Settled (${userSlips.filter((s) => s.status === 'WON' || s.status === 'LOST').length})` },
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

        <button
          onClick={onGoToLobby}
          className="text-xs font-black text-[#FF6B00] hover:text-[#FFAA00] flex items-center gap-1 transition-colors ml-auto"
        >
          <span>+ Predict New Match</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Contested Matches Slips List */}
      {filteredSlips.length === 0 ? (
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
        <div className="space-y-3.5">
          {filteredSlips.map((slip) => {
            const match = matchMap.get(slip.matchId);
            const isWon = slip.status === 'WON';
            const isPending = slip.status === 'PENDING' || slip.status === 'LIVE';

            return (
              <div
                key={slip.id}
                className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                  isWon
                    ? 'bg-gradient-to-r from-[#FF6B00]/10 via-[#0D122B] to-[#0D122B] border-[#FF6B00]/40 shadow-lg'
                    : isPending
                    ? 'bg-[#0D122B] border-[#1A223E] hover:border-[#2A355E]'
                    : 'bg-[#080C1D] border-[#1A223E]/80'
                }`}
                id={`slip-card-${slip.id}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Left: Match info & timing */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-0.5 rounded bg-[#131A38] text-[#FFAA00] text-[10px] font-extrabold uppercase border border-[#1A223E]">
                        {slip.series}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Slip #{slip.id.slice(-6).toUpperCase()}
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="text-[11px] text-slate-400">
                        {new Date(slip.submittedAt).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    <h3 className="text-base font-extrabold text-white font-display">
                      {slip.matchTitle}
                    </h3>

                    <div className="flex items-center gap-3 text-xs text-slate-400 pt-0.5">
                      <span className="font-bold text-slate-200">
                        Entry Fee: {formatINR(slip.entryFee)}
                      </span>
                      <span>•</span>
                      <span className="text-slate-400">6 Stats Predicted</span>
                    </div>
                  </div>

                  {/* Right: Status & Payout result */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 pt-3 sm:pt-0 border-[#1A223E]">
                    <div className="text-left sm:text-right">
                      {isPending ? (
                        <div>
                          {match?.status === 'LIVE' ? (
                            <span className="px-2.5 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-black inline-flex items-center gap-1.5 shadow-sm animate-pulse">
                              <Flame className="w-3.5 h-3.5" /> MATCH IS LIVE
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 text-xs font-bold inline-flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" /> Awaiting Results
                            </span>
                          )}
                          <span className="text-[10px] text-slate-400 block mt-1">
                            Max Win: {formatINR(slip.entryFee * 100)} (100X)
                          </span>
                        </div>
                      ) : isWon ? (
                        <div>
                          <span className="px-2.5 py-1 rounded-full bg-[#FF6B00] text-slate-950 text-xs font-black inline-flex items-center gap-1 shadow-sm">
                            <Trophy className="w-3.5 h-3.5 text-slate-950" />
                            {slip.multiplierWon}X Cash Won ({slip.correctCount}/6 Correct)
                          </span>
                          <span className="text-base font-black text-[#4ADE80] block mt-0.5">
                            +{formatINR(slip.payoutAmount || 0)} Credited
                          </span>
                        </div>
                      ) : (
                        <div>
                          <span className="px-2.5 py-1 rounded-full bg-[#131A38] text-slate-400 text-xs font-bold border border-[#1A223E]">
                            {slip.correctCount ?? 0}/6 Correct
                          </span>
                          <span className="text-[10px] text-slate-500 block mt-0.5">
                            No Payout (Min 3 needed)
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Swap Players / Edit Lineup strictly before match start */}
                      {isPending && match?.status === 'UPCOMING' && new Date(match.startTime || (match as any).matchStartTime || 0).getTime() > Date.now() && onEditSlip && (
                        <button
                          onClick={() => onEditSlip(match, slip)}
                          className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#FF8800] hover:brightness-110 text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-md shadow-[#FF6B00]/25 transition-all"
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
                          className="px-3.5 py-2 rounded-xl bg-[#131A38] hover:bg-[#1A223E] text-white text-xs font-bold flex items-center gap-1 border border-[#1A223E] hover:border-[#FF6B00]/40 transition-all"
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
};
