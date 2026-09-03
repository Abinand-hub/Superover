import React, { useState, useMemo } from 'react';
import { CricketMatch, PlayerRole } from '../../types';
import { Calendar, Clock, Trophy, Play, RefreshCw, Sparkles, Globe, Users, X, ShieldCheck, Zap } from 'lucide-react';
import { getTeamLogoUrl } from '../../utils/teamLogoHelper';

interface MatchSelectionManagerProps {
  allMatches: CricketMatch[];
  onMatchesDrafted: () => void;
  onGoToDrafts: (matchId: string) => void;
  onReloadData?: () => void;
}

export const MatchSelectionManager: React.FC<MatchSelectionManagerProps> = ({ allMatches, onGoToDrafts, onReloadData }) => {
  const [filterType, setFilterType] = useState<'ALL' | 'EUROPEAN' | 'INTERNATIONAL'>('ALL');
  const [isSyncing, setIsSyncing] = useState(false);

  // Match Squad Inspector Modal State
  const [inspectingMatch, setInspectingMatch] = useState<CricketMatch | null>(null);
  const [squadTeamTab, setSquadTeamTab] = useState<'team1' | 'team2'>('team1');
  const [squadRoleFilter, setSquadRoleFilter] = useState<'ALL' | PlayerRole>('ALL');
  const [squadPlayingFilter, setSquadPlayingFilter] = useState<'ALL' | 'PLAYING_XI' | 'BENCH'>('ALL');
  const [squadSearch, setSquadSearch] = useState<string>('');

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

  const currentSquad = useMemo(() => {
    if (!inspectingMatch) return [];
    const list = squadTeamTab === 'team1' ? (inspectingMatch.squadTeam1 || []) : (inspectingMatch.squadTeam2 || []);
    
    return list.filter((p, idx) => {
      if (squadRoleFilter !== 'ALL' && p.role !== squadRoleFilter) return false;
      const isPlaying = p.isPlaying !== undefined ? p.isPlaying : idx < 11;
      if (squadPlayingFilter === 'PLAYING_XI' && !isPlaying) return false;
      if (squadPlayingFilter === 'BENCH' && isPlaying) return false;
      if (squadSearch.trim()) {
        const q = squadSearch.toLowerCase();
        return p.name.toLowerCase().includes(q) || p.shortName.toLowerCase().includes(q);
      }
      return true;
    });
  }, [inspectingMatch, squadTeamTab, squadRoleFilter, squadPlayingFilter, squadSearch]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#080C1D] p-6 rounded-2xl border border-[#1A223E]">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Calendar className="w-6 h-6 text-[#FF8800]" />
            Create Match
          </h2>
          <p className="text-sm text-slate-400 mt-1">Select an upcoming match from the European or International feed to view players and configure contests.</p>
        </div>

        <button
          onClick={handleManualSync}
          disabled={isSyncing}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#FF8800] hover:brightness-110 text-slate-950 text-xs font-black flex items-center gap-2 shadow-md shadow-[#FF6B00]/25 disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? 'Syncing Feeds...' : 'Sync Matches'}</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setFilterType('ALL')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all ${
            filterType === 'ALL'
              ? 'bg-[#FF6B00] text-slate-950 shadow-md shadow-[#FF6B00]/30'
              : 'bg-[#11172D] text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          All Feeds ({allMatches.filter(m => (m.status === 'FETCHED' || m.status === 'DRAFT') && new Date(m.startTime).getTime() > Date.now()).length})
        </button>
        <button
          onClick={() => setFilterType('EUROPEAN')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 ${
            filterType === 'EUROPEAN'
              ? 'bg-[#FF6B00] text-slate-950 shadow-md shadow-[#FF6B00]/30'
              : 'bg-[#11172D] text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>European T10 / ECL</span>
        </button>
        <button
          onClick={() => setFilterType('INTERNATIONAL')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 ${
            filterType === 'INTERNATIONAL'
              ? 'bg-[#FF6B00] text-slate-950 shadow-md shadow-[#FF6B00]/30'
              : 'bg-[#11172D] text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>International / Bilateral</span>
        </button>
      </div>

      {/* DESKTOP TABLE VIEW (md and up) */}
      <div className="hidden md:block bg-[#11172D] rounded-xl border border-slate-800 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
              <th className="p-4 font-semibold">Match Details (Click to Inspect Squad)</th>
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
                const team1Logo = getTeamLogoUrl(m.team1.code, m.team1.name, m.team1.logoUrl);
                const team2Logo = getTeamLogoUrl(m.team2.code, m.team2.name, m.team2.logoUrl);

                return (
                  <tr 
                    key={m.id} 
                    onClick={() => setInspectingMatch(m)}
                    className="hover:bg-slate-800/60 transition-colors cursor-pointer group"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 overflow-hidden flex items-center justify-center p-1 shadow-sm flex-shrink-0">
                          <img 
                            src={team1Logo} 
                            alt={m.team1.code} 
                            className="w-full h-full object-contain rounded-lg"
                            onError={(e) => { (e.target as HTMLImageElement).src = 'https://flagcdn.com/w160/un.png'; }}
                          />
                        </div>
                        <span className="font-bold text-white text-sm">vs</span>
                        <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 overflow-hidden flex items-center justify-center p-1 shadow-sm flex-shrink-0">
                          <img 
                            src={team2Logo} 
                            alt={m.team2.code} 
                            className="w-full h-full object-contain rounded-lg"
                            onError={(e) => { (e.target as HTMLImageElement).src = 'https://flagcdn.com/w160/un.png'; }}
                          />
                        </div>
                        <div className="ml-2">
                          <p className="font-bold text-slate-200 text-sm group-hover:text-amber-400 transition-colors flex items-center gap-1.5">
                            <span>{m.title}</span>
                            <span className="text-[10px] text-indigo-400 font-bold bg-indigo-500/10 px-1.5 py-0.5 rounded border border-indigo-500/20">
                              View Squad 👥
                            </span>
                          </p>
                          <p className="text-xs text-slate-500">{m.format} Match</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-slate-300 flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-amber-400" />
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
                        onClick={(e) => {
                          e.stopPropagation();
                          onGoToDrafts(m.id);
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FF6B00] to-[#FF8800] hover:brightness-110 text-slate-950 text-xs font-black rounded-xl transition-all shadow-md shadow-[#FF6B00]/25"
                      >
                        <Play className="w-3.5 h-3.5 fill-slate-950" />
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

      {/* MOBILE RESPONSIVE CARD VIEW (visible on small/mobile screens) */}
      <div className="block md:hidden space-y-3">
        {availableMatches.length === 0 ? (
          <div className="p-8 text-center text-slate-500 bg-[#11172D] rounded-2xl border border-slate-800 text-sm">
            No upcoming matches available from the feed.
          </div>
        ) : (
          availableMatches.map((m) => {
            const team1Logo = getTeamLogoUrl(m.team1.code, m.team1.name, m.team1.logoUrl);
            const team2Logo = getTeamLogoUrl(m.team2.code, m.team2.name, m.team2.logoUrl);

            return (
              <div 
                key={m.id}
                onClick={() => setInspectingMatch(m)}
                className="p-4 rounded-2xl bg-[#0D122B] border border-[#1A223E] shadow-sm space-y-3 cursor-pointer active:scale-[0.99] transition-transform"
              >
                {/* Line 1: Match Logos & Match Title in ONE clean line */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    {/* Team 1 Logo */}
                    <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 overflow-hidden flex items-center justify-center p-0.5 flex-shrink-0">
                      <img 
                        src={team1Logo} 
                        alt={m.team1.code} 
                        className="w-full h-full object-contain rounded-lg"
                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://flagcdn.com/w160/un.png'; }}
                      />
                    </div>

                    <span className="text-xs font-black text-slate-400">vs</span>

                    {/* Team 2 Logo */}
                    <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 overflow-hidden flex items-center justify-center p-0.5 flex-shrink-0">
                      <img 
                        src={team2Logo} 
                        alt={m.team2.code} 
                        className="w-full h-full object-contain rounded-lg"
                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://flagcdn.com/w160/un.png'; }}
                      />
                    </div>

                    {/* Teams Name */}
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xs font-black text-white truncate leading-snug">
                        {m.team1.name || m.team1.code} vs {m.team2.name || m.team2.code}
                      </h3>
                    </div>
                  </div>

                  {/* Format Badge */}
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#FF6B00]/20 text-[#FF8800] border border-[#FF6B00]/30 flex-shrink-0">
                    {m.format}
                  </span>
                </div>

                {/* Line 2: Tournament & Start Time in next line */}
                <div className="flex items-center justify-between gap-2 pt-1 border-t border-[#1A223E] text-[11px] text-slate-400">
                  <div className="flex items-center gap-1.5 truncate flex-1 min-w-0">
                    <Trophy className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <span className="truncate text-slate-300">{m.series}</span>
                  </div>

                  <div className="flex items-center gap-1.5 flex-shrink-0 text-slate-300 font-medium">
                    <Clock className="w-3 h-3 text-[#FF8800]" />
                    <span>{new Date(m.startTime).toLocaleDateString([], { day: 'numeric', month: 'short' })} • {new Date(m.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>

                {/* View Squad Indicator */}
                <div className="text-[10px] text-center text-[#FF8800] font-bold bg-[#FF6B00]/10 py-1 rounded-lg border border-[#FF6B00]/20">
                  Tap to Inspect Full Playing Squad & Toss Details 👥
                </div>

                {/* Line 3: Prominent Create Contest Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onGoToDrafts(m.id);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#FF8800] hover:brightness-110 active:scale-[0.98] text-slate-950 text-xs font-black flex items-center justify-center gap-2 shadow-md shadow-[#FF6B00]/25 transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-slate-950" />
                  <span>Create Contest</span>
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* SQUAD & LINEUP INSPECTOR MODAL */}
      {inspectingMatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#0D122B] border border-slate-700/80 rounded-3xl shadow-2xl shadow-black/80 overflow-hidden my-auto flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-[#080C1D] border-b border-[#1A223E] flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-slate-800 border border-slate-700 p-1 flex items-center justify-center flex-shrink-0">
                  <img 
                    src={getTeamLogoUrl(inspectingMatch.team1.code, inspectingMatch.team1.name, inspectingMatch.team1.logoUrl)} 
                    alt={inspectingMatch.team1.code}
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
                <div>
                  <div className="text-[10px] text-amber-400 font-black uppercase tracking-wider">
                    {inspectingMatch.series} • {inspectingMatch.format}
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-white">
                    {inspectingMatch.team1.name} vs {inspectingMatch.team2.name}
                  </h3>
                </div>
              </div>

              <button 
                onClick={() => setInspectingMatch(null)}
                className="w-9 h-9 bg-slate-800 hover:bg-slate-700 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Coin Toss Banner */}
            {((inspectingMatch as any).tossSummary && (inspectingMatch.status === 'LIVE' || inspectingMatch.status === 'COMPLETED' || new Date(inspectingMatch.startTime).getTime() - Date.now() <= 30 * 60 * 1000)) ? (
              <div className="p-3 mx-4 mt-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-slate-900 to-orange-500/15 border border-amber-500/30 flex items-center justify-between gap-2 shadow-sm flex-shrink-0">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-black text-xs flex-shrink-0">
                    🪙
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-black uppercase text-amber-400 tracking-wider">Official Coin Toss</div>
                    <div className="text-xs font-bold text-white truncate">
                      {(inspectingMatch as any).tossSummary}
                    </div>
                  </div>
                </div>
                <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex-shrink-0">
                  Verified
                </span>
              </div>
            ) : (
              <div className="p-2.5 mx-4 mt-4 rounded-2xl bg-[#080C1D] border border-[#1A223E] flex items-center justify-between gap-2 flex-shrink-0">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="text-amber-400">🪙</span>
                  <span>Coin toss will be conducted 15–30 mins prior to match start</span>
                </div>
                <span className="text-[9px] font-bold text-slate-500 px-2 py-0.5 rounded bg-slate-800/80">
                  Pending Toss
                </span>
              </div>
            )}

            {/* Team Selection Tabs */}
            <div className="p-4 pb-2 flex-shrink-0 space-y-3">
              <div className="grid grid-cols-2 gap-2 bg-[#080C1D] p-1.5 rounded-2xl border border-[#1A223E]">
                <button
                  onClick={() => setSquadTeamTab('team1')}
                  className={`py-2 px-3 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-2 ${
                    squadTeamTab === 'team1'
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <img 
                    src={getTeamLogoUrl(inspectingMatch.team1.code, inspectingMatch.team1.name, inspectingMatch.team1.logoUrl)} 
                    alt={inspectingMatch.team1.code}
                    className="w-4 h-4 object-contain rounded"
                  />
                  <span className="truncate">{inspectingMatch.team1.name} ({(inspectingMatch.squadTeam1 || []).length})</span>
                </button>
                <button
                  onClick={() => setSquadTeamTab('team2')}
                  className={`py-2 px-3 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-2 ${
                    squadTeamTab === 'team2'
                      ? 'bg-gradient-to-r from-[#FF6B00] to-[#FF8800] text-slate-950 shadow-md shadow-[#FF6B00]/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <img 
                    src={getTeamLogoUrl(inspectingMatch.team2.code, inspectingMatch.team2.name, inspectingMatch.team2.logoUrl)} 
                    alt={inspectingMatch.team2.code}
                    className="w-4 h-4 object-contain rounded"
                  />
                  <span className="truncate">{inspectingMatch.team2.name} ({(inspectingMatch.squadTeam2 || []).length})</span>
                </button>
              </div>

              {/* Playing Status & Role Filter Tabs */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Playing Status */}
                <div className="flex items-center gap-1 bg-[#080C1D] p-1 rounded-xl border border-[#1A223E]">
                  <button 
                    onClick={() => setSquadPlayingFilter('ALL')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${squadPlayingFilter === 'ALL' ? 'bg-slate-700 text-white' : 'text-slate-400'}`}
                  >
                    All
                  </button>
                  <button 
                    onClick={() => setSquadPlayingFilter('PLAYING_XI')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 ${squadPlayingFilter === 'PLAYING_XI' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-emerald-400'}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    Playing XI
                  </button>
                  <button 
                    onClick={() => setSquadPlayingFilter('BENCH')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${squadPlayingFilter === 'BENCH' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'}`}
                  >
                    Bench
                  </button>
                </div>

                {/* Role Tabs */}
                <div className="flex items-center gap-1 overflow-x-auto pb-0.5 hide-scrollbar flex-1">
                  <button onClick={() => setSquadRoleFilter('ALL')} className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${squadRoleFilter === 'ALL' ? 'bg-gradient-to-r from-[#FF6B00] to-[#FF8800] text-slate-950 font-black' : 'bg-slate-800 text-slate-400'}`}>All Roles</button>
                  <button onClick={() => setSquadRoleFilter('BAT')} className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${squadRoleFilter === 'BAT' ? 'bg-sky-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-400'}`}>🏏 Batters</button>
                  <button onClick={() => setSquadRoleFilter('BOWL')} className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${squadRoleFilter === 'BOWL' ? 'bg-rose-500 text-white font-black' : 'bg-slate-800 text-slate-400'}`}>⚡ Bowlers</button>
                  <button onClick={() => setSquadRoleFilter('AR')} className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${squadRoleFilter === 'AR' ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-400'}`}>⭐ All-Rounders</button>
                  <button onClick={() => setSquadRoleFilter('WK')} className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${squadRoleFilter === 'WK' ? 'bg-emerald-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-400'}`}>🧤 WK</button>
                </div>
              </div>
            </div>

            {/* Players Grid */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2.5 custom-scrollbar">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentSquad.map((p, idx) => {
                  const isPlaying = p.isPlaying !== undefined ? p.isPlaying : idx < 11;

                  return (
                    <div
                      key={p.id || idx}
                      className="p-3 rounded-2xl bg-[#080C1D] border border-[#1A223E] flex items-center gap-3 shadow-sm hover:border-slate-700 transition-colors"
                    >
                      <img 
                        src={p.avatar} 
                        alt={p.name}
                        className="w-12 h-12 rounded-xl object-cover bg-slate-800 border border-slate-700 flex-shrink-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(p.name)}&background=1E293B&color=F59E0B&bold=true`;
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="font-bold text-white text-xs sm:text-sm truncate">{p.name}</h4>
                          <span className={`text-[9px] font-black px-1.5 py-0.5 rounded ${
                            isPlaying ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'
                          }`}>
                            {isPlaying ? 'Playing XI' : 'Bench'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-[10px] font-black px-1.5 py-0.2 rounded ${
                            p.role === 'BAT' ? 'bg-sky-500/20 text-sky-300' :
                            p.role === 'BOWL' ? 'bg-rose-500/20 text-rose-300' :
                            p.role === 'AR' ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                          }`}>
                            {p.role}
                          </span>
                          <span className="text-[10px] text-slate-400 truncate border-l border-slate-800 pl-2">
                            {p.careerStatHighlight || 'Professional Athlete'}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {currentSquad.length === 0 && (
                <div className="p-12 text-center text-slate-500 text-xs">
                  No players found in this category.
                </div>
              )}
            </div>

            {/* Modal Bottom Action Bar */}
            <div className="p-4 bg-[#080C1D] border-t border-[#1A223E] flex items-center justify-between gap-3 flex-shrink-0">
              <button 
                onClick={() => setInspectingMatch(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors"
              >
                Close
              </button>

              <button
                onClick={() => {
                  const mId = inspectingMatch.id;
                  setInspectingMatch(null);
                  onGoToDrafts(mId);
                }}
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#FF8800] hover:brightness-110 active:scale-[0.98] text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#FF6B00]/30 transition-all"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>Create Contest For This Match</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
