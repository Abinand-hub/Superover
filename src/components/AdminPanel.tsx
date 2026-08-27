import React, { useState } from 'react';
import { 
  BarChart3, 
  Trophy, 
  Users, 
  Wallet as WalletIcon, 
  Settings, 
  PlusCircle, 
  Edit3, 
  CheckCircle2, 
  Lock, 
  Unlock, 
  RefreshCw, 
  Download, 
  ShieldAlert, 
  ArrowUpRight, 
  Search, 
  Sparkles, 
  AlertTriangle,
  FileSpreadsheet,
  Check,
  X,
  HelpCircle,
  Clock,
  Play,
  Square,
  UserPlus,
  Trash2,
  Eye,
  Gift,
  ShieldCheck,
  ArrowDownLeft,
  Calendar,
  Database,
  TrendingUp
} from 'lucide-react';
import { 
  CricketMatch, 
  FAQItem, 
  MatchResults, 
  MatchStatus, 
  PlatformMetrics, 
  Player, 
  PlayerRole,
  UserAccount, 
  UserPredictionSlip, 
  WalletTransaction 
} from '../types';
import { formatINR } from '../utils/payoutCalculator';
import { api } from '../services/api';
import { DEFAULT_QUESTIONS } from '../data/initialData';
import { LiveMarketAnalysis } from './admin/LiveMarketAnalysis';
import { QuestionBankManager } from './admin/QuestionBankManager';
import { MatchSelectionManager } from './admin/MatchSelectionManager';
import { MatchConfigurator } from './admin/MatchConfigurator';

interface AdminPanelProps {
  metrics: PlatformMetrics;
  matches: CricketMatch[];
  allUsers: UserAccount[];
  allSlips: UserPredictionSlip[];
  allTransactions: WalletTransaction[];
  faqs: FAQItem[];
  onUpdateMatch: (updatedMatch: CricketMatch) => void;
  onCreateMatch: (newMatch: CricketMatch) => void;
  onSettleMatch: (matchId: string, results: MatchResults) => void;
  onUpdateUser: (updatedUser: UserAccount) => void;
  onApproveWithdrawal: (txId: string) => void;
  onRejectWithdrawal: (txId: string) => void;
  onAddBonusCash: (userId: string, amount: number, note?: string) => void;
  onApproveJackpot: (slipId: string) => void;
  onRejectJackpot: (slipId: string) => void;
  onCloseAdmin: () => void;
}

// Preset Library of Star Players for quick addition to any squad
const STAR_PLAYERS_CATALOG: Omit<Player, 'team' | 'teamName'>[] = [
  {
    id: 'star_vk',
    name: 'Virat Kohli',
    shortName: 'V. Kohli',
    role: 'BAT',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    country: 'IND',
    recentForm: ['77', '83*', '51', '42', '113*'],
    careerStatHighlight: 'Avg: 39.5 • SR: 138.4 • 8 IPL Tons',
  },
  {
    id: 'star_rohit',
    name: 'Rohit Sharma',
    shortName: 'R. Sharma',
    role: 'BAT',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    country: 'IND',
    recentForm: ['105*', '38', '68', '19', '49'],
    careerStatHighlight: 'Hitman • 6500+ Runs • 275 Sixes',
  },
  {
    id: 'star_bumrah',
    name: 'Jasprit Bumrah',
    shortName: 'J. Bumrah',
    role: 'BOWL',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    country: 'IND',
    recentForm: ['5/21', '3/18', '2/15', '0/22', '4/20'],
    careerStatHighlight: 'Econ: 6.2 • Yorker King • 165 Wkts',
  },
  {
    id: 'star_msd',
    name: 'MS Dhoni',
    shortName: 'MS Dhoni',
    role: 'WK',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    country: 'IND',
    recentForm: ['28*(9)', '19*(5)', '37*(16)', '12*(4)', '20*(8)'],
    careerStatHighlight: 'Finisher SR: 228.4 in 20th Over',
  },
  {
    id: 'star_klaasen',
    name: 'Heinrich Klaasen',
    shortName: 'H. Klaasen',
    role: 'WK',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    country: 'SA',
    recentForm: ['80(34)', '63*(29)', '42(19)', '71(31)', '24(12)'],
    careerStatHighlight: 'SR: 178.5 vs Spin • 38 Sixes',
  },
  {
    id: 'star_head',
    name: 'Travis Head',
    shortName: 'T. Head',
    role: 'BAT',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    country: 'AUS',
    recentForm: ['89(30)', '102(39)', '67(24)', '12(6)', '58(28)'],
    careerStatHighlight: 'PP SR: 215.4 • Powerplay Demolisher',
  },
  {
    id: 'star_cummins',
    name: 'Pat Cummins',
    shortName: 'P. Cummins',
    role: 'BOWL',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    country: 'AUS',
    recentForm: ['3/22', '2/19', '1/31', '3/28', '2/25'],
    careerStatHighlight: 'Captain • Hat-trick Record Holder',
  },
  {
    id: 'star_sky',
    name: 'Suryakumar Yadav',
    shortName: 'S. Yadav',
    role: 'BAT',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
    country: 'IND',
    recentForm: ['78*(35)', '56(26)', '102*(51)', '31(18)', '83(40)'],
    careerStatHighlight: '360° Maestro • T20 No. 1 • SR: 172.5',
  },
  {
    id: 'star_hardik',
    name: 'Hardik Pandya',
    shortName: 'H. Pandya',
    role: 'AR',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    country: 'IND',
    recentForm: ['34*(18)', '2/26', '41(21)', '1/19', '28(14)'],
    careerStatHighlight: 'Clutch All-Rounder • 150+ SR',
  },
  {
    id: 'star_rashid',
    name: 'Rashid Khan',
    shortName: 'R. Khan',
    role: 'BOWL',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    country: 'AFG',
    recentForm: ['3/16', '2/21', '1/18', '2/24', '4/19'],
    careerStatHighlight: 'Mystery Googly • Econ: 6.4 in T20',
  },
  {
    id: 'star_russell',
    name: 'Andre Russell',
    shortName: 'A. Russell',
    role: 'AR',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    country: 'WI',
    recentForm: ['64*(25)', '2/16', '41(15)', '3/22', '29*(11)'],
    careerStatHighlight: 'Dre Russ • SR: 185.0 • Death Bowling',
  },
  {
    id: 'star_pant',
    name: 'Rishabh Pant',
    shortName: 'R. Pant',
    role: 'WK',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    country: 'IND',
    recentForm: ['58', '44', '89*', '33', '61'],
    careerStatHighlight: 'SR: 155.2 • 3500+ Runs • Match Winner',
  },
  {
    id: 'star_kuldeep',
    name: 'Kuldeep Yadav',
    shortName: 'K. Yadav',
    role: 'BOWL',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    country: 'IND',
    recentForm: ['3/20', '2/18', '4/14', '1/24', '3/26'],
    careerStatHighlight: 'Left-arm Wrist Spin • Econ: 6.8',
  }
];

export const AdminPanel: React.FC<AdminPanelProps> = ({
  metrics,
  matches,
  allUsers,
  allSlips,
  allTransactions,
  faqs,
  onUpdateMatch,
  onCreateMatch,
  onSettleMatch,
  onUpdateUser,
  onApproveWithdrawal,
  onRejectWithdrawal,
  onAddBonusCash,
  onApproveJackpot,
  onRejectJackpot,
  onCloseAdmin,
}) => {
  const [adminTab, setAdminTab] = useState<'overview' | 'publishing' | 'questionBank' | 'matches' | 'squads' | 'settlement' | 'jackpots' | 'users' | 'withdrawals' | 'financials' | 'market'>('overview');
  
  // Publishing State
  const [publishingView, setPublishingView] = useState<'list' | 'config'>('list');
  const [configuringMatchId, setConfiguringMatchId] = useState<string | null>(null);

  // Match Management State
  const [selectedMatchForSquad, setSelectedMatchForSquad] = useState<string>(matches[0]?.id || '');
  const [selectedTeamForSquad, setSelectedTeamForSquad] = useState<'team1' | 'team2'>('team1');

  // Add Player Modal State
  const [showAddPlayerModal, setShowAddPlayerModal] = useState<boolean>(false);
  const [newPlayerName, setNewPlayerName] = useState<string>('');
  const [newPlayerShortName, setNewPlayerShortName] = useState<string>('');
  const [newPlayerRole, setNewPlayerRole] = useState<PlayerRole>('BAT');
  const [newPlayerCountry, setNewPlayerCountry] = useState<string>('IND');
  const [newPlayerJersey, setNewPlayerJersey] = useState<string>('18');
  const [newPlayerHighlight, setNewPlayerHighlight] = useState<string>('Avg: 42.5 • SR: 148.0');
  const [newPlayerForm, setNewPlayerForm] = useState<string>('54, 78*, 31, 89, 45');

  // Settlement Form State
  const [selectedMatchIdForSettlement, setSelectedMatchIdForSettlement] = useState<string>(matches[0]?.id || '');
  const selectedMatchForSettlement = matches.find((m) => m.id === selectedMatchIdForSettlement) || matches[0];

  const squadForSettlement = selectedMatchForSettlement 
    ? [...selectedMatchForSettlement.squadTeam1, ...selectedMatchForSettlement.squadTeam2] 
    : [];

  const [settlementPicks, setSettlementPicks] = useState<Record<string, { answerId: string; answerText: string; statValue: string }>>({});

  const [settlementSummaryNote, setSettlementSummaryNote] = useState<string>('Match concluded. Official stats verified.');
  const [settlementSuccessMessage, setSettlementSuccessMessage] = useState<string>('');

  // User Search & Inspector State
  const [userSearch, setUserSearch] = useState<string>('');
  const [inspectedUser, setInspectedUser] = useState<UserAccount | null>(null);
  const [bonusCreditAmount, setBonusCreditAmount] = useState<number>(50);
  const [bonusCreditNote, setBonusCreditNote] = useState<string>('Promotional Skill Reward');

  // Create Match Modal State
  const [showCreateMatchModal, setShowCreateMatchModal] = useState<boolean>(false);
  const [newMatchTitle, setNewMatchTitle] = useState<string>('Delhi Capitals vs Sunrisers Hyderabad');
  const [newMatchSeries, setNewMatchSeries] = useState<string>('IPL 2026');
  const [newMatchVenue, setNewMatchVenue] = useState<string>('Arun Jaitley Stadium, Delhi');

  const currentMatchForSquad = matches.find((m) => m.id === selectedMatchForSquad) || matches[0];

  // Match Lifecycle Handlers
  const handleStartMatch = (match: CricketMatch) => {
    const updated: CricketMatch = {
      ...match,
      status: 'LIVE',
    };
    onUpdateMatch(updated);
  };

  const handleEndMatch = (match: CricketMatch) => {
    setSelectedMatchIdForSettlement(match.id);
    setAdminTab('settlement');
  };

  const handleToggleLock = (match: CricketMatch) => {
    const nextStatus: MatchStatus = match.status === 'LOCKED' ? 'UPCOMING' : 'LOCKED';
    onUpdateMatch({
      ...match,
      status: nextStatus,
    });
  };

  // Squad Management: Add Player
  const handleAddCustomPlayer = () => {
    if (!newPlayerName.trim() || !currentMatchForSquad) return;

    const teamKey = selectedTeamForSquad;
    const teamInfo = teamKey === 'team1' ? currentMatchForSquad.team1 : currentMatchForSquad.team2;

    const player: Player = {
      id: `p_${Date.now()}`,
      name: newPlayerName.trim(),
      shortName: newPlayerShortName.trim() || newPlayerName.trim(),
      team: teamInfo.code,
      teamName: teamInfo.name,
      role: newPlayerRole,
      avatar: `https://images.unsplash.com/photo-${1500648767791 + Math.floor(Math.random() * 500)}?w=150&auto=format&fit=crop&q=80`,
      country: newPlayerCountry,
      jerseyNumber: parseInt(newPlayerJersey) || 18,
      recentForm: newPlayerForm.split(',').map((s) => s.trim()),
      careerStatHighlight: newPlayerHighlight.trim(),
    };

    const updatedSquad = teamKey === 'team1' 
      ? [...currentMatchForSquad.squadTeam1, player]
      : [...currentMatchForSquad.squadTeam2, player];

    const updatedMatch: CricketMatch = {
      ...currentMatchForSquad,
      [teamKey === 'team1' ? 'squadTeam1' : 'squadTeam2']: updatedSquad,
    };

    onUpdateMatch(updatedMatch);
    setShowAddPlayerModal(false);
    setNewPlayerName('');
    setNewPlayerShortName('');
  };

  // Squad Management: Add Star Player Preset
  const handleAddStarPreset = (star: Omit<Player, 'team' | 'teamName'>) => {
    if (!currentMatchForSquad) return;

    const teamKey = selectedTeamForSquad;
    const teamInfo = teamKey === 'team1' ? currentMatchForSquad.team1 : currentMatchForSquad.team2;

    const player: Player = {
      ...star,
      id: `p_star_${star.id}_${Date.now()}`,
      team: teamInfo.code,
      teamName: teamInfo.name,
    };

    const updatedSquad = teamKey === 'team1' 
      ? [...currentMatchForSquad.squadTeam1, player]
      : [...currentMatchForSquad.squadTeam2, player];

    const updatedMatch: CricketMatch = {
      ...currentMatchForSquad,
      [teamKey === 'team1' ? 'squadTeam1' : 'squadTeam2']: updatedSquad,
    };

    onUpdateMatch(updatedMatch);
  };

  // Squad Management: Remove Player
  const handleRemovePlayer = (playerId: string) => {
    if (!currentMatchForSquad) return;

    const updatedTeam1 = currentMatchForSquad.squadTeam1.filter((p) => p.id !== playerId);
    const updatedTeam2 = currentMatchForSquad.squadTeam2.filter((p) => p.id !== playerId);

    const updatedMatch: CricketMatch = {
      ...currentMatchForSquad,
      squadTeam1: updatedTeam1,
      squadTeam2: updatedTeam2,
    };

    onUpdateMatch(updatedMatch);
  };

  // Settlement Submission
  const handleSettleSubmit = () => {
    if (!selectedMatchForSettlement) return;

    const answers: Record<string, { answerId: string; answerText: string; statValue: string }> = {};
    selectedMatchForSettlement.questions?.forEach((q) => {
      const pick = settlementPicks[q.id];
      if (pick) {
        answers[q.id] = {
          answerId: pick.answerId,
          answerText: pick.answerText,
          statValue: pick.statValue,
        };
      }
    });

    const results: MatchResults = {
      answers,
      settledAt: new Date().toISOString(),
      summaryNote: settlementSummaryNote,
    };

    onSettleMatch(selectedMatchForSettlement.id, results);
    setSettlementSuccessMessage(`Match ${selectedMatchForSettlement.title} ended and settled! All user payouts distributed.`);

    setTimeout(() => {
      setSettlementSuccessMessage('');
    }, 4000);
  };

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Transaction_ID,User_ID,Type,Amount_INR,Status,Timestamp,Reference_ID\n"
      + allTransactions.map(e => `${e.id},${e.userId},${e.type},${e.amount},${e.status},${e.timestamp},${e.referenceId}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `superover_financials_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredUsers = allUsers.filter((u) => {
    if (!userSearch.trim()) return true;
    const q = userSearch.toLowerCase();
    return u.name.toLowerCase().includes(q) || u.phone.includes(q) || u.email?.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/70 via-[#0D122B] to-indigo-950/70 border border-purple-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-purple-600/30">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-black text-[10px] uppercase border border-purple-500/30">
                Organizer Suite
              </span>
              <span className="text-xs text-slate-400">Match Lifecycle, Squads & User Intelligence</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white font-display mt-0.5">Admin Management Portal</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onCloseAdmin}
            className="px-4 py-2 rounded-xl bg-[#131A38] hover:bg-[#1A223E] text-slate-300 text-xs font-bold transition-colors border border-[#1A223E]"
            id="btn-admin-back-to-fan"
          >
            ← Fan Play View
          </button>
        </div>
      </div>

      {/* Admin Nav Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-[#1A223E]">
        {[
          { id: 'overview', label: 'Platform KPI', icon: BarChart3 },
          { id: 'publishing', label: 'Match Publishing', icon: Calendar },
          { id: 'questionBank', label: 'Question Bank', icon: Database },
          { id: 'matches', label: 'Match Lifecycle (Start/End)', icon: Trophy },
          { id: 'squads', label: 'Match Squad Viewer', icon: UserPlus },
          { id: 'settlement', label: 'Result Settlement & Payouts', icon: Sparkles },
          { id: 'jackpots', label: 'Jackpot Approvals', icon: Gift },
          { id: 'users', label: `User Inspector (${allUsers.length})`, icon: Users },
          { id: 'withdrawals', label: `Withdrawal Queue (${allTransactions.filter(t => t.type === 'WITHDRAWAL' && t.status === 'PENDING').length})`, icon: ArrowUpRight },
          { id: 'financials', label: 'Audit CSV & Rake', icon: FileSpreadsheet },
          { id: 'market', label: 'Live Market Analysis', icon: TrendingUp },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setAdminTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                adminTab === tab.id
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/30'
                  : 'bg-[#0D122B] text-slate-400 hover:text-white border border-[#1A223E]'
              }`}
              id={`admin-tab-${tab.id}`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT 1: OVERVIEW */}
      {adminTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-[#0D122B] border border-[#1A223E] shadow-md">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Total Pool Volume</span>
              <span className="text-2xl sm:text-3xl font-black text-white font-display mt-1 block">
                {formatINR(allSlips.reduce((sum, slip) => sum + (slip.entryFee || 0), 0))}
              </span>
              <span className="text-[11px] text-[#4ADE80] mt-1 block">From ₹25, ₹50, ₹100 entry fees</span>
            </div>

            <div className="p-5 rounded-2xl bg-[#0D122B] border border-[#1A223E] shadow-md">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Total Won Payouts</span>
              <span className="text-2xl sm:text-3xl font-black text-[#FFAA00] font-display mt-1 block">
                {formatINR(allTransactions.filter(t => t.type === 'CONTEST_PAYOUT').reduce((sum, t) => sum + t.amount, 0))}
              </span>
              <span className="text-[11px] text-slate-400 mt-1 block">0.5X, 3X, 10X & 100X Winners</span>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-950/40 to-[#0D122B] border border-purple-500/30 shadow-md">
              <span className="text-[10px] text-purple-300 font-bold uppercase tracking-wider block">Platform Net Rake</span>
              <span className="text-2xl sm:text-3xl font-black text-[#4ADE80] font-display mt-1 block">
                {formatINR(allSlips.reduce((sum, slip) => sum + (slip.entryFee || 0), 0) * 0.15)}
              </span>
              <span className="text-[11px] text-purple-400 mt-1 block">~15% House Commission</span>
            </div>

            <div className="p-5 rounded-2xl bg-[#0D122B] border border-[#1A223E] shadow-md">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Registered Players</span>
              <span className="text-2xl sm:text-3xl font-black text-white font-display mt-1 block">
                {allUsers.length} Users
              </span>
              <span className="text-[11px] text-slate-400 mt-1 block">{allSlips.length} Total Slips Placed</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="p-5 rounded-2xl bg-[#0D122B] border border-[#1A223E] space-y-4">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <Trophy className="w-4 h-4 text-[#FF6B00]" />
                Live & Upcoming Matches Status
              </h3>
              <div className="space-y-2.5">
                {matches.map((m) => (
                  <div key={m.id} className="p-3.5 rounded-xl bg-[#080C1D] border border-[#1A223E] flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white text-xs">{m.title}</div>
                      <div className="text-[11px] text-slate-400">Prize Pool: <span className="text-[#FFAA00] font-bold">{formatINR(allSlips.filter(s => s.matchId === m.id).reduce((sum, slip) => sum + slip.entryFee, 0))}</span> • {allSlips.filter(s => s.matchId === m.id).length} Entries</div>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                      m.status === 'LIVE' ? 'bg-rose-500/20 text-rose-400 animate-pulse' :
                      m.status === 'COMPLETED' ? 'bg-[#4ADE80]/20 text-[#4ADE80]' :
                      m.status === 'LOCKED' ? 'bg-[#FFAA00]/20 text-[#FFAA00]' : 'bg-sky-500/20 text-sky-300'
                    }`}>
                      {m.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#0D122B] border border-[#1A223E] space-y-4">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                Quick Organizer Controls
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Admins can start matches to go LIVE, lock slips before toss, add custom or star players to any squad, audit what each registered user played/deposited/withdrew, and settle official 6-stat winners with automated instant payouts.
              </p>
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => setAdminTab('matches')}
                  className="py-2.5 px-3 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 font-bold text-xs border border-purple-500/40 text-center"
                >
                  Manage Match Status →
                </button>
                <button
                  onClick={() => setAdminTab('squads')}
                  className="py-2.5 px-3 rounded-xl bg-[#FF6B00]/20 hover:bg-[#FF6B00]/30 text-[#FF8800] font-bold text-xs border border-[#FF6B00]/40 text-center"
                >
                  Edit Squad Players →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: MATCH LIFECYCLE (START / END / LOCK) */}
      {adminTab === 'matches' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-black text-white">Match Lifecycle Management</h2>
              <p className="text-xs text-slate-400">Start live matches, end/conclude fixtures, lock submissions, or edit match details.</p>
            </div>

            <button
              onClick={() => setShowCreateMatchModal(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md self-start sm:self-auto"
              id="btn-create-match-open"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create New Match</span>
            </button>
          </div>

          <div className="space-y-3">
            {matches.map((match) => (
              <div
                key={match.id}
                className="p-4 sm:p-5 rounded-2xl bg-[#0D122B] border border-[#1A223E] flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded bg-[#131A38] text-[#FFAA00] text-[10px] font-black uppercase border border-[#1A223E]">
                      {match.format}
                    </span>
                    <span className="text-xs text-slate-300 font-bold">{match.series}</span>
                    <span className="text-xs font-bold text-slate-600">•</span>
                    <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                      match.status === 'LIVE' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 animate-pulse' :
                      match.status === 'COMPLETED' ? 'bg-[#4ADE80]/20 text-[#4ADE80] border border-[#4ADE80]/30' :
                      match.status === 'LOCKED' ? 'bg-[#FFAA00]/20 text-[#FFAA00] border border-[#FFAA00]/30' : 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                    }`}>
                      {match.status === 'LIVE' ? '🔴 LIVE IN PLAY' : match.status}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-white">{match.title}</h3>
                  {match.status === 'LIVE' && match.liveScore && (
                    <div className="text-sm font-black text-[#FF6B00] bg-[#FF6B00]/10 px-3 py-1 rounded-lg border border-[#FF6B00]/20 inline-block mt-1 animate-pulse">
                      🔴 LIVE: {match.liveScore}
                    </div>
                  )}
                  <div className="text-xs text-slate-400 mt-1">
                    Venue: {match.venue} • Prize Pool: <span className="text-[#FFAA00] font-bold">
                      {formatINR(allSlips.filter(s => s.matchId === match.id).reduce((sum, slip) => sum + slip.entryFee, 0))}
                    </span> • {allSlips.filter(s => s.matchId === match.id).length} Entries Placed
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Squads: {match.team1.code} ({match.squadTeam1.length} players) vs {match.team2.code} ({match.squadTeam2.length} players)
                  </div>
                </div>

                {/* Match Action Buttons */}
                <div className="flex items-center gap-2 flex-wrap pt-2 lg:pt-0 border-t lg:border-t-0 border-[#1A223E]">
                  {/* START MATCH BUTTON */}
                  {match.status !== 'LIVE' && match.status !== 'COMPLETED' && (
                    <button
                      onClick={() => handleStartMatch(match)}
                      className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:brightness-110 text-white text-xs font-black flex items-center gap-1.5 shadow-md shadow-rose-600/30"
                      id={`btn-start-match-${match.id}`}
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Start Match (Go LIVE)</span>
                    </button>
                  )}

                  {/* END & SETTLE BUTTON */}
                  {match.status === 'LIVE' && (
                    <button
                      onClick={() => handleEndMatch(match)}
                      className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white text-xs font-black flex items-center gap-1.5 shadow-md shadow-purple-600/30"
                      id={`btn-end-settle-match-${match.id}`}
                    >
                      <Square className="w-3.5 h-3.5 fill-current" />
                      <span>End & Settle Payouts</span>
                    </button>
                  )}

                  {/* LOCK / UNLOCK BUTTON */}
                  {match.status === 'UPCOMING' && (
                    <button
                      onClick={() => handleToggleLock(match)}
                      className="px-3 py-2 rounded-xl bg-[#131A38] hover:bg-[#1A223E] text-slate-300 text-xs font-bold border border-[#1A223E] flex items-center gap-1"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>Lock</span>
                    </button>
                  )}

                  {match.status === 'LOCKED' && (
                    <button
                      onClick={() => handleToggleLock(match)}
                      className="px-3 py-2 rounded-xl bg-[#131A38] hover:bg-[#1A223E] text-slate-300 text-xs font-bold border border-[#1A223E] flex items-center gap-1"
                    >
                      <Unlock className="w-3.5 h-3.5" />
                      <span>Unlock</span>
                    </button>
                  )}

                  {/* SQUAD EDIT SHORTCUT */}
                  <button
                    onClick={() => {
                      setSelectedMatchForSquad(match.id);
                      setAdminTab('squads');
                    }}
                    className="px-3 py-2 rounded-xl bg-[#080C1D] hover:bg-[#131A38] text-[#FF8800] text-xs font-bold border border-[#FF6B00]/40 flex items-center gap-1"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Squad Players</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: SQUAD VIEWER */}
      {adminTab === 'squads' && (
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-black text-white">Match Squad Viewer</h2>
              <p className="text-xs text-emerald-400 font-bold flex items-center gap-1"><Sparkles className="w-3.5 h-3.5"/> Fully synchronized directly from CricAPI.</p>
            </div>
          </div>

          {/* Match & Team Selector */}
          <div className="p-4 rounded-2xl bg-[#0D122B] border border-[#1A223E] grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Select Match:</label>
              <select
                value={selectedMatchForSquad}
                onChange={(e) => setSelectedMatchForSquad(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white text-xs font-bold focus:outline-none focus:border-[#FF6B00]"
              >
                {matches.map((m) => (
                  <option key={m.id} value={m.id}>{m.title} ({m.series})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Select Squad Team:</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSelectedTeamForSquad('team1')}
                  className={`py-2 px-3 rounded-xl text-xs font-black transition-all ${
                    selectedTeamForSquad === 'team1'
                      ? 'bg-gradient-to-r from-[#FF6B00] to-[#FF8800] text-white shadow-md'
                      : 'bg-[#080C1D] text-slate-400 border border-[#1A223E]'
                  }`}
                >
                  {currentMatchForSquad?.team1.name} ({currentMatchForSquad?.team1.code})
                </button>
                <button
                  onClick={() => setSelectedTeamForSquad('team2')}
                  className={`py-2 px-3 rounded-xl text-xs font-black transition-all ${
                    selectedTeamForSquad === 'team2'
                      ? 'bg-gradient-to-r from-[#FF6B00] to-[#FF8800] text-white shadow-md'
                      : 'bg-[#080C1D] text-slate-400 border border-[#1A223E]'
                  }`}
                >
                  {currentMatchForSquad?.team2.name} ({currentMatchForSquad?.team2.code})
                </button>
              </div>
            </div>
          </div>

          {/* Current Squad Player Cards */}
          <div className="space-y-2">
            <h3 className="text-xs font-black text-slate-300 uppercase tracking-wider">
              {selectedTeamForSquad === 'team1' ? currentMatchForSquad?.team1.name : currentMatchForSquad?.team2.name} Squad (
              {(selectedTeamForSquad === 'team1' ? currentMatchForSquad?.squadTeam1 : currentMatchForSquad?.squadTeam2)?.length || 0} Players)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(selectedTeamForSquad === 'team1' ? currentMatchForSquad?.squadTeam1 : currentMatchForSquad?.squadTeam2)?.map((player) => (
                <div
                  key={player.id}
                  className="p-3.5 rounded-xl bg-[#0D122B] border border-[#1A223E] flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <img src={player.avatar} alt={player.name} className="w-10 h-10 rounded-xl object-cover ring-1 ring-[#1A223E]" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-white">{player.name}</span>
                        <span className="px-1.5 py-0.2 rounded bg-[#131A38] text-[#FFAA00] text-[10px] font-black">
                          {player.role}
                        </span>
                        <span className="text-[10px] text-slate-400">{player.country}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5 truncate max-w-xs">{player.careerStatHighlight}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 4: RESULT SETTLEMENT */}
      {adminTab === 'settlement' && (
        <div className="space-y-5">
          <div>
            <h2 className="text-lg font-black text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#FFAA00]" />
              Match Result Settlement & Payout Engine
            </h2>
            <p className="text-xs text-slate-400">
              Input official player match stats for the 6 categories. The engine will instantly calculate accuracy scores and disburse winnings to all participating users.
            </p>
          </div>

          {settlementSuccessMessage && (
            <div className="p-4 rounded-2xl bg-[#4ADE80]/20 border border-[#4ADE80]/50 text-[#4ADE80] text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#4ADE80] flex-shrink-0" />
              <span>{settlementSuccessMessage}</span>
            </div>
          )}

          {/* Select Match */}
          <div className="p-4 rounded-2xl bg-[#0D122B] border border-[#1A223E] space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Select Match to End & Settle:
            </label>
            <select
              value={selectedMatchIdForSettlement}
              onChange={(e) => setSelectedMatchIdForSettlement(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white font-bold text-xs focus:outline-none focus:border-purple-400"
              id="select-match-to-settle"
            >
              {matches.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.title} ({m.series}) - Status: {m.status}
                </option>
              ))}
            </select>
          </div>

          {/* Questions Winners Form */}
          <div className="p-5 rounded-2xl bg-[#0D122B] border border-[#1A223E] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h3 className="text-sm font-extrabold text-white">Enter Official Question Answers</h3>
              <button
                onClick={async () => {
                  if (!selectedMatchForSettlement) return;
                  try {
                    const res = await api.autoDetectMatchResults(selectedMatchForSettlement.id);
                    if (res && res.answers) {
                      const newPicks: any = {};
                      Object.keys(res.answers).forEach(qId => {
                        newPicks[qId] = {
                          answerId: res.answers[qId] || '',
                          answerText: res.answers[qId] || '',
                          statValue: ''
                        };
                      });
                      setSettlementPicks(newPicks);
                      setSettlementSummaryNote(res.summaryNote || 'Auto-fetched successfully.');
                    }
                  } catch (error) {
                    console.error('Failed to auto-detect results', error);
                    alert('Failed to auto-detect results. Ensure you are an Admin and CricAPI is reachable.');
                  }
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:brightness-110 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-purple-600/20"
                id="btn-auto-detect-results"
              >
                <Sparkles className="w-4 h-4" />
                <span>✨ Auto-Detect Results via API</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedMatchForSettlement?.questions?.map((q) => {
                const currentPick = settlementPicks[q.id] || { answerId: '', answerText: '', statValue: '' };

                return (
                  <div key={q.id} className="p-3.5 rounded-xl bg-[#080C1D] border border-[#1A223E] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#FFAA00]">
                        {q.number}. {q.title} ({q.shortTitle})
                      </span>
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">Official Winner Answer/Player ID:</label>
                      {q.type === 'PLAYER' ? (
                        <select
                          value={currentPick.answerId}
                          onChange={(e) => {
                            const val = e.target.value;
                            const combinedSquad = [...(selectedMatchForSettlement.squadTeam1 || []), ...(selectedMatchForSettlement.squadTeam2 || [])];
                            const player = combinedSquad.find(p => p.id === val);
                            setSettlementPicks((prev) => ({
                              ...prev,
                              [q.id]: { ...currentPick, answerId: val, answerText: player ? player.name : val },
                            }));
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-[#0D122B] border border-[#1A223E] text-white text-xs focus:outline-none"
                        >
                          <option value="">Select a player...</option>
                          {[...(selectedMatchForSettlement.squadTeam1 || []), ...(selectedMatchForSettlement.squadTeam2 || [])].map((p: any) => (
                            <option key={p.id} value={p.id}>
                              {p.name} ({p.team})
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="text"
                          value={currentPick.answerId}
                          onChange={(e) => {
                            const val = e.target.value;
                            setSettlementPicks((prev) => ({
                              ...prev,
                              [q.id]: { ...currentPick, answerId: val, answerText: val },
                            }));
                          }}
                          placeholder="e.g. p_vkohli or Yes"
                          className="w-full px-3 py-1.5 rounded-lg bg-[#0D122B] border border-[#1A223E] text-white text-xs focus:outline-none"
                        />
                      )}
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">Official Stat Value / Figure:</label>
                      <input
                        type="text"
                        value={currentPick.statValue}
                        onChange={(e) => {
                          const val = e.target.value;
                          setSettlementPicks((prev) => ({
                            ...prev,
                            [q.id]: { ...currentPick, statValue: val },
                          }));
                        }}
                        placeholder="e.g. 86* off 46 balls or 3/18 (4 ov)"
                        className="w-full px-3 py-1.5 rounded-lg bg-[#0D122B] border border-[#1A223E] text-white text-xs focus:outline-none"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div>
              <label className="text-xs font-bold text-slate-400 block mb-1">Official Summary Note / Match Commentary:</label>
              <textarea
                value={settlementSummaryNote}
                onChange={(e) => setSettlementSummaryNote(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white text-xs focus:outline-none"
                rows={2}
              />
            </div>

            <button
              onClick={handleSettleSubmit}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 hover:brightness-110 active:scale-[0.99] text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 transition-all"
              id="btn-confirm-settlement"
            >
              <Sparkles className="w-4 h-4" />
              <span>Settle Match & Disburse Cash Payouts</span>
            </button>
          </div>
        </div>
      )}
      {/* TAB CONTENT: JACKPOT APPROVALS */}
      {adminTab === 'jackpots' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                <Gift className="w-5 h-5 text-amber-500" />
                6/6 Jackpot Approvals
              </h2>
              <p className="text-xs text-slate-400">Review and approve massive payouts for users who correctly guessed 6/6 stats.</p>
            </div>
          </div>

          <div className="space-y-3">
            {allSlips.filter(s => s.status === 'PENDING_APPROVAL').length === 0 ? (
              <div className="p-8 text-center bg-[#0D122B] border border-[#1A223E] rounded-2xl">
                <Gift className="w-12 h-12 text-slate-700 mx-auto mb-3" />
                <h3 className="text-white font-bold">No Pending Jackpots</h3>
                <p className="text-slate-400 text-sm mt-1">There are currently no 6/6 wins awaiting approval.</p>
              </div>
            ) : (
              allSlips.filter(s => s.status === 'PENDING_APPROVAL').map(slip => (
                <div key={slip.id} className="p-4 rounded-2xl bg-[#0D122B] border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-white">{slip.userName}</span>
                      <span className="text-xs text-slate-400">({slip.userPhone})</span>
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 text-[10px] font-black uppercase border border-amber-500/30">
                        {slip.multiplierWon}X JACKPOT
                      </span>
                    </div>
                    <div className="text-xs text-slate-300">
                      Match: <span className="font-bold">{slip.matchTitle}</span>
                    </div>
                    <div className="text-xs text-slate-300 mt-0.5">
                      Payout: <span className="font-mono font-black text-amber-500 text-lg ml-1">{formatINR(slip.payoutAmount || 0)}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onRejectJackpot(slip.id)}
                      className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 font-bold text-xs transition-colors border border-rose-500/20"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => onApproveJackpot(slip.id)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 transition-colors shadow-lg shadow-emerald-600/20"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      Approve Payout
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB CONTENT 5: USER INSPECTOR */}
      {adminTab === 'users' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-black text-white">Registered Users & KYC Intelligence</h2>
              <p className="text-xs text-slate-400">Click any user to inspect their predictions played, money added, withdrawals, and balances.</p>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search user name or phone..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="pl-9 pr-3 py-2 rounded-xl bg-[#080C1D] border border-[#1A223E] text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-400"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredUsers.map((u) => {
              const userSlipsCount = allSlips.filter((s) => s.userId === u.id).length;
              const userDepositsCount = allTransactions.filter((t) => t.userId === u.id && t.type === 'DEPOSIT').length;

              return (
                <div
                  key={u.id}
                  className="p-4 rounded-2xl bg-[#0D122B] border border-[#1A223E] flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-purple-500/40 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <img src={u.avatar} alt={u.name} className="w-11 h-11 rounded-xl object-cover ring-1 ring-[#1A223E]" />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-black text-white">{u.name}</span>
                        <span className={`px-2 py-0.2 rounded text-[10px] font-bold ${
                          u.kycStatus === 'VERIFIED' ? 'bg-[#4ADE80]/20 text-[#4ADE80]' : 'bg-[#FFAA00]/20 text-[#FFAA00]'
                        }`}>
                          KYC: {u.kycStatus}
                        </span>
                        {u.isBlocked && (
                          <span className="px-2 py-0.2 rounded bg-rose-500/20 text-rose-400 text-[10px] font-bold">
                            BLOCKED
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        {u.phone} • Joined {u.joinedDate} • {userSlipsCount} Slips • {userDepositsCount} Deposits
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() => setInspectedUser(u)}
                      className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-black flex items-center gap-1.5 shadow-md shadow-purple-600/30"
                      id={`btn-inspect-user-${u.id}`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect Activity</span>
                    </button>

                    <button
                      onClick={() => onAddBonusCash(u.id, 50, 'Admin Promotional Reward')}
                      className="px-2.5 py-1.5 rounded-xl bg-[#FF6B00]/20 hover:bg-[#FF6B00]/30 text-[#FF8800] text-xs font-bold border border-[#FF6B00]/30"
                    >
                      +₹50 Bonus
                    </button>

                    <button
                      onClick={() => onUpdateUser({ ...u, isBlocked: !u.isBlocked })}
                      className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border ${
                        u.isBlocked
                          ? 'bg-[#4ADE80]/20 text-[#4ADE80] border-[#4ADE80]/30'
                          : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                      }`}
                    >
                      {u.isBlocked ? 'Unblock' : 'Block'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* USER INSPECTION MODAL / DRAWER */}
      {inspectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-[#050816]/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-[#0D122B] border border-purple-500/40 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden my-auto p-5 sm:p-6 space-y-5 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-[#1A223E] flex-shrink-0">
              <div className="flex items-center gap-3">
                <img src={inspectedUser.avatar} alt={inspectedUser.name} className="w-10 h-10 rounded-xl object-cover ring-2 ring-purple-500" />
                <div>
                  <h3 className="text-base font-black text-white font-display flex items-center gap-2">
                    {inspectedUser.name}
                    <span className="text-xs text-slate-400">({inspectedUser.phone})</span>
                  </h3>
                  <p className="text-xs text-slate-400">UPI: {inspectedUser.upiId || 'Not specified'} • KYC: {inspectedUser.kycStatus}</p>
                </div>
              </div>

              <button
                onClick={() => setInspectedUser(null)}
                className="w-8 h-8 rounded-lg bg-[#131A38] text-slate-400 hover:text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-y-auto space-y-4 pr-1">
              {/* Quick User Admin Actions */}
              <div className="p-3.5 rounded-xl bg-[#080C1D] border border-[#1A223E] flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-bold">KYC Action:</span>
                  <button
                    onClick={() => {
                      const next = inspectedUser.kycStatus === 'VERIFIED' ? 'UNVERIFIED' : 'VERIFIED';
                      const updated = { ...inspectedUser, kycStatus: next as any };
                      onUpdateUser(updated);
                      setInspectedUser(updated);
                    }}
                    className="px-3 py-1 rounded-lg bg-[#4ADE80]/20 text-[#4ADE80] font-bold text-xs border border-[#4ADE80]/30"
                  >
                    {inspectedUser.kycStatus === 'VERIFIED' ? 'Revoke KYC' : 'Verify KYC ✓'}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={bonusCreditAmount}
                    onChange={(e) => setBonusCreditAmount(Number(e.target.value))}
                    className="w-20 px-2 py-1 rounded-lg bg-[#0D122B] border border-[#1A223E] text-white text-xs font-mono text-center"
                    placeholder="Amount"
                  />
                  <button
                    onClick={() => {
                      onAddBonusCash(inspectedUser.id, bonusCreditAmount, bonusCreditNote);
                    }}
                    className="px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1"
                  >
                    <Gift className="w-3.5 h-3.5" />
                    <span>Credit ₹{bonusCreditAmount} Bonus</span>
                  </button>
                </div>
              </div>

              {/* What User Played (Prediction Slips) */}
              <div className="space-y-2">
                <h4 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 text-[#FFAA00]" />
                  Contests & Slips Played ({allSlips.filter(s => s.userId === inspectedUser.id).length})
                </h4>
                {allSlips.filter(s => s.userId === inspectedUser.id).length === 0 ? (
                  <div className="p-4 rounded-xl bg-[#080C1D] text-slate-400 text-xs text-center">
                    User has not placed any prediction slips yet.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {allSlips.filter(s => s.userId === inspectedUser.id).map(slip => (
                      <div key={slip.id} className="p-3 rounded-xl bg-[#080C1D] border border-[#1A223E] flex items-center justify-between text-xs">
                        <div>
                          <div className="font-bold text-white">{slip.matchTitle}</div>
                          <div className="text-[11px] text-slate-400">Entry: {formatINR(slip.entryFee)} • Submitted: {new Date(slip.submittedAt).toLocaleDateString()}</div>
                        </div>
                        <div className="text-right">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                            slip.status === 'WON' ? 'bg-[#4ADE80]/20 text-[#4ADE80]' :
                            slip.status === 'PENDING' ? 'bg-sky-500/20 text-sky-300' : 'bg-slate-800 text-slate-400'
                          }`}>
                            {slip.status} {slip.multiplierWon ? `(${slip.multiplierWon}X)` : ''}
                          </span>
                          {slip.payoutAmount ? (
                            <span className="block text-[#4ADE80] font-black text-xs">+{formatINR(slip.payoutAmount)}</span>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* User Money Added (Deposits) */}
              <div className="space-y-2">
                <h4 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                  <ArrowDownLeft className="w-3.5 h-3.5 text-[#4ADE80]" />
                  Money Added (Deposits) ({allTransactions.filter(t => t.userId === inspectedUser.id && t.type === 'DEPOSIT').length})
                </h4>
                <div className="space-y-1.5">
                  {allTransactions.filter(t => t.userId === inspectedUser.id && t.type === 'DEPOSIT').map(tx => (
                    <div key={tx.id} className="p-2.5 rounded-lg bg-[#080C1D] border border-[#1A223E] flex items-center justify-between text-xs">
                      <div>
                        <span className="text-white font-bold">{tx.description}</span>
                        <span className="text-slate-500 text-[10px] block">{new Date(tx.timestamp).toLocaleString()} • Ref: {tx.referenceId}</span>
                      </div>
                      <span className="text-[#4ADE80] font-black">+{formatINR(tx.amount)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* User Withdrawals */}
              <div className="space-y-2">
                <h4 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5 text-sky-400" />
                  Withdrawal Requests ({allTransactions.filter(t => t.userId === inspectedUser.id && t.type === 'WITHDRAWAL').length})
                </h4>
                <div className="space-y-1.5">
                  {allTransactions.filter(t => t.userId === inspectedUser.id && t.type === 'WITHDRAWAL').map(tx => (
                    <div key={tx.id} className="p-2.5 rounded-lg bg-[#080C1D] border border-[#1A223E] flex items-center justify-between text-xs">
                      <div>
                        <span className="text-white font-bold">{tx.description}</span>
                        <span className="text-slate-500 text-[10px] block">{new Date(tx.timestamp).toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-black">{formatINR(tx.amount)}</span>
                        {tx.status === 'PENDING' ? (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => onApproveWithdrawal(tx.id)}
                              className="px-2 py-0.5 rounded bg-[#4ADE80] text-slate-950 font-black text-[10px]"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => onRejectWithdrawal(tx.id)}
                              className="px-2 py-0.5 rounded bg-rose-500 text-white font-bold text-[10px]"
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#131A38] text-slate-300">
                            {tx.status}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 6: WITHDRAWALS APPROVAL QUEUE */}
      {adminTab === 'withdrawals' && (
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-black text-white">Central Withdrawal Processing Queue</h2>
            <p className="text-xs text-slate-400">Review pending user cashouts to bank UPI accounts.</p>
          </div>

          <div className="space-y-3">
            {allTransactions.filter((t) => t.type === 'WITHDRAWAL').length === 0 ? (
              <div className="p-8 text-center rounded-2xl bg-[#0D122B] border border-[#1A223E] text-xs text-slate-400">
                No withdrawal requests found in ledger.
              </div>
            ) : (
              allTransactions.filter((t) => t.type === 'WITHDRAWAL').map((tx) => (
                <div
                  key={tx.id}
                  className="p-4 rounded-2xl bg-[#0D122B] border border-[#1A223E] flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-bold text-white">{tx.description}</div>
                    <div className="text-slate-400 text-[11px] mt-0.5">
                      {new Date(tx.timestamp).toLocaleString()} • Ref: {tx.referenceId}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm font-black text-white">{formatINR(tx.amount)}</span>
                    {tx.status === 'PENDING' ? (
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => onApproveWithdrawal(tx.id)}
                          className="px-3 py-1.5 rounded-lg bg-[#4ADE80] hover:brightness-110 text-slate-950 font-black text-xs shadow-sm"
                        >
                          Approve IMPS
                        </button>
                        <button
                          onClick={() => onRejectWithdrawal(tx.id)}
                          className="px-3 py-1.5 rounded-lg bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${
                        tx.status === 'SUCCESS' ? 'bg-[#4ADE80]/20 text-[#4ADE80] border-[#4ADE80]/30' : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                      }`}>
                        {tx.status}
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB CONTENT 7: FINANCIALS & CSV AUDIT */}
      {adminTab === 'financials' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-white">Financial Audit & CSV Export</h2>
              <p className="text-xs text-slate-400">Full platform transactional audit trail.</p>
            </div>

            <button
              onClick={handleExportCSV}
              className="px-4 py-2 rounded-xl bg-[#4ADE80] hover:brightness-110 text-slate-950 font-black text-xs flex items-center gap-2 shadow-md"
              id="btn-export-financials-csv"
            >
              <Download className="w-4 h-4" />
              <span>Export Ledger CSV</span>
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-[#0D122B] border border-[#1A223E] space-y-3">
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-[#080C1D] rounded-xl border border-[#1A223E]">
                <span className="text-slate-400 block">Total Pool Volume</span>
                <span className="text-base font-black text-white mt-0.5 block">{formatINR(metrics.totalPoolCollected)}</span>
              </div>
              <div className="p-3 bg-[#080C1D] rounded-xl border border-[#1A223E]">
                <span className="text-slate-400 block">Total Paid Out</span>
                <span className="text-base font-black text-[#FFAA00] mt-0.5 block">{formatINR(metrics.totalPayoutsDisbursed)}</span>
              </div>
              <div className="p-3 bg-[#080C1D] rounded-xl border border-[#1A223E]">
                <span className="text-slate-400 block">Platform Net Commission</span>
                <span className="text-base font-black text-[#4ADE80] mt-0.5 block">{formatINR(metrics.platformProfit)}</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#1A223E] text-slate-400">
                    <th className="py-2">Tx ID</th>
                    <th className="py-2">Type</th>
                    <th className="py-2">Description</th>
                    <th className="py-2">Amount</th>
                    <th className="py-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1A223E]">
                  {allTransactions.slice(0, 10).map((tx) => (
                    <tr key={tx.id}>
                      <td className="py-2.5 font-mono text-[11px] text-slate-400">{tx.id}</td>
                      <td className="py-2.5 font-bold text-slate-300">{tx.type}</td>
                      <td className="py-2.5 text-slate-300">{tx.description}</td>
                      <td className="py-2.5 font-black text-white">{formatINR(tx.amount)}</td>
                      <td className="py-2.5">
                        <span className="px-1.5 py-0.2 rounded bg-[#131A38] text-slate-300 text-[10px]">
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ADD CUSTOM PLAYER MODAL */}
      {showAddPlayerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050816]/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-md bg-[#0D122B] border border-[#1A223E] rounded-2xl shadow-2xl overflow-hidden my-auto p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-white font-display">Add Player to Squad</h3>
              <button onClick={() => setShowAddPlayerModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-bold block mb-1">Player Full Name: *</label>
                <input
                  type="text"
                  placeholder="e.g. Jasprit Bumrah"
                  value={newPlayerName}
                  onChange={(e) => setNewPlayerName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white focus:outline-none focus:border-[#FF6B00]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Short Name:</label>
                  <input
                    type="text"
                    placeholder="e.g. J. Bumrah"
                    value={newPlayerShortName}
                    onChange={(e) => setNewPlayerShortName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white focus:outline-none focus:border-[#FF6B00]"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">Playing Role: *</label>
                  <select
                    value={newPlayerRole}
                    onChange={(e) => setNewPlayerRole(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white focus:outline-none focus:border-[#FF6B00]"
                  >
                    <option value="BAT">Batter (BAT)</option>
                    <option value="BOWL">Bowler (BOWL)</option>
                    <option value="AR">All-Rounder (AR)</option>
                    <option value="WK">Wicket-Keeper (WK)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Country:</label>
                  <input
                    type="text"
                    placeholder="IND"
                    value={newPlayerCountry}
                    onChange={(e) => setNewPlayerCountry(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white focus:outline-none focus:border-[#FF6B00]"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">Jersey Number:</label>
                  <input
                    type="number"
                    value={newPlayerJersey}
                    onChange={(e) => setNewPlayerJersey(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white focus:outline-none focus:border-[#FF6B00]"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Career Highlight Stat:</label>
                <input
                  type="text"
                  placeholder="Avg: 48.5 • SR: 154.2 • 2500+ Runs"
                  value={newPlayerHighlight}
                  onChange={(e) => setNewPlayerHighlight(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white focus:outline-none focus:border-[#FF6B00]"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Recent Form (comma-separated):</label>
                <input
                  type="text"
                  placeholder="78*, 45, 12, 89, 34"
                  value={newPlayerForm}
                  onChange={(e) => setNewPlayerForm(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white focus:outline-none focus:border-[#FF6B00]"
                />
              </div>

              <button
                onClick={handleAddCustomPlayer}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#FF8800] text-white font-black text-xs shadow-md shadow-[#FF6B00]/30 hover:brightness-110"
              >
                Save Player to Squad
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE MATCH MODAL */}
      {showCreateMatchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050816]/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-md bg-[#0D122B] border border-[#1A223E] rounded-2xl shadow-2xl overflow-hidden my-auto p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-white font-display">Create New Cricket Match</h3>
              <button onClick={() => setShowCreateMatchModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-bold block mb-1">Match Title:</label>
                <input
                  type="text"
                  value={newMatchTitle}
                  onChange={(e) => setNewMatchTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white focus:outline-none focus:border-purple-400"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Series / Tournament:</label>
                <input
                  type="text"
                  value={newMatchSeries}
                  onChange={(e) => setNewMatchSeries(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white focus:outline-none focus:border-purple-400"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Venue Stadium & City:</label>
                <input
                  type="text"
                  value={newMatchVenue}
                  onChange={(e) => setNewMatchVenue(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white focus:outline-none focus:border-purple-400"
                />
              </div>

              <button
                onClick={() => {
                  const newMatch: CricketMatch = {
                    id: `match_${Date.now()}`,
                    title: newMatchTitle,
                    series: newMatchSeries,
                    matchNumber: `Match ${matches.length + 1}`,
                    team1: {
                      code: 'DC',
                      name: 'Delhi Capitals',
                      shortName: 'DC',
                      color: '#004C97',
                      accentColor: '#EF1B23',
                      flagOrLogo: '🐯',
                    },
                    team2: {
                      code: 'SRH',
                      name: 'Sunrisers Hyderabad',
                      shortName: 'SRH',
                      color: '#F26522',
                      accentColor: '#000000',
                      flagOrLogo: '🦅',
                    },
                    venue: newMatchVenue,
                    city: 'Delhi',
                    startTime: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
                    lockTime: new Date(Date.now() + 7 * 60 * 60 * 1000 + 50 * 60 * 1000).toISOString(),
                    status: 'UPCOMING',
                    format: 'T20',
                    totalPool: 150000,
                    totalEntries: 620,
                    entryFees: [25, 50, 100],
                    squadTeam1: [
                      {
                        id: `p_dc_${Date.now()}_1`,
                        name: 'Rishabh Pant',
                        shortName: 'R. Pant',
                        team: 'DC',
                        teamName: 'Delhi Capitals',
                        role: 'WK',
                        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
                        country: 'IND',
                        recentForm: ['58', '44', '89*'],
                        careerStatHighlight: 'SR: 155.2 • 3500+ Runs',
                      },
                      {
                        id: `p_dc_${Date.now()}_2`,
                        name: 'Kuldeep Yadav',
                        shortName: 'K. Yadav',
                        team: 'DC',
                        teamName: 'Delhi Capitals',
                        role: 'BOWL',
                        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
                        country: 'IND',
                        recentForm: ['3/20', '2/18'],
                        careerStatHighlight: 'Econ: 6.8',
                      },
                    ],
                    squadTeam2: [
                      {
                        id: `p_srh_${Date.now()}_1`,
                        name: 'Travis Head',
                        shortName: 'T. Head',
                        team: 'SRH',
                        teamName: 'Sunrisers Hyderabad',
                        role: 'BAT',
                        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
                        country: 'AUS',
                        recentForm: ['89', '102*'],
                        careerStatHighlight: 'SR: 189.5',
                      },
                      {
                        id: `p_srh_${Date.now()}_2`,
                        name: 'Pat Cummins',
                        shortName: 'P. Cummins',
                        team: 'SRH',
                        teamName: 'Sunrisers Hyderabad',
                        role: 'BOWL',
                        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
                        country: 'AUS',
                        recentForm: ['3/22', '2/19'],
                        careerStatHighlight: 'Hat-trick hero',
                      },
                    ],
                    questions: DEFAULT_QUESTIONS,
                  };

                  onCreateMatch(newMatch);
                  setShowCreateMatchModal(false);
                }}
                className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md shadow-purple-600/30"
              >
                Create Match & Publish
              </button>
            </div>
          </div>
        </div>
      )}
      
      {adminTab === 'publishing' && (
        <div className="space-y-4">
          {publishingView === 'list' && (
            <MatchSelectionManager 
              allMatches={matches}
              onMatchesDrafted={() => {}} // Could reload data if necessary
              onGoToDrafts={(matchId: string) => { setConfiguringMatchId(matchId); setPublishingView('config'); }}
            />
          )}
          {publishingView === 'config' && configuringMatchId && (
            <MatchConfigurator 
              matchId={configuringMatchId}
              onBack={() => setPublishingView('list')}
              onMatchPublished={() => { setPublishingView('list'); setAdminTab('matches'); }}
            />
          )}
        </div>
      )}

      {adminTab === 'questionBank' && (
        <QuestionBankManager />
      )}

      {adminTab === 'market' && (
        <LiveMarketAnalysis matches={matches} slips={allSlips} />
      )}
    </div>
  );
};
