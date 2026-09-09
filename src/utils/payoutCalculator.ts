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

export function getUserAnswerFromSlip(answers: any, qId: string, idx: number): string {
  if (!answers) return '';
  if (answers instanceof Map) {
    if (answers.has(qId)) return String(answers.get(qId));
    if (answers.has(`q${idx + 1}`)) return String(answers.get(`q${idx + 1}`));
    if (answers.has(String(idx + 1))) return String(answers.get(String(idx + 1)));
    for (const [k, v] of answers.entries()) {
      if (k.toLowerCase() === qId.toLowerCase()) return String(v);
    }
  } else if (typeof answers === 'object') {
    if (answers[qId] !== undefined) return String(answers[qId]);
    if (answers[`q${idx + 1}`] !== undefined) return String(answers[`q${idx + 1}`]);
    if (answers[String(idx + 1)] !== undefined) return String(answers[String(idx + 1)]);
    for (const k of Object.keys(answers)) {
      if (k.toLowerCase() === qId.toLowerCase()) return String(answers[k]);
    }
  }
  return '';
}

function normalizeText(s: string): string {
  return (s || '')
    .toLowerCase()
    .replace(/\s*\([^)]*\)/g, '') // remove parenthesized tags like (DG), (BW), (c), (wk), (IND), etc.
    .replace(/[^a-z0-9]/g, '')
    .trim();
}

export function checkAnswerMatch(
  userAns: string,
  officialAns: string,
  officialText: string,
  playerMap: Map<string, any>
): boolean {
  if (!userAns) return false;
  if (!officialAns && !officialText) return false;

  const uRaw = userAns.trim();
  const oRaw = (officialAns || '').trim();
  const oTextRaw = (officialText || '').trim();

  const uClean = uRaw.toLowerCase();
  const oClean = oRaw.toLowerCase();
  const oTextClean = oTextRaw.toLowerCase();

  // 1. Exact string matches
  if (oClean && uClean === oClean) return true;
  if (oTextClean && uClean === oTextClean) return true;

  // 2. Normalized stripped text matches (removes (c), (wk), (DG), spaces, symbols)
  const uNorm = normalizeText(uClean);
  const oNorm = normalizeText(oClean);
  const oTextNorm = normalizeText(oTextClean);

  if (oNorm && uNorm === oNorm) return true;
  if (oTextNorm && uNorm === oTextNorm) return true;

  // 3. Resolve user player
  let uPlayer = playerMap.get(userAns) || playerMap.get(uRaw) || playerMap.get(uClean);
  if (!uPlayer) {
    for (const [id, p] of playerMap.entries()) {
      if (id.toLowerCase() === uClean || normalizeText(p.name) === uNorm || (p.shortName && normalizeText(p.shortName) === uNorm)) {
        uPlayer = p;
        break;
      }
    }
  }

  // 4. Resolve official player
  let oPlayer = playerMap.get(officialAns) || (officialText ? playerMap.get(officialText) : undefined) ||
                playerMap.get(oRaw) || playerMap.get(oClean);
  if (!oPlayer) {
    for (const [id, p] of playerMap.entries()) {
      if (id.toLowerCase() === oClean || normalizeText(p.name) === oNorm || (p.shortName && normalizeText(p.shortName) === oNorm) ||
          (oTextNorm && (normalizeText(p.name) === oTextNorm || (p.shortName && normalizeText(p.shortName) === oTextNorm)))) {
        oPlayer = p;
        break;
      }
    }
  }

  // 5. If both resolved to player objects, compare their IDs or normalized names
  if (uPlayer && oPlayer) {
    if (uPlayer.id === oPlayer.id) return true;
    if (normalizeText(uPlayer.name) === normalizeText(oPlayer.name)) return true;
  }

  // 6. If user is player, compare with official texts
  if (uPlayer) {
    const pNameNorm = normalizeText(uPlayer.name);
    const pShortNorm = normalizeText(uPlayer.shortName || '');
    if (oNorm && (pNameNorm === oNorm || (pShortNorm && pShortNorm === oNorm))) return true;
    if (oTextNorm && (pNameNorm === oTextNorm || (pShortNorm && pShortNorm === oTextNorm))) return true;
    if (oClean && (oClean.includes(uPlayer.name.toLowerCase()) || (uPlayer.shortName && oClean.includes(uPlayer.shortName.toLowerCase())))) return true;
    if (oTextClean && (oTextClean.includes(uPlayer.name.toLowerCase()) || (uPlayer.shortName && oTextClean.includes(uPlayer.shortName.toLowerCase())))) return true;
  }

  // 7. If official is player, compare with user answer
  if (oPlayer) {
    const pNameNorm = normalizeText(oPlayer.name);
    const pShortNorm = normalizeText(oPlayer.shortName || '');
    if (uNorm && (pNameNorm === uNorm || (pShortNorm && pShortNorm === uNorm))) return true;
    if (uClean && (uClean.includes(oPlayer.name.toLowerCase()) || (oPlayer.shortName && uClean.includes(oPlayer.shortName.toLowerCase())))) return true;
  }

  return false;
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
  const allPlayers = [...(match.squadTeam1 || []), ...(match.squadTeam2 || [])];
  const playerMap = new Map(allPlayers.map((p) => [p.id, p]));

  let correctCount = 0;
  let streakCount = 0;
  let isStreakBroken = false;
  const settlementDetails: SettlementDetail[] = [];

  const questions = match.questions || [];

  questions.forEach((q, idx) => {
    const userAnswerId = getUserAnswerFromSlip(slip.answers, q.id, idx);
    const actualResult = results.answers?.[q.id] || (results.answers as any)?.[`q${idx + 1}`] || (results.answers as any)?.[String(idx + 1)];
    
    const actualAnswerId = typeof actualResult === 'object' && actualResult !== null
      ? String(actualResult.answerId || actualResult.answerText || '')
      : String(actualResult || '');
    const actualAnswerText = typeof actualResult === 'object' && actualResult !== null
      ? String(actualResult.answerText || actualResult.answerId || '')
      : String(actualResult || '');

    const isCorrect = checkAnswerMatch(userAnswerId, actualAnswerId, actualAnswerText, playerMap);

    if (isCorrect) {
      correctCount += 1;
      if (!isStreakBroken) {
        streakCount += 1;
      }
    } else {
      isStreakBroken = true;
    }

    const userPlayer = userAnswerId ? playerMap.get(userAnswerId) : undefined;
    const winnerPlayer = actualAnswerId ? playerMap.get(actualAnswerId) : undefined;

    let userAnswerText = userAnswerId;
    if (q.type === 'PLAYER' && userPlayer) userAnswerText = userPlayer.name;

    let displayActualAnswerText = actualAnswerText || actualAnswerId || 'Pending';
    if (q.type === 'PLAYER' && winnerPlayer) displayActualAnswerText = winnerPlayer.name;

    settlementDetails.push({
      questionId: q.id,
      questionTitle: q.title,
      userAnswerId: userAnswerId || '',
      userAnswerText: userAnswerText || 'Unselected',
      actualAnswerId: actualAnswerId,
      actualAnswerText: displayActualAnswerText,
      actualStatValue: (actualResult as any)?.statValue || 'Official Result',
      isCorrect,
    });
  });

  const wheelMult = slip.wheelMultiplier || 50;
  
  // STRICT STREAK RULE: Multiplier is strictly based on consecutive correct answers from Q1
  let baseMultiplier = 0;
  if (streakCount >= 6) baseMultiplier = slip.freeHit ? wheelMult : 50;
  else if (streakCount === 5) baseMultiplier = 10;
  else if (streakCount === 4) baseMultiplier = 3;
  else if (streakCount === 3) baseMultiplier = 0.5;
  else baseMultiplier = 0;

  const multiplier = baseMultiplier;
  const payoutAmount = (slip.entryFee || 50) * multiplier;
  
  let status: 'WON' | 'LOST' | 'PENDING_APPROVAL' = 'LOST';
  if (multiplier > 0) {
    status = 'WON';
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
