export type PlayerRole = 'BAT' | 'BOWL' | 'AR' | 'WK';

export interface Player {
  id: string;
  name: string;
  shortName: string;
  team: string; // Team code e.g. 'CSK', 'MI', 'IND', 'AUS'
  teamName: string;
  role: PlayerRole;
  avatar: string;
  jerseyNumber?: number;
  country: string;
  recentForm: string[]; // e.g. ['45', '78*', '12', '89', '34'] or ['2/24', '1/18', '3/15']
  careerStatHighlight: string; // e.g. "SR: 154.2 • Avg: 39.4" or "Econ: 6.8 • Wkts: 142"
}

export type MatchStatus = 'UPCOMING' | 'LOCKED' | 'LIVE' | 'COMPLETED';

export type StatQuestionKey = 
  | 'top_batter'
  | 'top_bowler'
  | 'top_striker'
  | 'best_economy'
  | 'most_sixes'
  | 'most_wickets';

export interface StatQuestionDefinition {
  key: StatQuestionKey;
  number: number;
  title: string;
  shortTitle: string;
  subtitle: string;
  criteria: string;
  iconName: string;
  badgeColor: string;
}

export interface MatchResults {
  top_batter: { playerId: string; statValue: string; playerName?: string };
  top_bowler: { playerId: string; statValue: string; playerName?: string };
  top_striker: { playerId: string; statValue: string; playerName?: string };
  best_economy: { playerId: string; statValue: string; playerName?: string };
  most_sixes: { playerId: string; statValue: string; playerName?: string };
  most_wickets: { playerId: string; statValue: string; playerName?: string };
  settledAt?: string;
  summaryNote?: string;
}

export interface TeamInfo {
  code: string;
  name: string;
  shortName: string;
  color: string;
  accentColor: string;
  flagOrLogo: string;
}

export interface CricketMatch {
  id: string;
  title: string;
  series: string;
  matchNumber?: string;
  team1: TeamInfo;
  team2: TeamInfo;
  venue: string;
  city: string;
  startTime: string; // ISO string
  lockTime: string; // ISO string (10 mins before match start)
  status: MatchStatus;
  format: 'T20' | 'ODI' | 'TEST';
  totalPool: number;
  totalEntries: number;
  entryFees: number[]; // [25, 50, 100]
  squadTeam1: Player[];
  squadTeam2: Player[];
  actualResults?: MatchResults;
  isFeatured?: boolean;
}

export interface SettlementDetail {
  questionKey: StatQuestionKey;
  questionTitle: string;
  userPickPlayerId: string;
  userPickPlayerName: string;
  userPickTeam: string;
  actualWinnerPlayerId: string;
  actualWinnerPlayerName: string;
  actualWinnerTeam: string;
  actualStatValue: string;
  isCorrect: boolean;
}

export interface UserPredictionSlip {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  matchId: string;
  matchTitle: string;
  series: string;
  team1Code: string;
  team2Code: string;
  matchStartTime: string;
  answers: Record<StatQuestionKey, string>; // questionKey -> playerId
  entryFee: number; // 25, 50, or 100
  submittedAt: string;
  status: 'PENDING' | 'LIVE' | 'WON' | 'LOST';
  correctCount?: number;
  multiplierWon?: number;
  payoutAmount?: number;
  settlementDetails?: SettlementDetail[];
}

export interface Wallet {
  depositBalance: number;
  winningsBalance: number;
  bonusBalance: number;
  totalBalance: number;
  kycVerified: boolean;
  upiId?: string;
}

export type TransactionType = 'DEPOSIT' | 'WITHDRAWAL' | 'CONTEST_ENTRY' | 'CONTEST_PAYOUT' | 'BONUS_REWARD';
export type TransactionStatus = 'SUCCESS' | 'PENDING' | 'REJECTED';

export interface WalletTransaction {
  id: string;
  userId: string;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  timestamp: string;
  description: string;
  paymentMethod?: string;
  referenceId: string;
  payoutMultiplier?: number;
}

export interface UserAccount {
  id: string;
  phone: string;
  name: string;
  email?: string;
  avatar: string;
  kycStatus: 'UNVERIFIED' | 'SUBMITTED' | 'VERIFIED' | 'REJECTED';
  panNumber?: string;
  upiId?: string;
  isBlocked: boolean;
  joinedDate: string;
  dailyDepositLimit: number;
  totalContestsJoined: number;
  totalWon: number;
}

export interface PlatformMetrics {
  totalUsers: number;
  activeMatches: number;
  totalPoolCollected: number;
  totalPayoutsDisbursed: number;
  platformProfit: number;
  commissionRate: number; // e.g. 15%
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'GAMEPLAY' | 'PAYOUTS' | 'WALLET' | 'LEGAL';
}
