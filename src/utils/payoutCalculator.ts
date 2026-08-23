import { CricketMatch, MatchResults, SettlementDetail, StatQuestionDefinition, StatQuestionKey, UserPredictionSlip } from '../types';

export const STAT_QUESTIONS: StatQuestionDefinition[] = [
  {
    key: 'top_batter',
    number: 1,
    title: 'Top Batter',
    shortTitle: 'Highest Runs',
    subtitle: 'Which batsman will score the most runs in the match?',
    criteria: 'Player with highest individual aggregate score in both innings. Tie-breaker: Fewer balls faced.',
    iconName: 'Award',
    badgeColor: 'from-amber-500 to-orange-500',
  },
  {
    key: 'top_bowler',
    number: 2,
    title: 'Top Bowler',
    shortTitle: 'Best Figures / Wickets',
    subtitle: 'Which bowler will have the best bowling performance?',
    criteria: 'Highest wickets taken. Tie-breaker: Fewest runs conceded.',
    iconName: 'Crosshair',
    badgeColor: 'from-blue-500 to-indigo-500',
  },
  {
    key: 'top_striker',
    number: 3,
    title: 'Top Striker',
    shortTitle: 'Highest Strike Rate',
    subtitle: 'Which batter will register the highest batting strike rate?',
    criteria: 'Highest batting strike rate with a minimum of 15 balls faced in the match.',
    iconName: 'Zap',
    badgeColor: 'from-yellow-400 to-amber-500',
  },
  {
    key: 'best_economy',
    number: 4,
    title: 'Most Economical Bowler',
    shortTitle: 'Lowest Economy Rate',
    subtitle: 'Which bowler will concede the least runs per over?',
    criteria: 'Lowest runs conceded per over (Economy) with minimum 2 overs bowled.',
    iconName: 'ShieldCheck',
    badgeColor: 'from-emerald-500 to-teal-500',
  },
  {
    key: 'most_sixes',
    number: 5,
    title: 'Most 6s',
    shortTitle: 'Maximum Sixes Hit',
    subtitle: 'Which batter will smash the highest number of 6s?',
    criteria: 'Highest individual sixes hit in the match. Tie-breaker: Highest strike rate.',
    iconName: 'Flame',
    badgeColor: 'from-rose-500 to-red-600',
  },
  {
    key: 'most_wickets',
    number: 6,
    title: 'Most Wickets',
    shortTitle: 'Highest Wicket-Taker',
    subtitle: 'Which bowler will grab the highest total wicket count?',
    criteria: 'Most total dismissals (excluding runouts). Tie-breaker: Lowest economy.',
    iconName: 'Target',
    badgeColor: 'from-purple-500 to-indigo-600',
  },
];

/**
 * Payout Multipliers:
 * C = 3: 0.5X (50% return)
 * C = 4: 3X (300% return)
 * C = 5: 10X (1000% return)
 * C = 6: 100X (10000% return)
 * C < 3: 0
 */
export const PAYOUT_TIERS = [
  { correct: 6, multiplier: 100, label: '100X Jackpot', badge: 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950', returnRate: '10,000%' },
  { correct: 5, multiplier: 10, label: '10X Super Win', badge: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40', returnRate: '1,000%' },
  { correct: 4, multiplier: 3, label: '3X Triple Win', badge: 'bg-blue-500/20 text-blue-300 border border-blue-500/40', returnRate: '300%' },
  { correct: 3, multiplier: 0.5, label: '0.5X Refund Guard', badge: 'bg-slate-700/50 text-slate-300 border border-slate-600/40', returnRate: '50%' },
  { correct: 2, multiplier: 0, label: 'No Payout', badge: 'text-slate-500', returnRate: '0%' },
  { correct: 1, multiplier: 0, label: 'No Payout', badge: 'text-slate-500', returnRate: '0%' },
  { correct: 0, multiplier: 0, label: 'No Payout', badge: 'text-slate-500', returnRate: '0%' },
];

export function getMultiplierForCorrectCount(correctCount: number): number {
  if (correctCount >= 6) return 100;
  if (correctCount === 5) return 10;
  if (correctCount === 4) return 3;
  if (correctCount === 3) return 0.5;
  return 0;
}

export function calculatePotentialPayout(entryFee: number, correctCount: number): number {
  const multiplier = getMultiplierForCorrectCount(correctCount);
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
  const settlementDetails: SettlementDetail[] = [];

  STAT_QUESTIONS.forEach((q) => {
    const userPickPlayerId = slip.answers[q.key];
    const actualResult = results[q.key];
    const actualWinnerPlayerId = actualResult ? actualResult.playerId : '';

    const isCorrect = Boolean(
      userPickPlayerId &&
      actualWinnerPlayerId &&
      userPickPlayerId === actualWinnerPlayerId
    );

    if (isCorrect) {
      correctCount += 1;
    }

    const userPlayer = userPickPlayerId ? playerMap.get(userPickPlayerId) : undefined;
    const winnerPlayer = actualWinnerPlayerId ? playerMap.get(actualWinnerPlayerId) : undefined;

    settlementDetails.push({
      questionKey: q.key,
      questionTitle: q.title,
      userPickPlayerId: userPickPlayerId || '',
      userPickPlayerName: userPlayer?.name || 'Unselected',
      userPickTeam: userPlayer?.team || '',
      actualWinnerPlayerId: actualWinnerPlayerId,
      actualWinnerPlayerName: winnerPlayer?.name || actualResult?.playerName || 'Pending',
      actualWinnerTeam: winnerPlayer?.team || '',
      actualStatValue: actualResult?.statValue || 'N/A',
      isCorrect,
    });
  });

  const multiplier = getMultiplierForCorrectCount(correctCount);
  const payoutAmount = slip.entryFee * multiplier;
  const status: 'WON' | 'LOST' = multiplier > 0 ? 'WON' : 'LOST';

  const settledSlip: UserPredictionSlip = {
    ...slip,
    status,
    correctCount,
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
