import React, { useState } from 'react';
import { 
  Trophy, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Sparkles, 
  Calendar, 
  TrendingUp, 
  Award,
  ChevronRight,
  Zap,
  ArrowDownLeft,
  ArrowUpRight,
  Wallet as WalletIcon,
  PlusCircle,
  RefreshCw,
  History,
  FileText,
  AlertCircle
} from 'lucide-react';
import { CricketMatch, UserAccount, UserPredictionSlip, Wallet, WalletTransaction } from '../types';
import { formatINR } from '../utils/payoutCalculator';

interface MyContestsViewProps {
  user: UserAccount;
  wallet: Wallet;
  slips: UserPredictionSlip[];
  transactions: WalletTransaction[];
  matches: CricketMatch[];
  onViewSlipDetails: (match: CricketMatch, slip: UserPredictionSlip) => void;
  onGoToLobby: () => void;
  onOpenWallet: (tab: 'deposit' | 'withdraw' | 'passbook') => void;
}

export const MyContestsView: React.FC<MyContestsViewProps> = ({
  user,
  wallet,
  slips,
  transactions,
  matches,
  onViewSlipDetails,
  onGoToLobby,
  onOpenWallet,
}) => {
  const [mainTab, setMainTab] = useState<'slips' | 'deposits' | 'withdrawals' | 'passbook'>('slips');
  const [slipFilter, setSlipFilter] = useState<'ALL' | 'ACTIVE' | 'WON' | 'COMPLETED'>('ALL');

  const matchMap = new Map(matches.map((m) => [m.id, m]));

  // User-specific filtering
  const userSlips = slips.filter((s) => s.userId === user.id);
  const userTransactions = transactions.filter((t) => t.userId === user.id);

  const depositsList = userTransactions.filter((t) => t.type === 'DEPOSIT');
  const withdrawalsList = userTransactions.filter((t) => t.type === 'WITHDRAWAL');

  const totalWonAmount = userSlips.reduce((sum, s) => sum + (s.payoutAmount || 0), 0);
  const totalEntriesAmount = userSlips.reduce((sum, s) => sum + s.entryFee, 0);
  const totalDepositedAmount = depositsList.reduce((sum, t) => sum + t.amount, 0);
  const totalWithdrawnAmount = withdrawalsList.filter(t => t.status === 'SUCCESS').reduce((sum, t) => sum + t.amount, 0);

  const wonCount = userSlips.filter((s) => s.status === 'WON').length;
  const winRate = userSlips.length > 0 ? Math.round((wonCount / userSlips.length) * 100) : 0;

  const filteredSlips = userSlips.filter((s) => {
    if (slipFilter === 'ACTIVE') return s.status === 'PENDING' || s.status === 'LIVE';
    if (slipFilter === 'WON') return s.status === 'WON';
    if (slipFilter === 'COMPLETED') return s.status === 'WON' || s.status === 'LOST';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner & Header */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-[#0D122B] via-[#080C1D] to-[#0D122B] border border-[#1A223E] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="w-12 h-12 rounded-2xl object-cover ring-2 ring-[#FF6B00]/50" 
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-white font-display">
                {user.name}'s Activity & History
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-[#4ADE80]/20 text-[#4ADE80] text-[10px] font-extrabold border border-[#4ADE80]/30">
                {user.kycStatus === 'VERIFIED' ? 'Verified Fan' : 'Active Player'}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Phone: {user.phone} • Member since {user.joinedDate}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => onOpenWallet('deposit')}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#FF8800] text-white text-xs font-black flex items-center gap-1.5 shadow-md shadow-[#FF6B00]/30 hover:brightness-110 active:scale-95 transition-all"
            id="btn-history-add-money"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Add Money</span>
          </button>

          <button
            onClick={() => onOpenWallet('withdraw')}
            className="px-3.5 py-2 rounded-xl bg-[#131A38] hover:bg-[#1A223E] text-slate-200 text-xs font-bold flex items-center gap-1.5 border border-[#1A223E] transition-colors"
            id="btn-history-withdraw"
          >
            <ArrowUpRight className="w-3.5 h-3.5 text-[#4ADE80]" />
            <span>Withdraw Cash</span>
          </button>
        </div>
      </div>

      {/* Stats Summary Bento Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-[#0D122B] border border-[#1A223E] shadow-sm">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Total Won Payouts</span>
          <span className="text-2xl font-black text-[#4ADE80] font-display mt-1 block">
            {formatINR(totalWonAmount)}
          </span>
          <span className="text-[11px] text-slate-400 mt-0.5 block">{wonCount} winning prediction slips</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0D122B] border border-[#1A223E] shadow-sm">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Contests Played</span>
          <span className="text-2xl font-black text-white font-display mt-1 block">
            {userSlips.length}
          </span>
          <span className="text-[11px] text-slate-400 mt-0.5 block">{formatINR(totalEntriesAmount)} entry fees placed</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0D122B] border border-[#1A223E] shadow-sm">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Total Money Added</span>
          <span className="text-2xl font-black text-[#FFAA00] font-display mt-1 block">
            {formatINR(totalDepositedAmount)}
          </span>
          <span className="text-[11px] text-slate-400 mt-0.5 block">{depositsList.length} instant UPI deposits</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0D122B] border border-[#1A223E] shadow-sm">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Total Withdrawn</span>
          <span className="text-2xl font-black text-sky-400 font-display mt-1 block">
            {formatINR(totalWithdrawnAmount)}
          </span>
          <span className="text-[11px] text-slate-400 mt-0.5 block">{withdrawalsList.length} payouts to bank UPI</span>
        </div>
      </div>

      {/* Main Section Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#1A223E]">
        {[
          { id: 'slips', label: `Predictions Played (${userSlips.length})`, icon: Trophy },
          { id: 'deposits', label: `Money Added (${depositsList.length})`, icon: ArrowDownLeft },
          { id: 'withdrawals', label: `Withdrawals (${withdrawalsList.length})`, icon: ArrowUpRight },
          { id: 'passbook', label: `Full Passbook (${userTransactions.length})`, icon: FileText },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setMainTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all flex items-center gap-2 ${
                mainTab === tab.id
                  ? 'bg-gradient-to-r from-[#FF6B00] to-[#FF8800] text-white shadow-md shadow-[#FF6B00]/30'
                  : 'bg-[#0D122B] text-slate-400 hover:text-white border border-[#1A223E]'
              }`}
              id={`history-tab-${tab.id}`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: PREDICTIONS PLAYED */}
      {mainTab === 'slips' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2 flex-wrap">
              {[
                { id: 'ALL', label: `All (${userSlips.length})` },
                { id: 'ACTIVE', label: `Active / Live (${userSlips.filter((s) => s.status === 'PENDING' || s.status === 'LIVE').length})` },
                { id: 'WON', label: `Won Cash (${userSlips.filter((s) => s.status === 'WON').length})` },
                { id: 'COMPLETED', label: `Settled (${userSlips.filter((s) => s.status === 'WON' || s.status === 'LOST').length})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSlipFilter(tab.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    slipFilter === tab.id
                      ? 'bg-[#1A223E] text-[#FF6B00] border border-[#FF6B00]/40'
                      : 'bg-[#080C1D] text-slate-400 hover:text-white border border-[#1A223E]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <button
              onClick={onGoToLobby}
              className="text-xs font-bold text-[#FF6B00] hover:text-[#FFAA00] flex items-center gap-1 ml-auto"
            >
              <span>+ Predict New Match</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {filteredSlips.length === 0 ? (
            <div className="p-10 text-center rounded-2xl bg-[#0D122B] border border-[#1A223E] space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#131A38] text-slate-400 mx-auto flex items-center justify-center">
                <Trophy className="w-6 h-6 text-[#FFAA00]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">No prediction slips in this filter</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                  Select a live or upcoming match from the lobby to predict the 6 match stats!
                </p>
              </div>
              <button
                onClick={onGoToLobby}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#FF8800] text-white font-extrabold text-xs inline-flex items-center gap-1.5 shadow-md shadow-[#FF6B00]/30 hover:brightness-110"
              >
                <Sparkles className="w-4 h-4" />
                <span>Go to Match Lobby</span>
              </button>
            </div>
          ) : (
            <div className="space-y-3.5">
              {filteredSlips.map((slip) => {
                const match = matchMap.get(slip.matchId);
                const isWon = slip.status === 'WON';
                const isPending = slip.status === 'PENDING' || slip.status === 'LIVE';

                return (
                  <div
                    key={slip.id}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                      isWon
                        ? 'bg-gradient-to-r from-[#FF6B00]/10 via-[#0D122B] to-[#0D122B] border-[#FF6B00]/40 shadow-lg'
                        : isPending
                        ? 'bg-[#0D122B] border-[#1A223E] hover:border-[#2A355E]'
                        : 'bg-[#080C1D] border-[#1A223E]/80'
                    }`}
                    id={`slip-card-${slip.id}`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      {/* Left: Match info & timing */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-[#131A38] text-[#FFAA00] text-[10px] font-extrabold uppercase border border-[#1A223E]">
                            {slip.series}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            Slip #{slip.id.slice(-6).toUpperCase()}
                          </span>
                          <span className="text-slate-600">•</span>
                          <span className="text-[11px] text-slate-400">
                            {new Date(slip.submittedAt).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>

                        <h3 className="text-base font-extrabold text-white font-display">
                          {slip.matchTitle}
                        </h3>

                        <div className="flex items-center gap-3 text-xs text-slate-400 pt-0.5">
                          <span className="font-bold text-slate-200">
                            Entry Fee: {formatINR(slip.entryFee)}
                          </span>
                          <span>•</span>
                          <span className="text-slate-400">6 Stats Answered</span>
                        </div>
                      </div>

                      {/* Right: Status & Payout result */}
                      <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 pt-3 sm:pt-0 border-[#1A223E]">
                        <div className="text-left sm:text-right">
                          {isPending ? (
                            <div>
                              <span className="px-2.5 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 text-xs font-bold inline-flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" /> Awaiting Results
                              </span>
                              <span className="text-[10px] text-slate-400 block mt-1">
                                Max Win: {formatINR(slip.entryFee * 100)} (100X)
                              </span>
                            </div>
                          ) : isWon ? (
                            <div>
                              <span className="px-2.5 py-1 rounded-full bg-[#FF6B00] text-white text-xs font-black inline-flex items-center gap-1 shadow-sm">
                                <Trophy className="w-3.5 h-3.5 text-amber-300" />
                                {slip.multiplierWon}X Cash Won ({slip.correctCount}/6 Correct)
                              </span>
                              <span className="text-base font-black text-[#4ADE80] block mt-0.5">
                                +{formatINR(slip.payoutAmount || 0)} Credited
                              </span>
                            </div>
                          ) : (
                            <div>
                              <span className="px-2.5 py-1 rounded-full bg-[#131A38] text-slate-400 text-xs font-bold border border-[#1A223E]">
                                {slip.correctCount ?? 0}/6 Correct
                              </span>
                              <span className="text-[10px] text-slate-500 block mt-0.5">
                                No Payout (Min 3 needed)
                              </span>
                            </div>
                          )}
                        </div>

                        {/* View Picks Details CTA */}
                        {match && (
                          <button
                            onClick={() => onViewSlipDetails(match, slip)}
                            className="px-3.5 py-2 rounded-xl bg-[#131A38] hover:bg-[#1A223E] text-white text-xs font-bold flex items-center gap-1 border border-[#1A223E] hover:border-[#FF6B00]/40 transition-all"
                            id={`btn-view-slip-${slip.id}`}
                          >
                            <span>Inspect Picks</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: MONEY ADDED (DEPOSITS) */}
      {mainTab === 'deposits' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-black text-white">Money Added (Deposits)</h2>
              <p className="text-xs text-slate-400">All instant UPI and QR deposit credits to your SuperOver wallet.</p>
            </div>

            <button
              onClick={() => onOpenWallet('deposit')}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#FF8800] text-white text-xs font-black flex items-center gap-1.5 shadow-md shadow-[#FF6B00]/30 hover:brightness-110"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Add Cash</span>
            </button>
          </div>

          {depositsList.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-[#0D122B] border border-[#1A223E] text-xs text-slate-400 space-y-2">
              <p>No deposit transactions found yet.</p>
              <button
                onClick={() => onOpenWallet('deposit')}
                className="px-4 py-2 rounded-xl bg-[#131A38] text-[#FF6B00] font-bold"
              >
                Make First Deposit →
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {depositsList.map((tx) => (
                <div
                  key={tx.id}
                  className="p-4 rounded-xl bg-[#0D122B] border border-[#1A223E] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#4ADE80]/20 text-[#4ADE80] flex items-center justify-center flex-shrink-0">
                      <ArrowDownLeft className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-white">{tx.description}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {new Date(tx.timestamp).toLocaleString()} • Ref: <span className="font-mono text-slate-300">{tx.referenceId}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3">
                    <span className="text-sm font-black text-[#4ADE80]">+{formatINR(tx.amount)}</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#4ADE80]/20 text-[#4ADE80] text-[10px] font-extrabold border border-[#4ADE80]/30">
                      SUCCESS
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: WITHDRAWALS */}
      {mainTab === 'withdrawals' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-black text-white">Withdrawals History</h2>
              <p className="text-xs text-slate-400">Cash payouts disbursed to your verified bank UPI ID.</p>
            </div>

            <button
              onClick={() => onOpenWallet('withdraw')}
              className="px-3.5 py-2 rounded-xl bg-[#131A38] hover:bg-[#1A223E] text-[#4ADE80] text-xs font-black flex items-center gap-1.5 border border-[#1A223E]"
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>Withdraw Winnings</span>
            </button>
          </div>

          {withdrawalsList.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-[#0D122B] border border-[#1A223E] text-xs text-slate-400 space-y-2">
              <p>No withdrawal requests placed yet.</p>
              <p className="text-[11px] text-slate-500">Winnings balance can be instantly withdrawn to your UPI ID once KYC is verified.</p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {withdrawalsList.map((tx) => (
                <div
                  key={tx.id}
                  className="p-4 rounded-xl bg-[#0D122B] border border-[#1A223E] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center flex-shrink-0">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-white">{tx.description}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {new Date(tx.timestamp).toLocaleString()} • Ref: <span className="font-mono text-slate-300">{tx.referenceId}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3">
                    <span className="text-sm font-black text-white">-{formatINR(tx.amount)}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${
                      tx.status === 'SUCCESS'
                        ? 'bg-[#4ADE80]/20 text-[#4ADE80] border-[#4ADE80]/30'
                        : tx.status === 'PENDING'
                        ? 'bg-[#FFAA00]/20 text-[#FFAA00] border-[#FFAA00]/30'
                        : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                    }`}>
                      {tx.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: FULL PASSBOOK */}
      {mainTab === 'passbook' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-black text-white">Comprehensive Wallet Passbook</h2>
              <p className="text-xs text-slate-400">Complete chronological audit of entries, winnings, deposits, and bonuses.</p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#1A223E] bg-[#0D122B]">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#1A223E] bg-[#080C1D] text-slate-400">
                  <th className="p-3 font-bold">Date & Time</th>
                  <th className="p-3 font-bold">Transaction Type</th>
                  <th className="p-3 font-bold">Details</th>
                  <th className="p-3 font-bold">Reference</th>
                  <th className="p-3 font-bold text-right">Amount</th>
                  <th className="p-3 font-bold text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A223E]">
                {userTransactions.map((tx) => {
                  const isCredit = tx.type === 'DEPOSIT' || tx.type === 'CONTEST_PAYOUT' || tx.type === 'BONUS_REWARD';
                  return (
                    <tr key={tx.id} className="hover:bg-[#131A38]/50">
                      <td className="p-3 text-slate-400 whitespace-nowrap">
                        {new Date(tx.timestamp).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="p-3 font-bold text-slate-200">
                        {tx.type === 'CONTEST_ENTRY' ? 'Contest Entry' :
                         tx.type === 'CONTEST_PAYOUT' ? '🏆 100X Payout' :
                         tx.type === 'DEPOSIT' ? 'Deposit Added' :
                         tx.type === 'WITHDRAWAL' ? 'Withdrawal' : '🎁 Bonus'}
                      </td>
                      <td className="p-3 text-slate-300 max-w-xs truncate">{tx.description}</td>
                      <td className="p-3 font-mono text-[11px] text-slate-400">{tx.referenceId}</td>
                      <td className={`p-3 text-right font-black ${isCredit ? 'text-[#4ADE80]' : 'text-slate-200'}`}>
                        {isCredit ? '+' : '-'}{formatINR(tx.amount)}
                      </td>
                      <td className="p-3 text-center">
                        <span className="px-2 py-0.5 rounded-full bg-[#131A38] text-slate-300 text-[10px] font-bold border border-[#1A223E]">
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
