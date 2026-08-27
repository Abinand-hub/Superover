import React from 'react';
import { CricketMatch } from '../../types';
import { History, Calendar } from 'lucide-react';

interface MatchHistoryProps {
  completedMatches: CricketMatch[];
}

export const MatchHistory: React.FC<MatchHistoryProps> = ({ completedMatches }) => {
  if (completedMatches.length === 0) {
    return (
      <div className="p-8 text-center bg-[#0D122B] border border-[#1A223E] rounded-2xl">
        <History className="w-12 h-12 text-slate-700 mx-auto mb-3" />
        <h3 className="text-white font-bold">No Completed Matches</h3>
        <p className="text-slate-400 text-sm mt-1">Settled matches will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-[#0D122B] rounded-2xl border border-[#1A223E] overflow-hidden">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-[#080C1D] text-slate-400 border-b border-[#1A223E]">
            <tr>
              <th className="p-4 font-semibold">Match Details</th>
              <th className="p-4 font-semibold">Date Settled</th>
              <th className="p-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1A223E]">
            {completedMatches.map(match => (
              <tr key={match.id} className="text-slate-300 hover:bg-[#131A38] transition-colors">
                <td className="p-4">
                  <div className="font-bold text-white text-base">{match.title}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{match.series} • {match.venue}</div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Calendar className="w-4 h-4" />
                    {new Date(match.startTime).toLocaleDateString()}
                  </div>
                </td>
                <td className="p-4">
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full text-xs font-bold">
                    {match.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
