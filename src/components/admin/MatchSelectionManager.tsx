import React, { useState, useMemo } from 'react';
import { api } from '../../services/api';
import { CricketMatch } from '../../types';
import { Calendar, Settings, ArrowRight, Save, Clock, Trophy, CheckSquare, Square, Loader2 } from 'lucide-react';

interface MatchSelectionManagerProps {
  allMatches: CricketMatch[];
  onMatchesDrafted: () => void;
  onGoToDrafts: (matchId: string) => void;
}

export const MatchSelectionManager: React.FC<MatchSelectionManagerProps> = ({ allMatches, onMatchesDrafted, onGoToDrafts }) => {
  const [selectedMatchIds, setSelectedMatchIds] = useState<Set<string>>(new Set());
  const [isDrafting, setIsDrafting] = useState(false);

  // Filter for FETCHED matches
  const fetchedMatches = useMemo(() => {
    return allMatches
      .filter(m => m.status === 'FETCHED' || (!['DRAFT', 'UPCOMING', 'LOCKED', 'LIVE', 'COMPLETED'].includes(m.status)))
      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
  }, [allMatches]);

  // Filter for DRAFT matches
  const draftMatches = useMemo(() => {
    return allMatches
      .filter(m => m.status === 'DRAFT')
      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
  }, [allMatches]);

  const draftsCount = draftMatches.length;

  const toggleMatch = (id: string) => {
    const next = new Set(selectedMatchIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedMatchIds(next);
  };

  const handleDraftSelected = async () => {
    if (selectedMatchIds.size === 0) return;
    
    setIsDrafting(true);
    try {
      // Draft each match
      await Promise.all(
        Array.from(selectedMatchIds).map(id => api.updateMatchAdmin(id, { status: 'DRAFT' }))
      );
      
      setSelectedMatchIds(new Set());
      onMatchesDrafted(); // refresh parent
    } catch (e) {
      console.error(e);
      alert('Failed to draft matches.');
    } finally {
      setIsDrafting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/50 p-6 rounded-xl border border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Calendar className="w-6 h-6 text-indigo-400" />
            Match Selection
          </h2>
          <p className="text-sm text-slate-400 mt-1">Select matches from the API feed to bring into Draft mode.</p>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={handleDraftSelected}
            disabled={selectedMatchIds.size === 0 || isDrafting}
            className="flex items-center gap-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:text-slate-400 text-white rounded-lg transition-colors font-bold shadow-lg shadow-indigo-900/20"
          >
            {isDrafting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Move to Drafts ({selectedMatchIds.size})
          </button>
        </div>
      </div>

      <div className="bg-[#11172D] rounded-xl border border-slate-800 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
              <th className="p-4 font-semibold w-16 text-center">Select</th>
              <th className="p-4 font-semibold">Match Details</th>
              <th className="p-4 font-semibold">Tournament</th>
              <th className="p-4 font-semibold">Date / Time</th>
              <th className="p-4 font-semibold text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {fetchedMatches.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500">
                  No new matches available from the API at this time.
                </td>
              </tr>
            ) : (
              fetchedMatches.map((m) => {
                const isSelected = selectedMatchIds.has(m.id);
                return (
                  <tr 
                    key={m.id} 
                    className={`hover:bg-slate-800/50 transition-colors cursor-pointer ${isSelected ? 'bg-indigo-900/10' : ''}`}
                    onClick={() => toggleMatch(m.id)}
                  >
                    <td className="p-4 text-center">
                      {isSelected ? (
                        <CheckSquare className="w-5 h-5 text-indigo-400 mx-auto" />
                      ) : (
                        <Square className="w-5 h-5 text-slate-600 mx-auto" />
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 overflow-hidden flex items-center justify-center p-1">
                          {m.team1.logoUrl ? <img src={m.team1.logoUrl} alt={m.team1.code} className="w-full h-full object-contain"/> : <span className="text-[10px] font-bold text-slate-400">{m.team1.code}</span>}
                        </div>
                        <span className="font-bold text-white text-sm">vs</span>
                        <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 overflow-hidden flex items-center justify-center p-1">
                          {m.team2.logoUrl ? <img src={m.team2.logoUrl} alt={m.team2.code} className="w-full h-full object-contain"/> : <span className="text-[10px] font-bold text-slate-400">{m.team2.code}</span>}
                        </div>
                        <div className="ml-2">
                          <p className="font-bold text-slate-200 text-sm">{m.title}</p>
                          <p className="text-xs text-slate-500">{m.format} Match</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-slate-300 flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-slate-500" />
                        {m.series}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className="text-sm text-slate-300 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-500" />
                          {new Date(m.startTime).toLocaleDateString()}
                        </span>
                        <span className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                          <Clock className="w-3.5 h-3.5 text-slate-500" />
                          {new Date(m.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <span className="px-2.5 py-1 text-[10px] font-bold tracking-wider rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                        {m.status}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {draftMatches.length > 0 && (
        <div className="mt-8">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Settings className="w-6 h-6 text-orange-400" />
              Draft Matches ({draftsCount})
            </h2>
            <p className="text-sm text-slate-400 mt-1">These matches are waiting for question configuration before they can be published.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {draftMatches.map((m) => (
              <div key={m.id} className="bg-slate-900/80 border border-slate-700 rounded-xl p-5 hover:border-slate-600 transition-colors flex flex-col h-full">
                <div className="flex justify-between items-start mb-3">
                  <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider rounded-full bg-orange-900/30 text-orange-400 border border-orange-500/30 uppercase">
                    DRAFT
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(m.startTime).toLocaleDateString()}
                  </span>
                </div>
                
                <h3 className="text-base font-bold text-white mb-1">{m.title}</h3>
                <p className="text-xs text-slate-400 mb-4">{m.series} • {m.format}</p>
                
                <div className="mt-auto pt-4 flex gap-2">
                  <button 
                    onClick={() => onGoToDrafts(m.id)}
                    className="flex-1 py-2 bg-orange-600 hover:bg-orange-500 text-white text-sm font-bold rounded-lg transition-colors"
                  >
                    Configure Questions
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
