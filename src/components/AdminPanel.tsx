import React, { useState, useEffect } from 'react';
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
import { ManualMatchCreator } from './admin/ManualMatchCreator';
import { MatchSelectionManager } from './admin/MatchSelectionManager';
import { MatchConfigurator } from './admin/MatchConfigurator';
import { ClientDetailView } from './admin/ClientDetailView';
import { LiveMatchDashboard } from './admin/LiveMatchDashboard';
import { MatchHistory } from './admin/MatchHistory';
import { SettingsManager } from './admin/SettingsManager';
import { ReportsManager } from './admin/ReportsManager';
import { getTeamLogoUrl } from '../utils/teamLogoHelper';

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
  onReloadData?: () => void;
}

function getMatchWinnerHeadline(m: any) {
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
  onReloadData,
}) => {
  const [adminTab, setAdminTab] = useState<'overview' | 'publishing' | 'questionBank' | 'matches' | 'squads' | 'settlement' | 'jackpots' | 'users' | 'withdrawals' | 'financials' | 'market' | 'settings'>('overview');
  
  const [loadedUsers, setLoadedUsers] = useState<UserAccount[]>(allUsers);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);

  useEffect(() => {
    if (adminTab === 'users' && loadedUsers.length === 0) {
      setIsLoadingUsers(true);
      import('../services/api').then(({ api }) => {
        api.getAllUsers().then((res: any) => {
          setLoadedUsers(res);
          setIsLoadingUsers(false);
        });
      });
    }
  }, [adminTab, loadedUsers.length]);

  // Publishing State
  const [publishingView, setPublishingView] = useState<'list' | 'config'>('list');
  const [configuringMatchId, setConfiguringMatchId] = useState<string | null>(null);

  // Published Squad Matches (Strictly UPCOMING / LIVE / LOCKED matches with configured questions)
  const publishedMatches = matches.filter(m => 
    (m.status === 'UPCOMING' || m.status === 'LIVE' || m.status === 'LOCKED') &&
    Array.isArray(m.questions) && m.questions.length > 0
  );
  const defaultSquadMatchId = publishedMatches[0]?.id || '';
  const [selectedMatchForSquad, setSelectedMatchForSquad] = useState<string>(defaultSquadMatchId);
  const [selectedTeamForSquad, setSelectedTeamForSquad] = useState<'team1' | 'team2'>('team1');
  const [matchesView, setMatchesView] = useState<'LIFECYCLE' | 'LIVE_DASHBOARD' | 'HISTORY'>('LIFECYCLE');

  // Squad Viewer Filter State
  const [squadRoleFilter, setSquadRoleFilter] = useState<string>('ALL');
  const [squadPlayingFilter, setSquadPlayingFilter] = useState<'ALL' | 'PLAYING_XI' | 'BENCH'>('ALL');
  const [squadSearchQuery, setSquadSearchQuery] = useState<string>('');

  const currentMatchForSquad = publishedMatches.find((m) => m.id === selectedMatchForSquad) || publishedMatches[0];

  // Add Player Modal State
  const [showAddPlayerModal, setShowAddPlayerModal] = useState<boolean>(false);
  const [newPlayerName, setNewPlayerName] = useState<string>('');
  const [newPlayerShortName, setNewPlayerShortName] = useState<string>('');
  const [newPlayerRole, setNewPlayerRole] = useState<PlayerRole>('BAT');
  const [newPlayerCountry, setNewPlayerCountry] = useState<string>('IND');
  const [newPlayerJersey, setNewPlayerJersey] = useState<string>('18');
  const [newPlayerHighlight, setNewPlayerHighlight] = useState<string>('Avg: 42.5 • SR: 148.0');
  const [newPlayerForm, setNewPlayerForm] = useState<string>('54, 78*, 31, 89, 45');

  // Settlement Form State (Strictly published/live matches with configured questions)
  const settlementMatches = matches.filter(m => 
    (m.status === 'LIVE' || m.status === 'LOCKED' || m.status === 'UPCOMING' || m.status === 'COMPLETED') &&
    Array.isArray(m.questions) && m.questions.length > 0
  ).sort((a, b) => {
    const order: Record<string, number> = { LIVE: 1, LOCKED: 2, UPCOMING: 3, COMPLETED: 4 };
    return (order[a.status] || 5) - (order[b.status] || 5);
  });

  const defaultSettlementMatchId = settlementMatches[0]?.id || '';
  const [selectedMatchIdForSettlement, setSelectedMatchIdForSettlement] = useState<string>(defaultSettlementMatchId);
  const selectedMatchForSettlement = settlementMatches.find((m) => m.id === selectedMatchIdForSettlement) || settlementMatches[0];

  const squadForSettlement = selectedMatchForSettlement 
    ? [...(selectedMatchForSettlement.squadTeam1 || []), ...(selectedMatchForSettlement.squadTeam2 || [])] 
    : [];

  const [settlementPicks, setSettlementPicks] = useState<Record<string, { answerId: string; answerText: string; statValue: string }>>({});
  const [settlementSummaryNote, setSettlementSummaryNote] = useState<string>('Match concluded. Official stats verified.');
  const [settlementSuccessMessage, setSettlementSuccessMessage] = useState<string>('');

  useEffect(() => {
    if (selectedMatchForSettlement) {
      setSettlementSummaryNote(getMatchWinnerHeadline(selectedMatchForSettlement));
      if (selectedMatchForSettlement.actualResults?.answers) {
        const existingAnswers = selectedMatchForSettlement.actualResults.answers;
        const newPicks: any = {};
        Object.keys(existingAnswers).forEach((qId) => {
          const val = existingAnswers[qId];
          const ansId = typeof val === 'object' && val !== null ? (val.answerId || val.answerText) : val;
          const ansText = typeof val === 'object' && val !== null ? (val.answerText || val.answerId) : val;
          newPicks[qId] = {
            answerId: ansId || '',
            answerText: ansText || '',
            statValue: typeof val === 'object' && val !== null ? (val.statValue || '') : ''
          };
        });
        setSettlementPicks(newPicks);
      }
    }
  }, [selectedMatchForSettlement?.id]);

  // User Search & Inspector State
  const [userSearch, setUserSearch] = useState<string>('');
  const [inspectedUser, setInspectedUser] = useState<UserAccount | null>(null);
  const [bonusCreditAmount, setBonusCreditAmount] = useState<number>(50);
  const [bonusCreditNote, setBonusCreditNote] = useState<string>('Promotional Skill Reward');
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);

  // Create Match Modal State
  const [showCreateMatchModal, setShowCreateMatchModal] = useState<boolean>(false);
  const [newMatchTitle, setNewMatchTitle] = useState<string>('India vs Australia');
  const [newMatchSeries, setNewMatchSeries] = useState<string>('ICC T20 World Cup 2026');
  const [newMatchFormat, setNewMatchFormat] = useState<string>('T20');
  const [newMatchTeam1Name, setNewMatchTeam1Name] = useState<string>('India');
  const [newMatchTeam1Code, setNewMatchTeam1Code] = useState<string>('IND');
  const [newMatchTeam2Name, setNewMatchTeam2Name] = useState<string>('Australia');
  const [newMatchTeam2Code, setNewMatchTeam2Code] = useState<string>('AUS');
  const [newMatchVenue, setNewMatchVenue] = useState<string>('Wankhede Stadium, Mumbai');
  const [newMatchDateTime, setNewMatchDateTime] = useState<string>(() => {
    const d = new Date(Date.now() + 2 * 60 * 60 * 1000);
    const tzOffset = d.getTimezoneOffset() * 60000;
    return new Date(d.getTime() - tzOffset).toISOString().slice(0, 16);
  });
  // Match Lifecycle Handlers
  const handleStartMatch = (match: CricketMatch) => {
    const updated: CricketMatch = {
      ...match,
      status: 'LIVE',
      liveScore: match.liveScore || `${match.team1.code} 0/0 (0.1 ov) • In Play`,
    };
    onUpdateMatch(updated);
  };

  const handleUpdateLiveScore = (match: CricketMatch, score: string) => {
    const updated: CricketMatch = {
      ...match,
      liveScore: score,
    };
    onUpdateMatch(updated);
  };

  const handleDeleteMatch = async (matchId: string) => {
    if (confirm('Are you sure you want to permanently delete this match and contest?')) {
      try {
        await api.deleteMatchAdmin(matchId);
        if (onReloadData) {
          await onReloadData();
        }
      } catch (e) {
        console.error('Failed to delete match:', e);
        alert('Failed to delete match.');
      }
    }
  };

  const handleRevertToScheduled = (match: CricketMatch) => {
    const nextStatus: MatchStatus = match.questions && match.questions.length > 0 ? 'UPCOMING' : 'FETCHED';
    onUpdateMatch({
      ...match,
      status: nextStatus,
    });
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

  const filteredUsers = loadedUsers.filter((u) => {
    if (!userSearch.trim()) return true;
    const q = userSearch.toLowerCase();
    return u.name.toLowerCase().includes(q) || u.phone.includes(q) || u.email?.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-[#FF6B00]/20 via-[#0D122B] to-[#FF8800]/10 border border-[#FF6B00]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF6B00] to-[#FF8800] text-slate-950 flex items-center justify-center shadow-lg shadow-[#FF6B00]/30">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[#FF6B00]/20 text-[#FF8800] font-black text-[10px] uppercase border border-[#FF6B00]/30">
                Organizer Suite
              </span>
              <span className="text-xs text-slate-400">Match Lifecycle, Squads & User Intelligence</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white font-display mt-0.5">Admin Management Portal</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={async () => {
              if (window.confirm("⚠️ Reset All Contests & Start Fresh?\n\nThis will clear old published/locked test matches, remove test slips, and regenerate clean upcoming match feeds so you can test one match from scratch.")) {
                try {
                  const res = await fetch('/api/admin/reset-matches', { method: 'POST' });
                  const data = await res.json();
                  alert(data.message || 'Contests reset successfully!');
                  window.location.reload();
                } catch (e) {
                  console.error(e);
                  alert('Failed to reset matches.');
                }
              }
            }}
            className="px-3.5 py-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 text-xs font-black transition-all flex items-center gap-1.5 shadow-sm"
            id="btn-admin-reset-all"
          >
            <Trash2 className="w-3.5 h-3.5 text-rose-400" />
            <span>Reset All (Start Fresh)</span>
          </button>
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
          { id: 'publishing', label: 'Create Match (Manual)', icon: PlusCircle },
          { id: 'questionBank', label: 'Question Bank', icon: Database },
          { id: 'matches', label: 'Match Lifecycle (Start/End)', icon: Trophy },
          { id: 'squads', label: 'Match Squad Viewer', icon: UserPlus },
          { id: 'settlement', label: 'Result Settlement & Payouts', icon: Sparkles },
          { id: 'jackpots', label: 'Jackpot Approvals', icon: Gift },
          { id: 'users', label: `User Inspector (${metrics.totalUsers})`, icon: Users },
          { id: 'withdrawals', label: `Withdrawal Queue (${allTransactions.filter(t => t.type === 'WITHDRAWAL' && t.status === 'PENDING').length})`, icon: ArrowUpRight },
          { id: 'financials', label: 'Financial Audit & CSV', icon: FileSpreadsheet },
          { id: 'market', label: 'Live Market Analysis', icon: TrendingUp },
          { id: 'settings', label: 'Platform Settings', icon: Settings },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setAdminTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                adminTab === tab.id
                  ? 'bg-gradient-to-r from-[#FF6B00] to-[#FF8800] text-slate-950 font-black shadow-md shadow-[#FF6B00]/30'
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

            <div className="p-5 rounded-2xl bg-[#0D122B] border border-[#1A223E] shadow-md">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Registered Players</span>
              <span className="text-2xl sm:text-3xl font-black text-white font-display mt-1 block">
                {metrics.totalUsers} Users
              </span>
              <span className="text-[11px] text-slate-400 mt-1 block">{allSlips.length} Total Slips Placed</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="p-5 rounded-2xl bg-[#0D122B] border border-[#1A223E] space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-[#FF6B00]" />
                  Live & Upcoming Matches Status
                </h3>
                <span className="text-[11px] text-slate-400 font-bold">Upcoming 7 Days</span>
              </div>
              <div className="space-y-2.5">
                {(() => {
                  const nowMs = Date.now();
                  const upcomingAndLive = matches.filter(
                    (m) => m.status === 'LIVE' || new Date(m.startTime).getTime() > nowMs
                  );

                  if (upcomingAndLive.length === 0) {
                    return (
                      <div className="p-6 text-center text-xs text-slate-500 bg-[#080C1D] rounded-xl border border-[#1A223E]">
                        No active live or upcoming matches scheduled for the next 7 days.
                      </div>
                    );
                  }

                  return upcomingAndLive.slice(0, 5).map((m) => (
                    <div key={m.id} className="p-3.5 rounded-xl bg-[#080C1D] border border-[#1A223E] flex items-center justify-between">
                      <div>
                        <div className="font-bold text-white text-xs">{m.title}</div>
                        <div className="text-[11px] text-slate-400">
                          {new Date(m.startTime).toLocaleDateString()} {new Date(m.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • Prize Pool: <span className="text-[#FFAA00] font-bold">{formatINR(allSlips.filter(s => s.matchId === m.id).reduce((sum, slip) => sum + slip.entryFee, 0))}</span>
                        </div>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                        m.status === 'LIVE' ? 'bg-rose-500/20 text-rose-400 animate-pulse' :
                        m.status === 'COMPLETED' ? 'bg-[#4ADE80]/20 text-[#4ADE80]' :
                        m.status === 'LOCKED' ? 'bg-[#FFAA00]/20 text-[#FFAA00]' : 'bg-sky-500/20 text-sky-300'
                      }`}>
                        {m.status === 'LIVE' ? '🔴 LIVE' : m.status}
                      </span>
                    </div>
                  ));
                })()}
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

      {/* TAB CONTENT 2: MATCH CENTER */}
      {adminTab === 'matches' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-black text-white">Match Center</h2>
              <p className="text-xs text-slate-400">Manage match lifecycle, monitor live game stats, and view history.</p>
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

          <div className="flex gap-2 overflow-x-auto pb-2">
            {[
              { id: 'LIFECYCLE', label: 'Lifecycle (Start/End)' },
              { id: 'LIVE_DASHBOARD', label: 'Live Dashboard' },
              { id: 'HISTORY', label: 'Match History' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setMatchesView(tab.id as any)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                  matchesView === tab.id 
                    ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25' 
                    : 'bg-[#131A38] text-slate-400 hover:text-white border border-[#1A223E]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {matchesView === 'LIFECYCLE' && (
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
                    {/* START MATCH BUTTON (GO LIVE) */}
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

                    {/* REVERT PREMATURE LIVE MATCH BUTTON */}
                    {match.status === 'LIVE' && (
                      <button
                        onClick={() => handleRevertToScheduled(match)}
                        className="px-3 py-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 text-xs font-bold flex items-center gap-1.5 transition-colors"
                        title="Revert match back to scheduled state"
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                        <span>Revert to Scheduled</span>
                      </button>
                    )}

                    {/* END & SETTLE BUTTON */}
                    <button
                      onClick={() => handleEndMatch(match)}
                      className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#FF8800] hover:brightness-110 text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-md shadow-[#FF6B00]/30"
                      id={`btn-end-settle-match-${match.id}`}
                    >
                      <Square className="w-3.5 h-3.5 fill-current" />
                      <span>{match.status === 'COMPLETED' ? 'Review / Re-Settle' : 'End & Settle Payouts'}</span>
                    </button>

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

                    {/* DELETE MATCH BUTTON */}
                    <button
                      onClick={() => handleDeleteMatch(match.id)}
                      className="px-3 py-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 text-xs font-bold flex items-center gap-1"
                      title="Permanently delete this contest"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {matchesView === 'LIVE_DASHBOARD' && (
            <LiveMatchDashboard 
              liveMatches={matches.filter(m => m.status === 'LIVE')} 
              allSlips={allSlips}
              onViewEntries={(id) => {
                // Future integration to view entries in a modal
                alert(`Viewing all entries for match ${id}`);
              }}
            />
          )}

          {matchesView === 'HISTORY' && (
            <MatchHistory completedMatches={matches.filter(m => m.status === 'COMPLETED')} />
          )}
        </div>
      )}

      {/* TAB CONTENT 3: SQUAD VIEWER */}
      {adminTab === 'squads' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#080C1D] p-5 rounded-2xl border border-[#1A223E]">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#FF6B00]/20 text-[#FF8800] font-black text-[10px] uppercase border border-[#FF6B00]/30">
                  Published Contest Squads
                </span>
                <span className="text-xs text-slate-400">Playing XI vs Bench Lineups & Toss</span>
              </div>
              <h2 className="text-xl font-black text-white mt-1">Match Squad Viewer</h2>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-xl bg-[#0D122B] border border-[#1A223E] text-xs font-black text-[#FF8800]">
                🚀 {publishedMatches.length} Published {publishedMatches.length === 1 ? 'Contest' : 'Contests'}
              </span>
            </div>
          </div>

          {publishedMatches.length === 0 ? (
            <div className="p-12 text-center bg-[#0D122B] rounded-3xl border border-[#1A223E] space-y-4 shadow-xl">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF6B00]/20 to-[#FF8800]/10 border border-[#FF6B00]/30 flex items-center justify-center mx-auto text-3xl">
                🏏
              </div>
              <h3 className="text-lg font-black text-white">No Published Contests Found</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                The Match Squad Viewer displays squads only for matches with active published contests. Configure and publish a match in the Match Publishing tab to inspect its players.
              </p>
              <button
                onClick={() => setAdminTab('publishing')}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#FF8800] hover:brightness-110 text-slate-950 font-black text-xs shadow-md shadow-[#FF6B00]/25 transition-all inline-flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Go to Match Publishing</span>
              </button>
            </div>
          ) : (
            <>
              {/* Match & Team Selector */}
              <div className="p-5 rounded-2xl bg-[#0D122B] border border-[#1A223E] grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1.5">
                    Select Published Contest:
                  </label>
                  <select
                    value={selectedMatchForSquad}
                    onChange={(e) => setSelectedMatchForSquad(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white text-xs font-bold focus:outline-none focus:border-[#FF6B00]"
                  >
                    {publishedMatches.map((m) => {
                      const tag = m.status === 'UPCOMING' ? '🟢 [PUBLISHED]' : m.status === 'LIVE' ? '🔴 [LIVE]' : m.status === 'LOCKED' ? '🔒 [LOCKED]' : '🏁 [COMPLETED]';
                      return (
                        <option key={m.id} value={m.id}>
                          {tag} {m.title} ({m.series})
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1.5">
                    Select Team Squad:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSelectedTeamForSquad('team1')}
                      className={`py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
                        selectedTeamForSquad === 'team1'
                          ? 'bg-gradient-to-r from-[#FF6B00] to-[#FF8800] text-slate-950 shadow-md shadow-[#FF6B00]/25'
                          : 'bg-[#080C1D] text-slate-400 hover:text-white border border-[#1A223E]'
                      }`}
                    >
                      <img 
                        src={getTeamLogoUrl(currentMatchForSquad?.team1.code, currentMatchForSquad?.team1.name, currentMatchForSquad?.team1.logoUrl)} 
                        alt={currentMatchForSquad?.team1.code}
                        className="w-4 h-4 object-contain rounded"
                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://flagcdn.com/w160/un.png'; }}
                      />
                      <span className="truncate">{currentMatchForSquad?.team1.name || currentMatchForSquad?.team1.code} ({(currentMatchForSquad?.squadTeam1 || []).length})</span>
                    </button>
                    <button
                      onClick={() => setSelectedTeamForSquad('team2')}
                      className={`py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
                        selectedTeamForSquad === 'team2'
                          ? 'bg-gradient-to-r from-[#FF6B00] to-[#FF8800] text-slate-950 shadow-md shadow-[#FF6B00]/25'
                          : 'bg-[#080C1D] text-slate-400 hover:text-white border border-[#1A223E]'
                      }`}
                    >
                      <img 
                        src={getTeamLogoUrl(currentMatchForSquad?.team2.code, currentMatchForSquad?.team2.name, currentMatchForSquad?.team2.logoUrl)} 
                        alt={currentMatchForSquad?.team2.code}
                        className="w-4 h-4 object-contain rounded"
                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://flagcdn.com/w160/un.png'; }}
                      />
                      <span className="truncate">{currentMatchForSquad?.team2.name || currentMatchForSquad?.team2.code} ({(currentMatchForSquad?.squadTeam2 || []).length})</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Published Match Details Card */}
              {currentMatchForSquad && (
                <div className="p-5 rounded-2xl bg-[#0D122B] border border-[#1A223E] space-y-4 shadow-md">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-slate-800 border border-slate-700 p-1 flex items-center justify-center flex-shrink-0">
                        <img 
                          src={getTeamLogoUrl(currentMatchForSquad.team1.code, currentMatchForSquad.team1.name, currentMatchForSquad.team1.logoUrl)} 
                          alt={currentMatchForSquad.team1.code}
                          className="w-full h-full object-contain rounded-lg"
                        />
                      </div>
                      <span className="text-xs font-black text-slate-400">vs</span>
                      <div className="w-10 h-10 rounded-2xl bg-slate-800 border border-slate-700 p-1 flex items-center justify-center flex-shrink-0">
                        <img 
                          src={getTeamLogoUrl(currentMatchForSquad.team2.code, currentMatchForSquad.team2.name, currentMatchForSquad.team2.logoUrl)} 
                          alt={currentMatchForSquad.team2.code}
                          className="w-full h-full object-contain rounded-lg"
                        />
                      </div>
                      <div>
                        <div className="text-[10px] text-[#FFAA00] font-black uppercase tracking-wider">
                          {currentMatchForSquad.series} • {currentMatchForSquad.format}
                        </div>
                        <h3 className="text-base font-black text-white">
                          {currentMatchForSquad.team1.name} vs {currentMatchForSquad.team2.name}
                        </h3>
                        <div className="text-xs text-slate-400 mt-0.5">
                          Starts: {new Date(currentMatchForSquad.startTime).toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric' })} at {new Date(currentMatchForSquad.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>

                    {/* Match Status Badge */}
                    <div className="flex items-center gap-2">
                      {currentMatchForSquad.status === 'UPCOMING' && (
                        <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-black flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                          PUBLISHED (Open for Predictions)
                        </span>
                      )}
                      {currentMatchForSquad.status === 'LIVE' && (
                        <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-black flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping"></span>
                          LIVE IN PLAY
                        </span>
                      )}
                      {currentMatchForSquad.status === 'LOCKED' && (
                        <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-black flex items-center gap-1.5">
                          🔒 CONTEST LOCKED
                        </span>
                      )}
                      {currentMatchForSquad.status === 'COMPLETED' && (
                        <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 text-xs font-bold">
                          🏁 COMPLETED
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Coin Toss Banner (Real Only when within 30 mins or live) */}
                  {((currentMatchForSquad as any).tossSummary && (currentMatchForSquad.status === 'LIVE' || currentMatchForSquad.status === 'COMPLETED' || new Date(currentMatchForSquad.startTime).getTime() - Date.now() <= 30 * 60 * 1000)) ? (
                    <div className="p-3 rounded-xl bg-gradient-to-r from-amber-500/15 via-[#080C1D] to-orange-500/15 border border-amber-500/30 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-black text-xs flex-shrink-0">
                          🪙
                        </div>
                        <div className="min-w-0">
                          <div className="text-[10px] font-black uppercase text-amber-400 tracking-wider">Official Coin Toss</div>
                          <div className="text-xs font-bold text-white truncate">
                            {(currentMatchForSquad as any).tossSummary}
                          </div>
                        </div>
                      </div>
                      <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex-shrink-0">
                        Verified
                      </span>
                    </div>
                  ) : (
                    <div className="p-2.5 rounded-xl bg-[#080C1D] border border-[#1A223E] flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span className="text-amber-400">🪙</span>
                        <span>Coin toss will be conducted 15–30 mins prior to match start</span>
                      </div>
                      <span className="text-[9px] font-bold text-slate-500 px-2 py-0.5 rounded bg-slate-800/80">
                        Pending Toss
                      </span>
                    </div>
                  )}

                  {/* 6 Configured Questions Preview */}
                  {currentMatchForSquad.questions && currentMatchForSquad.questions.length > 0 && (
                    <div className="space-y-2 pt-1 border-t border-[#1A223E]">
                      <span className="text-[10px] font-black text-[#FF8800] uppercase tracking-wider block">
                        Active Contest Questions ({currentMatchForSquad.questions.length} / 6 Categories)
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                        {currentMatchForSquad.questions.map((q, idx) => (
                          <div key={q.id || idx} className="p-2.5 rounded-xl bg-[#080C1D] border border-[#1A223E] flex items-center gap-2.5">
                            <div className="w-6 h-6 rounded-lg bg-[#FF6B00] text-slate-950 font-black text-xs flex items-center justify-center flex-shrink-0">
                              {idx + 1}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-[10px] font-bold text-[#FFAA00] truncate">{q.shortTitle || q.title}</div>
                              <div className="text-xs font-bold text-white truncate">{q.title}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Squad Filters & Player Search */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-[#0D122B] border border-[#1A223E]">
                {/* Playing XI vs Bench Filter */}
                <div className="flex items-center gap-1 bg-[#080C1D] p-1 rounded-xl border border-[#1A223E]">
                  <button 
                    onClick={() => setSquadPlayingFilter('ALL')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${squadPlayingFilter === 'ALL' ? 'bg-slate-700 text-white' : 'text-slate-400'}`}
                  >
                    All Players
                  </button>
                  <button 
                    onClick={() => setSquadPlayingFilter('PLAYING_XI')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-black flex items-center gap-1 ${squadPlayingFilter === 'PLAYING_XI' ? 'bg-emerald-500 text-slate-950' : 'text-emerald-400'}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    Playing XI (11)
                  </button>
                  <button 
                    onClick={() => setSquadPlayingFilter('BENCH')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-black ${squadPlayingFilter === 'BENCH' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'}`}
                  >
                    Bench / Reserves
                  </button>
                </div>

                {/* Role Filter Buttons */}
                <div className="flex items-center gap-1 overflow-x-auto pb-0.5 hide-scrollbar">
                  <button onClick={() => setSquadRoleFilter('ALL')} className={`px-2.5 py-1 rounded-lg text-xs font-bold ${squadRoleFilter === 'ALL' ? 'bg-gradient-to-r from-[#FF6B00] to-[#FF8800] text-slate-950 font-black' : 'bg-slate-800 text-slate-400'}`}>All Roles</button>
                  <button onClick={() => setSquadRoleFilter('BAT')} className={`px-2.5 py-1 rounded-lg text-xs font-bold ${squadRoleFilter === 'BAT' ? 'bg-sky-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-400'}`}>🏏 Batters</button>
                  <button onClick={() => setSquadRoleFilter('BOWL')} className={`px-2.5 py-1 rounded-lg text-xs font-bold ${squadRoleFilter === 'BOWL' ? 'bg-rose-500 text-white font-black' : 'bg-slate-800 text-slate-400'}`}>⚡ Bowlers</button>
                  <button onClick={() => setSquadRoleFilter('AR')} className={`px-2.5 py-1 rounded-lg text-xs font-bold ${squadRoleFilter === 'AR' ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-400'}`}>⭐ All-Rounders</button>
                  <button onClick={() => setSquadRoleFilter('WK')} className={`px-2.5 py-1 rounded-lg text-xs font-bold ${squadRoleFilter === 'WK' ? 'bg-emerald-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-400'}`}>🧤 WK</button>
                </div>
              </div>

              {/* Current Squad Player Cards Grid */}
              <div className="space-y-3">
                <h3 className="text-xs font-black text-slate-300 uppercase tracking-wider flex items-center justify-between">
                  <span>{selectedTeamForSquad === 'team1' ? currentMatchForSquad?.team1.name : currentMatchForSquad?.team2.name} Squad</span>
                  <span className="text-slate-400 font-normal">
                    Showing {((selectedTeamForSquad === 'team1' ? currentMatchForSquad?.squadTeam1 : currentMatchForSquad?.squadTeam2) || []).filter((p, idx) => {
                      if (squadRoleFilter !== 'ALL' && p.role !== squadRoleFilter) return false;
                      const isPlaying = p.isPlaying !== undefined ? p.isPlaying : idx < 11;
                      if (squadPlayingFilter === 'PLAYING_XI' && !isPlaying) return false;
                      if (squadPlayingFilter === 'BENCH' && isPlaying) return false;
                      return true;
                    }).length} Players
                  </span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {((selectedTeamForSquad === 'team1' ? currentMatchForSquad?.squadTeam1 : currentMatchForSquad?.squadTeam2) || [])
                    .filter((p, idx) => {
                      if (squadRoleFilter !== 'ALL' && p.role !== squadRoleFilter) return false;
                      const isPlaying = p.isPlaying !== undefined ? p.isPlaying : idx < 11;
                      if (squadPlayingFilter === 'PLAYING_XI' && !isPlaying) return false;
                      if (squadPlayingFilter === 'BENCH' && isPlaying) return false;
                      return true;
                    })
                    .map((player, idx) => {
                      const isPlaying = player.isPlaying !== undefined ? player.isPlaying : idx < 11;

                      return (
                        <div
                          key={player.id || idx}
                          className="p-3.5 rounded-2xl bg-[#0D122B] border border-[#1A223E] flex items-center justify-between gap-3 shadow-sm hover:border-slate-700 transition-colors"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <img 
                              src={player.avatar} 
                              alt={player.name} 
                              className="w-12 h-12 rounded-xl object-cover bg-slate-800 border border-slate-700 flex-shrink-0"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(player.name)}&background=1E293B&color=F59E0B&bold=true`;
                              }}
                            />
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-xs sm:text-sm font-black text-white truncate">{player.name}</span>
                                <span className={`text-[9px] font-black px-1.5 py-0.5 rounded flex-shrink-0 ${
                                  isPlaying ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'
                                }`}>
                                  {isPlaying ? 'Playing XI' : 'Bench'}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <span className={`text-[10px] font-black px-1.5 py-0.2 rounded ${
                                  player.role === 'BAT' ? 'bg-sky-500/20 text-sky-300' :
                                  player.role === 'BOWL' ? 'bg-rose-500/20 text-rose-300' :
                                  player.role === 'AR' ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                                }`}>
                                  {player.role}
                                </span>
                                <span className="text-[11px] text-slate-400 truncate border-l border-slate-800 pl-2">
                                  {player.careerStatHighlight || 'Professional Player'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* TAB CONTENT 4: RESULT SETTLEMENT */}
      {adminTab === 'settlement' && (
        <div className="space-y-6">
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

          {settlementMatches.length === 0 ? (
            <div className="p-12 text-center bg-[#0D122B] rounded-3xl border border-[#1A223E] space-y-4 shadow-xl">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF6B00]/20 to-[#FF8800]/10 border border-[#FF6B00]/30 flex items-center justify-center mx-auto text-3xl">
                ⚡
              </div>
              <h3 className="text-lg font-black text-white">No Published Contests Ready for Settlement</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                Settlement and winnings distribution only applies to published matches with configured prediction questions.
              </p>
              <button
                onClick={() => setAdminTab('publishing')}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#FF8800] hover:brightness-110 text-slate-950 font-black text-xs shadow-md shadow-[#FF6B00]/25 transition-all inline-flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Create & Publish a Contest</span>
              </button>
            </div>
          ) : (
            <>
              {/* Interactive Match Boxes Grid */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    Select a Published Match Box to Settle & Disburse Winnings ({settlementMatches.length} Matches):
                  </label>
                  <span className="text-[11px] text-slate-400">Click any box to inspect & settle</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {settlementMatches.map((m) => {
                    const isSelected = (selectedMatchForSettlement?.id === m.id) || (selectedMatchIdForSettlement === m.id);
                    const isLive = m.status === 'LIVE';
                    const isCompleted = m.status === 'COMPLETED';
                    const isLocked = m.status === 'LOCKED';

                    // Determine outcome headline
                    const winnerOutcome = (isCompleted || m.actualResults?.summaryNote)
                      ? getMatchWinnerHeadline(m)
                      : m.liveScore 
                      ? m.liveScore 
                      : 'Scheduled for play • Awaiting result';

                    return (
                      <div
                        key={m.id}
                        onClick={() => setSelectedMatchIdForSettlement(m.id)}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all relative overflow-hidden flex flex-col justify-between gap-3 shadow-md ${
                          isSelected
                            ? 'bg-gradient-to-br from-[#FF6B00]/20 via-[#0D122B] to-[#FF8800]/10 border-[#FF6B00] shadow-[0_0_25px_rgba(255,107,0,0.25)] ring-2 ring-[#FF6B00]/50'
                            : 'bg-[#0D122B] border-[#1A223E] hover:border-[#2A355E] hover:bg-[#131A38]'
                        }`}
                        id={`match-settle-box-${m.id}`}
                      >
                        {/* Status & Series */}
                        <div className="flex items-center justify-between gap-2">
                          <span className="px-2 py-0.5 rounded bg-[#080C1D] text-[#FFAA00] text-[10px] font-extrabold uppercase border border-[#1A223E] truncate">
                            {m.series}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase flex items-center gap-1 ${
                            isLive ? 'bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse' :
                            isCompleted ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                            isLocked ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                            'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                          }`}>
                            {isLive && <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping"></span>}
                            {isCompleted && '✓ '}
                            {m.status}
                          </span>
                        </div>

                        {/* Title & Timing */}
                        <div>
                          <h4 className="text-sm sm:text-base font-black text-white font-display line-clamp-1">
                            {m.title}
                          </h4>
                          <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-2">
                            <span>{new Date(m.startTime || (m as any).matchStartTime).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                            <span>•</span>
                            <span className="text-[#FFAA00] font-bold">{m.questions?.length || 0} Categories</span>
                          </div>
                        </div>

                        {/* Match Outcome / Score / Winner Headline Box */}
                        <div className="p-2.5 rounded-xl bg-[#080C1D] border border-[#1A223E]">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Match Outcome / Score:</span>
                          <div className={`text-xs font-bold truncate ${isCompleted ? 'text-emerald-400' : isLive ? 'text-amber-300 font-mono' : 'text-slate-300'}`}>
                            {winnerOutcome}
                          </div>
                        </div>

                        {/* Action CTA Button on Box */}
                        <div className="pt-2 border-t border-[#1A223E] flex items-center justify-between">
                          <span className="text-[10px] text-slate-400 font-bold">
                            {isSelected ? '👉 Selected for Payout' : 'Click to Settle'}
                          </span>
                          <span className={`px-3 py-1 rounded-lg text-xs font-black transition-colors ${
                            isSelected ? 'bg-gradient-to-r from-[#FF6B00] to-[#FF8800] text-slate-950 shadow-md shadow-[#FF6B00]/30' : 'bg-slate-800 text-slate-300'
                          }`}>
                            {isCompleted ? 'Review & Settle' : 'Settle Questions'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Questions Winners Form */}
              <div className="p-5 rounded-2xl bg-[#0D122B] border border-[#1A223E] space-y-4 shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-black text-white">Enter Official Question Answers</h3>
                    <p className="text-xs text-slate-400">Match: {selectedMatchForSettlement?.title}</p>
                  </div>
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
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#FF8800] hover:brightness-110 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md shadow-[#FF6B00]/25 transition-all"
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
                              {squadForSettlement.map((p) => (
                                <option key={p.id} value={p.id}>
                                  {p.name} ({p.team}) - {p.role}
                                </option>
                              ))}
                            </select>
                          ) : q.type === 'YES_NO' ? (
                            <div className="flex gap-2">
                              {['Yes', 'No'].map((opt) => (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() => {
                                    setSettlementPicks((prev) => ({
                                      ...prev,
                                      [q.id]: { ...currentPick, answerId: opt, answerText: opt },
                                    }));
                                  }}
                                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                                    currentPick.answerId === opt
                                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500'
                                      : 'bg-[#0D122B] text-slate-400 border-[#1A223E]'
                                  }`}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                          ) : q.type === 'TEAM' ? (
                            <div className="flex gap-2">
                              {[
                                { id: selectedMatchForSettlement.team1.code, name: selectedMatchForSettlement.team1.name },
                                { id: selectedMatchForSettlement.team2.code, name: selectedMatchForSettlement.team2.name }
                              ].map((t) => (
                                <button
                                  key={t.id}
                                  type="button"
                                  onClick={() => {
                                    setSettlementPicks((prev) => ({
                                      ...prev,
                                      [q.id]: { ...currentPick, answerId: t.id, answerText: t.name },
                                    }));
                                  }}
                                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-colors truncate px-2 ${
                                    currentPick.answerId === t.id
                                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500'
                                      : 'bg-[#0D122B] text-slate-400 border-[#1A223E]'
                                  }`}
                                >
                                  {t.name}
                                </button>
                              ))}
                            </div>
                          ) : (
                            <input
                              type="text"
                              value={currentPick.answerText}
                              onChange={(e) => {
                                setSettlementPicks((prev) => ({
                                  ...prev,
                                  [q.id]: { ...currentPick, answerId: e.target.value, answerText: e.target.value },
                                }));
                              }}
                              placeholder="e.g., Over 185.5 or Team Name"
                              className="w-full px-3 py-1.5 rounded-lg bg-[#0D122B] border border-[#1A223E] text-white text-xs focus:outline-none"
                            />
                          )}
                        </div>

                        <div>
                          <label className="text-[10px] text-slate-400 block mb-1">Official Stat Value / Score / Notes:</label>
                          <input
                            type="text"
                            value={currentPick.statValue}
                            onChange={(e) => {
                              setSettlementPicks((prev) => ({
                                ...prev,
                                [q.id]: { ...currentPick, statValue: e.target.value },
                              }));
                            }}
                            placeholder="e.g. 78 runs (45 balls) or 4/22"
                            className="w-full px-3 py-1 rounded-lg bg-[#0D122B] border border-[#1A223E] text-slate-300 text-xs focus:outline-none"
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
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#FF8800] hover:brightness-110 active:scale-[0.99] text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#FF6B00]/30 transition-all"
                  id="btn-confirm-settlement"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Settle Match & Disburse Cash Payouts</span>
                </button>
              </div>
            </>
          )}
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

      {/* TAB CONTENT 5: CLIENTS LIST */}
      {adminTab === 'users' && (
        <div className="space-y-4">
          {selectedClientId ? (
            <ClientDetailView 
              userId={selectedClientId} 
              onBack={() => setSelectedClientId(null)} 
            />
          ) : (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-black text-white">Clients List</h2>
                  <p className="text-xs text-slate-400">View and manage all registered clients.</p>
                </div>

                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search by mobile or name..."
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    className="pl-9 pr-3 py-2 rounded-xl bg-[#080C1D] border border-[#1A223E] text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>

              {isLoadingUsers ? (
                <div className="p-8 text-center bg-[#0D122B] border border-[#1A223E] rounded-2xl text-slate-400 text-sm">
                  Loading clients list...
                </div>
              ) : (
                <div className="bg-[#0D122B] rounded-2xl border border-[#1A223E] overflow-hidden">
                  <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-[#080C1D] text-slate-400 border-b border-[#1A223E]">
                      <tr>
                        <th className="p-4 font-semibold">Client</th>
                        <th className="p-4 font-semibold">Date Joined</th>
                        <th className="p-4 font-semibold">Total Deposits</th>
                        <th className="p-4 font-semibold">Total Withdrawals</th>
                        <th className="p-4 font-semibold">Contests Played</th>
                        <th className="p-4 font-semibold">Current Balance</th>
                        <th className="p-4 font-semibold">Net P/L</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1A223E]">
                      {loadedUsers
                        .filter(u => u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.phone.includes(userSearch))
                        .map(u => {
                          const netPnL = (u.totalWithdrawals || 0) + (u.currentBalance || 0) - (u.totalDeposits || 0);
                          const isPlatformProfit = netPnL < 0; // If user loss, platform profit
                          
                          return (
                            <tr 
                              key={u.id} 
                              onClick={() => setSelectedClientId(u.id)}
                              className="text-slate-300 hover:bg-[#131A38] cursor-pointer transition-colors"
                            >
                              <td className="p-4">
                                <div className="flex items-center gap-3">
                                  <img 
                                    src={u.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name || 'User')}&background=FF6B00&color=fff&bold=true`} 
                                    alt={u.name} 
                                    className="w-9 h-9 rounded-xl object-cover bg-[#1A223E] border border-[#1A223E] shadow-sm" 
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name || 'User')}&background=FF6B00&color=fff&bold=true`;
                                    }}
                                  />
                                  <div>
                                    <div className="font-bold text-white flex items-center gap-2">
                                      {u.name} 
                                      {u.role === 'ADMIN' && <span className="text-[9px] font-black bg-purple-500/20 text-purple-400 border border-purple-500/30 px-1.5 py-0.5 rounded">ADMIN</span>}
                                      {u.isBlocked && <span className="text-[9px] font-black bg-red-500/20 text-red-400 border border-red-500/30 px-1.5 py-0.5 rounded">BLOCKED</span>}
                                    </div>
                                    <div className="text-xs text-slate-500">{u.phone}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="p-4 text-xs font-medium text-slate-300">
                                {(() => {
                                  const dateVal = u.joinedDate || u.dateJoined || (u as any).createdAt;
                                  if (!dateVal) return 'Recent';
                                  const d = new Date(dateVal);
                                  return isNaN(d.getTime()) ? 'Recent' : d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
                                })()}
                              </td>
                              <td className="p-4 font-mono">{formatINR(u.totalDeposits || 0)}</td>
                              <td className="p-4 font-mono">{formatINR(u.totalWithdrawals || 0)}</td>
                              <td className="p-4 text-center">{u.totalContestsPlayed || 0}</td>
                              <td className="p-4 font-mono font-bold text-white">{formatINR(u.currentBalance || 0)}</td>
                              <td className="p-4">
                                <span className={`font-mono font-bold px-2 py-1 rounded text-xs ${
                                  isPlatformProfit ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                                }`}>
                                  {isPlatformProfit ? '+' : ''}{formatINR(Math.abs(netPnL))}
                                </span>
                              </td>
                            </tr>
                          );
                      })}
                      {loadedUsers.length === 0 && (
                        <tr>
                          <td colSpan={7} className="p-8 text-center text-slate-500">No clients found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
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

            <div className="space-y-3.5 text-xs">
              <div>
                <label className="text-slate-300 font-bold block mb-1">Match Title:</label>
                <input
                  type="text"
                  value={newMatchTitle}
                  onChange={(e) => setNewMatchTitle(e.target.value)}
                  placeholder="e.g. India vs Australia"
                  className="w-full px-3 py-2 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white focus:outline-none focus:border-[#FF6B00]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Series / Tournament:</label>
                  <input
                    type="text"
                    value={newMatchSeries}
                    onChange={(e) => setNewMatchSeries(e.target.value)}
                    placeholder="e.g. ICC T20 World Cup 2026"
                    className="w-full px-3 py-2 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white focus:outline-none focus:border-[#FF6B00]"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Match Format:</label>
                  <select
                    value={newMatchFormat}
                    onChange={(e) => setNewMatchFormat(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white focus:outline-none focus:border-[#FF6B00]"
                  >
                    <option value="T20">T20</option>
                    <option value="ODI">ODI</option>
                    <option value="TEST">TEST</option>
                    <option value="T10">T10</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-[#080C1D] border border-[#1A223E] space-y-2">
                  <span className="text-[10px] font-black uppercase text-[#FF8800] block">Team 1 Details</span>
                  <input
                    type="text"
                    value={newMatchTeam1Name}
                    onChange={(e) => {
                      setNewMatchTeam1Name(e.target.value);
                      setNewMatchTitle(`${e.target.value} vs ${newMatchTeam2Name}`);
                    }}
                    placeholder="Team 1 Name (e.g. India)"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-[#0D122B] border border-[#1A223E] text-white text-xs"
                  />
                  <input
                    type="text"
                    value={newMatchTeam1Code}
                    onChange={(e) => setNewMatchTeam1Code(e.target.value.toUpperCase())}
                    placeholder="Code (e.g. IND)"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-[#0D122B] border border-[#1A223E] text-white text-xs uppercase"
                  />
                </div>

                <div className="p-3 rounded-xl bg-[#080C1D] border border-[#1A223E] space-y-2">
                  <span className="text-[10px] font-black uppercase text-[#FFAA00] block">Team 2 Details</span>
                  <input
                    type="text"
                    value={newMatchTeam2Name}
                    onChange={(e) => {
                      setNewMatchTeam2Name(e.target.value);
                      setNewMatchTitle(`${newMatchTeam1Name} vs ${e.target.value}`);
                    }}
                    placeholder="Team 2 Name (e.g. Australia)"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-[#0D122B] border border-[#1A223E] text-white text-xs"
                  />
                  <input
                    type="text"
                    value={newMatchTeam2Code}
                    onChange={(e) => setNewMatchTeam2Code(e.target.value.toUpperCase())}
                    placeholder="Code (e.g. AUS)"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-[#0D122B] border border-[#1A223E] text-white text-xs uppercase"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">
                  📅 Exact Match Start Date & Time (Local IST):
                </label>
                <input
                  type="datetime-local"
                  value={newMatchDateTime}
                  onChange={(e) => setNewMatchDateTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white font-mono focus:outline-none focus:border-[#FF6B00]"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Match contest locks 15 mins prior to this time; goes LIVE automatically at start time.
                </span>
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Venue Stadium & City:</label>
                <input
                  type="text"
                  value={newMatchVenue}
                  onChange={(e) => setNewMatchVenue(e.target.value)}
                  placeholder="e.g. Wankhede Stadium, Mumbai"
                  className="w-full px-3 py-2 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white focus:outline-none focus:border-[#FF6B00]"
                />
              </div>

              <button
                onClick={() => {
                  const startTimeDate = new Date(newMatchDateTime);
                  const startTimeIso = isNaN(startTimeDate.getTime()) 
                    ? new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString() 
                    : startTimeDate.toISOString();

                  const lockTimeIso = new Date(new Date(startTimeIso).getTime() - 15 * 60 * 1000).toISOString();

                  const t1Code = newMatchTeam1Code.trim() || 'T1';
                  const t2Code = newMatchTeam2Code.trim() || 'T2';
                  const t1Name = newMatchTeam1Name.trim() || 'Team 1';
                  const t2Name = newMatchTeam2Name.trim() || 'Team 2';

                  const generateSquad = (teamCode: string, teamName: string) => [
                    { id: `p_${teamCode.toLowerCase()}_1`, name: `${teamCode} Batter 1`, shortName: `Bat 1`, team: teamCode, teamName, role: 'BAT' as const, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', country: teamName, recentForm: ['68', '45', '82*'], careerStatHighlight: 'Top Order Ace' },
                    { id: `p_${teamCode.toLowerCase()}_2`, name: `${teamCode} Batter 2`, shortName: `Bat 2`, team: teamCode, teamName, role: 'BAT' as const, avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80', country: teamName, recentForm: ['52', '31', '64'], careerStatHighlight: 'Power Hitter' },
                    { id: `p_${teamCode.toLowerCase()}_3`, name: `${teamCode} Keeper`, shortName: `WK 1`, team: teamCode, teamName, role: 'WK' as const, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', country: teamName, recentForm: ['44', '38*'], careerStatHighlight: 'Gloveman & Finisher' },
                    { id: `p_${teamCode.toLowerCase()}_4`, name: `${teamCode} All-Rounder`, shortName: `AR 1`, team: teamCode, teamName, role: 'AR' as const, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', country: teamName, recentForm: ['35', '2/18'], careerStatHighlight: 'Match Winner' },
                    { id: `p_${teamCode.toLowerCase()}_5`, name: `${teamCode} Bowler 1`, shortName: `Bowl 1`, team: teamCode, teamName, role: 'BOWL' as const, avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80', country: teamName, recentForm: ['3/21', '2/15'], careerStatHighlight: 'Strike Bowler' },
                    { id: `p_${teamCode.toLowerCase()}_6`, name: `${teamCode} Bowler 2`, shortName: `Bowl 2`, team: teamCode, teamName, role: 'BOWL' as const, avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80', country: teamName, recentForm: ['2/24', '1/19'], careerStatHighlight: 'Death Overs Specialist' },
                  ];

                  const newMatch: CricketMatch = {
                    id: `match_${Date.now()}`,
                    title: `${t1Name} vs ${t2Name}`,
                    series: newMatchSeries || 'Featured T20 Series',
                    matchNumber: `Match ${matches.length + 1}`,
                    team1: {
                      code: t1Code,
                      name: t1Name,
                      shortName: t1Code,
                      color: '#FF6B00',
                      accentColor: '#FF8800',
                      flagOrLogo: '🏏',
                    },
                    team2: {
                      code: t2Code,
                      name: t2Name,
                      shortName: t2Code,
                      color: '#004C97',
                      accentColor: '#00C8FF',
                      flagOrLogo: '⚡',
                    },
                    venue: newMatchVenue || 'National Cricket Stadium',
                    city: 'Host City',
                    startTime: startTimeIso,
                    lockTime: lockTimeIso,
                    status: 'UPCOMING',
                    format: newMatchFormat || 'T20',
                    totalPool: 100000,
                    totalEntries: 50,
                    entryFees: [25, 50, 100],
                    squadTeam1: generateSquad(t1Code, t1Name),
                    squadTeam2: generateSquad(t2Code, t2Name),
                    questions: DEFAULT_QUESTIONS,
                  };

                  onCreateMatch(newMatch);
                  setShowCreateMatchModal(false);
                }}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#FF8800] hover:brightness-110 text-slate-950 font-black text-xs shadow-md shadow-[#FF6B00]/30 transition-all"
              >
                🚀 Create Match & Publish Contest
              </button>
            </div>
          </div>
        </div>
      )}
      
      {adminTab === 'publishing' && (
        <ManualMatchCreator 
          allMatches={matches}
          onCreateMatch={onCreateMatch}
          onUpdateMatch={onUpdateMatch}
          onReloadData={onReloadData}
          onGoToSettle={(matchId) => {
            setSelectedMatchIdForSettlement(matchId);
            setAdminTab('settlement');
          }}
          onGoToSquads={(matchId) => {
            setSelectedMatchForSquad(matchId);
            setAdminTab('squads');
          }}
        />
      )}

      {adminTab === 'questionBank' && (
        <QuestionBankManager />
      )}

      {adminTab === 'financials' && (
        <ReportsManager 
          allUsers={allUsers}
          allMatches={matches}
          allSlips={allSlips}
          allTransactions={allTransactions}
        />
      )}

      {adminTab === 'market' && (
        <LiveMarketAnalysis matches={matches} slips={allSlips} />
      )}

      {adminTab === 'settings' && (
        <SettingsManager />
      )}
    </div>
  );
};
