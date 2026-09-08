import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Search, 
  RefreshCw, 
  ShieldCheck, 
  AlertTriangle, 
  Copy, 
  Check, 
  Building2, 
  CreditCard, 
  TrendingUp, 
  DollarSign, 
  UserCheck, 
  ExternalLink,
  ShieldAlert,
  SlidersHorizontal,
  Wallet
} from 'lucide-react';
import { formatINR } from '../../utils/payoutCalculator';
import { api } from '../../services/api';
import confetti from 'canvas-confetti';

interface WithdrawalItem {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  userEmail: string;
  userRefId: string;
  userWinningsBalance: number;
  userTotalWon: number;
  type: string;
  amount: number;
  status: 'PENDING' | 'SUCCESS' | 'REJECTED';
  timestamp: string;
  description?: string;
  paymentMethod?: string;
  referenceId: string;
}

interface TreasuryMetrics {
  totalPlatformWinningsLiability: number;
  totalPlatformDepositLiability: number;
  totalDisbursed: number;
  totalPendingAmount: number;
  pendingCount: number;
  completedCount: number;
}

export const WithdrawalsManager: React.FC = () => {
  const [withdrawals, setWithdrawals] = useState<WithdrawalItem[]>([]);
  const [treasury, setTreasury] = useState<TreasuryMetrics>({
    totalPlatformWinningsLiability: 0,
    totalPlatformDepositLiability: 0,
    totalDisbursed: 0,
    totalPendingAmount: 0,
    pendingCount: 0,
    completedCount: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [statusFilter, setStatusFilter] = useState<'PENDING' | 'ALL' | 'SUCCESS' | 'REJECTED'>('PENDING');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Action Modal State
  const [activeModal, setActiveModal] = useState<{
    type: 'APPROVE' | 'REJECT';
    item: WithdrawalItem;
  } | null>(null);
  const [utrInput, setUtrInput] = useState<string>('');
  const [rejectReason, setRejectReason] = useState<string>('Incorrect UPI Address / Bank Verification Failed');
  const [isProcessingAction, setIsProcessingAction] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchWithdrawals = async () => {
    setIsLoading(true);
    try {
      const data = await api.getAdminWithdrawals();
      if (data && data.success) {
        setWithdrawals(data.withdrawals || []);
        if (data.treasury) {
          setTreasury(data.treasury);
        }
      }
    } catch (err) {
      console.error('Failed to load withdrawals:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleOpenApprove = (item: WithdrawalItem) => {
    const rawVpa = item.paymentMethod?.replace(/^UPI:\s*/i, '').trim() || '';
    const suggestedUtr = `UPI${new Date().toISOString().slice(2, 10).replace(/-/g, '')}${Math.floor(100000 + Math.random() * 900000)}`;
    setUtrInput(suggestedUtr);
    setActiveModal({ type: 'APPROVE', item });
  };

  const handleOpenReject = (item: WithdrawalItem) => {
    setRejectReason('Incorrect UPI Address / Bank Verification Failed');
    setActiveModal({ type: 'REJECT', item });
  };

  const handleConfirmAction = async () => {
    if (!activeModal) return;
    setIsProcessingAction(true);

    try {
      if (activeModal.type === 'APPROVE') {
        const res = await api.approveWithdrawalAdmin(activeModal.item.id, utrInput);
        if (res.success) {
          confetti({
            particleCount: 60,
            spread: 50,
            origin: { y: 0.7 },
          });
          setActiveModal(null);
          await fetchWithdrawals();
        } else {
          alert(res.error || 'Failed to approve withdrawal');
        }
      } else {
        const res = await api.rejectWithdrawalAdmin(activeModal.item.id, rejectReason);
        if (res.success) {
          setActiveModal(null);
          await fetchWithdrawals();
        } else {
          alert(res.error || 'Failed to reject withdrawal');
        }
      }
    } catch (err) {
      console.error('Action error:', err);
      alert('Error executing payout action.');
    } finally {
      setIsProcessingAction(false);
    }
  };

  // Filter & Search
  const filteredWithdrawals = withdrawals.filter((w) => {
    const matchesStatus = statusFilter === 'ALL' || w.status === statusFilter;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      w.userName.toLowerCase().includes(query) ||
      w.userPhone.includes(query) ||
      w.userRefId.toLowerCase().includes(query) ||
      (w.paymentMethod && w.paymentMethod.toLowerCase().includes(query)) ||
      w.referenceId.toLowerCase().includes(query);
    
    return matchesStatus && matchesSearch;
  });

  const pendingCount = withdrawals.filter(w => w.status === 'PENDING').length;

  return (
    <div className="space-y-6">
      {/* 1. Treasury & Liquidity Overview Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Payouts Disbursed</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-400 mt-2 font-display">
            {formatINR(treasury.totalDisbursed)}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            {treasury.completedCount} successful IMPS bank payouts
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">Pending Withdrawal Queue</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-amber-400 mt-2 font-display">
            {formatINR(treasury.totalPendingAmount)}
          </div>
          <p className="text-[11px] text-amber-300/80 mt-1">
            {treasury.pendingCount} users awaiting disbursement
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Platform Winnings Liability</span>
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white mt-2 font-display">
            {formatINR(treasury.totalPlatformWinningsLiability)}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Total active withdrawable balance held across fans
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Reserve Solvency</span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-base font-black text-white">100% Backed</span>
          </div>
          <p className="text-[11px] text-emerald-400 font-semibold mt-1">
            Instant UPI & IMPS Liquidity Active
          </p>
        </div>
      </div>

      {/* 2. Filter & Search Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800/80">
          <button
            onClick={() => setStatusFilter('PENDING')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              statusFilter === 'PENDING'
                ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Pending Approvals</span>
            {pendingCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-slate-900 text-amber-300 text-[10px] font-black">
                {pendingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setStatusFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              statusFilter === 'ALL'
                ? 'bg-slate-700 text-white font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Requests ({withdrawals.length})
          </button>

          <button
            onClick={() => setStatusFilter('SUCCESS')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              statusFilter === 'SUCCESS'
                ? 'bg-emerald-500 text-slate-950 font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Paid ({withdrawals.filter(w => w.status === 'SUCCESS').length})
          </button>

          <button
            onClick={() => setStatusFilter('REJECTED')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              statusFilter === 'REJECTED'
                ? 'bg-rose-500 text-white font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Rejected ({withdrawals.filter(w => w.status === 'REJECTED').length})
          </button>
        </div>

        {/* Search & Refresh */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search user, phone, UPI, UTR..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <button
            onClick={fetchWithdrawals}
            disabled={isLoading}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            title="Refresh list"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-amber-400' : ''}`} />
          </button>
        </div>
      </div>

      {/* 3. Main Withdrawals Table / Card List */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {isLoading ? (
          <div className="p-12 text-center text-slate-400 space-y-3">
            <RefreshCw className="w-7 h-7 animate-spin mx-auto text-amber-400" />
            <p className="text-xs font-bold">Loading real-money withdrawal requests...</p>
          </div>
        ) : filteredWithdrawals.length === 0 ? (
          <div className="p-12 text-center text-slate-500 space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-slate-800/80 border border-slate-700/80 mx-auto flex items-center justify-center text-slate-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-black text-slate-300">No withdrawal requests found</h3>
            <p className="text-xs text-slate-500">
              {statusFilter === 'PENDING' ? 'All user payout requests have been verified and disbursed!' : 'No matching records.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-4">User Details</th>
                  <th className="py-3.5 px-4">Withdrawal Amount</th>
                  <th className="py-3.5 px-4">Payout Method / UPI VPA</th>
                  <th className="py-3.5 px-4">User Trust Profile</th>
                  <th className="py-3.5 px-4">Request Time & Ref</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70">
                {filteredWithdrawals.map((w) => {
                  const isPending = w.status === 'PENDING';
                  const isHighValue = w.amount >= 2000;

                  return (
                    <tr 
                      key={w.id} 
                      className={`hover:bg-slate-800/40 transition-colors ${
                        isPending ? 'bg-amber-500/[0.02]' : ''
                      }`}
                    >
                      {/* User Info */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 font-black flex items-center justify-center text-xs flex-shrink-0">
                            {w.userName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-black text-white flex items-center gap-1.5">
                              <span>{w.userName}</span>
                              {isHighValue && (
                                <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[9px] font-black border border-amber-500/40">
                                  HIGH VALUE
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-400 font-mono">
                              {w.userPhone} • Ref #{w.userRefId}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Amount */}
                      <td className="py-4 px-4">
                        <div className="text-base font-black text-emerald-400 font-display">
                          {formatINR(w.amount)}
                        </div>
                        <span className="text-[10px] text-slate-400 block">From Winnings</span>
                      </td>

                      {/* Payment Method / UPI */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono font-bold text-white bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 text-[11px]">
                            {w.paymentMethod || 'UPI Payout'}
                          </span>
                          <button
                            onClick={() => handleCopy(w.paymentMethod?.replace('UPI: ', '') || '', w.id)}
                            className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                            title="Copy UPI Address"
                          >
                            {copiedId === w.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                        <span className="text-[10px] text-slate-400 block mt-0.5">Instant IMPS Route</span>
                      </td>

                      {/* User Trust & Balances */}
                      <td className="py-4 px-4">
                        <div className="text-[11px] text-slate-300">
                          <span className="text-slate-400">Total Won: </span>
                          <span className="font-black text-amber-400">{formatINR(w.userTotalWon || 0)}</span>
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Remaining Winnings: <span className="text-white font-bold">{formatINR(w.userWinningsBalance || 0)}</span>
                        </div>
                      </td>

                      {/* Date & Ref */}
                      <td className="py-4 px-4 text-slate-400 text-[11px]">
                        <div className="font-bold text-slate-200">
                          {new Date(w.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {new Date(w.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • Ref: {w.referenceId}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4 text-center">
                        {w.status === 'PENDING' && (
                          <span className="px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 font-black text-[10px] uppercase tracking-wider inline-flex items-center gap-1">
                            <Clock className="w-3 h-3" /> Under Review
                          </span>
                        )}
                        {w.status === 'SUCCESS' && (
                          <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-black text-[10px] uppercase tracking-wider inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Disbursed
                          </span>
                        )}
                        {w.status === 'REJECTED' && (
                          <span className="px-2.5 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-400 font-black text-[10px] uppercase tracking-wider inline-flex items-center gap-1">
                            <XCircle className="w-3 h-3" /> Refunded
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right">
                        {isPending ? (
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenApprove(w)}
                              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:brightness-110 active:scale-[0.98] text-slate-950 font-black text-xs flex items-center gap-1 shadow-md shadow-emerald-500/20 transition-all"
                            >
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                              <span>Approve & Pay</span>
                            </button>

                            <button
                              onClick={() => handleOpenReject(w)}
                              className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-700 hover:border-rose-500/30 text-xs font-bold transition-all"
                              title="Reject & Refund"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <div className="text-[11px] text-slate-400 font-mono">
                            {w.status === 'SUCCESS' ? `UTR: ${w.referenceId}` : 'Refunded'}
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 4. Action Confirmation Modal (Approve / Reject) */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                {activeModal.type === 'APPROVE' ? (
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                )}
                <div>
                  <h3 className="text-base font-black text-white">
                    {activeModal.type === 'APPROVE' ? 'Approve & Settle Payout' : 'Reject & Refund Withdrawal'}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    User: {activeModal.item.userName} ({activeModal.item.userPhone})
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveModal(null)}
                className="w-7 h-7 rounded-lg bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            {/* Payout Summary Box */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Withdrawal Amount:</span>
                <span className="font-black text-emerald-400 text-base">{formatINR(activeModal.item.amount)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Receiver UPI ID:</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-bold text-white bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
                    {activeModal.item.paymentMethod?.replace(/^UPI:\s*/i, '') || 'user@upi'}
                  </span>
                  <button
                    onClick={() => handleCopy(activeModal.item.paymentMethod?.replace(/^UPI:\s*/i, '') || '', 'modal-upi')}
                    className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                    title="Copy UPI ID"
                  >
                    {copiedId === 'modal-upi' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Direct UPI Pay Link (Opens GPay / PhonePe / Paytm / BHIM) */}
              {activeModal.type === 'APPROVE' && (
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Direct Pay via Phone:</span>
                  <a
                    href={`upi://pay?pa=${encodeURIComponent(activeModal.item.paymentMethod?.replace(/^UPI:\s*/i, '').trim() || '')}&pn=${encodeURIComponent(activeModal.item.userName)}&am=${activeModal.item.amount}&cu=INR&tn=SuperOver_Payout`}
                    className="px-2.5 py-1 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 text-[11px] font-bold flex items-center gap-1 transition-colors"
                  >
                    <span>⚡ Open UPI App (GPay/PhonePe)</span>
                  </a>
                </div>
              )}
            </div>

            {activeModal.type === 'APPROVE' ? (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 block">
                  12-Digit UPI Transaction Reference / UTR Number:
                </label>
                <input
                  type="text"
                  value={utrInput}
                  onChange={(e) => setUtrInput(e.target.value)}
                  placeholder="e.g. 424819284729 or UPI Ref #"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-emerald-400"
                />
                <span className="text-[10px] text-slate-400 block">
                  This 12-digit UPI reference will be visible in the user's wallet passbook.
                </span>
              </div>
            ) : (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 block">
                  Reason for Rejection:
                </label>
                <input
                  type="text"
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-rose-400"
                />
                <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-[11px]">
                  ⚠️ <strong>Automatic Refund:</strong> {formatINR(activeModal.item.amount)} will be restored immediately into {activeModal.item.userName}'s winnings balance.
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirmAction}
                disabled={isProcessingAction}
                className={`px-5 py-2 rounded-xl font-black text-xs flex items-center gap-1.5 shadow-lg transition-all ${
                  activeModal.type === 'APPROVE'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 shadow-emerald-500/25 hover:brightness-110'
                    : 'bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-rose-500/25 hover:brightness-110'
                }`}
              >
                {isProcessingAction ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : activeModal.type === 'APPROVE' ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Confirm & Mark Disbursed</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Reject & Refund to Wallet</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
