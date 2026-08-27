import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { QuestionBankItem, QuestionType } from '../../types';
import { Database, Plus, RefreshCw, Loader2, Save, X, Star, Shield, AlertTriangle, Trophy, Ticket, Hash } from 'lucide-react';

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
  const [type, setType] = useState<QuestionType>('PLAYER');
  const [optionsType, setOptionsType] = useState<'FIXED' | 'DYNAMIC_SQUAD'>('DYNAMIC_SQUAD');
  const [options, setOptions] = useState<string[]>([]);
  const [optionInput, setOptionInput] = useState('');
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

  const handleAddOption = () => {
    if (optionInput.trim()) {
      setOptions([...options, optionInput.trim()]);
      setOptionInput('');
    }
  };

  const handleRemoveOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!title || !shortTitle || !subtitle) {
      alert('Please fill out all required fields.');
      return;
    }
    if (optionsType === 'FIXED' && options.length < 2) {
      alert('Fixed options require at least 2 options.');
      return;
    }

    setIsSaving(true);
    try {
      const payload: QuestionBankItem = {
        title,
        shortTitle,
        subtitle,
        type,
        optionsType,
        options: optionsType === 'FIXED' ? options : [],
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
    setType('PLAYER');
    setOptionsType('DYNAMIC_SQUAD');
    setOptions([]);
    setOptionInput('');
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
            Question Bank
          </h2>
          <p className="text-sm text-slate-400">Manage standard questions to attach to matches.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={loadBank} className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors text-slate-300">
            <RefreshCw className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-semibold transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Question
          </button>
        </div>
      </div>

      {showAddForm && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white">Create New Question</h3>
            <button onClick={() => setShowAddForm(false)} className="text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Short Title (Admin Reference)</label>
              <input 
                type="text" 
                value={shortTitle}
                onChange={e => setShortTitle(e.target.value)}
                placeholder="e.g. Most 6s"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:border-purple-500 focus:outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Full Question Text (User Facing)</label>
              <input 
                type="text" 
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Which player will hit the most 6s?"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:border-purple-500 focus:outline-none text-sm"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs text-slate-400 mb-1">Subtitle (Helper text)</label>
              <input 
                type="text" 
                value={subtitle}
                onChange={e => setSubtitle(e.target.value)}
                placeholder="e.g. Highest number of 6s by a batter"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:border-purple-500 focus:outline-none text-sm"
              />
            </div>
            
            <div>
              <label className="block text-xs text-slate-400 mb-1">Question Type</label>
              <select 
                value={type}
                onChange={e => setType(e.target.value as QuestionType)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:border-purple-500 focus:outline-none text-sm"
              >
                <option value="PLAYER">PLAYER (Select a player)</option>
                <option value="TEAM">TEAM (Select a team)</option>
                <option value="MULTIPLE_CHOICE">MULTIPLE CHOICE</option>
                <option value="YES_NO">YES / NO</option>
                <option value="NUMBER">NUMBER</option>
              </select>
            </div>
            
            <div>
              <label className="block text-xs text-slate-400 mb-1">Icon</label>
              <select 
                value={iconName}
                onChange={e => setIconName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:border-purple-500 focus:outline-none text-sm"
              >
                {Object.keys(ICONS).map(k => (
                  <option key={k} value={k}>{ICONS[k as keyof typeof ICONS].label}</option>
                ))}
              </select>
            </div>
            
            <div className="md:col-span-2 p-4 bg-slate-900 rounded-lg border border-slate-700">
              <label className="block text-xs text-slate-400 mb-3 uppercase tracking-wider font-bold">Options Configuration</label>
              <div className="flex gap-4 mb-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    checked={optionsType === 'DYNAMIC_SQUAD'} 
                    onChange={() => setOptionsType('DYNAMIC_SQUAD')}
                    className="text-purple-500 focus:ring-purple-500 bg-slate-800 border-slate-600"
                  />
                  <span className="text-sm text-slate-300">Dynamic (Auto-fetch Squad Players from API)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    checked={optionsType === 'FIXED'} 
                    onChange={() => setOptionsType('FIXED')}
                    className="text-purple-500 focus:ring-purple-500 bg-slate-800 border-slate-600"
                  />
                  <span className="text-sm text-slate-300">Fixed Custom Options</span>
                </label>
              </div>

              {optionsType === 'FIXED' && (
                <div className="space-y-3 pl-4 border-l-2 border-slate-700">
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={optionInput}
                      onChange={e => setOptionInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleAddOption()}
                      placeholder="Add an option (e.g. Over 15.5)"
                      className="flex-1 bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:border-purple-500 focus:outline-none text-sm"
                    />
                    <button onClick={handleAddOption} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm transition-colors">
                      Add
                    </button>
                  </div>
                  {options.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {options.map((opt, i) => (
                        <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 border border-slate-600 rounded-full text-sm text-slate-200">
                          {opt}
                          <button onClick={() => handleRemoveOption(i)} className="text-slate-400 hover:text-red-400">
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-2.5 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold transition-colors disabled:opacity-50"
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
            <div key={q._id} className="bg-[#11172D] border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <div className={`p-2 rounded-lg bg-slate-800 ${iconColor}`}>
                  <IconComp className="w-5 h-5" />
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase">{q.type}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 ${q.optionsType === 'DYNAMIC_SQUAD' ? 'bg-blue-900/30 text-blue-400' : 'bg-orange-900/30 text-orange-400'}`}>
                    {q.optionsType === 'DYNAMIC_SQUAD' ? 'AUTO-SQUAD' : 'FIXED OPTION'}
                  </span>
                </div>
              </div>
              <h3 className="text-md font-bold text-white mb-1">{q.shortTitle}</h3>
              <p className="text-sm text-slate-300 mb-2">{q.title}</p>
              <p className="text-xs text-slate-500">{q.subtitle}</p>
              
              {q.optionsType === 'FIXED' && q.options && q.options.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-800">
                  <p className="text-[10px] uppercase text-slate-500 font-bold mb-2">Options</p>
                  <div className="flex flex-wrap gap-1.5">
                    {q.options.map((o, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-slate-800 text-slate-300 rounded border border-slate-700">{o}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  );
};
