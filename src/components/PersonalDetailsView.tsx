import React, { useState } from 'react';
import { 
  User as UserIcon, 
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
  LogOut,
  Sparkles,
  Wallet as WalletIcon
} from 'lucide-react';
import { UserAccount, UserPredictionSlip, WalletTransaction } from '../types';
import { formatINR } from '../utils/payoutCalculator';

interface PersonalDetailsViewProps {
  user: UserAccount;
  slips: UserPredictionSlip[];
  transactions: WalletTransaction[];
  onSignOut: () => void;
  onOpenKyc: () => void;
  onGoToLobby: () => void;
}

export const PersonalDetailsView: React.FC<PersonalDetailsViewProps> = ({
  user,
  slips,
  transactions,
  onSignOut,
  onOpenKyc,
  onGoToLobby,
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
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">
      {/* Profile Header Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#0D122B] via-[#080C1D] to-[#0D122B] border border-[#1A223E] shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-[#FF6B00]/50 shadow-lg shadow-[#FF6B00]/20" 
            />
            <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#4ADE80] border-2 border-[#080C1D]" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-black text-white font-display">
                {user.name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-[#4ADE80]/15 text-[#4ADE80] text-xs font-black border border-[#4ADE80]/30">
                {user.kycStatus === 'VERIFIED' ? 'Verified Fan' : 'Active Player'}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-2 flex-wrap">
              <span>Phone: <strong className="text-slate-200">{user.phone}</strong></span>
              <span>•</span>
              <span>Joined: {user.joinedDate || '2026-09-07'}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {user.kycStatus !== 'VERIFIED' && (
            <button
              onClick={onOpenKyc}
              className="px-4 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/20 flex items-center gap-1.5 transition-colors"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Complete KYC</span>
            </button>
          )}
          <button
            onClick={onSignOut}
            className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-bold border border-rose-500/20 flex items-center gap-1.5 transition-colors"
            id="btn-tab-signout-top"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Section 1: Registration Details */}
      <div className="p-6 rounded-3xl bg-[#0D122B] border border-[#1A223E] shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-black text-white font-display flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B00]"></span>
              Personal Details & Registration Info
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Your official account credentials and platform identity</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {/* User / Ref ID */}
          <div className="p-4 rounded-2xl bg-[#080C1D] border border-[#1A223E] flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center shrink-0">
              <Fingerprint className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">User / Ref ID</span>
              <span className="text-sm font-black text-white truncate block mt-0.5">{user.refId || user.id || 'N/A'}</span>
            </div>
          </div>

          {/* Full Name */}
          <div className="p-4 rounded-2xl bg-[#080C1D] border border-[#1A223E] flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/15 text-[#FF6B00] flex items-center justify-center shrink-0">
              <UserIcon className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">Full Name</span>
              <span className="text-sm font-black text-white truncate block mt-0.5">{user.name}</span>
            </div>
          </div>

          {/* Phone Number */}
          <div className="p-4 rounded-2xl bg-[#080C1D] border border-[#1A223E] flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">Phone Number</span>
              <span className="text-sm font-black text-white truncate block mt-0.5">{user.phone || 'N/A'}</span>
            </div>
          </div>

          {/* Email Address */}
          <div className="p-4 rounded-2xl bg-[#080C1D] border border-[#1A223E] flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-sky-500/15 text-sky-400 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">Email Address</span>
              <span className="text-sm font-black text-white truncate block mt-0.5">{user.email || `${user.phone}@superover.in`}</span>
            </div>
          </div>
        </div>

        {/* Password */}
        <div className="p-4 rounded-2xl bg-[#080C1D] border border-[#1A223E] flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-rose-500/15 text-rose-400 flex items-center justify-center shrink-0">
              <KeyRound className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">Password</span>
              <span className="text-sm font-black text-white font-mono mt-0.5 block">
                {showPassword ? '•••••••• (Encrypted BCrypt)' : '••••••••'}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="px-3 py-1.5 rounded-xl bg-[#131A38] hover:bg-[#1A223E] text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{showPassword ? 'Hide' : 'Show'}</span>
          </button>
        </div>
      </div>

      {/* Section 2: Contests & Financial Overview */}
      <div className="p-6 rounded-3xl bg-[#0D122B] border border-[#1A223E] shadow-xl space-y-4">
        <div>
          <h2 className="text-base font-black text-white font-display flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4ADE80]"></span>
            Contests & Financial Activity
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Real-time statistics on your predictions and payouts</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
          {/* Contests Played */}
          <div className="p-4 rounded-2xl bg-[#080C1D] border border-[#1A223E] flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Contest Played</span>
              <Trophy className="w-4 h-4 text-[#FFAA00]" />
            </div>
            <span className="text-2xl font-black text-white font-display mt-3">
              {contestsPlayedCount}
            </span>
            <span className="text-[11px] text-slate-400 mt-1">Total selections</span>
          </div>

          {/* Total Money Added */}
          <div className="p-4 rounded-2xl bg-[#080C1D] border border-[#1A223E] flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Money Added</span>
              <ArrowDownLeft className="w-4 h-4 text-[#FFAA00]" />
            </div>
            <span className="text-2xl font-black text-[#FFAA00] font-display mt-3">
              {formatINR(totalDepositedAmount)}
            </span>
            <span className="text-[11px] text-slate-400 mt-1">{depositsList.length} instant UPI deposits</span>
          </div>

          {/* Total Won Payouts */}
          <div className="p-4 rounded-2xl bg-[#080C1D] border border-[#1A223E] flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Won Payouts</span>
              <Award className="w-4 h-4 text-[#4ADE80]" />
            </div>
            <span className="text-2xl font-black text-[#4ADE80] font-display mt-3">
              {formatINR(totalWonAmount)}
            </span>
            <span className="text-[11px] text-slate-400 mt-1">Disbursed winnings</span>
          </div>

          {/* Total Withdrawal */}
          <div className="p-4 rounded-2xl bg-[#080C1D] border border-[#1A223E] flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Withdrawal</span>
              <ArrowUpRight className="w-4 h-4 text-sky-400" />
            </div>
            <span className="text-2xl font-black text-sky-400 font-display mt-3">
              {formatINR(totalWithdrawnAmount)}
            </span>
            <span className="text-[11px] text-slate-400 mt-1">{withdrawalsList.length} transfers to UPI</span>
          </div>
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="p-6 rounded-3xl bg-[#0D122B] border border-[#1A223E] shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={onGoToLobby}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#FF6B00] to-[#FF8800] text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#FF6B00]/25 hover:brightness-110 active:scale-95 transition-all"
        >
          <Sparkles className="w-4 h-4 text-slate-950" />
          <span>Back to Match Lobby</span>
        </button>

        <button
          onClick={onSignOut}
          className="px-6 py-3 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs sm:text-sm font-black border border-rose-500/30 flex items-center justify-center gap-2 transition-colors"
          id="btn-tab-signout-bottom"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out from SuperOver</span>
        </button>
      </div>
    </div>
  );
};
