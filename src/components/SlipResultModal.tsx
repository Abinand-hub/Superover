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
  TrendingUp
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CricketMatch, SettlementDetail, UserPredictionSlip } from '../types';
import { formatINR } from '../utils/payoutCalculator';

interface SlipResultModalProps {
  match: CricketMatch;
  slip?: UserPredictionSlip;
  onClose: () => void;
  onPlayAnother?: () => void;
}

export const SlipResultModal: React.FC<SlipResultModalProps> = ({
  match,
  slip,
  onClose,
  onPlayAnother,
}) => {
  const isWon = slip && slip.status === 'WON' && (slip.multiplierWon || 0) > 0;

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
  const allSquadPlayers = [...match.squadTeam1, ...match.squadTeam2];
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
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold text-[10px] uppercase border border-slate-700">
                Official Match Results & Settlement
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
          {slip ? (
            <div
              className={`p-4 sm:p-5 rounded-2xl border ${
                isWon
                  ? 'bg-gradient-to-br from-amber-500/20 via-emerald-950/30 to-slate-900 border-amber-400/50 shadow-lg'
                  : 'bg-slate-950/60 border-slate-800'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-black ${
                      isWon
                        ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 shadow-md shadow-amber-500/30'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {isWon ? <Trophy className="w-6 h-6" /> : <XCircle className="w-6 h-6 text-slate-400" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-base font-black ${isWon ? 'text-amber-400' : 'text-slate-300'}`}>
                        {isWon ? `${slip.multiplierWon}X Cash Prize Won!` : 'Better Luck Next SuperOver'}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-xs font-bold border border-slate-700">
                        {slip.correctCount ?? 0} / 6 Correct
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Entry: {formatINR(slip.entryFee)} • Submitted {new Date(slip.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>

                <div className="text-right sm:border-l sm:border-slate-800 sm:pl-4">
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                    Cash Credited
                  </span>
                  <span className={`text-2xl font-black font-display ${isWon ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {formatINR(slip.payoutAmount || 0)}
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

          {/* 6 Stats Breakdown List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
              <span>Stat Category</span>
              <span>Official Result vs Your Pick</span>
            </div>

            {match.questions?.map((q) => {
              const actualResult = results?.answers ? results.answers[q.id] : null;
              const userAnswerId = slip ? slip.answers[q.id] : null;
              
              const isCorrect = userAnswerId && actualResult && String(userAnswerId).toLowerCase() === String(actualResult.answerId).toLowerCase();

              // For player questions, we can look up the player
              let userPickDisplayName = userAnswerId || 'Unselected';
              if (q.type === 'PLAYER' && userAnswerId) {
                const p = playerMap.get(userAnswerId);
                if (p) userPickDisplayName = p.shortName;
              }

              return (
                <div
                  key={q.id}
                  className={`p-3.5 rounded-xl border transition-colors ${
                    slip
                      ? isCorrect
                        ? 'bg-emerald-500/10 border-emerald-500/40'
                        : 'bg-slate-950/60 border-slate-800/80'
                      : 'bg-slate-950/60 border-slate-800'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                    {/* Left: Category info */}
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-slate-800 text-amber-400 flex items-center justify-center flex-shrink-0">
                        {getQuestionIcon(q.iconName)}
                      </div>
                      <div>
                        <div className="text-xs font-black text-white">{q.title}</div>
                        <div className="text-[10px] text-slate-400">{q.shortTitle}</div>
                      </div>
                    </div>

                    {/* Right: Winner info & comparison */}
                    <div className="flex items-center gap-3 justify-between sm:justify-end">
                      {/* Actual Winner */}
                      <div className="text-right">
                        <div className="text-xs font-bold text-amber-300">
                          {actualResult?.answerText || 'TBD'}
                        </div>
                        <div className="text-[11px] font-mono text-slate-400">
                          {actualResult?.statValue || 'Awaiting Result'}
                        </div>
                      </div>

                      {/* User Pick Badge (if entered) */}
                      {slip && (
                        <div className="pl-2 border-l border-slate-800">
                          {!actualResult ? (
                            <div className="flex flex-col items-end">
                              <span className="text-[10px] text-slate-400 font-bold">
                                Pick: {userPickDisplayName}
                              </span>
                              <span className="text-[10px] text-amber-500 font-bold mt-0.5">
                                Pending ⏳
                              </span>
                            </div>
                          ) : isCorrect ? (
                             <div className="flex items-center gap-1 text-emerald-400 text-xs font-bold bg-emerald-500/20 px-2 py-1 rounded-md border border-emerald-500/30">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Match ✅</span>
                            </div>
                          ) : (
                            <div className="flex flex-col items-end">
                              <span className="text-[10px] text-slate-500 line-through">
                                Pick: {userPickDisplayName}
                              </span>
                              <span className="text-[10px] text-rose-400 font-bold">
                                Missed ❌
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Match Summary Note */}
          {results?.summaryNote && (
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 italic text-center">
              "{results.summaryNote}"
            </div>
          )}
        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3 flex-shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
          >
            Close
          </button>

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
