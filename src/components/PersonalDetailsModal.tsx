import React, { useState } from 'react';
import { 
  User as UserIcon, 
  X, 
  ShieldCheck, 
  Phone, 
  Mail, 
  KeyRound, 
  Trophy, 
  ArrowDownLeft, 
  ArrowUpRight, 
  Award, 
  Eye, 
  EyeOff, 
  Fingerprint,
  Calendar,
  LogOut
} from 'lucide-react';
import { UserAccount, UserPredictionSlip, WalletTransaction } from '../types';
import { formatINR } from '../utils/payoutCalculator';

interface PersonalDetailsModalProps {
  user: UserAccount;
  slips: UserPredictionSlip[];
  transactions: WalletTransaction[];
  onClose: () => void;
  onSignOut?: () => void;
}

export const PersonalDetailsModal: React.FC<PersonalDetailsModalProps> = ({
  user,
  slips,
  transactions,
  onClose,
  onSignOut,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // Compute metrics specifically for this user
  const currentUserId = (user.id || (user as any)._id || '').toString();
  const userSlips = slips.filter((s) => {
    if (!currentUserId || currentUserId === 'u_guest') return true;
    const slipUserId = (s.userId || (s as any).user || '').toString();
    return !slipUserId || slipUserId === currentUserId;
  });

  const userTransactions = transactions.filter((t) => {
    if (!currentUserId || currentUserId === 'u_guest') return true;
    const txUserId = (t.userId || '').toString();
    return !txUserId || txUserId === currentUserId;
  });

  const depositsList = userTransactions.filter((t) => t.type === 'DEPOSIT');
  const withdrawalsList = userTransactions.filter((t) => t.type === 'WITHDRAWAL');

  const totalWonAmount = userSlips.reduce((sum, s) => sum + (s.payoutAmount || 0), 0);
  const totalDepositedAmount = depositsList.reduce((sum, t) => sum + t.amount, 0);
  const totalWithdrawnAmount = withdrawalsList.filter(t => t.status === 'SUCCESS').reduce((sum, t) => sum + t.amount, 0);
  const contestsPlayedCount = userSlips.length || user.totalContestsJoined || 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050816]/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0D122B] w-full max-w-lg rounded-3xl border border-[#1A223E] overflow-hidden shadow-2xl shadow-black/80 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 bg-[#080C1D] border-b border-[#1A223E]">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-11 h-11 rounded-2xl object-cover ring-2 ring-[#FF6B00]/40"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#4ADE80] border-2 border-[#080C1D]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-black text-white">{user.name}</h2>
                <span className="px-2 py-0.5 rounded-full bg-[#4ADE80]/15 text-[#4ADE80] text-[10px] font-black border border-[#4ADE80]/30">
                  Active Player
                </span>
              </div>
              <p className="text-xs text-slate-400">Personal Details & Account Overview</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl bg-[#131A38] text-slate-400 hover:text-white hover:bg-[#1A223E] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          {/* Section 1: Registration Credentials & Identity */}
          <div className="space-y-2.5">
            <span className="text-[10px] font-black text-[#FF8800] uppercase tracking-wider block">
              Registration Information
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              {/* User / Ref ID */}
              <div className="p-3 rounded-xl bg-[#080C1D] border border-[#1A223E] flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/15 text-indigo-400 flex items-center justify-center shrink-0">
                  <Fingerprint className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-slate-400 block">User / Ref ID</span>
                  <span className="font-bold text-white truncate block">{user.refId || user.id || 'N/A'}</span>
                </div>
              </div>

              {/* Full Name */}
              <div className="p-3 rounded-xl bg-[#080C1D] border border-[#1A223E] flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FF6B00]/15 text-[#FF6B00] flex items-center justify-center shrink-0">
                  <UserIcon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-slate-400 block">Full Name</span>
                  <span className="font-bold text-white truncate block">{user.name}</span>
                </div>
              </div>

              {/* Phone */}
              <div className="p-3 rounded-xl bg-[#080C1D] border border-[#1A223E] flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-slate-400 block">Phone Number</span>
                  <span className="font-bold text-white truncate block">{user.phone || 'N/A'}</span>
                </div>
              </div>

              {/* Email */}
              <div className="p-3 rounded-xl bg-[#080C1D] border border-[#1A223E] flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-500/15 text-sky-400 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-slate-400 block">Email Address</span>
                  <span className="font-bold text-white truncate block">{user.email || `${user.phone}@superover.in`}</span>
                </div>
              </div>
            </div>

            {/* Password Field with reveal toggle */}
            <div className="p-3 rounded-xl bg-[#080C1D] border border-[#1A223E] flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-rose-500/15 text-rose-400 flex items-center justify-center shrink-0">
                  <KeyRound className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-slate-400 block">Password</span>
                  <span className="font-bold text-white font-mono">
                    {showPassword ? '•••••••• (Encrypted BCrypt)' : '••••••••'}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="px-2.5 py-1 rounded-lg bg-[#131A38] hover:bg-[#1A223E] text-slate-300 text-[11px] font-bold flex items-center gap-1 transition-colors"
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{showPassword ? 'Hide' : 'Show'}</span>
              </button>
            </div>
          </div>

          {/* Section 2: Financial & Contest Stats */}
          <div className="space-y-2.5 pt-2">
            <span className="text-[10px] font-black text-[#FF8800] uppercase tracking-wider block">
              Contests & Wallet Summary
            </span>

            <div className="grid grid-cols-2 gap-2.5">
              {/* Contest Played */}
              <div className="p-3.5 rounded-2xl bg-[#080C1D] border border-[#1A223E] flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Contest Played</span>
                  <Trophy className="w-4 h-4 text-[#FFAA00]" />
                </div>
                <span className="text-xl font-black text-white font-display mt-2">
                  {contestsPlayedCount}
                </span>
                <span className="text-[10px] text-slate-500 mt-0.5">Total selections placed</span>
              </div>

              {/* Total Money Added */}
              <div className="p-3.5 rounded-2xl bg-[#080C1D] border border-[#1A223E] flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Money Added</span>
                  <ArrowDownLeft className="w-4 h-4 text-[#FFAA00]" />
                </div>
                <span className="text-xl font-black text-[#FFAA00] font-display mt-2">
                  {formatINR(totalDepositedAmount)}
                </span>
                <span className="text-[10px] text-slate-500 mt-0.5">{depositsList.length} instant UPI deposits</span>
              </div>

              {/* Total Won Payouts */}
              <div className="p-3.5 rounded-2xl bg-[#080C1D] border border-[#1A223E] flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Won Payouts</span>
                  <Award className="w-4 h-4 text-[#4ADE80]" />
                </div>
                <span className="text-xl font-black text-[#4ADE80] font-display mt-2">
                  {formatINR(totalWonAmount)}
                </span>
                <span className="text-[10px] text-slate-500 mt-0.5">Winnings disbursed to wallet</span>
              </div>

              {/* Total Withdrawal */}
              <div className="p-3.5 rounded-2xl bg-[#080C1D] border border-[#1A223E] flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Withdrawal</span>
                  <ArrowUpRight className="w-4 h-4 text-sky-400" />
                </div>
                <span className="text-xl font-black text-sky-400 font-display mt-2">
                  {formatINR(totalWithdrawnAmount)}
                </span>
                <span className="text-[10px] text-slate-500 mt-0.5">{withdrawalsList.length} transfers to UPI</span>
              </div>
            </div>
          </div>

          {/* Member Info Footer Note */}
          <div className="p-3 rounded-xl bg-[#080C1D]/60 border border-[#1A223E] flex items-center justify-between text-[11px] text-slate-400">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>Joined: {user.joinedDate || '2026-09-07'}</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Account Protected</span>
            </div>
          </div>
        </div>

        {/* Modal Footer with Sign Out / Logout */}
        <div className="p-4 bg-[#080C1D] border-t border-[#1A223E] flex items-center justify-between gap-3">
          {onSignOut && (
            <button
              onClick={() => {
                onClose();
                onSignOut();
              }}
              className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-bold border border-rose-500/20 flex items-center gap-1.5 transition-colors"
              id="btn-personal-details-signout"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          )}
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#FF8800] text-slate-950 font-black text-xs hover:brightness-110 active:scale-95 transition-all shadow-md shadow-[#FF6B00]/25 ml-auto"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

