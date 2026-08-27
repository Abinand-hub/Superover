import { CricketMatch, MatchResults, SettlementDetail, QuestionDefinition, UserPredictionSlip } from '../types';



/**
 * Payout Multipliers (Streak Rule):
 * Streak 6: 50X (or Wheel Multiplier if Free Hit active)
 * Streak 5: 10X
 * Streak 4: 3X
 * Streak 3: 0.5X
 * Streak < 3: 0
 */
export const PAYOUT_TIERS = [
  { correct: 6, multiplier: 50, label: '50X Jackpot', badge: 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950', returnRate: '5,000%' },
  { correct: 5, multiplier: 10, label: '10X Super Win', badge: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40', returnRate: '1,000%' },
  { correct: 4, multiplier: 3, label: '3X Triple Win', badge: 'bg-blue-500/20 text-blue-300 border border-blue-500/40', returnRate: '300%' },
  { correct: 3, multiplier: 0.5, label: '0.5X Refund Guard', badge: 'bg-slate-700/50 text-slate-300 border border-slate-600/40', returnRate: '50%' },
  { correct: 2, multiplier: 0, label: 'No Payout', badge: 'text-slate-500', returnRate: '0%' },
  { correct: 1, multiplier: 0, label: 'No Payout', badge: 'text-slate-500', returnRate: '0%' },
  { correct: 0, multiplier: 0, label: 'No Payout', badge: 'text-slate-500', returnRate: '0%' },
];

export function getMultiplierForStreak(streakCount: number, jackpotMultiplier: number = 50, isFreeHit: boolean = false): number {
  if (streakCount >= 6) return isFreeHit ? jackpotMultiplier : 50;
  if (streakCount === 5) return 10;
  if (streakCount === 4) return 3;
  if (streakCount === 3) return 0.5;
  return 0;
}

export function calculatePotentialPayout(entryFee: number, streakCount: number, wheelMult: number, isFreeHit: boolean): number {
  const multiplier = getMultiplierForStreak(streakCount, wheelMult, isFreeHit);
  return entryFee * multiplier;
}

export function settlePredictionSlip(
  slip: UserPredictionSlip,
  match: CricketMatch,
  results: MatchResults
): {
  settledSlip: UserPredictionSlip;
  payoutAmount: number;
  multiplier: number;
  correctCount: number;
} {
  const allPlayers = [...match.squadTeam1, ...match.squadTeam2];
  const playerMap = new Map(allPlayers.map((p) => [p.id, p]));

  let correctCount = 0;
  let streakCount = 0;
  let isStreakBroken = false;
  const settlementDetails: SettlementDetail[] = [];

  match.questions.forEach((q) => {
    const userAnswerId = slip.answers[q.id];
    const actualResult = results.answers?.[q.id];
    const actualAnswerId = actualResult ? actualResult.answerId : '';

    const isCorrect = Boolean(
      userAnswerId &&
      actualAnswerId &&
      userAnswerId.toLowerCase() === actualAnswerId.toLowerCase()
    );

    if (isCorrect) {
      correctCount += 1;
      if (!isStreakBroken) {
        streakCount += 1;
      }
    } else {
      isStreakBroken = true;
    }

    // Try to resolve names if it's a player
    const userPlayer = userAnswerId ? playerMap.get(userAnswerId) : undefined;
    const winnerPlayer = actualAnswerId ? playerMap.get(actualAnswerId) : undefined;

    let userAnswerText = userAnswerId;
    if (q.type === 'PLAYER' && userPlayer) userAnswerText = userPlayer.name;

    let actualAnswerText = actualAnswerId || 'Pending';
    if (q.type === 'PLAYER' && winnerPlayer) actualAnswerText = winnerPlayer.name;
    else if (actualResult?.answerText) actualAnswerText = actualResult.answerText;

    settlementDetails.push({
      questionId: q.id,
      questionTitle: q.title,
      userAnswerId: userAnswerId || '',
      userAnswerText: userAnswerText || 'Unselected',
      actualAnswerId: actualAnswerId,
      actualAnswerText: actualAnswerText,
      actualStatValue: actualResult?.statValue || 'N/A',
      isCorrect,
    });
  });

  const wheelMult = slip.wheelMultiplier || 50;
  
  let baseMultiplier = 0;
  if (streakCount >= 6) baseMultiplier = slip.freeHit ? wheelMult : 50;
  else if (streakCount === 5) baseMultiplier = 10;
  else if (streakCount === 4) baseMultiplier = 3;
  else if (streakCount === 3) baseMultiplier = 0.5;

  const multiplier = baseMultiplier;
  const payoutAmount = slip.entryFee * multiplier; // note: entryFee is the base stake. freeHitFee is lost.
  
  let status: 'WON' | 'LOST' | 'PENDING_APPROVAL' = 'LOST';
  if (multiplier > 0) {
    status = streakCount === 6 ? 'PENDING_APPROVAL' : 'WON';
  }

  const settledSlip: UserPredictionSlip = {
    ...slip,
    status,
    correctCount,
    streakCount,
    multiplierWon: multiplier,
    payoutAmount,
    settlementDetails,
  };

  return {
    settledSlip,
    payoutAmount,
    multiplier,
    correctCount,
  };
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 1,
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 1,
  }).format(amount);
}
