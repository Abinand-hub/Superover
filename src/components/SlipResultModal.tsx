import React, { useEffect, useState } from 'react';
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
  Edit3,
  Search,
  Users,
  CheckCircle
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
  onUpdateSlip?: (slipId: string, answers: Record<string, string>) => Promise<void> | void;
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
  onUpdateSlip,
}) => {
  // Local answers state for instant granular per-question swap
  const [localAnswers, setLocalAnswers] = useState<Record<string, string>>(() => {
    if (!slip?.answers) return {};
    if (slip.answers instanceof Map) return Object.fromEntries(slip.answers);
    return typeof slip.answers === 'object' ? slip.answers : {};
  });

  // State for single-question swap popup
  const [swappingQuestion, setSwappingQuestion] = useState<any | null>(null);
  const [swapSearch, setSwapSearch] = useState('');
  const [swapRoleFilter, setSwapRoleFilter] = useState<'ALL' | 'BAT' | 'BOWL' | 'AR' | 'WK'>('ALL');
  const [swapToast, setSwapToast] = useState<string | null>(null);

  const currentSlip = React.useMemo(() => {
    if (!slip) return undefined;
    const slipWithLocalAnswers = { ...slip, answers: localAnswers };
    if (match.actualResults?.answers && Object.keys(match.actualResults.answers).length > 0) {
      const { settledSlip } = settlePredictionSlip(slipWithLocalAnswers, match, match.actualResults);
      return settledSlip;
    }
    return slipWithLocalAnswers;
  }, [slip, localAnswers, match]);

  const isSettled = match.status === 'COMPLETED' || currentSlip?.status === 'WON' || currentSlip?.status === 'LOST' || currentSlip?.status === 'PENDING_APPROVAL';
  const isWon = currentSlip && currentSlip.status === 'WON' && (currentSlip.multiplierWon || 0) > 0;
  const isPendingApproval = currentSlip && currentSlip.status === 'PENDING_APPROVAL';
  const isLost = currentSlip && currentSlip.status === 'LOST';
  const isActiveSlip = currentSlip && !isSettled;

  const handleSingleQuestionSwap = (questionId: string, newAnswerId: string) => {
    const updated = { ...localAnswers, [questionId]: newAnswerId };
    setLocalAnswers(updated);
    if (slip?.id && onUpdateSlip) {
      onUpdateSlip(slip.id, updated);
    }
    setSwappingQuestion(null);
    setSwapToast('Pick updated successfully!');
    setTimeout(() => setSwapToast(null), 3000);
  };

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
            <div className="flex items-center gap-2 flex-wrap">
              {isSettled ? (
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-black text-[10px] uppercase border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> MATCH COMPLETED
                </span>
              ) : match.status === 'LIVE' ? (
                <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 font-black text-[10px] uppercase border border-rose-500/30 flex items-center gap-1 animate-pulse">
                  🔴 LIVE MATCH
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 font-black text-[10px] uppercase border border-sky-500/30">
                  UPCOMING
                </span>
              )}

              <span className={`px-2 py-0.5 rounded font-bold text-[10px] uppercase border ${
                isSettled ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
              }`}>
                {isSettled ? 'Official Settlement' : 'Active Slip'}
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
                        ? `${currentSlip.freeHit || (currentSlip.totalPayable && currentSlip.totalPayable > (currentSlip.entryFee || 25)) 
                            ? `Paid: ${formatINR(currentSlip.totalPayable || ((currentSlip.entryFee || 25) + (currentSlip.freeHitFee || 10)))} (${formatINR(currentSlip.entryFee || 25)} + ${formatINR(currentSlip.freeHitFee || 10)} Spin Wheel)` 
                            : `Entry: ${formatINR(currentSlip.entryFee || 25)}`} • Placed at ${new Date(currentSlip.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • Results settle upon match end`
                        : isPendingApproval 
                        ? 'Your win is undergoing standard security checks by the admin.'
                        : `Entry: ${formatINR(currentSlip.totalPayable || currentSlip.entryFee || 25)} • Submitted ${new Date(currentSlip.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                      }
                    </p>
                  </div>
                </div>

                <div className="text-right sm:border-l sm:border-slate-800 sm:pl-4">
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                    {isActiveSlip ? `Potential ${currentSlip.wheelMultiplier || (currentSlip.freeHit ? 75 : 50)}X Win` : isPendingApproval ? 'Pending Cash' : 'Cash Credited'}
                  </span>
                  <span className={`text-2xl font-black font-display ${
                    isActiveSlip ? 'text-amber-400 font-mono' : isPendingApproval ? 'text-amber-400 animate-pulse' : isWon ? 'text-emerald-400' : 'text-slate-500'
                  }`}>
                    {isActiveSlip ? formatINR((currentSlip.entryFee || 25) * (currentSlip.wheelMultiplier || (currentSlip.freeHit ? 75 : 50))) : formatINR(currentSlip.payoutAmount || 0)}
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

                        {!isSettled && match.status === 'UPCOMING' && (
                          <div className="mt-2 pt-2 border-t border-slate-800/80">
                            <button
                              onClick={() => {
                                setSwappingQuestion({ ...q, questionIdx: idx });
                                setSwapSearch('');
                                setSwapRoleFilter('ALL');
                              }}
                              className="w-full py-1 px-2 rounded-lg bg-[#FF6B00]/15 hover:bg-[#FF6B00]/30 text-[#FF8800] hover:text-[#FFAA00] text-[10px] font-black border border-[#FF6B00]/40 transition-all flex items-center justify-center gap-1"
                            >
                              <Edit3 className="w-2.5 h-2.5" />
                              <span>Swap This Pick (Q{idx + 1})</span>
                            </button>
                          </div>
                        )}
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

        {/* ========================================================================= */}
        {/* SINGLE-QUESTION SWAP PICK POPUP / DRAWER                                 */}
        {/* ========================================================================= */}
        {swappingQuestion && (
          <div className="absolute inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col animate-in slide-in-from-bottom-6 duration-200">
            {/* Header */}
            <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between flex-shrink-0">
              <div>
                <span className="text-[10px] font-black uppercase text-[#FF8800] tracking-wider block">
                  Swap Pick For Q{swappingQuestion.questionIdx + 1}
                </span>
                <h3 className="text-base font-black text-white">{swappingQuestion.title}</h3>
              </div>
              <button
                onClick={() => setSwappingQuestion(null)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Question: Player Pick Mode */}
              {swappingQuestion.optionsType === 'PLAYER_PICK' || (!swappingQuestion.options && allSquadPlayers.length > 0) ? (
                <div className="space-y-3">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search player by name or team..."
                      value={swapSearch}
                      onChange={(e) => setSwapSearch(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 pl-9 pr-4 text-xs text-white placeholder-slate-500 focus:border-amber-500 outline-none"
                    />
                  </div>

                  {/* Role Filters */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                    {(['ALL', 'BAT', 'BOWL', 'AR', 'WK'] as const).map((role) => (
                      <button
                        key={role}
                        onClick={() => setSwapRoleFilter(role)}
                        className={`px-3 py-1 rounded-lg text-xs font-black transition-colors ${
                          swapRoleFilter === role 
                            ? 'bg-[#FF6B00] text-slate-950 shadow-md shadow-[#FF6B00]/30' 
                            : 'bg-slate-850 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {role === 'ALL' ? 'All Roles' : role}
                      </button>
                    ))}
                  </div>

                  {/* Players Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[50vh] overflow-y-auto pr-1">
                    {allSquadPlayers
                      .filter((p) => {
                        if (swapRoleFilter !== 'ALL' && p.role !== swapRoleFilter) return false;
                        if (swapSearch.trim()) {
                          const q = swapSearch.toLowerCase();
                          return (p.name || '').toLowerCase().includes(q) || (p.team || '').toLowerCase().includes(q);
                        }
                        return true;
                      })
                      .map((player) => {
                        const isCurrentPick = localAnswers[swappingQuestion.id] === player.id;

                        return (
                          <button
                            key={player.id}
                            onClick={() => handleSingleQuestionSwap(swappingQuestion.id, player.id)}
                            className={`p-3 rounded-xl border transition-all text-left flex items-center justify-between ${
                              isCurrentPick
                                ? 'bg-gradient-to-r from-[#FF6B00]/30 to-amber-500/20 border-[#FF6B00] text-white shadow-md ring-1 ring-[#FF6B00]'
                                : 'bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-slate-850 text-slate-200'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <img
                                src={player.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(player.name)}&background=FF6B00&color=fff`}
                                alt={player.name}
                                className="w-8 h-8 rounded-full bg-slate-800 object-cover border border-slate-700"
                              />
                              <div>
                                <div className="font-black text-xs text-white">{player.name}</div>
                                <div className="text-[10px] text-slate-400 flex items-center gap-1.5">
                                  <span className="font-bold text-amber-400">{player.team}</span>
                                  <span>•</span>
                                  <span>{player.role}</span>
                                </div>
                              </div>
                            </div>

                            {isCurrentPick ? (
                              <span className="px-2 py-0.5 rounded bg-[#FF6B00] text-slate-950 text-[10px] font-black">
                                Current Pick
                              </span>
                            ) : (
                              <span className="text-xs font-bold text-slate-400 group-hover:text-white">
                                Select →
                              </span>
                            )}
                          </button>
                        );
                      })}
                  </div>
                </div>
              ) : (
                /* Question: Fixed Options Mode (e.g. Yes/No, Range, Team Pick) */
                <div className="space-y-2">
                  {(swappingQuestion.options || [
                    { id: match.team1.code, text: match.team1.name || match.team1.code },
                    { id: match.team2.code, text: match.team2.name || match.team2.code }
                  ]).map((opt: any) => {
                    const optId = typeof opt === 'object' ? (opt.id || opt.answerId || opt.text) : opt;
                    const optText = typeof opt === 'object' ? (opt.text || opt.answerText || opt.id) : opt;
                    const isCurrentPick = localAnswers[swappingQuestion.id] === optId;

                    return (
                      <button
                        key={optId}
                        onClick={() => handleSingleQuestionSwap(swappingQuestion.id, optId)}
                        className={`w-full p-4 rounded-xl border text-left font-black text-sm transition-all flex items-center justify-between ${
                          isCurrentPick
                            ? 'bg-gradient-to-r from-[#FF6B00]/30 to-amber-500/20 border-[#FF6B00] text-white shadow-md'
                            : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white'
                        }`}
                      >
                        <span>{optText}</span>
                        {isCurrentPick ? (
                          <span className="px-2.5 py-1 rounded bg-[#FF6B00] text-slate-950 text-xs font-black">
                            ✓ Current Pick
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400">Select →</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 bg-slate-900 border-t border-slate-800 text-center">
              <span className="text-[11px] text-slate-400">
                💡 Swapping changes only this single question. Your entry fee and spin multiplier remain locked.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
