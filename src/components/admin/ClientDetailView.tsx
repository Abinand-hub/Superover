import React, { useState, useEffect } from 'react';
import { ArrowLeft, Ban, CheckCircle, CreditCard, Download, ShieldCheck, User as UserIcon, Wallet, Copy, Check, TrendingUp, AlertCircle, Clock } from 'lucide-react';
import { UserAccount, UserPredictionSlip, WalletTransaction } from '../../types';
import { formatINR } from '../../utils/payoutCalculator';

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
  const [copiedId, setCopiedId] = useState(false);

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

  const handleCopyId = () => {
    if (!user?.id) return;
    navigator.clipboard.writeText(user.id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
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
  };

  const handleProcessWithdrawal = () => {
    alert('Mock: Opening withdrawal processing queue');
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[300px] gap-3">
        <div className="w-8 h-8 border-2 border-[#FF6B00] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs text-slate-400 font-medium">Loading client intelligence...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-8 text-center bg-[#0D122B] rounded-2xl border border-[#1A223E] space-y-3">
        <AlertCircle className="w-8 h-8 text-rose-400 mx-auto" />
        <p className="text-white font-bold">User not found</p>
        <button 
          onClick={onBack}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all"
        >
          ← Back to Clients List
        </button>
      </div>
    );
  }

  const depositTransactions = transactions.filter(t => t.type === 'DEPOSIT');
  const totalBalance = (user.wallet?.depositBalance || 0) + (user.wallet?.winningsBalance || 0) + (user.wallet?.bonusBalance || 0);

  return (
    <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-300 max-w-full overflow-hidden">
      {/* Top Header & Actions Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0D122B] p-3 sm:p-4 rounded-2xl border border-[#1A223E]">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-xs sm:text-sm font-bold self-start"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Clients List</span>
        </button>

        {/* Action Buttons: 3-column grid on mobile, inline flex on desktop */}
        <div className="grid grid-cols-3 sm:flex items-center gap-2 w-full sm:w-auto">
          <button 
            onClick={handleManualDeposit}
            className="flex items-center justify-center gap-1.5 px-2.5 sm:px-3.5 py-2 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 rounded-xl text-xs font-bold transition-colors border border-emerald-500/20 text-center"
          >
            <CreditCard className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Add Deposit</span>
          </button>

          <button 
            onClick={handleProcessWithdrawal}
            className="flex items-center justify-center gap-1.5 px-2.5 sm:px-3.5 py-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-xl text-xs font-bold transition-colors border border-blue-500/20 text-center"
          >
            <Wallet className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Withdrawal</span>
          </button>

          <button 
            onClick={handleBlockToggle}
            className={`flex items-center justify-center gap-1.5 px-2.5 sm:px-3.5 py-2 rounded-xl text-xs font-bold transition-colors border text-center ${
              user.isBlocked 
                ? 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border-amber-500/30' 
                : 'bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border-rose-500/20'
            }`}
          >
            <Ban className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{user.isBlocked ? 'Unblock' : 'Block User'}</span>
          </button>
        </div>
      </div>

      {/* User Identity Card */}
      <div className="bg-[#131A38] rounded-2xl border border-[#1A223E] p-4 sm:p-6 overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-5 items-start lg:items-center justify-between">
          
          {/* Avatar & User Details */}
          <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 min-w-0 w-full lg:w-auto">
            <img 
              src={user.avatar || `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(user.name || user.phone || 'User')}&backgroundColor=FF6B00`} 
              alt={user.name} 
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-[#1A223E] object-cover bg-[#0D122B] shrink-0 shadow-md" 
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(user.name || user.phone || 'User')}&backgroundColor=FF6B00`;
              }}
            />
            <div className="min-w-0 flex-1 space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg sm:text-2xl font-black text-white truncate max-w-full">{user.name}</h2>
                {user.role === 'ADMIN' && (
                  <span className="text-[9px] font-black bg-purple-500/20 text-purple-300 border border-purple-500/40 px-2 py-0.5 rounded-full">
                    ADMIN
                  </span>
                )}
                {user.isBlocked ? (
                  <span className="text-[9px] font-black bg-rose-500/20 text-rose-400 border border-rose-500/40 px-2 py-0.5 rounded-full">
                    BLOCKED
                  </span>
                ) : (
                  <span className="text-[9px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                    ACTIVE
                  </span>
                )}
              </div>

              {/* Badges / Meta Info */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-slate-400">
                <button
                  onClick={handleCopyId}
                  className="flex items-center gap-1 bg-[#080C1D] px-2 py-1 rounded-lg border border-[#1A223E] text-slate-300 hover:border-slate-600 transition-colors"
                  title="Click to copy ID"
                >
                  <UserIcon className="w-3 h-3 text-indigo-400 shrink-0" />
                  <span className="font-mono text-[11px] truncate max-w-[120px] sm:max-w-[180px]">{user.id}</span>
                  {copiedId ? <Check className="w-3 h-3 text-emerald-400 shrink-0" /> : <Copy className="w-3 h-3 text-slate-500 shrink-0" />}
                </button>

                <div className="flex items-center gap-1 bg-[#080C1D] px-2 py-1 rounded-lg border border-[#1A223E] text-slate-300">
                  <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span className="font-mono text-[11px]">+91 {user.phone}</span>
                </div>

                <div className="flex items-center gap-1 bg-[#080C1D] px-2 py-1 rounded-lg border border-[#1A223E] text-slate-400 text-[11px]">
                  <Clock className="w-3 h-3 text-slate-500 shrink-0" />
                  <span>
                    Joined: {(() => {
                      const dVal = (user as any).joinedDate || (user as any).dateJoined || (user as any).createdAt;
                      if (!dVal) return 'Recent';
                      const d = new Date(dVal);
                      return isNaN(d.getTime()) ? 'Recent' : d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
                    })()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Balance & Wallet Card */}
          <div className="w-full lg:w-auto bg-[#080C1D] p-4 rounded-xl border border-[#1A223E] flex flex-row lg:flex-col justify-between items-center lg:items-start gap-3">
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Wallet Balance</p>
              <p className="text-xl sm:text-2xl font-black text-emerald-400 font-mono mt-0.5">
                {formatINR(totalBalance)}
              </p>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-slate-400">
              <span className="bg-[#131A38] px-2 py-1 rounded border border-[#1A223E]">Dep: {formatINR(user.wallet?.depositBalance || 0)}</span>
              <span className="bg-[#131A38] px-2 py-1 rounded border border-[#1A223E]">Win: {formatINR(user.wallet?.winningsBalance || 0)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Tab Bar */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'DEPOSITS', label: `Deposits (${depositTransactions.length})` },
          { id: 'CONTESTS', label: `Contest History (${slips.length})` },
          { id: 'TRANSACTIONS', label: `Transactions (${transactions.length})` }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === tab.id 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
                : 'bg-[#131A38] text-slate-400 hover:text-white border border-[#1A223E]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content Panels */}
      <div className="bg-[#131A38] rounded-2xl border border-[#1A223E] overflow-hidden">
        
        {/* ================= TAB 1: DEPOSITS ================= */}
        {activeTab === 'DEPOSITS' && (
          <div>
            {depositTransactions.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs sm:text-sm">
                No deposit transactions found for this user.
              </div>
            ) : (
              <>
                {/* Mobile Cards (Visible < md) */}
                <div className="block md:hidden divide-y divide-[#1A223E]">
                  {depositTransactions.map(tx => (
                    <div key={tx.id} className="p-3.5 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-emerald-400 font-mono font-bold text-base">
                          +{formatINR(tx.amount)}
                        </span>
                        <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
                          {tx.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span className="font-mono text-[11px] truncate max-w-[180px]">Ref: {tx.referenceId || tx.id}</span>
                        <span>{new Date(tx.timestamp).toLocaleDateString()} {new Date(tx.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop Table (Visible md+) */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-[#0D122B] text-slate-400">
                      <tr>
                        <th className="p-4 font-semibold">Date & Time</th>
                        <th className="p-4 font-semibold">Ref ID</th>
                        <th className="p-4 font-semibold">Amount</th>
                        <th className="p-4 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1A223E]">
                      {depositTransactions.map(tx => (
                        <tr key={tx.id} className="text-slate-300 hover:bg-[#0D122B]/50 transition-colors">
                          <td className="p-4 text-xs">{new Date(tx.timestamp).toLocaleString()}</td>
                          <td className="p-4 font-mono text-xs text-slate-400">{tx.referenceId || tx.id}</td>
                          <td className="p-4 text-emerald-400 font-bold font-mono">+{formatINR(tx.amount)}</td>
                          <td className="p-4">
                            <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded border border-emerald-500/20 font-bold">
                              {tx.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        )}

        {/* ================= TAB 2: CONTEST HISTORY ================= */}
        {activeTab === 'CONTESTS' && (
          <div>
            {slips.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs sm:text-sm">
                No contest slips found for this user.
              </div>
            ) : (
              <>
                {/* Mobile Cards (Visible < md) */}
                <div className="block md:hidden divide-y divide-[#1A223E]">
                  {slips.map(slip => {
                    const totalPaid = slip.totalPayable || (slip.entryFee + (slip.freeHitFee || 0));
                    const potentialPayout = slip.payoutAmount || slip.potentialPayout || (slip.entryFee * (slip.multiplierWon || slip.wheelMultiplier || (slip.freeHit ? 75 : 50)));
                    
                    return (
                      <div key={slip.id} className="p-3.5 space-y-2.5">
                        {/* Top: Match ID & Status Badge */}
                        <div className="flex items-center justify-between gap-2">
                          <div className="min-w-0">
                            <span className="font-mono text-xs font-bold text-indigo-400 truncate block">
                              Match #{slip.matchId ? slip.matchId.slice(-8) : 'N/A'}
                            </span>
                            <span className="text-[10px] text-slate-500 block">
                              {new Date(slip.submittedAt).toLocaleDateString()} {new Date(slip.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>

                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border shrink-0 ${
                            slip.status === 'WON' ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' :
                            slip.status === 'LOST' ? 'bg-rose-500/15 text-rose-400 border-rose-500/30' :
                            'bg-amber-500/15 text-amber-400 border-amber-500/30'
                          }`}>
                            {slip.status}
                          </span>
                        </div>

                        {/* Middle Stats Grid */}
                        <div className="grid grid-cols-2 gap-2 bg-[#080C1D] p-2.5 rounded-xl border border-[#1A223E] text-xs">
                          <div>
                            <span className="text-[10px] text-slate-400 block">Entry Fee</span>
                            <div className="font-bold text-white font-mono">
                              {formatINR(totalPaid)}
                              {slip.freeHit && (
                                <span className="text-[9px] text-amber-400 ml-1 font-normal">(+Spin)</span>
                              )}
                            </div>
                          </div>

                          <div>
                            <span className="text-[10px] text-slate-400 block">
                              {slip.status === 'WON' ? 'Won Payout' : 'Potential Win'}
                            </span>
                            <div className="font-bold text-amber-400 font-mono">
                              {formatINR(potentialPayout)}
                              {slip.status === 'PENDING' && (
                                <span className="text-[9px] text-amber-400/80 ml-1 font-normal">
                                  ({slip.wheelMultiplier || (slip.freeHit ? 75 : 50)}X)
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Desktop Table (Visible md+) */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-[#0D122B] text-slate-400">
                      <tr>
                        <th className="p-4 font-semibold">Date & Time</th>
                        <th className="p-4 font-semibold">Match ID</th>
                        <th className="p-4 font-semibold">Entry Fee</th>
                        <th className="p-4 font-semibold">Potential Win / Payout</th>
                        <th className="p-4 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1A223E]">
                      {slips.map(slip => (
                        <tr key={slip.id} className="text-slate-300 hover:bg-[#0D122B]/50 transition-colors">
                          <td className="p-4 text-xs">{new Date(slip.submittedAt).toLocaleString()}</td>
                          <td className="p-4 font-mono text-xs text-indigo-400">{slip.matchId}</td>
                          <td className="p-4">
                            {slip.freeHit || (slip.totalPayable && slip.totalPayable > slip.entryFee) ? (
                              <div>
                                <span className="font-bold text-white font-mono">{formatINR(slip.totalPayable || (slip.entryFee + (slip.freeHitFee || 10)))}</span>
                                <span className="text-[11px] text-amber-400 block font-normal">({formatINR(slip.entryFee)} + {formatINR(slip.freeHitFee || 10)} Spin)</span>
                              </div>
                            ) : (
                              <span className="font-mono">{formatINR(slip.entryFee)}</span>
                            )}
                          </td>
                          <td className="p-4 text-yellow-400 font-bold font-mono">
                            {formatINR(slip.payoutAmount || slip.potentialPayout || (slip.entryFee * (slip.multiplierWon || slip.wheelMultiplier || (slip.freeHit ? 75 : 50))))}
                            {slip.status === 'PENDING' && (
                              <span className="text-[11px] text-amber-400/80 block font-normal">({slip.wheelMultiplier || (slip.freeHit ? 75 : 50)}X Max)</span>
                            )}
                          </td>
                          <td className="p-4">
                            <span className={`text-xs px-2.5 py-1 rounded font-bold border ${
                              slip.status === 'WON' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                              slip.status === 'LOST' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                              'bg-amber-500/10 text-amber-400 border-amber-500/20'
                            }`}>
                              {slip.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        )}

        {/* ================= TAB 3: TRANSACTIONS ================= */}
        {activeTab === 'TRANSACTIONS' && (
          <div>
            {transactions.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs sm:text-sm">
                No transactions recorded for this user.
              </div>
            ) : (
              <>
                {/* Mobile Cards (Visible < md) */}
                <div className="block md:hidden divide-y divide-[#1A223E]">
                  {transactions.map(tx => {
                    const isCredit = ['DEPOSIT', 'CONTEST_PAYOUT', 'BONUS_REWARD'].includes(tx.type);
                    return (
                      <div key={tx.id} className="p-3.5 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold bg-[#080C1D] text-slate-300 px-2 py-0.5 rounded border border-[#1A223E]">
                            {tx.type}
                          </span>
                          <span className={`font-mono font-bold text-sm ${isCredit ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {isCredit ? '+' : '-'}{formatINR(tx.amount)}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300">{tx.description || 'Wallet transaction'}</p>
                        <p className="text-[10px] text-slate-500">
                          {new Date(tx.timestamp).toLocaleDateString()} {new Date(tx.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Desktop Table (Visible md+) */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-[#0D122B] text-slate-400">
                      <tr>
                        <th className="p-4 font-semibold">Date & Time</th>
                        <th className="p-4 font-semibold">Type</th>
                        <th className="p-4 font-semibold">Amount</th>
                        <th className="p-4 font-semibold">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1A223E]">
                      {transactions.map(tx => (
                        <tr key={tx.id} className="text-slate-300 hover:bg-[#0D122B]/50 transition-colors">
                          <td className="p-4 text-xs">{new Date(tx.timestamp).toLocaleString()}</td>
                          <td className="p-4">
                            <span className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded border border-slate-700 font-bold">
                              {tx.type}
                            </span>
                          </td>
                          <td className={`p-4 font-bold font-mono ${['DEPOSIT', 'CONTEST_PAYOUT', 'BONUS_REWARD'].includes(tx.type) ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {['DEPOSIT', 'CONTEST_PAYOUT', 'BONUS_REWARD'].includes(tx.type) ? '+' : '-'}{formatINR(tx.amount)}
                          </td>
                          <td className="p-4 text-slate-400 text-xs">{tx.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
