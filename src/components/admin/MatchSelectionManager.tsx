import React, { useState, useMemo } from 'react';
import { CricketMatch } from '../../types';
import { Calendar, Clock, Trophy, Play, RefreshCw, Sparkles, Globe } from 'lucide-react';

interface MatchSelectionManagerProps {
  allMatches: CricketMatch[];
  onMatchesDrafted: () => void;
  onGoToDrafts: (matchId: string) => void;
  onReloadData?: () => void;
}

export const MatchSelectionManager: React.FC<MatchSelectionManagerProps> = ({ allMatches, onGoToDrafts, onReloadData }) => {
  const [filterType, setFilterType] = useState<'ALL' | 'EUROPEAN' | 'INTERNATIONAL'>('ALL');
  const [isSyncing, setIsSyncing] = useState(false);

  // Filter for matches that haven't been published yet and are in the future
  const availableMatches = useMemo(() => {
    const now = new Date().getTime();
    return allMatches
      .filter(m => (m.status === 'FETCHED' || m.status === 'DRAFT') && new Date(m.startTime).getTime() > now)
      .filter(m => {
        if (filterType === 'EUROPEAN') {
          return m.series.toLowerCase().includes('ecs') || 
                 m.series.toLowerCase().includes('ecl') || 
                 m.series.toLowerCase().includes('european') ||
                 m.format === 'T10';
        }
        if (filterType === 'INTERNATIONAL') {
          return !m.series.toLowerCase().includes('ecs') && 
                 !m.series.toLowerCase().includes('ecl') && 
                 !m.series.toLowerCase().includes('european');
        }
        return true;
      })
      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
  }, [allMatches, filterType]);

  const handleManualSync = async () => {
    setIsSyncing(true);
    try {
      await fetch('/api/cron/sync-matches');
      if (onReloadData) {
        await onReloadData();
      } else {
        window.location.reload();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/50 p-6 rounded-xl border border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Calendar className="w-6 h-6 text-indigo-400" />
            Create Match
          </h2>
          <p className="text-sm text-slate-400 mt-1">Select an upcoming match from the European or International feed to configure and publish as a new contest.</p>
        </div>

        <button
          onClick={handleManualSync}
          disabled={isSyncing}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-purple-600/20 disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? 'Syncing Feeds...' : 'Sync Matches'}</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setFilterType('ALL')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
            filterType === 'ALL'
              ? 'bg-indigo-600 text-white'
              : 'bg-[#11172D] text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          All Feeds ({allMatches.filter(m => (m.status === 'FETCHED' || m.status === 'DRAFT') && new Date(m.startTime).getTime() > Date.now()).length})
        </button>
        <button
          onClick={() => setFilterType('EUROPEAN')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
            filterType === 'EUROPEAN'
              ? 'bg-[#FF6B00] text-white shadow-md shadow-[#FF6B00]/30'
              : 'bg-[#11172D] text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>European T10 / ECL</span>
        </button>
        <button
          onClick={() => setFilterType('INTERNATIONAL')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
            filterType === 'INTERNATIONAL'
              ? 'bg-sky-600 text-white'
              : 'bg-[#11172D] text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>International / Bilateral</span>
        </button>
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
