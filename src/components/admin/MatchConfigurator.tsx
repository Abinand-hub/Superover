import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { CricketMatch, QuestionBankItem, QuestionDefinition } from '../../types';
import { Settings, Save, CheckCircle2, ChevronDown, Trash2, ArrowLeft, Send } from 'lucide-react';

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
  
  // State for the 6 questions
  const [selectedQuestions, setSelectedQuestions] = useState<(QuestionDefinition | null)[]>([null, null, null, null, null, null]);

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
        // Pre-fill existing questions if any
        if (m.questions && m.questions.length > 0) {
          const filled = [...selectedQuestions];
          m.questions.forEach((q, i) => {
            if (i < 6) filled[i] = q;
          });
          setSelectedQuestions(filled);
        }
      }
      setBank(qBank);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectQuestion = (slotIndex: number, bankId: string) => {
    const qb = bank.find(q => q._id === bankId || q.title === bankId);
    if (!qb) return;

    // Convert QuestionBankItem to QuestionDefinition
    const newDef: QuestionDefinition = {
      id: qb._id || `temp_${Date.now()}`,
      number: slotIndex + 1,
      title: qb.title,
      shortTitle: qb.shortTitle,
      subtitle: qb.subtitle,
      criteria: qb.type, // legacy
      iconName: qb.iconName,
      badgeColor: 'bg-purple-900 text-purple-400',
      type: qb.type,
      optionsType: qb.optionsType,
      options: qb.options
    };

    const next = [...selectedQuestions];
    next[slotIndex] = newDef;
    setSelectedQuestions(next);
  };

  const handleRemoveQuestion = (slotIndex: number) => {
    const next = [...selectedQuestions];
    next[slotIndex] = null;
    setSelectedQuestions(next);
  };

  const handlePublish = async () => {
    const filledQuestions = selectedQuestions.filter(q => q !== null) as QuestionDefinition[];
    if (filledQuestions.length !== 6) {
      alert("Please select exactly 6 questions before publishing.");
      return;
    }

    setIsPublishing(true);
    try {
      // Re-number them just in case
      filledQuestions.forEach((q, i) => q.number = i + 1);
      
      await api.updateMatchAdmin(matchId, {
        status: 'UPCOMING',
        questions: filledQuestions
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

  const allFilled = selectedQuestions.filter(q => q !== null).length === 6;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 text-slate-300">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            Configure Match
            <span className="px-2 py-0.5 text-xs bg-slate-800 text-slate-400 rounded border border-slate-700">DRAFT</span>
          </h2>
          <p className="text-sm text-slate-400">
            {match.title} • {match.series}
          </p>
        </div>
        <div className="ml-auto">
          <button 
            onClick={handlePublish}
            disabled={!allFilled || isPublishing}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold transition-all shadow-lg ${allFilled ? 'bg-green-600 hover:bg-green-500 text-white shadow-green-900/20' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
          >
            <Send className="w-4 h-4" />
            {isPublishing ? 'Publishing...' : 'Publish Match'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {selectedQuestions.map((q, i) => (
          <div key={i} className="bg-[#11172D] border border-slate-800 rounded-xl p-5 relative overflow-visible">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${q ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-500'}`}>
                  {i + 1}
                </div>
                <h3 className="font-bold text-slate-200">Question {i + 1}</h3>
              </div>
              
              {q && (
                <button onClick={() => handleRemoveQuestion(i)} className="text-slate-500 hover:text-red-400 p-1">
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            {q ? (
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800">
                <p className="text-[10px] font-bold text-purple-400 uppercase tracking-wider mb-1">{q.shortTitle}</p>
                <p className="text-white font-medium mb-1">{q.title}</p>
                <p className="text-xs text-slate-400 mb-3">{q.subtitle}</p>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-slate-800 text-slate-400 rounded border border-slate-700 uppercase">
                    TYPE: {q.type}
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-slate-800 text-slate-400 rounded border border-slate-700 uppercase">
                    {q.optionsType === 'DYNAMIC_SQUAD' ? 'AUTO-SQUAD OPTIONS' : 'FIXED OPTIONS'}
                  </span>
                </div>
              </div>
            ) : (
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800 border-dashed flex flex-col items-center justify-center text-center py-8">
                <Settings className="w-8 h-8 text-slate-600 mb-3" />
                <p className="text-sm text-slate-400 mb-4">Select a question from the Question Bank</p>
                <select 
                  className="w-full bg-slate-800 border border-slate-700 text-white text-sm rounded-lg p-2.5 focus:border-purple-500 focus:outline-none"
                  onChange={(e) => {
                    if (e.target.value) handleSelectQuestion(i, e.target.value);
                  }}
                  value=""
                >
                  <option value="" disabled>-- Select Question --</option>
                  {bank.map(b => (
                    <option key={b._id} value={b._id}>{b.shortTitle}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
