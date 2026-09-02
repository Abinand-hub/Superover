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
      const dashboardData = await api.getAdminDashboard();
      
      if (dashboardData) {
        setData({ 
          matches: dashboardData.matches, 
          allUsers: [], // Load users lazily in the users tab
          slips: dashboardData.slips, 
          transactions: dashboardData.transactions, 
          metrics: dashboardData.metrics
        });
      }
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
      <div className="min-h-screen bg-[#050816] flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#FF6B00] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-[#FF8800] font-black text-xs uppercase tracking-wider animate-pulse">Initializing SuperOver Admin...</p>
        <p className="text-slate-500 text-xs mt-1">Connecting to Management Engine</p>
      </div>
    );
  }

  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050816] relative flex items-center justify-center p-4">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-[#FF6B00]/10 blur-[130px]" />
          <div className="absolute -bottom-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-[#FF8800]/5 blur-[130px]" />
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
      {/* Admin Top Navigation */}
      <div className="bg-[#080C1D] border-b border-[#1A223E] px-6 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FF6B00] to-[#FF8800] flex items-center justify-center shadow-lg shadow-[#FF6B00]/30">
             <span className="text-slate-950 font-black text-xs">SO</span>
          </div>
          <span className="text-lg font-black text-white tracking-tight">SuperOver <span className="text-[#FF8800]">Admin</span></span>
        </div>
        <button 
          onClick={() => {
            setIsAdminAuthenticated(false);
            window.location.href = '/';
          }}
          className="px-3.5 py-1.5 rounded-xl bg-[#131A38] border border-[#1A223E] text-xs font-bold text-slate-300 hover:text-white transition-colors"
        >
          ← Return to Fan View
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
                throw new Error(res.message || "Unknown Error");
              }
            } catch(e) {
              console.error(e);
              alert('Error processing settlement. Check console.');
            }
          }}
          onUpdateUser={() => {}}
          onApproveWithdrawal={() => {}}
          onRejectWithdrawal={() => {}}
          onAddBonusCash={() => {}}
          onApproveJackpot={() => {}}
          onRejectJackpot={() => {}}
          onCloseAdmin={() => {}}
          onReloadData={loadAdminData}
        />
      </main>
    </div>
  );
}
