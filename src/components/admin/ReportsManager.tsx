import React, { useState } from 'react';
import { FileSpreadsheet, Download, Filter, Calendar } from 'lucide-react';
import { UserAccount, CricketMatch, UserPredictionSlip, Transaction } from '../../types';
import { exportToCsv } from '../../utils/exportCsv';
import { formatINR } from '../../utils/payoutCalculator';

interface ReportsManagerProps {
  allUsers: UserAccount[];
  allMatches: CricketMatch[];
  allSlips: UserPredictionSlip[];
  allTransactions: Transaction[];
}

export const ReportsManager: React.FC<ReportsManagerProps> = ({
  allUsers, allMatches, allSlips, allTransactions
}) => {
  const [activeReport, setActiveReport] = useState<'USERS' | 'MATCHES' | 'FINANCIAL' | 'BONUS'>('USERS');

  const handleExportUsers = () => {
    const data = allUsers.map(u => {
      const slipsCount = allSlips.filter(s => s.userId === u.id).length;
      const netPnL = (u.totalWithdrawals || 0) + (u.currentBalance || 0) - (u.totalDeposits || 0);
      return {
        'Client ID': u.id,
        'Name': u.name,
        'Mobile': u.phone,
        'Date Joined': new Date(u.joinedDate).toLocaleDateString(),
        'Total Deposits': u.totalDeposits || 0,
        'Total Withdrawals': u.totalWithdrawals || 0,
        'Contests Played': slipsCount,
        'Current Balance': u.currentBalance || 0,
        'Net P/L (Client Perspective)': netPnL
      };
    });
    exportToCsv('User_Statement_Report.csv', data);
  };

  const handleExportMatches = () => {
    const data = allMatches.filter(m => m.status === 'COMPLETED').map(m => {
      const matchSlips = allSlips.filter(s => s.matchId === m.id);
      const totalPool = matchSlips.reduce((sum, s) => sum + s.entryFee, 0);
      const wonSlips = matchSlips.filter(s => s.status === 'WON');
      const payout = wonSlips.reduce((sum, s) => sum + (s.payoutAmount || 0), 0);
      
      return {
        'Match ID': m.id,
        'Title': m.title,
        'Series': m.series,
        'Date': new Date(m.startTime).toLocaleDateString(),
        'Total Entries': matchSlips.length,
        'Pool Collected': totalPool,
        'Total Payout': payout,
        'Net Profit': totalPool - payout
      };
    });
    exportToCsv('Match_Result_Report.csv', data);
  };

  const handleExportFinancial = () => {
    // A log of all transactions
    const data = allTransactions.map(t => ({
      'Transaction ID': t.id,
      'User ID': t.userId,
      'Type': t.type,
      'Amount': t.amount,
      'Status': t.status,
      'Date': new Date(t.timestamp).toLocaleString(),
      'Reference': t.referenceId || '',
      'Description': t.description
    }));
    exportToCsv('Financial_Ledger_Report.csv', data);
  };

  const handleExportBonus = () => {
    // Only bonus/promo transactions
    const data = allTransactions.filter(t => t.type === 'PROMO_BONUS' || t.description.toLowerCase().includes('bonus')).map(t => ({
      'Transaction ID': t.id,
      'User ID': t.userId,
      'Bonus Amount': t.amount,
      'Date': new Date(t.timestamp).toLocaleString(),
      'Description': t.description
    }));
    exportToCsv('Bonus_Promo_Report.csv', data);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-indigo-400" />
            Audit CSV & Reports
          </h2>
          <p className="text-xs text-slate-400">Generate and export detailed CSV reports for analysis and accounting.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* User Report */}
        <div className="bg-[#0D122B] p-5 rounded-2xl border border-[#1A223E] flex flex-col justify-between h-full hover:border-indigo-500/50 transition-colors">
          <div>
            <h3 className="text-white font-bold mb-2">User Statement</h3>
            <p className="text-xs text-slate-400 mb-4">Detailed ledger of all registered clients, balances, total deposits, withdrawals, and lifetime Net P/L.</p>
          </div>
          <button 
            onClick={handleExportUsers}
            className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>

        {/* Matches Report */}
        <div className="bg-[#0D122B] p-5 rounded-2xl border border-[#1A223E] flex flex-col justify-between h-full hover:border-indigo-500/50 transition-colors">
          <div>
            <h3 className="text-white font-bold mb-2">Match Results</h3>
            <p className="text-xs text-slate-400 mb-4">Historical analysis of completed matches, pool sizes, total payouts, and platform profit margin per match.</p>
          </div>
          <button 
            onClick={handleExportMatches}
            className="w-full px-4 py-2 bg-[#131A38] hover:bg-[#1A223E] text-slate-300 font-bold text-sm rounded-xl flex items-center justify-center gap-2 border border-[#1A223E]"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>

        {/* Financial Ledger */}
        <div className="bg-[#0D122B] p-5 rounded-2xl border border-[#1A223E] flex flex-col justify-between h-full hover:border-indigo-500/50 transition-colors">
          <div>
            <h3 className="text-white font-bold mb-2">Financial Ledger</h3>
            <p className="text-xs text-slate-400 mb-4">Complete timeline of every transaction (deposits, entries, winnings, cashouts) across the entire platform.</p>
          </div>
          <button 
            onClick={handleExportFinancial}
            className="w-full px-4 py-2 bg-[#131A38] hover:bg-[#1A223E] text-slate-300 font-bold text-sm rounded-xl flex items-center justify-center gap-2 border border-[#1A223E]"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>

        {/* Bonus / Free Hit Report */}
        <div className="bg-[#0D122B] p-5 rounded-2xl border border-[#1A223E] flex flex-col justify-between h-full hover:border-indigo-500/50 transition-colors">
          <div>
            <h3 className="text-white font-bold mb-2">Bonus / Promo Distribution</h3>
            <p className="text-xs text-slate-400 mb-4">Track all promotional credits, admin bonuses, and free hits given to users to audit marketing spend.</p>
          </div>
          <button 
            onClick={handleExportBonus}
            className="w-full px-4 py-2 bg-[#131A38] hover:bg-[#1A223E] text-slate-300 font-bold text-sm rounded-xl flex items-center justify-center gap-2 border border-[#1A223E]"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>
    </div>
  );
};
