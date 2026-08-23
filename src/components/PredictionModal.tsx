import React, { useState } from 'react';
import { 
  X, 
  Award, 
  Crosshair, 
  Zap, 
  ShieldCheck, 
  Flame, 
  Target, 
  Check, 
  Search, 
  HelpCircle, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  PlusCircle,
  Trophy,
  RefreshCw
} from 'lucide-react';
import { CricketMatch, Player, PlayerRole, StatQuestionDefinition, StatQuestionKey, UserAccount, Wallet } from '../types';
import { calculatePotentialPayout, formatINR, STAT_QUESTIONS } from '../utils/payoutCalculator';

interface PredictionModalProps {
  match: CricketMatch;
  user: UserAccount;
  wallet: Wallet;
  initialFee?: number;
  onClose: () => void;
  onSubmitSlip: (answers: Record<StatQuestionKey, string>, entryFee: number) => void;
  onOpenDeposit: () => void;
}

export const PredictionModal: React.FC<PredictionModalProps> = ({
  match,
  user,
  wallet,
  initialFee = 25,
  onClose,
  onSubmitSlip,
  onOpenDeposit,
}) => {
  const [selectedFee, setSelectedFee] = useState<number>(initialFee);
  const [answers, setAnswers] = useState<Record<StatQuestionKey, string>>({
    top_batter: '',
    top_bowler: '',
    top_striker: '',
    best_economy: '',
    most_sixes: '',
    most_wickets: '',
  });

  // Current active question index (0 to 5) for focused player selection
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
  
  // Squad filtering
  const [playerSearch, setPlayerSearch] = useState<string>('');
  const [teamFilter, setTeamFilter] = useState<'ALL' | 'TEAM1' | 'TEAM2'>('ALL');
  const [roleFilter, setRoleFilter] = useState<'ALL' | PlayerRole>('ALL');

  const currentQuestion = STAT_QUESTIONS[activeQuestionIndex];
  const allSquadPlayers = [...match.squadTeam1, ...match.squadTeam2];

  // Helper map for fast player lookup
  const playerMap = new Map(allSquadPlayers.map((p) => [p.id, p]));

  const filteredPlayers = allSquadPlayers.filter((p) => {
    // Team filter
    if (teamFilter === 'TEAM1' && p.team !== match.team1.code) return false;
    if (teamFilter === 'TEAM2' && p.team !== match.team2.code) return false;

    // Role filter
    if (roleFilter !== 'ALL' && p.role !== roleFilter) return false;

    // Search query
    if (playerSearch.trim()) {
      const q = playerSearch.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.shortName.toLowerCase().includes(q) || p.team.toLowerCase().includes(q);
    }
    return true;
  });

  // Count answered questions
  const answeredCount = Object.values(answers).filter(Boolean).length;
  const isComplete = answeredCount === 6;

  const handleSelectPlayer = (playerId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.key]: playerId,
    }));

    // Auto advance to next unfilled question if any
    const nextUnfilledIndex = STAT_QUESTIONS.findIndex(
      (q, idx) => idx > activeQuestionIndex && !answers[q.key]
    );

    if (nextUnfilledIndex !== -1) {
      setActiveQuestionIndex(nextUnfilledIndex);
    }
  };

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

  const canAfford = wallet.totalBalance >= selectedFee;

  const handleSubmit = () => {
    if (!isComplete) return;
    if (!canAfford) {
      onOpenDeposit();
      return;
    }
    onSubmitSlip(answers, selectedFee);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800 flex items-center justify-between flex-shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-black text-[11px] uppercase border border-amber-500/30">
                Predict 6 & Win 100X
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {match.series}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-white mt-1 font-display flex items-center gap-2">
              <span>{match.team1.name}</span>
              <span className="text-slate-500 text-sm font-semibold">vs</span>
              <span>{match.team2.name}</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[10px] uppercase font-bold text-slate-400">Progress</span>
              <span className="text-xs font-black text-amber-400">{answeredCount} of 6 Answered</span>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              id="btn-close-prediction-modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Split view on Desktop (6 questions tabs on left / Player squad browser on right) */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 min-h-0 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
          {/* Left Column: 6 Stat Question Slots (5 cols) */}
          <div className="lg:col-span-5 p-4 sm:p-5 space-y-2.5 overflow-y-auto max-h-[45vh] lg:max-h-full">
            <div className="flex items-center justify-between pb-1">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Select 6 Stat Winners
              </span>
              <span className="text-[11px] text-slate-400">
                Click a stat to pick player
              </span>
            </div>

            {STAT_QUESTIONS.map((q, idx) => {
              const selectedPlayerId = answers[q.key];
              const selectedPlayer = selectedPlayerId ? playerMap.get(selectedPlayerId) : null;
              const isActive = activeQuestionIndex === idx;

              return (
                <div
                  key={q.key}
                  onClick={() => setActiveQuestionIndex(idx)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer relative ${
                    isActive
                      ? 'bg-slate-800/90 border-amber-400 shadow-md shadow-amber-500/10 ring-1 ring-amber-400/40'
                      : selectedPlayer
                      ? 'bg-slate-800/40 border-emerald-500/40 hover:border-emerald-500/70'
                      : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
                  }`}
                  id={`stat-slot-${q.key}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                          selectedPlayer
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : isActive
                            ? 'bg-amber-400 text-slate-950 font-black'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {idx + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-black text-white">{q.title}</span>
                          <span className="text-[10px] text-slate-400">({q.shortTitle})</span>
                        </div>
                        <p className="text-[10px] text-slate-400 line-clamp-1">{q.criteria}</p>
                      </div>
                    </div>

                    {/* Status Pill */}
                    {selectedPlayer ? (
                      <div className="flex items-center gap-1.5 pl-2">
                        <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-bold text-[11px] border border-emerald-500/30 flex items-center gap-1 max-w-[110px] truncate">
                          <Check className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                          <span className="truncate">{selectedPlayer.shortName}</span>
                        </span>
                      </div>
                    ) : (
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${
                        isActive 
                          ? 'bg-amber-400/20 text-amber-300 border-amber-400/30 animate-pulse'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}>
                        Pick Player
                      </span>
                    )}
                  </div>

                  {/* Selected Player preview details in slot */}
                  {selectedPlayer && (
                    <div className="mt-2 pt-2 border-t border-slate-700/60 flex items-center justify-between text-[11px] text-slate-300">
                      <div className="flex items-center gap-2">
                        <img
                          src={selectedPlayer.avatar}
                          alt={selectedPlayer.name}
                          className="w-5 h-5 rounded-full object-cover ring-1 ring-emerald-400"
                        />
                        <span className="font-bold text-white">{selectedPlayer.name}</span>
                        <span className="px-1 py-0.2 rounded bg-slate-700 text-slate-300 font-mono text-[9px]">
                          {selectedPlayer.team} • {selectedPlayer.role}
                        </span>
                      </div>
                      <span className="text-[10px] text-amber-400/90 font-medium">
                        Form: {selectedPlayer.recentForm[0]}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Player Roster Browser (7 cols) */}
          <div className="lg:col-span-7 p-4 sm:p-5 flex flex-col overflow-y-auto">
            {/* Header info about the currently active question */}
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 mb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xs">
                    {currentQuestion.number}
                  </div>
                  <span className="text-xs font-black text-white uppercase tracking-wider">
                    Selecting for: {currentQuestion.title}
                  </span>
                </div>
                <span className="text-[11px] text-amber-400 font-bold">
                  {currentQuestion.shortTitle}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                {currentQuestion.subtitle}
              </p>
            </div>

            {/* Filter & Search Toolbar */}
            <div className="space-y-2 mb-3">
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search player name (e.g. Rohit, Bumrah, Kohli)..."
                  value={playerSearch}
                  onChange={(e) => setPlayerSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
                  id="input-player-search"
                />
                {playerSearch && (
                  <button
                    onClick={() => setPlayerSearch('')}
                    className="absolute right-3 top-2 text-slate-400 hover:text-white text-xs"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Team & Role Filters */}
              <div className="flex items-center justify-between gap-2 flex-wrap">
                {/* Team Filter */}
                <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                  <button
                    onClick={() => setTeamFilter('ALL')}
                    className={`px-2.5 py-1 rounded text-[11px] font-bold transition-colors ${
                      teamFilter === 'ALL' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Both Teams
                  </button>
                  <button
                    onClick={() => setTeamFilter('TEAM1')}
                    className={`px-2.5 py-1 rounded text-[11px] font-bold transition-colors ${
                      teamFilter === 'TEAM1' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {match.team1.code}
                  </button>
                  <button
                    onClick={() => setTeamFilter('TEAM2')}
                    className={`px-2.5 py-1 rounded text-[11px] font-bold transition-colors ${
                      teamFilter === 'TEAM2' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {match.team2.code}
                  </button>
                </div>

                {/* Role Filter */}
                <div className="flex items-center gap-1 overflow-x-auto text-[11px]">
                  {(['ALL', 'BAT', 'BOWL', 'AR', 'WK'] as const).map((role) => (
                    <button
                      key={role}
                      onClick={() => setRoleFilter(role)}
                      className={`px-2 py-1 rounded-md font-bold transition-colors ${
                        roleFilter === role
                          ? 'bg-slate-700 text-amber-300 border border-amber-500/40'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Players Squad List */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 min-h-[220px]">
              {filteredPlayers.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-xs">
                  No players found matching your search.
                </div>
              ) : (
                filteredPlayers.map((player) => {
                  const isSelectedForCurrent = answers[currentQuestion.key] === player.id;
                  const isSelectedForOther = Object.entries(answers).some(
                    ([k, val]) => k !== currentQuestion.key && val === player.id
                  );

                  return (
                    <div
                      key={player.id}
                      onClick={() => handleSelectPlayer(player.id)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelectedForCurrent
                          ? 'bg-gradient-to-r from-amber-500/20 via-slate-800 to-slate-800 border-amber-400 shadow-md ring-1 ring-amber-400/40'
                          : 'bg-slate-950/60 border-slate-800 hover:bg-slate-800/80 hover:border-slate-700'
                      }`}
                      id={`player-row-${player.id}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            src={player.avatar}
                            alt={player.name}
                            className={`w-11 h-11 rounded-xl object-cover ring-1 ${
                              isSelectedForCurrent ? 'ring-amber-400' : 'ring-slate-700'
                            }`}
                          />
                          <span className="absolute -bottom-1 -right-1 px-1 py-0.2 rounded bg-slate-900 border border-slate-700 text-[9px] font-black text-amber-400">
                            {player.team}
                          </span>
                        </div>

                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-black text-white">{player.name}</span>
                            <span className="px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 text-[10px] font-bold border border-slate-700">
                              {player.role}
                            </span>
                            {isSelectedForOther && (
                              <span className="text-[9px] text-slate-400 bg-slate-800 px-1 rounded">
                                picked in another
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5">{player.careerStatHighlight}</p>
                          
                          {/* Recent scores form pills */}
                          <div className="flex items-center gap-1 mt-1 text-[10px]">
                            <span className="text-slate-500 font-semibold">Recent:</span>
                            {player.recentForm.slice(0, 3).map((f, i) => (
                              <span key={i} className="px-1 py-0.2 rounded bg-slate-800 text-slate-300 font-mono text-[9px]">
                                {f}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Select Action Button */}
                      <div>
                        {isSelectedForCurrent ? (
                          <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-md">
                            <Check className="w-4 h-4 stroke-[3]" />
                          </div>
                        ) : (
                          <button
                            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-amber-400 hover:text-slate-950 text-slate-200 text-xs font-bold border border-slate-700 hover:border-amber-400 transition-colors"
                          >
                            Pick
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Modal Bottom: Entry Fee & Potential Winnings & Submit CTA */}
        <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex-shrink-0 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Entry Fee Picker */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-400 uppercase">Entry Fee:</span>
              <div className="flex items-center gap-2">
                {[25, 50, 100].map((fee) => (
                  <button
                    key={fee}
                    onClick={() => setSelectedFee(fee)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                      selectedFee === fee
                        ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20 ring-2 ring-amber-400/40 scale-105'
                        : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'
                    }`}
                    id={`btn-modal-fee-${fee}`}
                  >
                    ₹{fee}
                  </button>
                ))}
              </div>
            </div>

            {/* Payout Matrix Preview */}
            <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto text-xs">
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">6/6 Jackpot (100X)</span>
                <span className="font-extrabold text-amber-400 text-sm">
                  {formatINR(selectedFee * 100)}
                </span>
              </div>
              <div className="text-right border-l border-slate-800 pl-3">
                <span className="text-[10px] text-slate-400 block">5/6 Win (10X)</span>
                <span className="font-extrabold text-emerald-400 text-sm">
                  {formatINR(selectedFee * 10)}
                </span>
              </div>
              <div className="text-right border-l border-slate-800 pl-3">
                <span className="text-[10px] text-slate-400 block">4/6 Win (3X)</span>
                <span className="font-extrabold text-blue-400 text-sm">
                  {formatINR(selectedFee * 3)}
                </span>
              </div>
              <div className="text-right border-l border-slate-800 pl-3">
                <span className="text-[10px] text-slate-400 block">3/6 Guard (0.5X)</span>
                <span className="font-extrabold text-slate-300 text-sm">
                  {formatINR(selectedFee * 0.5)}
                </span>
              </div>
            </div>
          </div>

          {/* Submit Action Bar */}
          <div className="flex items-center justify-between gap-4 pt-2 border-t border-slate-800/80">
            <div className="flex items-center gap-2">
              <div className="text-xs text-slate-400">
                Wallet Balance: <span className="font-bold text-white">{formatINR(wallet.totalBalance)}</span>
              </div>
              {!canAfford && (
                <span className="text-[11px] text-rose-400 font-semibold">
                  (Needs ₹{selectedFee - wallet.totalBalance} more)
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              {!isComplete ? (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-amber-400 font-semibold hidden sm:inline">
                    Please answer all 6 questions ({answeredCount}/6)
                  </span>
                  <button
                    disabled
                    className="px-6 py-2.5 rounded-xl bg-slate-800 text-slate-500 font-extrabold text-xs cursor-not-allowed border border-slate-700"
                  >
                    Complete 6 Picks ({answeredCount}/6)
                  </button>
                </div>
              ) : !canAfford ? (
                <button
                  onClick={onOpenDeposit}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:brightness-110 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20"
                  id="btn-add-money-submit"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Add ₹{selectedFee} via UPI & Submit</span>
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-7 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:brightness-110 active:scale-[0.99] text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-amber-500/30"
                  id="btn-submit-prediction-slip"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Submit Prediction Slip (₹{selectedFee})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
