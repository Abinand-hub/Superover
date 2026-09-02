import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { CricketMatch, QuestionBankItem, QuestionDefinition } from '../../types';
import { Settings, CheckCircle2, Trash2, ArrowLeft, Send, Plus } from 'lucide-react';

interface MatchConfiguratorProps {
  matchId: string;
  onBack: () => void;
  onMatchPublished: () => void;
}

export const MatchConfigurator: React.FC<MatchConfiguratorProps> = ({ matchId, onBack, onMatchPublished }) => {
  const [match, setMatch] = useState<CricketMatch | null>(null);
  const [bank, setBank] = useState<QuestionBankItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPublishing, setIsPublishing] = useState(false);
  
  const [selectedQuestions, setSelectedQuestions] = useState<QuestionDefinition[]>([]);
  const [maxEntriesPerUser, setMaxEntriesPerUser] = useState<number>(1);
  const [previewBankId, setPreviewBankId] = useState<string>('');

  useEffect(() => {
    loadData();
  }, [matchId]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [matches, qBank] = await Promise.all([
        api.getAdminMatches(),
        api.getQuestionBank()
      ]);
      const m = matches.find(x => x.id === matchId);
      if (m) {
        setMatch(m);
        if (m.maxEntriesPerUser) setMaxEntriesPerUser(m.maxEntriesPerUser);
        if (m.questions && m.questions.length > 0) {
          setSelectedQuestions(m.questions.slice(0, 6));
        }
      }
      setBank(qBank);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const getGeneratedOptions = (qb: QuestionBankItem): string[] => {
    let generatedOptions = qb.options || [];

    if (qb.optionsType === 'DYNAMIC_SQUAD' && match) {
      if (qb.type === 'PLAYER') {
        const t1Players = (match.squadTeam1 || []).map(p => p.name);
        const t2Players = (match.squadTeam2 || []).map(p => p.name);
        generatedOptions = [...t1Players, ...t2Players];
      } else if (qb.type === 'TEAM') {
        generatedOptions = [match.team1?.name || 'Team 1', match.team2?.name || 'Team 2'];
      }
    }
    return generatedOptions;
  };

  const handleEnableQuestion = () => {
    if (!previewBankId) return;
    
    const qb = bank.find(q => q._id === previewBankId || q.title === previewBankId);
    if (!qb) return;

    if (selectedQuestions.length >= 6) {
      alert("You have already selected 6 questions.");
      return;
    }

    const newDef: QuestionDefinition = {
      id: qb._id || `temp_${Date.now()}`,
      number: selectedQuestions.length + 1,
      title: qb.title,
      shortTitle: qb.shortTitle,
      subtitle: qb.subtitle,
      criteria: qb.type, // legacy
      iconName: qb.iconName,
      badgeColor: 'bg-purple-900 text-purple-400',
      type: qb.type,
      optionsType: qb.optionsType,
      options: getGeneratedOptions(qb)
    };

    setSelectedQuestions([...selectedQuestions, newDef]);
    setPreviewBankId(''); // reset preview
  };

  const handleRemoveQuestion = (indexToRemove: number) => {
    const next = selectedQuestions.filter((_, i) => i !== indexToRemove);
    // Renumber remaining questions
    next.forEach((q, i) => q.number = i + 1);
    setSelectedQuestions(next);
  };

  const handlePublish = async () => {
    if (selectedQuestions.length !== 6) {
      alert("Please select exactly 6 questions before publishing.");
      return;
    }

    setIsPublishing(true);
    try {
      await api.updateMatchAdmin(matchId, {
        status: 'UPCOMING',
        questions: selectedQuestions,
        maxEntriesPerUser
      });
      
      onMatchPublished();
    } catch (e) {
      console.error(e);
      alert('Failed to publish match.');
    } finally {
      setIsPublishing(false);
    }
  };

  if (isLoading || !match) {
    return <div className="p-12 text-center text-slate-500">Loading configurator...</div>;
  }

  const allFilled = selectedQuestions.length === 6;
  const previewItem = bank.find(q => q._id === previewBankId || q.title === previewBankId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2.5 bg-slate-800 rounded-xl hover:bg-slate-700 text-slate-300 flex-shrink-0">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="min-w-0">
            <h2 className="text-lg sm:text-xl font-black text-white truncate">
              Configure Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 truncate">
              {match.title} • {match.series}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-700 px-3 py-2 rounded-xl text-xs">
            <label className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase">Max Entries:</label>
            <input 
              type="number" 
              min={1}
              value={maxEntriesPerUser}
              onChange={(e) => setMaxEntriesPerUser(parseInt(e.target.value) || 1)}
              className="w-12 bg-transparent text-white font-black text-center focus:outline-none"
            />
          </div>
          <button 
            onClick={handlePublish}
            disabled={!allFilled || isPublishing}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all shadow-lg ${allFilled ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/30' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
          >
            <Send className="w-4 h-4" />
            <span>{isPublishing ? 'Publishing...' : 'Publish Match'}</span>
          </button>
        </div>
      </div>

      {/* Top Section: Add Questions */}
      {!allFilled ? (
        <div className="bg-[#11172D] rounded-xl border border-slate-800 p-6">
          <h3 className="text-lg font-bold text-white mb-4">Add Question to Match</h3>
          
          <div className="max-w-2xl">
            <label className="block text-sm font-bold text-slate-400 mb-2">Select Question from Bank</label>
            <select 
              className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-3 focus:border-indigo-500 focus:outline-none"
              value={previewBankId}
              onChange={(e) => setPreviewBankId(e.target.value)}
            >
              <option value="" disabled>-- Choose a question template --</option>
              {bank.filter(b => !selectedQuestions.some(sq => sq.title === b.title)).map(b => (
                <option key={b._id || b.title} value={b._id || b.title}>{b.shortTitle} - {b.title}</option>
              ))}
            </select>
          </div>

          {previewItem && (
            <div className="mt-6 border border-indigo-500/30 bg-indigo-900/10 rounded-xl p-5 max-w-2xl">
              <div className="mb-4">
                <span className="px-2 py-0.5 text-[10px] font-bold text-indigo-400 bg-indigo-900/30 rounded border border-indigo-500/30 uppercase tracking-wider mb-2 inline-block">
                  PREVIEW
                </span>
                <p className="text-white font-bold text-lg mb-1">{previewItem.title}</p>
                <p className="text-sm text-slate-400 mb-4">{previewItem.subtitle}</p>
                
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-800">
                  <p className="text-xs font-bold text-slate-500 mb-3 uppercase">Auto-fetched Options ({getGeneratedOptions(previewItem).length})</p>
                  <div className="flex flex-wrap gap-2">
                    {getGeneratedOptions(previewItem).slice(0, 8).map((opt, idx) => (
                      <span key={idx} className="px-3 py-1 bg-slate-800 text-slate-300 rounded-md text-sm border border-slate-700">
                        {opt}
                      </span>
                    ))}
                    {getGeneratedOptions(previewItem).length > 8 && (
                      <span className="px-3 py-1 bg-slate-800 text-slate-400 rounded-md text-sm border border-slate-700 italic">
                        + {getGeneratedOptions(previewItem).length - 8} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <button 
                onClick={handleEnableQuestion}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold transition-colors shadow-lg shadow-indigo-900/20"
              >
                <CheckCircle2 className="w-5 h-5" />
                Enable this question for this match
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-green-900/10 border border-green-500/20 rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="w-6 h-6 text-green-400" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">All 6 Questions Added!</h3>
          <p className="text-sm text-slate-400">You have successfully configured this match. You can now publish it.</p>
        </div>
      )}

      {/* Bottom Section: Selected Questions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            Selected Questions
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${allFilled ? 'bg-green-900/30 text-green-400 border-green-500/30' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>
              {selectedQuestions.length} / 6
            </span>
          </h3>
        </div>

        {selectedQuestions.length === 0 ? (
          <div className="bg-slate-900/50 rounded-xl border border-slate-800 border-dashed p-12 text-center">
            <Settings className="w-8 h-8 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400">No questions selected yet.</p>
            <p className="text-sm text-slate-500 mt-1">Select a question from the bank above to add it to this match.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedQuestions.map((q, i) => (
              <div key={i} className="bg-[#11172D] border border-slate-800 rounded-xl p-5 relative group hover:border-slate-600 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm bg-purple-600 text-white">
                      {i + 1}
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">{q.shortTitle}</p>
                      <h3 className="font-bold text-slate-200 text-sm leading-tight mt-0.5">{q.title}</h3>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleRemoveQuestion(i)} 
                    className="text-slate-500 hover:text-red-400 p-2 bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
                    title="Remove Question"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-800">
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-slate-800 text-slate-400 rounded border border-slate-700 uppercase">
                    TYPE: {q.type}
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-slate-800 text-slate-400 rounded border border-slate-700 uppercase">
                    {q.optionsType === 'DYNAMIC_SQUAD' ? 'AUTO-SQUAD OPTIONS' : 'FIXED OPTIONS'}
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-slate-800 text-slate-400 rounded border border-slate-700 uppercase ml-auto">
                    {q.options.length} OPTS
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
