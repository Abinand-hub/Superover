'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminPanel } from '@/src/components/AdminPanel';
import { api } from '@/src/services/api';
import { INITIAL_FAQS } from '@/src/data/initialData';

export default function AdminPage() {
  const router = useRouter();
  const [isInitializing, setIsInitializing] = useState(true);
  const [matches, setMatches] = useState<any[]>([]);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [slips, setSlips] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [metrics, setMetrics] = useState<any>({});

  useEffect(() => {
    async function checkAdminAndLoadData() {
      try {
        const currentUser = await api.getCurrentUser();
        
        if (currentUser.id === 'u_guest' || currentUser.role !== 'ADMIN') {
          alert('Access Denied. Admins only.');
          router.push('/');
          return;
        }

        const [
          fetchedMatches,
          fetchedAllUsers,
          fetchedSlips,
          fetchedTransactions,
          fetchedMetrics
        ] = await Promise.all([
          api.getMatches(),
          api.getAllUsers(),
          api.getSlips(),
          api.getTransactions(),
          api.getMetrics()
        ]);

        setMatches(fetchedMatches);
        setAllUsers(fetchedAllUsers);
        setSlips(fetchedSlips);
        setTransactions(fetchedTransactions);
        setMetrics(fetchedMetrics);
      } catch (err) {
        console.error("Failed to load admin data", err);
      } finally {
        setIsInitializing(false);
      }
    }
    
    checkAdminAndLoadData();
  }, [router]);

  if (isInitializing) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#050816]">
        <div className="w-12 h-12 border-4 border-[#FF6B00] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] text-slate-200">
      <AdminPanel
        metrics={metrics}
        matches={matches}
        allUsers={allUsers}
        allSlips={slips}
        allTransactions={transactions}
        faqs={INITIAL_FAQS}
        onUpdateMatch={async (updated) => {
          try {
            await api.updateMatch(updated);
            setMatches((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
          } catch(e) {
            console.error(e);
          }
        }}
        onCreateMatch={(newMatch) => setMatches((prev) => [newMatch, ...prev])}
        onSettleMatch={async (matchId, results) => {
          try {
            const res = await api.settleMatch({ matchId, picks: (results as any).answers, summary: (results as any).summaryNote });
            if (res.success || res.message) {
              const [fetchedMatches, fetchedSlips, fetchedTransactions, fetchedUsers] = await Promise.all([
                api.getMatches(),
                api.getSlips(),
                api.getTransactions(),
                api.getAllUsers()
              ]);
              setMatches(fetchedMatches);
              setSlips(fetchedSlips);
              setTransactions(fetchedTransactions);
              setAllUsers(fetchedUsers);
            } else {
              alert('Settlement failed. Please check logs.');
            }
          } catch (e) {
            console.error(e);
            alert('Settlement API error.');
          }
        }}
        onUpdateUser={(updated) => {
          setAllUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
        }}
        onApproveWithdrawal={(txId) => {
          setTransactions((prev) =>
            prev.map((t) => (t.id === txId ? { ...t, status: 'SUCCESS' } : t))
          );
        }}
        onRejectWithdrawal={(txId) => {
          setTransactions((prev) =>
            prev.map((t) => (t.id === txId ? { ...t, status: 'REJECTED' } : t))
          );
        }}
        onAddBonusCash={() => {}}
        onApproveJackpot={() => {}}
        onRejectJackpot={() => {}}
        onCloseAdmin={() => router.push('/')}
      />
    </div>
  );
}
