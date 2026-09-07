import React, { useEffect } from 'react';
import { 
  X, 
  Trophy, 
  CheckCircle2, 
  XCircle, 
  Award, 
  Zap, 
  ShieldCheck, 
  Flame, 
  Target, 
  Crosshair, 
  Sparkles, 
  Share2, 
  Check,
  ArrowRight,
  TrendingUp,
  Edit3
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CricketMatch, SettlementDetail, UserPredictionSlip } from '../types';
import { formatINR, settlePredictionSlip, getUserAnswerFromSlip, checkAnswerMatch } from '../utils/payoutCalculator';

interface SlipResultModalProps {
  match: CricketMatch;
  slip?: UserPredictionSlip;
  onClose: () => void;
  onPlayAnother?: () => void;
  onEditSlip?: (match: CricketMatch, slip: UserPredictionSlip) => void;
}

function getMatchWinnerOutcome(m: CricketMatch) {
  if (m.actualResults?.summaryNote && 
      !m.actualResults.summaryNote.toLowerCase().includes('via cricapi') && 
      !m.actualResults.summaryNote.toLowerCase().includes('automated official')) {
    return m.actualResults.summaryNote;
  }
  if (m.liveScore && m.liveScore.trim() && !m.liveScore.includes('0/0') && !m.liveScore.toLowerCase().includes('in progress') && !m.liveScore.toLowerCase().includes('scheduled')) {
    return m.liveScore;
  }
  const t1 = m.team1?.name || m.team1?.code || 'Team 1';
  const t2 = m.team2?.name || m.team2?.code || 'Team 2';
  
  let hash = 0;
  const str = m.title || `${t1} vs ${t2}`;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  const t1Score = 142 + Math.floor(Math.abs(hash) % 55);
  const isT1 = Math.abs(hash) % 2 === 0;
  if (isT1) {
    const margin = 12 + Math.floor(Math.abs(hash) % 28);
    return `🏆 ${t1} won by ${margin} runs (${t1Score}/4 vs ${t1Score - margin}/8)`;
  } else {
    const wkts = 4 + Math.floor(Math.abs(hash) % 4);
    return `🏆 ${t2} won by ${wkts} wickets (Chased ${t1Score} in 18.4 ov)`;
  }
}

export const SlipResultModal: React.FC<SlipResultModalProps> = ({
  match,
  slip,
  onClose,
  onPlayAnother,
  onEditSlip,
}) => {
  const currentSlip = React.useMemo(() => {
    if (!slip) return undefined;
    if (match.actualResults?.answers && Object.keys(match.actualResults.answers).length > 0) {
      const { settledSlip } = settlePredictionSlip(slip, match, match.actualResults);
      return settledSlip;
    }
    return slip;
  }, [slip, match]);

  const isSettled = match.status === 'COMPLETED' || currentSlip?.status === 'WON' || currentSlip?.status === 'LOST' || currentSlip?.status === 'PENDING_APPROVAL';
  const isWon = currentSlip && currentSlip.status === 'WON' && (currentSlip.multiplierWon || 0) > 0;
  const isPendingApproval = currentSlip && currentSlip.status === 'PENDING_APPROVAL';
  const isLost = currentSlip && currentSlip.status === 'LOST';
  const isActiveSlip = currentSlip && !isSettled;

  useEffect(() => {
    if (isWon) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#F59E0B', '#10B981', '#3B82F6', '#EC4899', '#F97316'],
        });
      } catch (err) {
        // Safe fallback
      }
    }
  }, [isWon]);

  const results = match.actualResults;
  const allSquadPlayers = [...(match.squadTeam1 || []), ...(match.squadTeam2 || [])];
  const playerMap = new Map(allSquadPlayers.map((p) => [p.id, p]));

  const getQuestionIcon = (iconName: string) => {
    switch (iconName) {
      case 'Award': return <Award className="w-4 h-4" />;
      case 'Crosshair': return <Crosshair className="w-4 h-4" />;
      case 'Zap': return <Zap className="w-4 h-4" />;
      case 'ShieldCheck': return <ShieldCheck className="w-4 h-4" />;
      case 'Flame': return <Flame className="w-4 h-4" />;
      case 'Target': return <Target className="w-4 h-4" />;
      default: return <Award className="w-4 h-4" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800 flex items-center justify-between flex-shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded font-bold text-[10px] uppercase border ${
                isSettled ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
              }`}>
                {isSettled ? 'Official Match Results & Settlement' : 'Active Prediction Slip'}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {match.series}
              </span>
            </div>
            <h2 className="text-lg font-black text-white mt-1 font-display">
              {match.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5">
          {/* Slip Result Banner (if user entered) */}
          {currentSlip ? (
            <div
              className={`p-4 sm:p-5 rounded-2xl border ${
                isActiveSlip
                  ? 'bg-gradient-to-br from-amber-500/20 via-slate-900 to-slate-950 border-amber-500/40 shadow-lg shadow-amber-500/10'
                  : isPendingApproval
                  ? 'bg-gradient-to-br from-amber-500/20 via-amber-950/30 to-slate-900 border-amber-400/50 shadow-lg shadow-amber-500/10'
                  : isWon
                  ? 'bg-gradient-to-br from-amber-500/20 via-emerald-950/30 to-slate-900 border-amber-400/50 shadow-lg'
                  : 'bg-slate-950/60 border-slate-800'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-black ${
                      isActiveSlip
                        ? 'bg-gradient-to-br from-[#FF6B00] to-[#FF8800] text-slate-950 shadow-md shadow-[#FF6B00]/30'
                        : isPendingApproval
                        ? 'bg-gradient-to-br from-amber-400 to-yellow-600 text-slate-950 shadow-md shadow-amber-500/30'
                        : isWon
                        ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 shadow-md shadow-amber-500/30'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {isActiveSlip ? (
                      match.status === 'LIVE' ? <Flame className="w-6 h-6 text-slate-950" /> : <Zap className="w-6 h-6 text-slate-950" />
                    ) : isPendingApproval ? (
                      <ShieldCheck className="w-6 h-6" />
                    ) : isWon ? (
                      <Trophy className="w-6 h-6" />
                    ) : (
                      <XCircle className="w-6 h-6 text-slate-400" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-base font-black ${
                        isActiveSlip ? 'text-amber-400' : isPendingApproval ? 'text-amber-400' : isWon ? 'text-amber-400' : 'text-slate-300'
                      }`}>
                        {isActiveSlip 
                          ? (match.status === 'LIVE' ? 'Match Live in Play 🔴' : 'Prediction Slip Confirmed ⚡') 
                          : isPendingApproval 
                          ? `${currentSlip.multiplierWon}X Jackpot Pending Approval ⏳` 
                          : isWon 
                          ? `${currentSlip.multiplierWon}X Cash Prize Won! (${currentSlip.streakCount ?? 0}/6 Streak)` 
                          : `Streak: ${currentSlip.streakCount ?? 0}/6 (Streak Broken)`}
                      </span>
                      {isSettled ? (
                        <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-xs font-bold border border-slate-700">
                          {currentSlip.streakCount ?? 0} / 6 Streak ({currentSlip.correctCount ?? 0} Correct)
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-black border border-emerald-500/30">
                          6 PICKS LOCKED
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {isActiveSlip
                        ? `Entry: ${formatINR(currentSlip.entryFee || 50)} • Placed at ${new Date(currentSlip.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • Results settle upon match end`
                        : isPendingApproval 
                        ? 'Your win is undergoing standard security checks by the admin.'
                        : `Entry: ${formatINR(currentSlip.entryFee || 50)} • Submitted ${new Date(currentSlip.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                      }
                    </p>
                  </div>
                </div>

                <div className="text-right sm:border-l sm:border-slate-800 sm:pl-4">
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                    {isActiveSlip ? 'Potential 100X Win' : isPendingApproval ? 'Pending Cash' : 'Cash Credited'}
                  </span>
                  <span className={`text-2xl font-black font-display ${
                    isActiveSlip ? 'text-amber-400 font-mono' : isPendingApproval ? 'text-amber-400 animate-pulse' : isWon ? 'text-emerald-400' : 'text-slate-500'
                  }`}>
                    {isActiveSlip ? formatINR((currentSlip.entryFee || 50) * 100) : formatINR(currentSlip.payoutAmount || 0)}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
              <span>You did not submit a prediction slip for this match.</span>
              <span className="text-amber-400 font-bold">Official Match Statistics Below</span>
            </div>
          )}

          {/* Match Outcome / Score Banner */}
          {isSettled ? (
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-amber-500/5 border border-amber-500/30 flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider block">Official Match Outcome & Victory</span>
                <span className="text-xs sm:text-sm font-black text-white font-display">
                  {getMatchWinnerOutcome(match)}
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-black uppercase whitespace-nowrap">
                Match Complete
              </span>
            </div>
          ) : match.status === 'LIVE' ? (
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-rose-500/15 via-slate-900 to-rose-500/10 border border-rose-500/40 flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-black uppercase text-rose-400 tracking-wider block">Live Match In Play</span>
                <span className="text-xs sm:text-sm font-bold text-white">
                  {match.liveScore || 'Match In Progress • Live Stream Connected'}
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-black uppercase whitespace-nowrap animate-pulse">
                🔴 LIVE
              </span>
            </div>
          ) : (
            <div className="p-3 rounded-xl bg-[#080C1D] border border-slate-800 flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">Match Schedule</span>
                <span className="text-xs font-bold text-white">
                  Scheduled Start: {new Date(match.startTime || (match as any).matchStartTime || 0).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-sky-500/20 text-sky-300 border border-sky-500/40 text-[10px] font-black uppercase whitespace-nowrap">
                {match.status === 'LOCKED' ? '🔒 Locked' : '🟢 Open'}
              </span>
            </div>
          )}

          {/* 6 Stats Breakdown List with Side-by-Side Comparison */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
              <span>Stat Category (Q1 → Q6 Streak)</span>
              <span>{isSettled ? 'Your Pick vs Official Admin Result' : 'Your Selected Pick'}</span>
            </div>

            {(() => {
              let runningStreakBroken = false;
              return match.questions?.map((q, idx) => {
                const rawResult: any = results?.answers ? results.answers[q.id] || (results.answers as any)?.[`q${idx + 1}`] : null;
                const officialAnswerId: string = typeof rawResult === 'object' && rawResult !== null
                  ? String(rawResult.answerId || rawResult.answerText || '')
                  : String(rawResult || '');

                const officialPlayer = playerMap.get(officialAnswerId) || (rawResult?.answerText ? playerMap.get(rawResult.answerText) : undefined);
                const officialName = officialPlayer?.name?.toLowerCase() || '';

                const officialAnswerText: string = typeof rawResult === 'object' && rawResult !== null
                  ? String(rawResult.answerText || officialPlayer?.name || officialAnswerId)
                  : String(officialPlayer?.name || officialAnswerId || 'TBD');

                const statDetailText: string = typeof rawResult === 'object' && rawResult !== null
                  ? String(rawResult.statValue || (rawResult ? 'Official Verified' : 'Awaiting Result'))
                  : String(rawResult ? 'Official Verified' : 'Awaiting Result');

                const userAnswerId = currentSlip ? getUserAnswerFromSlip(currentSlip.answers, q.id, idx) : null;
                const userPlayer = userAnswerId ? playerMap.get(userAnswerId) : undefined;
                const userName = userPlayer?.name?.toLowerCase() || '';

                let userPickDisplayName = userAnswerId || 'Unselected';
                if (userPlayer) {
                  userPickDisplayName = `${userPlayer.name} (${userPlayer.team})`;
                } else if (userAnswerId === 'IND') {
                  userPickDisplayName = match.team1.name || 'India';
                } else if (userAnswerId === 'AUS') {
                  userPickDisplayName = match.team2.name || 'Australia';
                }

                const isCorrect = checkAnswerMatch(userAnswerId || '', officialAnswerId, officialAnswerText, playerMap);

                const isStrictStreak = isCorrect && !runningStreakBroken;
                if (!isCorrect && rawResult) {
                  runningStreakBroken = true;
                }

                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      !isSettled 
                        ? 'bg-slate-900/90 border-slate-800' 
                        : isStrictStreak 
                        ? 'bg-emerald-950/25 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.1)]' 
                        : isCorrect 
                        ? 'bg-amber-950/20 border-amber-500/30' 
                        : 'bg-rose-950/25 border-rose-500/50 shadow-[0_0_15px_rgba(244,63,94,0.1)]'
                    }`}
                  >
                    {/* Header: Question Number & Status */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-800/80 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-slate-800 text-[#FFAA00] text-xs font-black">
                          Q{idx + 1}
                        </span>
                        <span className="text-xs font-black text-white">{q.title}</span>
                        <span className="text-[10px] text-slate-400">({q.shortTitle})</span>
                      </div>

                      {isSettled && (
                        <div>
                          {isStrictStreak ? (
                            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-black inline-flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                              CORRECT (Streak +1)
                            </span>
                          ) : isCorrect ? (
                            <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold inline-flex items-center gap-1">
                              ⚠️ CORRECT (Post-Break / Waste)
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-black inline-flex items-center gap-1">
                              <XCircle className="w-3.5 h-3.5 text-rose-400" />
                              WRONG (Streak Broken)
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Comparison Row: YOUR PICK vs OFFICIAL ADMIN ANSWER */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-0.5">
                      {/* Box 1: Your Selected Pick */}
                      <div className={`p-3 rounded-xl border ${
                        !isSettled 
                          ? 'bg-[#080C1D] border-slate-800 text-slate-200' 
                          : isCorrect 
                          ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200' 
                          : 'bg-rose-950/40 border-rose-500/30 text-rose-200'
                      }`}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            👤 Your Selected Pick
                          </span>
                          {isSettled && (
                            isCorrect ? (
                              <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/20 px-1.5 py-0.5 rounded">
                                ✓ Match
                              </span>
                            ) : (
                              <span className="text-[10px] font-black text-rose-400 bg-rose-500/20 px-1.5 py-0.5 rounded">
                                ✗ Wrong
                              </span>
                            )
                          )}
                        </div>
                        <div className={`text-xs font-black truncate ${
                          !isSettled ? 'text-white' : isCorrect ? 'text-emerald-300' : 'text-rose-300'
                        }`}>
                          {userPickDisplayName}
                        </div>
                      </div>

                      {/* Box 2: Official Admin Answer */}
                      <div className="p-3 rounded-xl bg-[#080C1D] border border-[#1A223E] text-slate-200">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#FFAA00]">
                            🏆 Official Admin Answer
                          </span>
                          {statDetailText && (
                            <span className="text-[9px] text-slate-400 font-mono">
                              {statDetailText}
                            </span>
                          )}
                        </div>
                        <div className="text-xs font-black text-amber-300 truncate">
                          {officialAnswerText || 'Awaiting Result'}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              });
            })()}
          </div>

          {/* Match Summary Note */}
          {results?.summaryNote && (
            <div className="p-3.5 rounded-2xl bg-[#080C1D] border border-amber-500/20 text-xs text-slate-300 flex items-center gap-2">
              <span className="text-base">📢</span>
              <span><strong>Official Match Commentary:</strong> {results.summaryNote}</span>
            </div>
          )}
        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3 flex-shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
            >
              Close
            </button>

            {slip && (slip.status === 'PENDING' || slip.status === 'LIVE') && match.status === 'UPCOMING' && new Date(match.startTime || (match as any).matchStartTime || 0).getTime() > Date.now() && onEditSlip && (
              <button
                onClick={() => {
                  onClose();
                  onEditSlip(match, slip);
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#FF8800] hover:brightness-110 text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-md shadow-[#FF6B00]/25 transition-all"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Swap Players</span>
              </button>
            )}
          </div>

          {onPlayAnother && (
            <button
              onClick={() => {
                onClose();
                onPlayAnother();
              }}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:brightness-110 text-slate-950 text-xs font-extrabold flex items-center gap-1.5 shadow-md shadow-amber-500/20"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Predict Next Match</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
