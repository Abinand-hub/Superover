import React, { useMemo } from 'react';
import { CricketMatch } from '../../types';
import { Calendar, Clock, Trophy, Play } from 'lucide-react';

interface MatchSelectionManagerProps {
  allMatches: CricketMatch[];
  onMatchesDrafted: () => void; // Kept for backwards compatibility if needed
  onGoToDrafts: (matchId: string) => void;
}

export const MatchSelectionManager: React.FC<MatchSelectionManagerProps> = ({ allMatches, onGoToDrafts }) => {
  // Filter for matches that haven't been published yet and are in the future
  const availableMatches = useMemo(() => {
    const now = new Date().getTime();
    return allMatches
      .filter(m => (m.status === 'FETCHED' || m.status === 'DRAFT') && new Date(m.startTime).getTime() > now)
      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
  }, [allMatches]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/50 p-6 rounded-xl border border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Calendar className="w-6 h-6 text-indigo-400" />
            Create Match
          </h2>
          <p className="text-sm text-slate-400 mt-1">Select an upcoming match from the API to configure and publish as a new contest.</p>
        </div>
      </div>

      <div className="bg-[#11172D] rounded-xl border border-slate-800 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
              <th className="p-4 font-semibold">Match Details</th>
              <th className="p-4 font-semibold">Tournament</th>
              <th className="p-4 font-semibold">Date / Time</th>
              <th className="p-4 font-semibold text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {availableMatches.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-slate-500">
                  No new matches available from the API at this time.
                </td>
              </tr>
            ) : (
              availableMatches.map((m) => {
                return (
                  <tr 
                    key={m.id} 
                    className="hover:bg-slate-800/50 transition-colors"
                  >
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
                    <td className="p-4 text-center">
                      <button 
                        onClick={() => onGoToDrafts(m.id)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-lg transition-colors shadow-lg shadow-indigo-900/20"
                      >
                        <Play className="w-4 h-4" />
                        Create Contest
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
