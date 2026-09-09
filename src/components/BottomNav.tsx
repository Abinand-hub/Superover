import React from 'react';
import { Zap, Trophy, User as UserIcon, HelpCircle } from 'lucide-react';
import { UserAccount } from '../types';

interface BottomNavProps {
  user: UserAccount;
  activeTab: 'lobby' | 'intro' | 'my-contests' | 'profile' | 'payouts-rules';
  setActiveTab: (tab: 'lobby' | 'intro' | 'my-contests' | 'profile' | 'payouts-rules') => void;
  pendingSlipsCount: number;
  openAuthModal: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  user,
  activeTab,
  setActiveTab,
  pendingSlipsCount,
  openAuthModal,
}) => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#080C1D]/95 backdrop-blur-xl border-t border-[#1A223E] px-4 py-2 shadow-2xl shadow-black flex items-center justify-around">
      {/* Tab 1: How to Play & Rules */}
      <button
        onClick={() => setActiveTab('intro')}
        className={`flex flex-col items-center justify-center gap-1 transition-all ${
          activeTab === 'intro' ? 'text-[#FF6B00] scale-105' : 'text-slate-400 hover:text-slate-200'
        }`}
        id="mobile-nav-intro"
      >
        <div className={`p-1 rounded-xl transition-all ${activeTab === 'intro' ? 'bg-[#FF6B00]/20 ring-1 ring-[#FF6B00]/40' : ''}`}>
          <HelpCircle className="w-5 h-5" />
        </div>
        <span className="text-[10px] font-black tracking-tight">How to Play</span>
      </button>

      {/* Tab 2: Match Lobby */}
      <button
        onClick={() => setActiveTab('lobby')}
        className={`flex flex-col items-center justify-center gap-1 transition-all ${
          activeTab === 'lobby' ? 'text-[#FF6B00] scale-105' : 'text-slate-400 hover:text-slate-200'
        }`}
        id="mobile-nav-lobby"
      >
        <div className={`p-1 rounded-xl transition-all ${activeTab === 'lobby' ? 'bg-[#FF6B00]/20 ring-1 ring-[#FF6B00]/40' : ''}`}>
          <Zap className="w-5 h-5" />
        </div>
        <span className="text-[10px] font-black tracking-tight">Lobby</span>
      </button>

      {/* Tab 3: My Selections */}
      <button
        onClick={() => setActiveTab('my-contests')}
        className={`flex flex-col items-center justify-center gap-1 relative transition-all ${
          activeTab === 'my-contests' ? 'text-[#FF6B00] scale-105' : 'text-slate-400 hover:text-slate-200'
        }`}
        id="mobile-nav-selections"
      >
        <div className={`p-1 rounded-xl relative transition-all ${activeTab === 'my-contests' ? 'bg-[#FF6B00]/20 ring-1 ring-[#FF6B00]/40' : ''}`}>
          <Trophy className="w-5 h-5" />
          {pendingSlipsCount > 0 && (
            <span className="absolute -top-1 -right-1 px-1.5 py-0.2 rounded-full bg-[#4ADE80] text-slate-950 text-[9px] font-black shadow-sm">
              {pendingSlipsCount}
            </span>
          )}
        </div>
        <span className="text-[10px] font-black tracking-tight">Selections</span>
      </button>

      {/* Tab 4: Avatar / Profile Tab */}
      <button
        onClick={() => {
          if (user.id === 'u_guest') {
            openAuthModal();
          } else {
            setActiveTab('profile');
          }
        }}
        className={`flex flex-col items-center justify-center gap-1 transition-all ${
          activeTab === 'profile' ? 'text-[#FF6B00] scale-105' : 'text-slate-400 hover:text-slate-200'
        }`}
        id="mobile-nav-profile"
      >
        {user.id === 'u_guest' ? (
          <div className="p-1 rounded-xl bg-[#131A38] text-slate-300">
            <UserIcon className="w-5 h-5" />
          </div>
        ) : (
          <div className={`relative p-0.5 rounded-xl transition-all ${activeTab === 'profile' ? 'bg-[#FF6B00]/20 ring-2 ring-[#FF6B00]' : ''}`}>
            <img
              src={user.avatar}
              alt={user.name}
              className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg object-cover"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#4ADE80] border-2 border-[#080C1D]" />
          </div>
        )}
        <span className="text-[10px] font-black tracking-tight">Profile</span>
      </button>
    </nav>
  );
};
