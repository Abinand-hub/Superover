import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { QuestionBankItem, QuestionType } from '../../types';
import { Database, Plus, RefreshCw, Loader2, Save, X, Star, Shield, AlertTriangle, Trophy, Ticket, Hash, Trash2 } from 'lucide-react';

const ICONS = {
  BAT: { label: 'Bat', icon: Star, color: 'text-orange-400' },
  BOWL: { label: 'Ball', icon: Shield, color: 'text-blue-400' },
  STAR: { label: 'Star', icon: Star, color: 'text-yellow-400' },
  TROPHY: { label: 'Trophy', icon: Trophy, color: 'text-purple-400' },
  SHIELD: { label: 'Shield', icon: Shield, color: 'text-emerald-400' },
  TICKET: { label: 'Ticket', icon: Ticket, color: 'text-pink-400' },
  ALERT: { label: 'Alert', icon: AlertTriangle, color: 'text-red-400' },
  HASH: { label: 'Hash', icon: Hash, color: 'text-gray-400' }
};

export const QuestionBankManager: React.FC = () => {
  const [questions, setQuestions] = useState<QuestionBankItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [shortTitle, setShortTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [type, setType] = useState<QuestionType>('MULTIPLE_CHOICE');
  const [optionsType, setOptionsType] = useState<'FIXED' | 'DYNAMIC_SQUAD'>('FIXED');
  const [customOptions, setCustomOptions] = useState<string[]>(['Under 300', '300 to 325', '325 to 350', 'Over 350']);
  const [iconName, setIconName] = useState('STAR');

  useEffect(() => {
    loadBank();
  }, []);

  const loadBank = async () => {
    setIsLoading(true);
    try {
      const bank = await api.getQuestionBank();
      setQuestions(bank);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateOption = (index: number, val: string) => {
    const next = [...customOptions];
    next[index] = val;
    setCustomOptions(next);
  };

  const handleAddOptionSlot = () => {
    if (customOptions.length >= 8) return;
    setCustomOptions([...customOptions, `Option ${String.fromCharCode(65 + customOptions.length)}`]);
  };

  const handleRemoveOptionSlot = (index: number) => {
    if (customOptions.length <= 2) return;
    setCustomOptions(customOptions.filter((_, i) => i !== index));
  };

  const applyPreset = (presetType: 'YES_NO' | 'HIGH_RUNS' | 'MED_RUNS' | 'LOW_RUNS' | 'WICKETS' | 'SIXES' | 'BOUNDARIES') => {
    setOptionsType('FIXED');
    switch (presetType) {
      case 'YES_NO':
        setType('YES_NO');
        setCustomOptions(['YES', 'NO']);
        break;
      case 'HIGH_RUNS':
        setType('NUMBER');
        setCustomOptions(['Under 360', '360 to 380', '380 to 400', '400 and Above']);
        break;
      case 'MED_RUNS':
        setType('NUMBER');
        setCustomOptions(['Under 300', '300 to 325', '325 to 350', 'Over 350']);
        break;
      case 'LOW_RUNS':
        setType('NUMBER');
        setCustomOptions(['Under 280', '280 to 300', '300 to 320', '320 and Above']);
        break;
      case 'WICKETS':
        setType('NUMBER');
        setCustomOptions(['Under 10', '10 to 13', '14 to 16', '17 and Above']);
        break;
      case 'SIXES':
        setType('NUMBER');
        setCustomOptions(['Under 12', '12 to 18', '19 to 25', '26 and Above']);
        break;
      case 'BOUNDARIES':
        setType('NUMBER');
        setCustomOptions(['Under 25', '25 to 35', '36 to 45', '46 and Above']);
        break;
    }
  };

  const handleDeleteQuestion = async (id?: string) => {
    if (!id) return;
    if (confirm('Are you sure you want to delete this question from the Question Bank?')) {
      try {
        await api.deleteQuestionBank(id);
        await loadBank();
      } catch (e) {
        console.error(e);
        alert('Failed to delete question');
      }
    }
  };

  const handleSave = async () => {
    if (!title || !shortTitle || !subtitle) {
      alert('Please fill out all required fields.');
      return;
    }

    const filteredOptions = customOptions.map(o => o.trim()).filter(Boolean);
    if (optionsType === 'FIXED' && filteredOptions.length < 2) {
      alert('Custom / Fixed options require at least 2 valid options (e.g. Option A & Option B / YES & NO).');
      return;
    }

    setIsSaving(true);
    try {
      const payload: QuestionBankItem = {
        title: title.trim(),
        shortTitle: shortTitle.trim(),
        subtitle: subtitle.trim(),
        type,
        optionsType,
        options: optionsType === 'FIXED' ? filteredOptions : [],
        iconName
      };

      await api.createQuestionBank(payload);
      await loadBank();
      setShowAddForm(false);
      resetForm();
    } catch (e) {
      console.error(e);
      alert('Failed to save question');
    } finally {
      setIsSaving(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setShortTitle('');
    setSubtitle('');
    setType('MULTIPLE_CHOICE');
    setOptionsType('FIXED');
    setCustomOptions(['Under 300', '300 to 325', '325 to 350', 'Over 350']);
    setIconName('STAR');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Database className="w-6 h-6 text-purple-400" />
            Super Over Question Bank
          </h2>
          <p className="text-sm text-slate-400">Manage standard questions, 4 custom options (A/B/C/D), runs/wickets ranges &amp; Yes/No schemes.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={loadBank} className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors text-slate-300" title="Reload Bank">
            <RefreshCw className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white rounded-xl font-bold transition-all shadow-lg shadow-purple-600/30"
          >
            <Plus className="w-4 h-4" />
            Add Question to Bank
          </button>
        </div>
      </div>

      {showAddForm && (
        <div className="bg-[#0D122B] border border-purple-500/40 rounded-2xl p-6 shadow-2xl space-y-5">
          <div className="flex items-center justify-between border-b border-[#1A223E] pb-3">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-purple-400" />
                Add New Question to Question Bank
              </h3>
              <p className="text-xs text-slate-400">Define custom answer options (A, B, C, D) or Yes/No schemes.</p>
            </div>
            <button onClick={() => setShowAddForm(false)} className="p-1.5 rounded-lg bg-[#131A38] text-slate-400 hover:text-white border border-[#1A223E]">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Short Title (Admin Reference / Category)</label>
              <input 
                type="text" 
                value={shortTitle}
                onChange={e => setShortTitle(e.target.value)}
                placeholder="e.g. Total Match Runs, Will Rohit 45+, Total Wickets"
                className="w-full bg-[#080C1D] border border-[#1A223E] rounded-xl p-2.5 text-white focus:border-purple-500 focus:outline-none text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Full Question Text (User Facing)</label>
              <input 
                type="text" 
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. How many total runs will be scored in this match?"
                className="w-full bg-[#080C1D] border border-[#1A223E] rounded-xl p-2.5 text-white focus:border-purple-500 focus:outline-none text-xs font-bold"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-400 mb-1">Subtitle / Scoring Criteria (Helper text for fans)</label>
              <input 
                type="text" 
                value={subtitle}
                onChange={e => setSubtitle(e.target.value)}
                placeholder="e.g. Combined runs scored by both teams across all 40 overs"
                className="w-full bg-[#080C1D] border border-[#1A223E] rounded-xl p-2.5 text-slate-300 focus:border-purple-500 focus:outline-none text-xs"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Question Type</label>
              <select 
                value={type}
                onChange={e => {
                  const val = e.target.value as QuestionType;
                  setType(val);
                  if (val === 'YES_NO') {
                    applyPreset('YES_NO');
                  } else if (val === 'PLAYER') {
                    setOptionsType('DYNAMIC_SQUAD');
                  } else {
                    setOptionsType('FIXED');
                  }
                }}
                className="w-full bg-[#080C1D] border border-[#1A223E] rounded-xl p-2.5 text-white focus:border-purple-500 focus:outline-none text-xs font-bold"
              >
                <option value="MULTIPLE_CHOICE">MULTIPLE CHOICE (Option A, B, C, D)</option>
                <option value="YES_NO">YES / NO (Option A: YES, Option B: NO)</option>
                <option value="NUMBER">NUMBER / RANGES (Total Runs, Wickets, Boundaries)</option>
                <option value="PLAYER">PLAYER (Auto-fetch Squad Players from match)</option>
                <option value="TEAM">TEAM (Team 1 vs Team 2)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Badge Icon</label>
              <select 
                value={iconName}
                onChange={e => setIconName(e.target.value)}
                className="w-full bg-[#080C1D] border border-[#1A223E] rounded-xl p-2.5 text-white focus:border-purple-500 focus:outline-none text-xs font-bold"
              >
                {Object.keys(ICONS).map(k => (
                  <option key={k} value={k}>{ICONS[k as keyof typeof ICONS].label}</option>
                ))}
              </select>
            </div>
            
            {/* Options Configuration Box */}
            <div className="md:col-span-2 p-4 bg-[#080C1D] rounded-2xl border border-[#1A223E] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <label className="block text-xs text-[#FFAA00] uppercase tracking-wider font-black">
                  Options Configuration (Option A, B, C, D or Presets)
                </label>
                
                <div className="flex gap-4">
                  <label className="flex items-center gap-1.5 cursor-pointer text-xs font-bold text-slate-300">
                    <input 
                      type="radio" 
                      checked={optionsType === 'FIXED'} 
                      onChange={() => setOptionsType('FIXED')}
                      className="text-purple-500 focus:ring-purple-500"
                    />
                    <span>Custom Options (A, B, C, D)</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer text-xs font-bold text-slate-300">
                    <input 
                      type="radio" 
                      checked={optionsType === 'DYNAMIC_SQUAD'} 
                      onChange={() => setOptionsType('DYNAMIC_SQUAD')}
                      className="text-purple-500 focus:ring-purple-500"
                    />
                    <span>Dynamic Squad Players</span>
                  </label>
                </div>
              </div>

              {optionsType === 'FIXED' && (
                <div className="space-y-3 pt-2">
                  {/* Quick Preset Templates */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mr-1">Quick Presets:</span>
                    <button
                      type="button"
                      onClick={() => applyPreset('YES_NO')}
                      className="px-2.5 py-1 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold transition-all"
                    >
                      ⚡ YES / NO
                    </button>
                    <button
                      type="button"
                      onClick={() => applyPreset('HIGH_RUNS')}
                      className="px-2.5 py-1 rounded-lg bg-amber-950/60 hover:bg-amber-900/80 text-amber-300 border border-amber-500/40 text-[11px] font-bold transition-all"
                    >
                      ⚡ High Score (360-400+)
                    </button>
                    <button
                      type="button"
                      onClick={() => applyPreset('MED_RUNS')}
                      className="px-2.5 py-1 rounded-lg bg-sky-950/60 hover:bg-sky-900/80 text-sky-300 border border-sky-500/40 text-[11px] font-bold transition-all"
                    >
                      ⚡ Med Score (300-350+)
                    </button>
                    <button
                      type="button"
                      onClick={() => applyPreset('LOW_RUNS')}
                      className="px-2.5 py-1 rounded-lg bg-pink-950/60 hover:bg-pink-900/80 text-pink-300 border border-pink-500/40 text-[11px] font-bold transition-all"
                    >
                      ⚡ Low Score (280-320+)
                    </button>
                    <button
                      type="button"
                      onClick={() => applyPreset('WICKETS')}
                      className="px-2.5 py-1 rounded-lg bg-purple-950/60 hover:bg-purple-900/80 text-purple-300 border border-purple-500/40 text-[11px] font-bold transition-all"
                    >
                      ⚡ Wickets (10-17+)
                    </button>
                    <button
                      type="button"
                      onClick={() => applyPreset('SIXES')}
                      className="px-2.5 py-1 rounded-lg bg-indigo-950/60 hover:bg-indigo-900/80 text-indigo-300 border border-indigo-500/40 text-[11px] font-bold transition-all"
                    >
                      ⚡ Sixes (12-26+)
                    </button>
                  </div>

                  {/* Option A, B, C, D Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {customOptions.map((opt, optIdx) => {
                      const letter = String.fromCharCode(65 + optIdx);
                      return (
                        <div key={optIdx} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-black text-[#FFAA00] flex items-center gap-1">
                              <span className="w-5 h-5 rounded-md bg-[#FF6B00]/20 text-[#FF8800] flex items-center justify-center text-[10px] font-black border border-[#FF6B00]/40">
                                {letter}
                              </span>
                              Option {letter}:
                            </span>
                            {customOptions.length > 2 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveOptionSlot(optIdx)}
                                className="text-slate-500 hover:text-rose-400 text-[10px] font-bold"
                              >
                                Remove
                              </button>
                            )}
                          </div>
                          <input 
                            type="text"
                            value={opt}
                            onChange={(e) => handleUpdateOption(optIdx, e.target.value)}
                            placeholder={`e.g. ${optIdx === 0 ? 'Under 360' : optIdx === 1 ? '360 to 380' : optIdx === 2 ? '380 to 400' : '400 and Above'}`}
                            className="w-full bg-[#0D122B] border border-[#1A223E] rounded-xl px-3 py-2 text-white font-bold text-xs focus:border-purple-500 focus:outline-none"
                          />
                        </div>
                      );
                    })}
                  </div>

                  {/* Add Extra Option Button */}
                  {customOptions.length < 6 && (
                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={handleAddOptionSlot}
                        className="px-3 py-1.5 rounded-xl bg-[#131A38] hover:bg-[#1A223E] text-slate-300 hover:text-white border border-[#1A223E] text-xs font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5 text-purple-400" />
                        <span>+ Add Option {String.fromCharCode(65 + customOptions.length)}</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-6 flex justify-end gap-3 pt-3 border-t border-[#1A223E]">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-5 py-2.5 rounded-xl bg-[#131A38] hover:bg-[#1A223E] text-slate-300 hover:text-white text-xs font-bold border border-[#1A223E] transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:brightness-110 text-white rounded-xl font-black text-xs transition-all disabled:opacity-50 shadow-lg shadow-emerald-900/30"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Question to Bank
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {questions.map((q) => {
          const IconComp = ICONS[q.iconName as keyof typeof ICONS]?.icon || Star;
          const iconColor = ICONS[q.iconName as keyof typeof ICONS]?.color || 'text-purple-400';
          
          return (
            <div key={q._id} className="bg-[#11172D] border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors shadow-lg flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div className={`p-2 rounded-xl bg-slate-800/80 ${iconColor} border border-slate-700`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] font-black text-slate-400 tracking-wider uppercase">{q.type}</span>
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded-full mt-0.5 border ${q.optionsType === 'DYNAMIC_SQUAD' ? 'bg-blue-900/30 text-blue-300 border-blue-500/30' : 'bg-amber-900/30 text-amber-300 border-amber-500/30'}`}>
                        {q.optionsType === 'DYNAMIC_SQUAD' ? '👥 SQUAD PLAYERS' : `🔢 ${q.options?.length || 0} CUSTOM OPTIONS`}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteQuestion(q._id)}
                      className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/25 text-rose-400 border border-rose-500/20 transition-colors ml-1"
                      title="Delete Question"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className="text-sm font-black text-[#FFAA00] mb-1">{q.shortTitle}</h3>
                <p className="text-xs font-bold text-white mb-1.5 leading-snug">{q.title}</p>
                <p className="text-[11px] text-slate-400 leading-relaxed">{q.subtitle}</p>
              </div>
              
              {q.optionsType === 'FIXED' && q.options && q.options.length > 0 && (
                <div className="mt-4 pt-3 border-t border-slate-800/80">
                  <p className="text-[10px] uppercase text-slate-400 font-black tracking-wider mb-2 flex items-center justify-between">
                    <span>Preset Answer Options:</span>
                    <span className="text-[#FFAA00] font-mono">{q.options.length} Choices</span>
                  </p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {q.options.map((o, i) => (
                      <div key={i} className="text-[11px] px-2 py-1 bg-[#080C1D] text-slate-200 rounded-lg border border-[#1A223E] flex items-center gap-1.5 font-bold truncate" title={o}>
                        <span className="w-4 h-4 rounded bg-[#FF6B00]/20 text-[#FF8800] flex items-center justify-center text-[9px] font-black shrink-0">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span className="truncate">{o}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
