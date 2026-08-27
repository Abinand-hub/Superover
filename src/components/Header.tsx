import React, { useState, useRef, useEffect } from 'react';
import { 
  Zap, 
  Wallet as WalletIcon, 
  ShieldCheck, 
  User as UserIcon, 
  Settings, 
  Award, 
  HelpCircle, 
  Trophy,
  PlusCircle,
  Clock,
  ArrowUpRight,
  LogOut
} from 'lucide-react';
import { UserAccount, Wallet } from '../types';
import { formatINR } from '../utils/payoutCalculator';

interface HeaderProps {
  user: UserAccount;
  wallet: Wallet;
  activeTab: 'lobby' | 'my-contests' | 'payouts-rules';
  setActiveTab: (tab: 'lobby' | 'my-contests' | 'payouts-rules') => void;
  openWalletModal: (mode?: 'deposit' | 'withdraw' | 'passbook') => void;
  openAuthModal: () => void;
  openKycModal: () => void;
  openRulesModal: () => void;
  openResponsibleModal: () => void;

  pendingSlipsCount: number;
  onSignOut: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  wallet,
  activeTab,
  setActiveTab,
  openWalletModal,
  openAuthModal,
  openKycModal,
  openRulesModal,
  openResponsibleModal,

  pendingSlipsCount,
  onSignOut
}) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <header className="sticky top-0 z-40 bg-[#050816]/95 backdrop-blur-md border-b border-[#1A223E] shadow-xl shadow-black/40">
      {/* Top micro-bar for compliance and quick info */}
      <div className="bg-[#03050D] px-4 py-1.5 border-b border-[#1A223E]/70 text-xs text-slate-400 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-bold text-[#4ADE80]">
            <ShieldCheck className="w-3.5 h-3.5" /> Where stats meet instincts
          </span>
          <span className="hidden sm:inline-block text-slate-700">•</span>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-slate-300 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] animate-pulse"></span>
            Crack 6 match stats and gain upto 500X rewards
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={openResponsibleModal}
            className="hover:text-[#FFAA00] transition-colors flex items-center gap-1 text-[11px]"
          >
            <span className="px-1.5 py-0.2 rounded bg-[#FF6B00]/15 text-[#FF6B00] font-bold border border-[#FF6B00]/30 text-[10px]">18+</span>
            Responsible Gaming
          </button>
          <span className="text-slate-700">|</span>
          <button 
            onClick={openRulesModal}
            className="hover:text-slate-200 transition-colors flex items-center gap-1 text-[11px]"
          >
            <HelpCircle className="w-3 h-3 text-[#FF6B00]" /> FAQs & Rules
          </button>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-1 sm:gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button 
            onClick={() => setActiveTab('lobby')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
            id="btn-brand-home"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#FF6B00] via-[#FF8800] to-[#FFAA00] p-0.5 shadow-lg shadow-[#FF6B00]/25 group-hover:scale-105 transition-transform flex items-center justify-center">
              <div className="w-full h-full bg-[#050816] rounded-[8px] sm:rounded-[10px] flex items-center justify-center text-[#FF6B00] relative overflow-hidden">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 fill-[#FF6B00] text-[#FF6B00]" />
                <div className="absolute -bottom-1 -right-1 text-[8px] sm:text-[9px] font-black text-[#FF6B00]/40">6</div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1 sm:gap-1.5">
                <span className="text-lg sm:text-xl font-extrabold tracking-tight text-white font-display">
                  Super<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] via-[#FF8800] to-[#FFAA00]">Over</span>
                </span>
                <span className="px-1.5 py-0.2 rounded bg-[#FF6B00]/20 text-[#FF6B00] text-[10px] font-black tracking-wider uppercase border border-[#FF6B00]/40">
                  500X
                </span>
              </div>
              <p className="text-[11px] text-slate-400 -mt-0.5 hidden sm:block">6-Stat Cricket Selection</p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 ml-4 pl-4 border-l border-[#1A223E]">
            <button
              onClick={() => setActiveTab('lobby')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'lobby'
                  ? 'bg-[#FF6B00]/15 text-[#FF6B00] border border-[#FF6B00]/40 shadow-sm shadow-[#FF6B00]/10'
                  : 'text-slate-300 hover:text-white hover:bg-[#0D122B]'
              }`}
              id="nav-lobby-tab"
            >
              Match Lobby
            </button>
            <button
              onClick={() => setActiveTab('my-contests')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 relative ${
                activeTab === 'my-contests'
                  ? 'bg-[#FF6B00]/15 text-[#FF6B00] border border-[#FF6B00]/40 shadow-sm shadow-[#FF6B00]/10'
                  : 'text-slate-300 hover:text-white hover:bg-[#0D122B]'
              }`}
              id="nav-my-contests-tab"
            >
              <Trophy className="w-3.5 h-3.5" />
              My Selections
              {pendingSlipsCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-[#4ADE80] text-slate-950 text-[10px] font-black">
                  {pendingSlipsCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('payouts-rules')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'payouts-rules'
                  ? 'bg-[#FF6B00]/15 text-[#FF6B00] border border-[#FF6B00]/40 shadow-sm shadow-[#FF6B00]/10'
                  : 'text-slate-300 hover:text-white hover:bg-[#0D122B]'
              }`}
              id="nav-payouts-tab"
            >
              <Award className="w-3.5 h-3.5" />
              Rewards Multipliers
            </button>
          </nav>
        </div>

        {/* Right Section: Wallet & Profile & Admin Switch */}
        <div className="flex items-center gap-1 sm:gap-2.5">
          {/* Quick Wallet Balance Pill */}
          {user.id !== 'u_guest' && (
            <div className="flex items-center bg-[#0D122B] rounded-xl p-0.5 sm:p-1 border border-[#1A223E] shadow-inner">
              <button
                onClick={() => openWalletModal('passbook')}
                className="flex items-center gap-1.5 sm:gap-2 px-1.5 sm:px-2.5 py-1 text-left hover:bg-[#131A38] rounded-lg transition-colors group"
                title="Click to view wallet details"
                id="btn-wallet-balance"
              >
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md sm:rounded-lg bg-[#4ADE80]/20 border border-[#4ADE80]/30 flex items-center justify-center text-[#4ADE80]">
                  <WalletIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </div>
                <div className="flex flex-col">
                  <span className="hidden sm:block text-[10px] text-slate-400 uppercase tracking-wider font-bold leading-none">Wallet</span>
                  <span className="text-[10px] sm:text-xs font-extrabold text-white group-hover:text-[#4ADE80] transition-colors">
                    {formatINR(wallet.totalBalance)}
                  </span>
                </div>
              </button>

              <button
                onClick={() => openWalletModal('deposit')}
                className="ml-0.5 sm:ml-1 px-2 sm:px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#FF6B00] to-[#FF8800] text-white text-xs font-extrabold hover:brightness-110 active:scale-95 transition-all shadow-md shadow-[#FF6B00]/30 flex items-center gap-1"
                id="btn-quick-add-money"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Add ₹</span>
              </button>
            </div>
          )}

          {/* User Account / KYC Profile Pill */}
          <div className="relative" ref={profileRef}>
            {user.id === 'u_guest' ? (
              <button
                onClick={openAuthModal}
                className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-[11px] sm:text-xs font-bold transition-all shadow-md shadow-indigo-500/20 hover:brightness-110"
              >
                <UserIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>Login <span className="hidden sm:inline">/ Register</span></span>
              </button>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center bg-[#0D122B] rounded-xl border border-[#1A223E] overflow-hidden shadow-inner p-1 sm:p-1.5 hover:bg-[#131A38] transition-all"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg object-cover ring-1 ring-[#FF6B00]/40"
                  />
                </button>

                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#0D122B] border border-[#1A223E] rounded-xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in duration-200">
                    <div className="px-4 py-2 border-b border-[#1A223E]">
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-bold text-white truncate">{user.name}</span>
                        {user.kycStatus === 'VERIFIED' ? (
                          <span className="text-[#4ADE80] text-xs" title="KYC Verified">✓</span>
                        ) : (
                          <span className="text-[#FFAA00] text-xs" title="KYC Pending">⚠️</span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{user.phone}</div>
                      {user.refId && (
                        <div className="text-[10px] text-[#FF6B00] font-bold mt-1">Ref ID: {user.refId}</div>
                      )}
                    </div>
                    <button
                      onClick={() => { setIsProfileOpen(false); openKycModal(); }}
                      className="w-full text-left px-4 py-2 text-xs font-bold text-slate-300 hover:bg-[#131A38] hover:text-white transition-colors flex items-center gap-2"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" /> Complete KYC
                    </button>
                    <button
                      onClick={() => { setIsProfileOpen(false); onSignOut(); }}
                      className="w-full text-left px-4 py-2 text-xs font-bold text-rose-500 hover:bg-rose-500/10 transition-colors flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Mobile Secondary Tab Navigation */}
      <div className="md:hidden flex items-center justify-around border-t border-[#1A223E] bg-[#03050D] px-2 py-1.5">
        <button
          onClick={() => setActiveTab('lobby')}
          className={`flex-1 py-1.5 text-center text-xs font-bold rounded-lg transition-colors ${
            activeTab === 'lobby' ? 'bg-[#FF6B00]/20 text-[#FF6B00]' : 'text-slate-400'
          }`}
        >
          Matches
        </button>
        <button
          onClick={() => setActiveTab('my-contests')}
          className={`flex-1 py-1.5 text-center text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1 ${
            activeTab === 'my-contests' ? 'bg-[#FF6B00]/20 text-[#FF6B00]' : 'text-slate-400'
          }`}
        >
          My Selections
          {pendingSlipsCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-[#4ADE80] text-slate-950 text-[9px] font-black">
              {pendingSlipsCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('payouts-rules')}
          className={`flex-1 py-1.5 text-center text-xs font-bold rounded-lg transition-colors ${
            activeTab === 'payouts-rules' ? 'bg-[#FF6B00]/20 text-[#FF6B00]' : 'text-slate-400'
          }`}
        >
          500X Rewards
        </button>
      </div>
    </header>
  );
};
