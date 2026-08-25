'use client';

import React, { useState, useEffect } from 'react';
import { AdminPanel } from '@/src/components/AdminPanel';
import { api } from '@/src/services/api';
import { INITIAL_FAQS } from '@/src/data/initialData';
import { AdminLoginModal } from '@/src/components/AdminLoginModal';
import { CricketMatch, UserAccount, UserPredictionSlip, WalletTransaction, PlatformMetrics } from '@/src/types';

export default function AdminPage() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<{
    matches: CricketMatch[];
    allUsers: UserAccount[];
    slips: UserPredictionSlip[];
    transactions: WalletTransaction[];
    metrics: PlatformMetrics;
  } | null>(null);

  useEffect(() => {
    async function checkAuth() {
      try {
        const user = await api.getCurrentUser();
        // If they already have a real admin cookie session, let them in automatically
        if (user && user.role === 'ADMIN') {
          setIsAdminAuthenticated(true);
          loadAdminData();
        } else {
          setIsLoading(false);
        }
      } catch (e) {
        setIsLoading(false);
      }
    }
    checkAuth();
  }, []);

  async function loadAdminData() {
    setIsLoading(true);
    try {
      const [matches, allUsers, slips, transactions] = await Promise.all([
        api.getMatches(),
        api.getAllUsers(),
        api.getSlips(),
        api.getTransactions()
      ]);

      // Calculate dynamic metrics since api.getMetrics is deprecated
      const activeMatches = matches.filter(m => m.status === 'LIVE').length;
      const totalBetsPlaced = slips.length;
      const totalVolumeIn = slips.reduce((sum, slip) => sum + slip.entryFee, 0);
      const totalVolumeOut = slips.reduce((sum, slip) => sum + (slip.payoutAmount || 0), 0);

      const computedMetrics: PlatformMetrics = {
        totalUsers: allUsers.length,
        activeMatches,
        totalBetsPlaced,
        totalVolumeIn,
        totalVolumeOut,
        netRake: totalVolumeIn - totalVolumeOut
      };

      setData({ 
        matches, 
        allUsers, 
        slips, 
        transactions, 
        metrics: computedMetrics 
      });
    } catch (e) {
      console.error("Failed to load admin data:", e);
    } finally {
      setIsLoading(false);
    }
  }

  const handleLoginSuccess = async () => {
    setIsAdminAuthenticated(true);
    loadAdminData();
  };

  if (isLoading && !data) {
    return (
      <div className="min-h-screen bg-[#050816] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050816] relative flex items-center justify-center">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-purple-900/10 blur-[120px]" />
          <div className="absolute -bottom-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-indigo-900/10 blur-[120px]" />
        </div>
        
        {/* Isolated Login Modal */}
        <div className="relative z-10 w-full max-w-sm">
           <AdminLoginModal 
             onClose={() => window.location.href = '/'} 
             onLoginSuccess={handleLoginSuccess} 
           />
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-[#050816]">
      {/* Isolated Header just for admin so they can return home or logout */}
      <div className="bg-[#0D122B] border-b border-[#1A223E] px-6 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg">
             <span className="text-white font-black text-xs">SO</span>
          </div>
          <span className="text-lg font-black text-white tracking-tight">SuperOver <span className="text-purple-400">Admin</span></span>
        </div>
        <button 
          onClick={() => {
            setIsAdminAuthenticated(false);
            window.location.href = '/';
          }}
          className="text-sm font-bold text-slate-400 hover:text-white transition-colors"
        >
          Return to App
        </button>
      </div>

      <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <AdminPanel 
          metrics={data.metrics}
          matches={data.matches}
          allUsers={data.allUsers}
          allSlips={data.slips}
          allTransactions={data.transactions}
          faqs={INITIAL_FAQS}
          onUpdateMatch={async (m) => {
            try {
              await api.updateMatch(m);
              setData(prev => prev ? {...prev, matches: prev.matches.map(x => x.id === m.id ? m : x)} : prev);
            } catch(e) {
              console.error(e);
            }
          }}
          onCreateMatch={(m) => setData(prev => prev ? {...prev, matches: [m, ...prev.matches]} : prev)}
          onSettleMatch={async (matchId, results) => {
            try {
              const res = await api.settleMatch({ matchId, picks: (results as any).answers, summary: (results as any).summaryNote });
              if (res.success || res.message) {
                loadAdminData(); // refresh everything
              } else {
                throw new Error(res.error || "Unknown Error");
              }
            } catch(e) {
              console.error(e);
              alert('Error processing settlement. Check console.');
            }
          }}
          onUpdateUser={() => {}}
          onApproveWithdrawal={() => {}}
        />
      </main>
    </div>
  );
}
