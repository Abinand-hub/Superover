import React, { useState, useMemo } from 'react';
import { TrendingUp, AlertTriangle, CheckCircle, Download, RefreshCw, ChevronRight, Search, ShieldCheck } from 'lucide-react';
import { CricketMatch, UserPredictionSlip, QuestionDefinition } from '../../types';
import { calculatePotentialPayout } from '../../utils/payoutCalculator';

interface LiveMarketAnalysisProps {
  matches: CricketMatch[];
  slips: UserPredictionSlip[];
}

export const LiveMarketAnalysis: React.FC<LiveMarketAnalysisProps> = ({ matches, slips }) => {
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
  const [funnelFilters, setFunnelFilters] = useState<Record<string, string>>({});

  // -------------------------
  // VIEW 1: MATCH LIST
  // -------------------------
  const renderMatchList = () => {
    return (
      <div className="space-y-6 animate-in fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              Live Market Analysis
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Select a match to analyze the prediction funnel and simulate platform liability.
            </p>
          </div>
        </div>

        <div className="bg-[#0D122B] border border-[#1A223E] rounded-xl overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[#131A38] text-slate-400 border-b border-[#1A223E]">
                <tr>
                  <th className="px-6 py-4 font-bold">Match ID</th>
                  <th className="px-6 py-4 font-bold">Match Name</th>
                  <th className="px-6 py-4 font-bold">Total Entries</th>
                  <th className="px-6 py-4 font-bold">Total Collection</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A223E]">
                {matches.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                      No matches available.
                    </td>
                  </tr>
                ) : (
                  matches.map((match) => {
                    const matchSlips = slips.filter(s => s.matchId === match.id);
                    const totalEntries = matchSlips.length;
                    const totalCollection = matchSlips.reduce((sum, s) => sum + (s.totalPayable || s.entryFee), 0);

                    return (
                      <tr key={match.id} className="hover:bg-[#131A38]/50 transition-colors">
                        <td className="px-6 py-4 font-mono text-xs text-slate-500">{match.id.substring(0, 8)}...</td>
                        <td className="px-6 py-4 font-bold text-white">
                          {match.team1.code} vs {match.team2.code}
                        </td>
                        <td className="px-6 py-4 text-slate-300 font-mono">{totalEntries.toLocaleString()}</td>
                        <td className="px-6 py-4 text-emerald-400 font-mono font-bold">₹{totalCollection.toLocaleString()}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${
                            match.status === 'LIVE' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30 animate-pulse' :
                            match.status === 'UPCOMING' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                            'bg-slate-800 text-slate-400 border border-slate-700'
                          }`}>
                            {match.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => {
                              setSelectedMatchId(match.id);
                              setFunnelFilters({});
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition-colors shadow-[0_0_10px_rgba(79,70,229,0.3)]"
                          >
                            <TrendingUp className="w-3.5 h-3.5" /> View Funnel
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
      </div>
    );
  };

  // -------------------------
  // VIEW 2: FUNNEL ANALYSIS
  // -------------------------
  const renderFunnelAnalysis = () => {
    const match = matches.find(m => m.id === selectedMatchId);
    if (!match) return null;

    const matchSlips = slips.filter(s => s.matchId === match.id);
    const totalEntries = matchSlips.length;
    const totalCollection = matchSlips.reduce((sum, s) => sum + (s.totalPayable || s.entryFee), 0);
    const avgEntry = totalEntries > 0 ? totalCollection / totalEntries : 0;

    // Simulate Liability based on currently selected funnel path
    let grandPayout = 0;
    
    matchSlips.forEach(slip => {
      let streak = 0;
      for (const q of match.questions) {
        const selectedAns = funnelFilters[q.id];
        if (selectedAns && slip.answers[q.id] && selectedAns.toLowerCase() === slip.answers[q.id].toLowerCase()) {
          streak++;
        } else {
          break; 
        }
      }
      
      const payout = calculatePotentialPayout(
        slip.entryFee,
        streak,
        slip.wheelMultiplier || 50,
        !!slip.freeHit
      );
      grandPayout += payout;
    });

    const profit = totalCollection - grandPayout;
    
    // Risk Calculation
    let riskStatus: 'SAFE' | 'WARNING' | 'HIGH_RISK' = 'SAFE';
    if (profit < 0) riskStatus = 'HIGH_RISK';
    else if (grandPayout > totalCollection * 0.7) riskStatus = 'WARNING';

    const getRemainingSlipsAtQuestion = (qIndex: number) => {
      return matchSlips.filter(slip => {
        for (let i = 0; i < qIndex; i++) {
          const pastQ = match.questions[i];
          const filterAns = funnelFilters[pastQ.id];
          if (!filterAns) return false; 
          if (slip.answers[pastQ.id]?.toLowerCase() !== filterAns.toLowerCase()) return false;
        }
        return true;
      });
    };

    const handleExport = () => {
      const qIndex = match.questions.length;
      const finalSlips = getRemainingSlipsAtQuestion(qIndex).filter(slip => {
        const lastQ = match.questions[match.questions.length - 1];
        const filterAns = funnelFilters[lastQ.id];
        return filterAns && slip.answers[lastQ.id]?.toLowerCase() === filterAns.toLowerCase();
      });

      const csvContent = "data:text/csv;charset=utf-8," 
        + "UserName,Phone,EntryFee,WheelMultiplier,PotentialPayout\n"
        + finalSlips.map(e => `${e.userName},${e.userPhone || 'N/A'},${e.entryFee},${e.wheelMultiplier || 'N/A'},${calculatePotentialPayout(e.entryFee, 6, e.wheelMultiplier || 50, !!e.freeHit)}`).join("\n");
      
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `winners_${match.team1.code}_vs_${match.team2.code}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
        {/* Header Controls */}
        <div className="flex items-center gap-4 border-b border-[#1A223E] pb-4">
          <button 
            onClick={() => setSelectedMatchId(null)}
            className="w-10 h-10 rounded-full bg-[#131A38] hover:bg-[#1A223E] flex items-center justify-center text-slate-400 transition-colors"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
          </button>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400 text-[10px] font-black tracking-wider uppercase">
                Funnel Analysis
              </span>
              <span className="text-xs text-slate-400 font-medium">Match ID: {match.id}</span>
            </div>
            <h2 className="text-xl font-black text-white">
              {match.team1.name} vs {match.team2.name}
            </h2>
          </div>
        </div>

        {/* Top Summary Header */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-[#0D122B] border border-[#1A223E]">
            <span className="text-xs text-slate-400 font-bold block mb-1">Total Entries</span>
            <span className="text-xl font-black text-white font-mono">{totalEntries.toLocaleString()}</span>
          </div>
          <div className="p-4 rounded-xl bg-[#0D122B] border border-[#1A223E]">
            <span className="text-xs text-slate-400 font-bold block mb-1">Avg Entry Fee</span>
            <span className="text-xl font-black text-emerald-400 font-mono">₹{Math.round(avgEntry).toLocaleString()}</span>
          </div>
          <div className="p-4 rounded-xl bg-[#0D122B] border border-[#1A223E]">
            <span className="text-xs text-slate-400 font-bold block mb-1">Total Collection</span>
            <span className="text-xl font-black text-emerald-400 font-mono">₹{totalCollection.toLocaleString()}</span>
          </div>
          <div className="p-4 rounded-xl bg-[#0D122B] border border-[#1A223E] flex flex-col justify-center">
            <button 
              onClick={() => setFunnelFilters({})}
              className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold transition-all w-full"
            >
              <RefreshCw className="w-4 h-4" /> Reset Filters
            </button>
          </div>
        </div>

        {/* Risk & Profit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-[#0D122B] border border-[#1A223E] relative overflow-hidden flex flex-col justify-center shadow-lg">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <TrendingUp className="w-24 h-24 text-white" />
            </div>
            <span className="text-sm text-slate-400 font-bold uppercase tracking-wider mb-2 relative z-10">Simulated Net Profit</span>
            <div className="flex items-end gap-3 relative z-10">
              <span className={`text-3xl font-black font-mono ${profit >= 0 ? 'text-emerald-400' : 'text-rose-500'}`}>
                {profit >= 0 ? '+' : '-'}₹{Math.abs(profit).toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-3 text-xs text-slate-500 font-mono relative z-10 bg-slate-900/50 p-2 rounded-lg inline-flex w-max">
              <span>Collection: ₹{totalCollection.toLocaleString()}</span>
              <span>-</span>
              <span>Payout: ₹{grandPayout.toLocaleString()}</span>
            </div>
          </div>

          <div className={`p-5 rounded-2xl border relative overflow-hidden flex items-center shadow-lg ${
            riskStatus === 'SAFE' ? 'bg-emerald-500/10 border-emerald-500/30' :
            riskStatus === 'WARNING' ? 'bg-amber-500/10 border-amber-500/30' :
            'bg-rose-500/10 border-rose-500/30'
          }`}>
            <div className="flex-1">
              <span className="text-sm text-slate-400 font-bold uppercase tracking-wider mb-2 block">Auto Risk Alert System</span>
              {riskStatus === 'SAFE' && (
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                    <ShieldCheck className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-emerald-400">🟢 GREEN SAFE</h3>
                    <p className="text-sm text-emerald-500/70 font-medium">Profit margin is healthy.</p>
                  </div>
                </div>
              )}
              {riskStatus === 'WARNING' && (
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center border border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.3)] animate-pulse">
                    <AlertTriangle className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-amber-400">🟡 YELLOW WARNING</h3>
                    <p className="text-sm text-amber-500/70 font-medium">Payout exceeds 70% of collection.</p>
                  </div>
                </div>
              )}
              {riskStatus === 'HIGH_RISK' && (
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-rose-500/20 flex items-center justify-center border border-rose-500/50 shadow-[0_0_15px_rgba(243,24,96,0.3)] animate-bounce">
                    <AlertTriangle className="w-6 h-6 text-rose-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-rose-500">🔴 HIGH RISK - LOSS ALERT</h3>
                    <p className="text-sm text-rose-500/70 font-medium">Payout exceeds Total Collection!</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Funnel Flow */}
        <div className="bg-[#0D122B] border border-[#1A223E] rounded-2xl p-5 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-400" /> Market Funnel Flow
            </h3>
            {Object.keys(funnelFilters).length === 6 && (
              <button 
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" /> Export Winners
              </button>
            )}
          </div>

          <div className="space-y-4">
            {match.questions.map((q, i) => {
              if (i > 0 && !funnelFilters[match.questions[i - 1].id]) return null;

              const remainingSlips = getRemainingSlipsAtQuestion(i);
              const totalCount = remainingSlips.length;

              const optionCounts: Record<string, number> = {};
              remainingSlips.forEach(s => {
                const ans = s.answers[q.id] || 'Unanswered';
                optionCounts[ans] = (optionCounts[ans] || 0) + 1;
              });

              const sortedOptions = Object.entries(optionCounts).sort((a, b) => b[1] - a[1]);
              const isSelected = !!funnelFilters[q.id];

              let bucketPayout = 0;
              const currentStreak = i + 1; 
              
              const slipsWhoGotThisRight = remainingSlips.filter(s => {
                const ans = funnelFilters[q.id];
                return ans && s.answers[q.id]?.toLowerCase() === ans.toLowerCase();
              });

              slipsWhoGotThisRight.forEach(s => {
                bucketPayout += calculatePotentialPayout(s.entryFee, currentStreak, s.wheelMultiplier || 50, !!s.freeHit);
              });

              return (
                <div key={q.id} className="relative">
                  {i > 0 && (
                    <div className="absolute -top-4 left-6 w-0.5 h-4 bg-[#1A223E]"></div>
                  )}
                  
                  <div className={`p-4 rounded-xl border transition-all ${isSelected ? 'bg-indigo-500/10 border-indigo-500/30' : 'bg-[#131A38] border-[#1A223E]'}`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                      <div>
                        <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider mb-1 block">Q{i + 1}: {q.shortTitle}</span>
                        <h4 className="text-white font-bold">{q.title}</h4>
                      </div>
                      
                      {isSelected && (
                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1 block">Selected Path Payout (Streak {i + 1})</span>
                          <span className="text-lg font-mono font-black text-emerald-400">₹{bucketPayout.toLocaleString()}</span>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {sortedOptions.map(([opt, count]) => {
                        const isThisSelected = funnelFilters[q.id] === opt;
                        const percentage = totalCount > 0 ? (count / totalCount) * 100 : 0;
                        
                        return (
                          <button
                            key={opt}
                            onClick={() => {
                              const newFilters = { ...funnelFilters };
                              newFilters[q.id] = opt;
                              for(let j = i + 1; j < match.questions.length; j++) {
                                delete newFilters[match.questions[j].id];
                              }
                              setFunnelFilters(newFilters);
                            }}
                            className={`flex flex-col p-3 rounded-lg border text-left transition-all ${
                              isThisSelected 
                                ? 'bg-indigo-600 border-indigo-500 shadow-[0_0_15px_rgba(79,70,229,0.3)]' 
                                : 'bg-[#0D122B] border-[#1A223E] hover:border-indigo-500/50 hover:bg-[#131A38]'
                            }`}
                          >
                            <span className={`text-sm font-bold mb-1 truncate ${isThisSelected ? 'text-white' : 'text-slate-300'}`}>
                              {opt}
                            </span>
                            <div className="flex justify-between items-center text-xs">
                              <span className={`font-mono ${isThisSelected ? 'text-indigo-200' : 'text-slate-500'}`}>
                                {count} users
                              </span>
                              <span className={`font-mono font-bold ${isThisSelected ? 'text-white' : 'text-slate-400'}`}>
                                {percentage.toFixed(1)}%
                              </span>
                            </div>
                            
                            {/* Progress bar */}
                            <div className="w-full h-1 mt-2 bg-slate-800 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${isThisSelected ? 'bg-white' : 'bg-indigo-500'}`} 
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 pb-24">
      {!selectedMatchId ? renderMatchList() : renderFunnelAnalysis()}
    </div>
  );
};
