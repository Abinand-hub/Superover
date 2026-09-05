import React, { useState } from 'react';
import { CricketMatch, Player, PlayerRole } from '../../types';
import { 
  PlusCircle, 
  Trash2, 
  Sparkles, 
  Calendar, 
  Users, 
  Trophy, 
  Shield, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Play, 
  Square, 
  UserPlus, 
  Edit3,
  Flame,
  Layers,
  ArrowRight
} from 'lucide-react';
import { formatINR } from '../../utils/payoutCalculator';
import { getTeamLogoUrl } from '../../utils/teamLogoHelper';
import { DEFAULT_QUESTIONS } from '../../data/initialData';

interface ManualMatchCreatorProps {
  allMatches: CricketMatch[];
  onCreateMatch: (match: CricketMatch) => void;
  onUpdateMatch: (match: CricketMatch) => void;
  onReloadData?: () => void;
  onGoToSettle?: (matchId: string) => void;
  onGoToSquads?: (matchId: string) => void;
}

// Preset popular squads for fast 1-click setup if desired
const PRESET_TEAMS: Record<string, { name: string; code: string; logoUrl: string; squad: { name: string; shortName: string; role: PlayerRole }[] }> = {
  IND: {
    name: 'India',
    code: 'IND',
    logoUrl: 'https://flagcdn.com/w160/in.png',
    squad: [
      { name: 'Rohit Sharma', shortName: 'R. Sharma', role: 'BAT' },
      { name: 'Virat Kohli', shortName: 'V. Kohli', role: 'BAT' },
      { name: 'Suryakumar Yadav', shortName: 'S. Yadav', role: 'BAT' },
      { name: 'Rishabh Pant', shortName: 'R. Pant', role: 'WK' },
      { name: 'Hardik Pandya', shortName: 'H. Pandya', role: 'AR' },
      { name: 'Axar Patel', shortName: 'A. Patel', role: 'AR' },
      { name: 'Ravindra Jadeja', shortName: 'R. Jadeja', role: 'AR' },
      { name: 'Shivam Dube', shortName: 'S. Dube', role: 'AR' },
      { name: 'Kuldeep Yadav', shortName: 'K. Yadav', role: 'BOWL' },
      { name: 'Jasprit Bumrah', shortName: 'J. Bumrah', role: 'BOWL' },
      { name: 'Arshdeep Singh', shortName: 'A. Singh', role: 'BOWL' },
    ]
  },
  AUS: {
    name: 'Australia',
    code: 'AUS',
    logoUrl: 'https://flagcdn.com/w160/au.png',
    squad: [
      { name: 'Travis Head', shortName: 'T. Head', role: 'BAT' },
      { name: 'Mitchell Marsh', shortName: 'M. Marsh', role: 'AR' },
      { name: 'Glenn Maxwell', shortName: 'G. Maxwell', role: 'AR' },
      { name: 'Marcus Stoinis', shortName: 'M. Stoinis', role: 'AR' },
      { name: 'Josh Inglis', shortName: 'J. Inglis', role: 'WK' },
      { name: 'Tim David', shortName: 'T. David', role: 'BAT' },
      { name: 'Matthew Wade', shortName: 'M. Wade', role: 'WK' },
      { name: 'Pat Cummins', shortName: 'P. Cummins', role: 'BOWL' },
      { name: 'Mitchell Starc', shortName: 'M. Starc', role: 'BOWL' },
      { name: 'Adam Zampa', shortName: 'A. Zampa', role: 'BOWL' },
      { name: 'Josh Hazlewood', shortName: 'J. Hazlewood', role: 'BOWL' },
    ]
  },
  ENG: {
    name: 'England',
    code: 'ENG',
    logoUrl: 'https://flagcdn.com/w160/gb-eng.png',
    squad: [
      { name: 'Jos Buttler', shortName: 'J. Buttler', role: 'WK' },
      { name: 'Phil Salt', shortName: 'P. Salt', role: 'WK' },
      { name: 'Jonny Bairstow', shortName: 'J. Bairstow', role: 'BAT' },
      { name: 'Harry Brook', shortName: 'H. Brook', role: 'BAT' },
      { name: 'Liam Livingstone', shortName: 'L. Livingstone', role: 'AR' },
      { name: 'Moeen Ali', shortName: 'M. Ali', role: 'AR' },
      { name: 'Sam Curran', shortName: 'S. Curran', role: 'AR' },
      { name: 'Chris Jordan', shortName: 'C. Jordan', role: 'BOWL' },
      { name: 'Jofra Archer', shortName: 'J. Archer', role: 'BOWL' },
      { name: 'Adil Rashid', shortName: 'A. Rashid', role: 'BOWL' },
      { name: 'Reece Topley', shortName: 'R. Topley', role: 'BOWL' },
    ]
  },
  SA: {
    name: 'South Africa',
    code: 'SA',
    logoUrl: 'https://flagcdn.com/w160/za.png',
    squad: [
      { name: 'Quinton de Kock', shortName: 'Q. de Kock', role: 'WK' },
      { name: 'Reeza Hendricks', shortName: 'R. Hendricks', role: 'BAT' },
      { name: 'Aiden Markram', shortName: 'A. Markram', role: 'BAT' },
      { name: 'Heinrich Klaasen', shortName: 'H. Klaasen', role: 'WK' },
      { name: 'David Miller', shortName: 'D. Miller', role: 'BAT' },
      { name: 'Tristan Stubbs', shortName: 'T. Stubbs', role: 'BAT' },
      { name: 'Marco Jansen', shortName: 'M. Jansen', role: 'AR' },
      { name: 'Keshav Maharaj', shortName: 'K. Maharaj', role: 'BOWL' },
      { name: 'Kagiso Rabada', shortName: 'K. Rabada', role: 'BOWL' },
      { name: 'Anrich Nortje', shortName: 'A. Nortje', role: 'BOWL' },
      { name: 'Tabraiz Shamsi', shortName: 'T. Shamsi', role: 'BOWL' },
    ]
  },
  CSK: {
    name: 'Chennai Super Kings',
    code: 'CSK',
    logoUrl: 'https://flagcdn.com/w160/in.png',
    squad: [
      { name: 'Ruturaj Gaikwad', shortName: 'R. Gaikwad', role: 'BAT' },
      { name: 'Devon Conway', shortName: 'D. Conway', role: 'BAT' },
      { name: 'Daryl Mitchell', shortName: 'D. Mitchell', role: 'AR' },
      { name: 'Shivam Dube', shortName: 'S. Dube', role: 'AR' },
      { name: 'Ravindra Jadeja', shortName: 'R. Jadeja', role: 'AR' },
      { name: 'MS Dhoni', shortName: 'MS Dhoni', role: 'WK' },
      { name: 'Sameer Rizvi', shortName: 'S. Rizvi', role: 'BAT' },
      { name: 'Shardul Thakur', shortName: 'S. Thakur', role: 'BOWL' },
      { name: 'Deepak Chahar', shortName: 'D. Chahar', role: 'BOWL' },
      { name: 'Tushar Deshpande', shortName: 'T. Deshpande', role: 'BOWL' },
      { name: 'Matheesha Pathirana', shortName: 'M. Pathirana', role: 'BOWL' },
    ]
  },
  MI: {
    name: 'Mumbai Indians',
    code: 'MI',
    logoUrl: 'https://flagcdn.com/w160/in.png',
    squad: [
      { name: 'Rohit Sharma', shortName: 'R. Sharma', role: 'BAT' },
      { name: 'Ishan Kishan', shortName: 'I. Kishan', role: 'WK' },
      { name: 'Suryakumar Yadav', shortName: 'S. Yadav', role: 'BAT' },
      { name: 'Tilak Varma', shortName: 'T. Varma', role: 'BAT' },
      { name: 'Hardik Pandya', shortName: 'H. Pandya', role: 'AR' },
      { name: 'Tim David', shortName: 'T. David', role: 'BAT' },
      { name: 'Romario Shepherd', shortName: 'R. Shepherd', role: 'AR' },
      { name: 'Gerald Coetzee', shortName: 'G. Coetzee', role: 'BOWL' },
      { name: 'Piyush Chawla', shortName: 'P. Chawla', role: 'BOWL' },
      { name: 'Jasprit Bumrah', shortName: 'J. Bumrah', role: 'BOWL' },
      { name: 'Nuwan Thushara', shortName: 'N. Thushara', role: 'BOWL' },
    ]
  },
  RCB: {
    name: 'Royal Challengers Bengaluru',
    code: 'RCB',
    logoUrl: 'https://flagcdn.com/w160/in.png',
    squad: [
      { name: 'Faf du Plessis', shortName: 'F. du Plessis', role: 'BAT' },
      { name: 'Virat Kohli', shortName: 'V. Kohli', role: 'BAT' },
      { name: 'Rajat Patidar', shortName: 'R. Patidar', role: 'BAT' },
      { name: 'Glenn Maxwell', shortName: 'G. Maxwell', role: 'AR' },
      { name: 'Cameron Green', shortName: 'C. Green', role: 'AR' },
      { name: 'Dinesh Karthik', shortName: 'D. Karthik', role: 'WK' },
      { name: 'Mahipal Lomror', shortName: 'M. Lomror', role: 'AR' },
      { name: 'Karn Sharma', shortName: 'K. Sharma', role: 'BOWL' },
      { name: 'Lockie Ferguson', shortName: 'L. Ferguson', role: 'BOWL' },
      { name: 'Mohammed Siraj', shortName: 'M. Siraj', role: 'BOWL' },
      { name: 'Yash Dayal', shortName: 'Y. Dayal', role: 'BOWL' },
    ]
  },
  KKR: {
    name: 'Kolkata Knight Riders',
    code: 'KKR',
    logoUrl: 'https://flagcdn.com/w160/in.png',
    squad: [
      { name: 'Philip Salt', shortName: 'P. Salt', role: 'WK' },
      { name: 'Sunil Narine', shortName: 'S. Narine', role: 'AR' },
      { name: 'Venkatesh Iyer', shortName: 'V. Iyer', role: 'AR' },
      { name: 'Shreyas Iyer', shortName: 'S. Iyer', role: 'BAT' },
      { name: 'Rinku Singh', shortName: 'R. Singh', role: 'BAT' },
      { name: 'Andre Russell', shortName: 'A. Russell', role: 'AR' },
      { name: 'Ramandeep Singh', shortName: 'R. Singh', role: 'AR' },
      { name: 'Mitchell Starc', shortName: 'M. Starc', role: 'BOWL' },
      { name: 'Vaibhav Arora', shortName: 'V. Arora', role: 'BOWL' },
      { name: 'Harshit Rana', shortName: 'H. Rana', role: 'BOWL' },
      { name: 'Varun Chakaravarthy', shortName: 'V. Chakaravarthy', role: 'BOWL' },
    ]
  }
};

export const ManualMatchCreator: React.FC<ManualMatchCreatorProps> = ({
  allMatches,
  onCreateMatch,
  onUpdateMatch,
  onReloadData,
  onGoToSettle,
  onGoToSquads
}) => {
  // Form State
  const [team1Name, setTeam1Name] = useState('India');
  const [team1Code, setTeam1Code] = useState('IND');
  const [team1Logo, setTeam1Logo] = useState('https://flagcdn.com/w160/in.png');
  
  const [team2Name, setTeam2Name] = useState('Australia');
  const [team2Code, setTeam2Code] = useState('AUS');
  const [team2Logo, setTeam2Logo] = useState('https://flagcdn.com/w160/au.png');

  const [seriesName, setSeriesName] = useState("ICC Men's T20 World Cup 2026");
  const [format, setFormat] = useState('T20');
  const [venue, setVenue] = useState('Wankhede Stadium, Mumbai');

  // Start Date / Time (Defaults to 2 hours from now formatted for datetime-local)
  const defaultDateTime = () => {
    const d = new Date(Date.now() + 2 * 60 * 60 * 1000);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const mins = String(d.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${mins}`;
  };
  const [startDateTime, setStartDateTime] = useState(defaultDateTime());

  // Squad Lists
  const [squad1, setSquad1] = useState<Player[]>(
    PRESET_TEAMS.IND.squad.map((p, idx) => ({
      id: `p_ind_${idx + 1}`,
      name: p.name,
      shortName: p.shortName,
      team: 'IND',
      teamName: 'India',
      role: p.role,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      country: 'India',
      recentForm: ['48', '2/15', '35*'],
      careerStatHighlight: 'Team Star'
    }))
  );

  const [squad2, setSquad2] = useState<Player[]>(
    PRESET_TEAMS.AUS.squad.map((p, idx) => ({
      id: `p_aus_${idx + 1}`,
      name: p.name,
      shortName: p.shortName,
      team: 'AUS',
      teamName: 'Australia',
      role: p.role,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      country: 'Australia',
      recentForm: ['55', '3/20', '62*'],
      careerStatHighlight: 'Team Star'
    }))
  );

  const [activeSquadTab, setActiveSquadTab] = useState<'team1' | 'team2'>('team1');
  const [newPlayerName, setNewPlayerName] = useState('');
  const [newPlayerRole, setNewPlayerRole] = useState<PlayerRole>('BAT');
  const [bulkPlayerText, setBulkPlayerText] = useState('');
  const [showBulkInput, setShowBulkInput] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Handle Preset Selection for Team 1
  const applyPresetTeam1 = (code: string) => {
    const p = PRESET_TEAMS[code];
    if (!p) return;
    setTeam1Name(p.name);
    setTeam1Code(p.code);
    setTeam1Logo(p.logoUrl);
    setSquad1(
      p.squad.map((pl, idx) => ({
        id: `p_${code.toLowerCase()}_${idx + 1}`,
        name: pl.name,
        shortName: pl.shortName,
        team: p.code,
        teamName: p.name,
        role: pl.role,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        country: p.name,
        recentForm: ['45', '1/18', '28*'],
        careerStatHighlight: 'Key Player'
      }))
    );
  };

  // Handle Preset Selection for Team 2
  const applyPresetTeam2 = (code: string) => {
    const p = PRESET_TEAMS[code];
    if (!p) return;
    setTeam2Name(p.name);
    setTeam2Code(p.code);
    setTeam2Logo(p.logoUrl);
    setSquad2(
      p.squad.map((pl, idx) => ({
        id: `p_${code.toLowerCase()}_${idx + 1}`,
        name: pl.name,
        shortName: pl.shortName,
        team: p.code,
        teamName: p.name,
        role: pl.role,
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        country: p.name,
        recentForm: ['52', '2/22', '41*'],
        careerStatHighlight: 'Key Player'
      }))
    );
  };

  // Add Individual Player
  const handleAddPlayer = () => {
    if (!newPlayerName.trim()) return;
    const teamCode = activeSquadTab === 'team1' ? team1Code : team2Code;
    const teamN = activeSquadTab === 'team1' ? team1Name : team2Name;
    const newP: Player = {
      id: `p_${teamCode.toLowerCase()}_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      name: newPlayerName.trim(),
      shortName: newPlayerName.trim().split(' ').pop() || newPlayerName.trim(),
      team: teamCode,
      teamName: teamN,
      role: newPlayerRole,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      country: teamN,
      recentForm: ['35', '1/15'],
      careerStatHighlight: 'Squad Member'
    };

    if (activeSquadTab === 'team1') {
      setSquad1([...squad1, newP]);
    } else {
      setSquad2([...squad2, newP]);
    }
    setNewPlayerName('');
  };

  // Bulk Add Players (1 player per line)
  const handleBulkAdd = () => {
    if (!bulkPlayerText.trim()) return;
    const lines = bulkPlayerText.split('\n').map(l => l.trim()).filter(Boolean);
    const teamCode = activeSquadTab === 'team1' ? team1Code : team2Code;
    const teamN = activeSquadTab === 'team1' ? team1Name : team2Name;

    const newPlayers: Player[] = lines.map((line, idx) => {
      // Check if line has role e.g. "Virat Kohli (BAT)"
      let role: PlayerRole = 'BAT';
      let name = line;
      if (line.toLowerCase().includes('(bowl)') || line.toLowerCase().includes('- bowl')) {
        role = 'BOWL';
        name = line.replace(/\(bowl\)|- bowl/gi, '').trim();
      } else if (line.toLowerCase().includes('(wk)') || line.toLowerCase().includes('- wk')) {
        role = 'WK';
        name = line.replace(/\(wk\)|- wk/gi, '').trim();
      } else if (line.toLowerCase().includes('(ar)') || line.toLowerCase().includes('- ar')) {
        role = 'AR';
        name = line.replace(/\(ar\)|- ar/gi, '').trim();
      }

      return {
        id: `p_${teamCode.toLowerCase()}_${Date.now()}_${idx}`,
        name,
        shortName: name.split(' ').pop() || name,
        team: teamCode,
        teamName: teamN,
        role,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        country: teamN,
        recentForm: ['40', '1/20'],
        careerStatHighlight: 'Squad Member'
      };
    });

    if (activeSquadTab === 'team1') {
      setSquad1([...squad1, ...newPlayers]);
    } else {
      setSquad2([...squad2, ...newPlayers]);
    }
    setBulkPlayerText('');
    setShowBulkInput(false);
  };

  // Remove Player
  const handleRemovePlayer = (id: string, team: 'team1' | 'team2') => {
    if (team === 'team1') {
      setSquad1(squad1.filter(p => p.id !== id));
    } else {
      setSquad2(squad2.filter(p => p.id !== id));
    }
  };

  // Create & Publish Match to Database
  const handlePublishMatch = async () => {
    if (!team1Name.trim() || !team2Name.trim()) {
      alert('Please enter both team names.');
      return;
    }

    if (squad1.length === 0 || squad2.length === 0) {
      alert('Please ensure both teams have at least 1 player in their squad.');
      return;
    }

    setIsSubmitting(true);

    try {
      const matchStart = new Date(startDateTime);
      const startTimeIso = isNaN(matchStart.getTime()) 
        ? new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString() 
        : matchStart.toISOString();

      const lockTimeIso = new Date(new Date(startTimeIso).getTime() - 15 * 60 * 1000).toISOString();

      // Combine squad names for player question options
      const allPlayerNames = [...squad1.map(p => p.name), ...squad2.map(p => p.name)];

      // Build Questions populated with squad options
      const configuredQuestions = DEFAULT_QUESTIONS.map(q => {
        if (q.type === 'PLAYER') {
          return {
            ...q,
            options: allPlayerNames
          };
        }
        return q;
      });

      const matchId = `match_${Date.now()}`;
      const newMatch: CricketMatch = {
        id: matchId,
        title: `${team1Name.trim()} vs ${team2Name.trim()}`,
        series: seriesName.trim() || 'Featured Series',
        matchNumber: `Match ${allMatches.length + 1}`,
        team1: {
          code: team1Code.trim() || 'T1',
          name: team1Name.trim(),
          shortName: team1Code.trim() || 'T1',
          logoUrl: team1Logo.trim(),
          color: '#FF6B00',
          accentColor: '#FF8800',
          flagOrLogo: '🏏',
        },
        team2: {
          code: team2Code.trim() || 'T2',
          name: team2Name.trim(),
          shortName: team2Code.trim() || 'T2',
          logoUrl: team2Logo.trim(),
          color: '#004C97',
          accentColor: '#00C8FF',
          flagOrLogo: '⚡',
        },
        venue: venue.trim() || 'Cricket Stadium',
        city: venue.split(',')[1]?.trim() || 'Host City',
        startTime: startTimeIso,
        lockTime: lockTimeIso,
        status: 'UPCOMING',
        format: format || 'T20',
        totalPool: 100000,
        totalEntries: 0,
        entryFees: [25, 50, 100],
        maxEntriesPerUser: 1,
        squadTeam1: squad1.map(p => ({ ...p, team: team1Code.trim(), teamName: team1Name.trim() })),
        squadTeam2: squad2.map(p => ({ ...p, team: team2Code.trim(), teamName: team2Name.trim() })),
        questions: configuredQuestions,
      };

      onCreateMatch(newMatch);
      setSuccessMessage(`✅ Match "${newMatch.title}" successfully created and published live for fans!`);

      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    } catch (e: any) {
      console.error(e);
      alert('Error creating match: ' + (e.message || 'Unknown error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#080C1D] p-6 rounded-3xl border border-[#1A223E] shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#FF6B00]/20 text-[#FF8800] text-[10px] font-black uppercase tracking-wider border border-[#FF6B00]/30">
              Manual Contest Organizer
            </span>
            <span className="text-xs text-slate-400">100% Admin Controlled</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2 mt-1">
            <PlusCircle className="w-6 h-6 text-[#FF8800]" />
            Create Match Manually
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Build your contest with teams, squad rosters, match schedule, and 6 prediction questions. It will appear live on the fan portal instantly.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-4 py-2 rounded-2xl bg-[#0D122B] border border-[#1A223E] text-xs font-bold text-slate-300">
            Active Matches in DB: <span className="text-[#FFAA00] font-black">{allMatches.length}</span>
          </span>
        </div>
      </div>

      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center justify-between shadow-lg">
          <span>{successMessage}</span>
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
        </div>
      )}

      {/* Main Creation Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: Match Details & Teams (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Match Settings Card */}
          <div className="p-6 rounded-3xl bg-[#0D122B] border border-[#1A223E] space-y-4 shadow-xl">
            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
              <Trophy className="w-4 h-4 text-[#FF6B00]" />
              1. Match General Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">
                  Series / Tournament Name:
                </label>
                <input
                  type="text"
                  value={seriesName}
                  onChange={(e) => setSeriesName(e.target.value)}
                  placeholder="e.g. ICC T20 World Cup 2026"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white text-xs font-bold focus:outline-none focus:border-[#FF6B00]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">
                  Match Format:
                </label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white text-xs font-bold focus:outline-none focus:border-[#FF6B00]"
                >
                  <option value="T20">T20 (20 Overs)</option>
                  <option value="ODI">ODI (50 Overs)</option>
                  <option value="TEST">TEST Match</option>
                  <option value="T10">T10 (10 Overs)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">
                  📅 Match Date & Start Time:
                </label>
                <input
                  type="datetime-local"
                  value={startDateTime}
                  onChange={(e) => setStartDateTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white text-xs font-mono font-bold focus:outline-none focus:border-[#FF6B00]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">
                  📍 Venue & City:
                </label>
                <input
                  type="text"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  placeholder="e.g. Wankhede Stadium, Mumbai"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white text-xs font-bold focus:outline-none focus:border-[#FF6B00]"
                />
              </div>
            </div>
          </div>

          {/* Teams Setup Card */}
          <div className="p-6 rounded-3xl bg-[#0D122B] border border-[#1A223E] space-y-4 shadow-xl">
            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#FFAA00]" />
              2. Competing Teams Setup
            </h3>

            {/* Quick Preset Selector Buttons */}
            <div className="space-y-2">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                ⚡ Quick Preset Loaders:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {Object.keys(PRESET_TEAMS).map((code) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => {
                      if (activeSquadTab === 'team1') applyPresetTeam1(code);
                      else applyPresetTeam2(code);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-[#080C1D] hover:bg-[#131A38] text-slate-300 hover:text-white border border-[#1A223E] text-[11px] font-bold transition-all"
                  >
                    + {code} to {activeSquadTab === 'team1' ? 'Team 1' : 'Team 2'}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* Team 1 Box */}
              <div className="p-4 rounded-2xl bg-[#080C1D] border border-[#FF6B00]/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#FF8800] uppercase tracking-wider">TEAM 1</span>
                  <img
                    src={getTeamLogoUrl(team1Code, team1Name, team1Logo)}
                    alt={team1Code}
                    className="w-6 h-6 object-contain rounded"
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://flagcdn.com/w160/un.png'; }}
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 font-bold block mb-1">Full Name:</label>
                  <input
                    type="text"
                    value={team1Name}
                    onChange={(e) => setTeam1Name(e.target.value)}
                    placeholder="e.g. India"
                    className="w-full px-3 py-2 rounded-xl bg-[#0D122B] border border-[#1A223E] text-white text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 font-bold block mb-1">Code (3-4 Letters):</label>
                  <input
                    type="text"
                    value={team1Code}
                    onChange={(e) => setTeam1Code(e.target.value.toUpperCase())}
                    placeholder="e.g. IND"
                    className="w-full px-3 py-2 rounded-xl bg-[#0D122B] border border-[#1A223E] text-white text-xs font-bold uppercase"
                  />
                </div>
              </div>

              {/* Team 2 Box */}
              <div className="p-4 rounded-2xl bg-[#080C1D] border border-[#00C8FF]/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#00C8FF] uppercase tracking-wider">TEAM 2</span>
                  <img
                    src={getTeamLogoUrl(team2Code, team2Name, team2Logo)}
                    alt={team2Code}
                    className="w-6 h-6 object-contain rounded"
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://flagcdn.com/w160/un.png'; }}
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 font-bold block mb-1">Full Name:</label>
                  <input
                    type="text"
                    value={team2Name}
                    onChange={(e) => setTeam2Name(e.target.value)}
                    placeholder="e.g. Australia"
                    className="w-full px-3 py-2 rounded-xl bg-[#0D122B] border border-[#1A223E] text-white text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 font-bold block mb-1">Code (3-4 Letters):</label>
                  <input
                    type="text"
                    value={team2Code}
                    onChange={(e) => setTeam2Code(e.target.value.toUpperCase())}
                    placeholder="e.g. AUS"
                    className="w-full px-3 py-2 rounded-xl bg-[#0D122B] border border-[#1A223E] text-white text-xs font-bold uppercase"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Squad Builder & Publish Action (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Squad Management Card */}
          <div className="p-6 rounded-3xl bg-[#0D122B] border border-[#1A223E] space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-400" />
                3. Squad Rosters
              </h3>
              <button
                type="button"
                onClick={() => setShowBulkInput(!showBulkInput)}
                className="text-[11px] text-[#FF8800] hover:underline font-bold"
              >
                {showBulkInput ? '← Cancel Bulk' : '+ Bulk Paste'}
              </button>
            </div>

            {/* Squad Switch Tabs */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setActiveSquadTab('team1')}
                className={`py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
                  activeSquadTab === 'team1'
                    ? 'bg-gradient-to-r from-[#FF6B00] to-[#FF8800] text-slate-950 shadow-md shadow-[#FF6B00]/30'
                    : 'bg-[#080C1D] text-slate-400 hover:text-white border border-[#1A223E]'
                }`}
              >
                <span>{team1Code || 'Team 1'} ({squad1.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveSquadTab('team2')}
                className={`py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
                  activeSquadTab === 'team2'
                    ? 'bg-gradient-to-r from-[#FF6B00] to-[#FF8800] text-slate-950 shadow-md shadow-[#FF6B00]/30'
                    : 'bg-[#080C1D] text-slate-400 hover:text-white border border-[#1A223E]'
                }`}
              >
                <span>{team2Code || 'Team 2'} ({squad2.length})</span>
              </button>
            </div>

            {/* Bulk Add Box */}
            {showBulkInput ? (
              <div className="p-3.5 rounded-2xl bg-[#080C1D] border border-[#1A223E] space-y-2">
                <label className="text-[10px] text-slate-400 font-bold block">
                  Paste player names (1 per line). You can add role e.g. "Jasprit Bumrah (BOWL)":
                </label>
                <textarea
                  rows={5}
                  value={bulkPlayerText}
                  onChange={(e) => setBulkPlayerText(e.target.value)}
                  placeholder="Rohit Sharma (BAT)&#10;Virat Kohli (BAT)&#10;Jasprit Bumrah (BOWL)"
                  className="w-full px-3 py-2 rounded-xl bg-[#0D122B] border border-[#1A223E] text-white text-xs font-mono focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleBulkAdd}
                  className="w-full py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-black text-xs transition-colors"
                >
                  Import Players to {activeSquadTab === 'team1' ? team1Code : team2Code}
                </button>
              </div>
            ) : (
              /* Add Single Player Input */
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newPlayerName}
                  onChange={(e) => setNewPlayerName(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleAddPlayer(); }}
                  placeholder="Player Name (e.g. Hardik Pandya)"
                  className="flex-1 px-3 py-2 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white text-xs font-bold focus:outline-none focus:border-[#FF6B00]"
                />
                <select
                  value={newPlayerRole}
                  onChange={(e) => setNewPlayerRole(e.target.value as any)}
                  className="px-2 py-2 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white text-xs font-bold"
                >
                  <option value="BAT">BAT</option>
                  <option value="BOWL">BOWL</option>
                  <option value="AR">AR</option>
                  <option value="WK">WK</option>
                </select>
                <button
                  type="button"
                  onClick={handleAddPlayer}
                  className="px-3 py-2 rounded-xl bg-[#FF6B00] hover:bg-[#FF8800] text-slate-950 font-black text-xs"
                >
                  Add
                </button>
              </div>
            )}

            {/* Current Selected Squad Player List */}
            <div className="max-h-60 overflow-y-auto space-y-1.5 pr-1 scrollbar-thin">
              {(activeSquadTab === 'team1' ? squad1 : squad2).map((p, idx) => (
                <div
                  key={p.id || idx}
                  className="p-2 rounded-xl bg-[#080C1D] border border-[#1A223E] flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-lg bg-slate-800 text-slate-400 font-bold text-[10px] flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="font-bold text-white">{p.name}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-black ${
                      p.role === 'BAT' ? 'bg-sky-500/20 text-sky-400' :
                      p.role === 'BOWL' ? 'bg-rose-500/20 text-rose-400' :
                      p.role === 'WK' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {p.role}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemovePlayer(p.id, activeSquadTab)}
                    className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* 6 Prediction Questions Summary */}
            <div className="p-3.5 rounded-2xl bg-[#080C1D] border border-[#1A223E] space-y-2">
              <span className="text-[10px] font-black text-[#FF8800] uppercase tracking-wider block">
                ✨ 6 Auto-Configured Prediction Questions:
              </span>
              <ul className="text-[11px] text-slate-300 space-y-1">
                <li>1. 🏆 Match Winner (Team 1 or Team 2)</li>
                <li>2. 🏏 Top Batter in Match (Squad options)</li>
                <li>3. ⚡ Best Striker (Squad options)</li>
                <li>4. 💥 Most 6s in Match (Squad options)</li>
                <li>5. 🎯 Most 4s in Match (Squad options)</li>
                <li>6. ⭐ Player of the Match (Squad options)</li>
              </ul>
            </div>

            {/* CREATE & PUBLISH BUTTON */}
            <button
              type="button"
              onClick={handlePublishMatch}
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#FF6B00] via-[#FF8800] to-[#FFAA00] hover:brightness-110 active:scale-[0.99] text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-[#FF6B00]/30 transition-all disabled:opacity-50"
              id="btn-publish-manual-match"
            >
              <Flame className="w-5 h-5 fill-current" />
              <span>{isSubmitting ? 'Publishing Contest...' : '🚀 Create & Publish Contest Live'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ALL CREATED MATCHES LIST (LIFECYCLE & QUICK MANAGEMENT) */}
      <div className="p-6 rounded-3xl bg-[#0D122B] border border-[#1A223E] space-y-4 shadow-xl mt-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-[#FF6B00]" />
              Manage All Created Contests ({allMatches.length})
            </h3>
            <p className="text-xs text-slate-400">
              Start matches to LIVE, end matches, disburse payouts, or edit squad players.
            </p>
          </div>
        </div>

        {allMatches.length === 0 ? (
          <div className="p-8 text-center bg-[#080C1D] rounded-2xl border border-[#1A223E] text-slate-400 text-xs">
            No matches created yet. Fill in the form above and click "Create & Publish Contest Live".
          </div>
        ) : (
          <div className="space-y-3">
            {allMatches.map((m) => {
              const isLive = m.status === 'LIVE';
              const isCompleted = m.status === 'COMPLETED';

              return (
                <div
                  key={m.id}
                  className="p-4 sm:p-5 rounded-2xl bg-[#080C1D] border border-[#1A223E] flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:border-[#2A355E] transition-all"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-0.5 rounded bg-[#131A38] text-[#FFAA00] text-[10px] font-black uppercase">
                        {m.format}
                      </span>
                      <span className="text-xs text-slate-300 font-bold">{m.series}</span>
                      <span className="text-xs text-slate-600">•</span>
                      <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                        isLive ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 animate-pulse' :
                        isCompleted ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                        'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                      }`}>
                        {isLive ? '🔴 LIVE IN PLAY' : m.status}
                      </span>
                    </div>

                    <h4 className="text-base font-black text-white">{m.title}</h4>
                    <div className="text-xs text-slate-400">
                      Starts: {new Date(m.startTime || (m as any).matchStartTime).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })} • Venue: {m.venue}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    {/* START MATCH BUTTON */}
                    {!isLive && !isCompleted && (
                      <button
                        onClick={() => onUpdateMatch({ ...m, status: 'LIVE' })}
                        className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:brightness-110 text-white text-xs font-black flex items-center gap-1.5 shadow-md shadow-rose-600/30"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Start (Go LIVE)</span>
                      </button>
                    )}

                    {/* SETTLE PAYOUTS */}
                    <button
                      onClick={() => onGoToSettle && onGoToSettle(m.id)}
                      className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#FF8800] hover:brightness-110 text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-md shadow-[#FF6B00]/30"
                    >
                      <Square className="w-3.5 h-3.5 fill-current" />
                      <span>{isCompleted ? 'Review Result' : 'End & Settle'}</span>
                    </button>

                    {/* SQUAD BUTTON */}
                    <button
                      onClick={() => onGoToSquads && onGoToSquads(m.id)}
                      className="px-3 py-2 rounded-xl bg-[#131A38] hover:bg-[#1A223E] text-[#FF8800] text-xs font-bold border border-[#FF6B00]/30 flex items-center gap-1"
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span>Squads</span>
                    </button>

                    {/* DELETE BUTTON */}
                    <button
                      onClick={async () => {
                        if (window.confirm(`Delete match "${m.title}" permanently?`)) {
                          try {
                            await fetch(`/api/admin/matches/${m.id}`, { method: 'DELETE' });
                            if (onReloadData) onReloadData();
                            else window.location.reload();
                          } catch (e) {
                            console.error(e);
                          }
                        }
                      }}
                      className="px-3 py-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 text-xs font-bold"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
