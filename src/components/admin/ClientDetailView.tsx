import React, { useState, useEffect } from 'react';
import { ArrowLeft, Ban, CheckCircle, CreditCard, Download, ShieldCheck, User as UserIcon, Wallet } from 'lucide-react';
import { UserAccount, UserPredictionSlip, WalletTransaction } from '../../types';
import { formatINR } from '../../utils/payoutCalculator';
import { api } from '../../services/api';

interface ClientDetailViewProps {
  userId: string;
  onBack: () => void;
}

export const ClientDetailView: React.FC<ClientDetailViewProps> = ({ userId, onBack }) => {
  const [user, setUser] = useState<UserAccount | null>(null);
  const [slips, setSlips] = useState<UserPredictionSlip[]>([]);
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'DEPOSITS' | 'CONTESTS' | 'TRANSACTIONS'>('DEPOSITS');

  useEffect(() => {
    loadUserDetails();
  }, [userId]);

  const loadUserDetails = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/users/${userId}`);
      const data = await res.json();
      if (data.user) {
        setUser(data.user);
        setSlips(data.slips || []);
        setTransactions(data.transactions || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBlockToggle = async () => {
    if (!user) return;
    const action = user.isBlocked ? 'UNBLOCK' : 'BLOCK';
    if (!window.confirm(`Are you sure you want to ${action} this user?`)) return;
    
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action })
      });
      if (res.ok) {
        loadUserDetails();
      }
    } catch (e) {
      alert('Failed to update user status');
    }
  };

  const handleManualDeposit = () => {
    const amount = prompt('Enter deposit amount (INR):');
    if (!amount || isNaN(Number(amount))) return;
    
    alert('Mock: Processing manual deposit of ' + formatINR(Number(amount)));
    // Real implementation would call an API
  };

  const handleProcessWithdrawal = () => {
    alert('Mock: Opening withdrawal processing modal');
    // Real implementation would open withdrawal queue/modal
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) return <div className="text-white">User not found</div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Clients</span>
        </button>
        <div className="flex gap-3">
          <button 
            onClick={handleManualDeposit}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 rounded-xl font-medium transition-colors border border-emerald-500/20"
          >
            <CreditCard className="w-4 h-4" />
            Add Deposit
          </button>
          <button 
            onClick={handleProcessWithdrawal}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-xl font-medium transition-colors border border-blue-500/20"
          >
            <Wallet className="w-4 h-4" />
            Process Withdrawal
          </button>
          <button 
            onClick={handleBlockToggle}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-colors border ${
              user.isBlocked 
                ? 'bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 border-orange-500/20' 
                : 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border-red-500/20'
            }`}
          >
            <Ban className="w-4 h-4" />
            {user.isBlocked ? 'Unblock User' : 'Block User'}
          </button>
        </div>
      </div>

      {/* KYC & Identity Card */}
      <div className="bg-[#131A38] rounded-2xl border border-[#1A223E] overflow-hidden">
        <div className="p-6 flex flex-col md:flex-row gap-6 md:items-center">
          <img 
            src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=FF6B00&color=fff&bold=true`} 
            alt={user.name} 
            className="w-24 h-24 rounded-2xl border-4 border-[#0D122B] object-cover bg-[#0D122B]" 
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=FF6B00&color=fff&bold=true`;
            }}
          />
          <div className="flex-1 space-y-2">
            <h2 className="text-2xl font-black text-white">{user.name}</h2>
            <div className="flex flex-wrap gap-4 text-sm text-slate-400">
              <span className="flex items-center gap-1.5"><UserIcon className="w-4 h-4" /> ID: {user.id}</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4" /> Mobile: +91 {user.phone}</span>
              <span className="text-xs text-slate-400">
                Joined: {(() => {
                  const dVal = (user as any).joinedDate || (user as any).dateJoined || (user as any).createdAt;
                  if (!dVal) return 'Recent';
                  const d = new Date(dVal);
                  return isNaN(d.getTime()) ? 'Recent' : d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
                })()}
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded text-xs font-bold border border-emerald-400/20">
                KYC {user.kycStatus}
              </span>
            </div>
          </div>
          <div className="bg-[#0D122B] p-4 rounded-xl border border-[#1A223E] min-w-[200px]">
            <p className="text-sm text-slate-400 mb-1">Current Balance</p>
            <p className="text-3xl font-black text-white">{formatINR(user.wallet?.balance || 0)}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {(['DEPOSITS', 'CONTESTS', 'TRANSACTIONS'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === tab 
                ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25' 
                : 'bg-[#131A38] text-slate-400 hover:text-white border border-[#1A223E]'
            }`}
          >
            {tab === 'DEPOSITS' ? 'Deposit History' : tab === 'CONTESTS' ? 'Contest History' : 'Transaction Log'}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-[#131A38] rounded-2xl border border-[#1A223E] overflow-hidden">
        {activeTab === 'DEPOSITS' && (
          <table className="w-full text-left text-sm">
            <thead className="bg-[#0D122B] text-slate-400">
              <tr>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold">Ref ID</th>
                <th className="p-4 font-semibold">Amount</th>
                <th className="p-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A223E]">
              {transactions.filter(t => t.type === 'DEPOSIT').map(tx => (
                <tr key={tx.id} className="text-slate-300">
                  <td className="p-4">{new Date(tx.timestamp).toLocaleString()}</td>
                  <td className="p-4 font-mono text-xs">{tx.referenceId}</td>
                  <td className="p-4 text-emerald-400 font-bold">+{formatINR(tx.amount)}</td>
                  <td className="p-4">
                    <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded border border-emerald-500/20">{tx.status}</span>
                  </td>
                </tr>
              ))}
              {transactions.filter(t => t.type === 'DEPOSIT').length === 0 && (
                <tr><td colSpan={4} className="p-8 text-center text-slate-500">No deposits found</td></tr>
              )}
            </tbody>
          </table>
        )}

        {activeTab === 'CONTESTS' && (
          <table className="w-full text-left text-sm">
            <thead className="bg-[#0D122B] text-slate-400">
              <tr>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold">Match ID</th>
                <th className="p-4 font-semibold">Entry Fee</th>
                <th className="p-4 font-semibold">Potential Win</th>
                <th className="p-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A223E]">
              {slips.map(slip => (
                <tr key={slip.id} className="text-slate-300">
                  <td className="p-4">{new Date(slip.submittedAt).toLocaleString()}</td>
                  <td className="p-4 font-mono text-xs text-indigo-400">{slip.matchId}</td>
                  <td className="p-4">{formatINR(slip.entryFee)}</td>
                  <td className="p-4 text-yellow-400 font-bold">{formatINR(slip.potentialPayout)}</td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 rounded border ${
                      slip.status === 'WON' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                      slip.status === 'LOST' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                      'bg-orange-500/10 text-orange-400 border-orange-500/20'
                    }`}>
                      {slip.status}
                    </span>
                  </td>
                </tr>
              ))}
              {slips.length === 0 && (
                <tr><td colSpan={5} className="p-8 text-center text-slate-500">No contests found</td></tr>
              )}
            </tbody>
          </table>
        )}

        {activeTab === 'TRANSACTIONS' && (
          <table className="w-full text-left text-sm">
            <thead className="bg-[#0D122B] text-slate-400">
              <tr>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold">Type</th>
                <th className="p-4 font-semibold">Amount</th>
                <th className="p-4 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A223E]">
              {transactions.map(tx => (
                <tr key={tx.id} className="text-slate-300">
                  <td className="p-4">{new Date(tx.timestamp).toLocaleString()}</td>
                  <td className="p-4">
                    <span className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded border border-slate-700">
                      {tx.type}
                    </span>
                  </td>
                  <td className={`p-4 font-bold ${['DEPOSIT', 'CONTEST_PAYOUT', 'BONUS_REWARD'].includes(tx.type) ? 'text-emerald-400' : 'text-red-400'}`}>
                    {['DEPOSIT', 'CONTEST_PAYOUT', 'BONUS_REWARD'].includes(tx.type) ? '+' : '-'}{formatINR(tx.amount)}
                  </td>
                  <td className="p-4 text-slate-400">{tx.description}</td>
                </tr>
              ))}
              {transactions.length === 0 && (
                <tr><td colSpan={4} className="p-8 text-center text-slate-500">No transactions found</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
