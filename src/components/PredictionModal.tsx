import React, { useState } from 'react';
import { 
  X, Award, Crosshair, Zap, ShieldCheck, Flame, Target, Check, 
  Search, ArrowRight, CheckCircle2, ChevronRight, AlertCircle
} from 'lucide-react';
import { CricketMatch, Player, PlayerRole, QuestionDefinition, UserAccount, Wallet } from '../types';
import { formatINR } from '../utils/payoutCalculator';
import { WheelOfFortune } from './WheelOfFortune';

interface PredictionModalProps {
  match: CricketMatch;
  user: UserAccount;
  wallet: Wallet;
  initialFee?: number;
  onClose: () => void;
  onSubmitSlip: (answers: Record<string, string>, entryFee: number, jackpotMultiplier: number) => void;
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
  const [answers, setAnswers] = useState<Record<string, string>>({});
  
  // View states
  const [activePlayerQuestionId, setActivePlayerQuestionId] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'QUESTIONS' | 'STAKE' | 'WHEEL'>('QUESTIONS');
  
  // Stake states
  const [selectedFee, setSelectedFee] = useState<number>(initialFee);
  const [customFee, setCustomFee] = useState<string>('');
  
  // Wheel states
  const [jackpotMultiplier, setJackpotMultiplier] = useState<number | null>(null);

  // Player search/filter
  const [playerSearch, setPlayerSearch] = useState<string>('');
  const [teamFilter, setTeamFilter] = useState<'ALL' | 'TEAM1' | 'TEAM2'>('ALL');
  const [roleFilter, setRoleFilter] = useState<'ALL' | PlayerRole>('ALL');

  const allSquadPlayers = [...match.squadTeam1, ...match.squadTeam2];
  const playerMap = new Map(allSquadPlayers.map((p) => [p.id, p]));

  const filteredPlayers = allSquadPlayers.filter((p) => {
    if (teamFilter === 'TEAM1' && p.team !== match.team1.code) return false;
    if (teamFilter === 'TEAM2' && p.team !== match.team2.code) return false;
    if (roleFilter !== 'ALL' && p.role !== roleFilter) return false;
    if (playerSearch.trim()) {
      const q = playerSearch.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.shortName.toLowerCase().includes(q) || p.team.toLowerCase().includes(q);
    }
    return true;
  });

  const answeredCount = Object.keys(answers).length;
  const isComplete = answeredCount === match.questions.length;

  const handleAnswer = (questionId: string, answerId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answerId }));
    if (activePlayerQuestionId === questionId) {
      setActivePlayerQuestionId(null); // Close player popup
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

  // --- STAKE CALCULATION ---
  const presetFees = [25, 50, 100, 200, 250, 500, 1000];
  const baseStake = customFee ? parseInt(customFee) || selectedFee : selectedFee;
  const freeHitFee = Math.round(baseStake * 0.4); // 40%
  const finalPayable = baseStake + freeHitFee;
  const canAfford = wallet.totalBalance >= finalPayable;

  const handleBuyFreeHit = () => {
    if (!canAfford) {
      onOpenDeposit();
      return;
    }
    setCurrentView('WHEEL');
  };

  const handleWheelComplete = (multiplier: number) => {
    setJackpotMultiplier(multiplier);
    // Auto submit after a short delay
    setTimeout(() => {
      onSubmitSlip(answers, baseStake, multiplier);
    }, 1500);
  };

  // --- RENDERERS ---

  const renderPlayerPickerPopup = () => {
    if (!activePlayerQuestionId) return null;
    const q = match.questions.find(q => q.id === activePlayerQuestionId);

    return (
      <div className="absolute inset-0 z-20 bg-slate-900 flex flex-col animate-in slide-in-from-bottom-8">
        <div className="p-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div>
            <div className="text-[10px] text-amber-500 font-bold uppercase tracking-wider mb-1">Pick a player for</div>
            <h3 className="text-white font-bold">{q?.title}</h3>
          </div>
          <button 
            onClick={() => setActivePlayerQuestionId(null)}
            className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center text-slate-400"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <div className="p-3 border-b border-slate-800 space-y-3 bg-slate-900/50">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search players..."
              value={playerSearch}
              onChange={(e) => setPlayerSearch(e.target.value)}
              className="w-full bg-slate-800 border-none rounded-xl py-2.5 pl-9 pr-4 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-500/50"
            />
          </div>
          {/* Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar">
            <button onClick={() => setTeamFilter('ALL')} className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${teamFilter === 'ALL' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>All</button>
            <button onClick={() => setTeamFilter('TEAM1')} className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${teamFilter === 'TEAM1' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>{match.team1.shortName}</button>
            <button onClick={() => setTeamFilter('TEAM2')} className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${teamFilter === 'TEAM2' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>{match.team2.shortName}</button>
            <div className="w-px h-4 bg-slate-700 mx-1"></div>
            <button onClick={() => setRoleFilter('ALL')} className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${roleFilter === 'ALL' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>All Roles</button>
            <button onClick={() => setRoleFilter('BAT')} className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${roleFilter === 'BAT' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>Bat</button>
            <button onClick={() => setRoleFilter('BOWL')} className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${roleFilter === 'BOWL' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>Bowl</button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {filteredPlayers.map((p) => (
            <div
              key={p.id}
              onClick={() => handleAnswer(q!.id, p.id)}
              className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-700 hover:bg-slate-800 hover:border-emerald-500/50 cursor-pointer transition-all"
            >
              <img src={p.avatar} alt={p.name} className="w-10 h-10 rounded-full object-cover bg-slate-700" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-sm truncate">{p.name}</h4>
                  <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-slate-700 text-slate-300">{p.team}</span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-slate-400">{p.role}</span>
                  <span className="text-[10px] text-emerald-400 truncate border-l border-slate-600 pl-2">{p.careerStatHighlight}</span>
                </div>
              </div>
            </div>
          ))}
          {filteredPlayers.length === 0 && (
            <div className="text-center py-10 text-slate-500 text-sm">No players found matching your filters.</div>
          )}
        </div>
      </div>
    );
  };

  const renderQuestions = () => (
    <div className="flex-1 overflow-y-auto relative p-4 sm:p-6 space-y-4">
      {renderPlayerPickerPopup()}
      
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-white font-black text-lg font-display">Make Your Predictions</h3>
          <p className="text-xs text-slate-400">Answer all {match.questions.length} questions correctly to win the jackpot.</p>
        </div>
        <div className="w-12 h-12 rounded-full border-4 border-slate-800 flex items-center justify-center relative">
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" className="text-slate-800" strokeWidth="4" />
            <circle 
              cx="20" cy="20" r="18" fill="none" stroke="currentColor" 
              className="text-amber-500 transition-all duration-500" strokeWidth="4" 
              strokeDasharray="113" strokeDashoffset={113 - (answeredCount / match.questions.length) * 113}
            />
          </svg>
          <span className="text-xs font-black text-white">{answeredCount}/{match.questions.length}</span>
        </div>
      </div>

      <div className="space-y-4">
        {match.questions.map((q) => {
          const answerId = answers[q.id];
          const isAnswered = !!answerId;

          return (
            <div key={q.id} className={`bg-slate-800/40 border rounded-2xl p-4 transition-all ${isAnswered ? 'border-emerald-500/30' : 'border-slate-700 hover:border-slate-600'}`}>
              <div className="flex gap-3 mb-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isAnswered ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-400'}`}>
                  {getQuestionIcon(q.iconName)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white">{q.title}</h4>
                    {isAnswered && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{q.subtitle}</p>
                </div>
              </div>

              {/* Dynamic Input based on Question Type */}
              <div className="mt-3">
                {q.type === 'PLAYER' && (
                  <button 
                    onClick={() => setActivePlayerQuestionId(q.id)}
                    className={`w-full py-2.5 px-4 rounded-xl border flex items-center justify-between transition-all ${
                      isAnswered 
                        ? 'bg-slate-800/80 border-slate-600' 
                        : 'bg-amber-500 text-slate-950 border-transparent hover:bg-amber-400 font-bold'
                    }`}
                  >
                    {isAnswered ? (
                      <div className="flex items-center gap-2">
                        <img src={playerMap.get(answerId)?.avatar} alt="" className="w-6 h-6 rounded-full" />
                        <span className="text-white font-semibold text-sm">{playerMap.get(answerId)?.name}</span>
                        <span className="text-xs text-slate-400 ml-auto bg-slate-900 px-2 py-1 rounded">Change</span>
                      </div>
                    ) : (
                      <>
                        <span className="text-sm">Pick a Player</span>
                        <Search className="w-4 h-4" />
                      </>
                    )}
                  </button>
                )}

                {(q.type === 'TEAM' || q.type === 'YES_NO' || q.type === 'MULTIPLE_CHOICE') && (q.options || q.type === 'TEAM') && (
                  <div className="flex flex-wrap gap-2">
                    {(q.options || [match.team1.code, match.team2.code]).map(opt => {
                      const displayLabel = q.type === 'TEAM' 
                        ? (opt === match.team1.code ? match.team1.shortName : opt === match.team2.code ? match.team2.shortName : opt)
                        : opt;
                      return (
                        <button
                          key={opt}
                          onClick={() => handleAnswer(q.id, opt)}
                          className={`flex-1 py-2 px-3 rounded-xl border text-sm font-semibold transition-all ${
                            answerId === opt 
                              ? 'bg-emerald-500 text-slate-950 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                              : 'bg-slate-900/50 text-slate-300 border-slate-700 hover:bg-slate-800'
                          }`}
                        >
                          {displayLabel}
                        </button>
                      );
                    })}
                  </div>
                )}
                
                {q.type === 'NUMBER' && (
                  <div className="relative">
                    <input 
                      type="number"
                      placeholder="Enter a number..."
                      value={answerId || ''}
                      onChange={(e) => handleAnswer(q.id, e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2.5 px-4 text-white text-sm focus:border-amber-500 outline-none transition-colors"
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {isComplete && (
        <div className="mt-6">
          <button 
            onClick={() => setCurrentView('STAKE')}
            className="w-full py-4 rounded-xl font-black text-slate-950 text-lg bg-amber-500 hover:bg-amber-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
          >
            PROCEED TO STAKE
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );

  const renderStakePalette = () => {
    const isCustomError = parseInt(customFee) > 1000;
    
    return (
      <div className="flex-1 flex flex-col p-4 sm:p-6 bg-slate-950">
        <button 
          onClick={() => setCurrentView('QUESTIONS')}
          className="self-start mb-6 text-sm text-slate-400 hover:text-white flex items-center gap-1"
        >
          <ChevronRight className="w-4 h-4 rotate-180" /> Back to Predictions
        </button>

        <div className="flex-1 max-w-sm mx-auto w-full">
          <h3 className="text-2xl font-black text-white font-display text-center mb-2">Select Your Stake</h3>
          <p className="text-sm text-slate-400 text-center mb-8">Choose your base stake to enter the contest.</p>

          <div className="grid grid-cols-3 gap-3 mb-4">
            {presetFees.map((fee) => (
              <button
                key={fee}
                onClick={() => { setSelectedFee(fee); setCustomFee(''); }}
                className={`py-3 rounded-xl border-2 font-bold transition-all ${
                  selectedFee === fee && !customFee
                    ? 'bg-amber-500/20 border-amber-500 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800'
                }`}
              >
                ₹{fee}
              </button>
            ))}
          </div>

          <div className="mb-8">
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Enter Custom Amount</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
              <input
                type="number"
                value={customFee}
                onChange={(e) => {
                  setCustomFee(e.target.value);
                }}
                placeholder="Custom Amount"
                className={`w-full bg-slate-900 border-2 rounded-xl py-3 pl-8 pr-4 text-white font-bold outline-none transition-colors ${
                  isCustomError ? 'border-rose-500 text-rose-500' : customFee ? 'border-amber-500 text-amber-400' : 'border-slate-800'
                }`}
              />
            </div>
            {isCustomError && (
              <div className="text-rose-500 text-xs font-bold mt-2">
                MAX limit is 1000
              </div>
            )}
          </div>

          {/* Wallet Balance Warning */}
          <div className={`mb-6 text-xs flex items-center gap-1.5 p-3 rounded-xl ${canAfford ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
            {canAfford ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span className="font-bold">Wallet Balance: {formatINR(wallet.totalBalance)}</span>
          </div>

          <button 
            onClick={handleBuyFreeHit}
            disabled={isCustomError}
            className={`w-full py-4 rounded-xl font-black text-slate-950 text-lg transition-all flex flex-col items-center justify-center ${
              isCustomError 
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
                : 'bg-amber-500 hover:bg-amber-400 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_30px_rgba(245,158,11,0.3)]'
            }`}
          >
            <span>BUY A FREE HIT</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden my-auto flex flex-col max-h-[92vh] min-h-[600px]">
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between flex-shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-black text-[11px] uppercase border border-amber-500/30">
                Crack 6 & Gain 500X
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {match.series}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-white mt-1 font-display flex items-center gap-2">
              <span>{match.team1.shortName}</span>
              <span className="text-slate-500 text-sm font-semibold">vs</span>
              <span>{match.team2.shortName}</span>
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
        {currentView === 'QUESTIONS' && renderQuestions()}
        {currentView === 'STAKE' && renderStakePalette()}
        {currentView === 'WHEEL' && (
          <div className="flex-1 flex flex-col items-center justify-center p-6 bg-slate-950">
            <WheelOfFortune onComplete={handleWheelComplete} />
            {jackpotMultiplier && (
              <div className="mt-8 text-center animate-in fade-in slide-in-from-bottom-4">
                <div className="text-xl font-black text-white">Submitting Prediction...</div>
                <div className="text-sm text-slate-400 mt-2">Locking in your {jackpotMultiplier}X Multiplier</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
