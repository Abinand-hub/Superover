import React from 'react';
import { Zap, Trophy, User as UserIcon } from 'lucide-react';
import { UserAccount } from '../types';

interface BottomNavProps {
  user: UserAccount;
  activeTab: 'lobby' | 'my-contests' | 'payouts-rules';
  setActiveTab: (tab: 'lobby' | 'my-contests' | 'payouts-rules') => void;
  pendingSlipsCount: number;
  openAuthModal: () => void;
  openPersonalDetailsModal: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  user,
  activeTab,
  setActiveTab,
  pendingSlipsCount,
  openAuthModal,
  openPersonalDetailsModal,
}) => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#080C1D]/95 backdrop-blur-xl border-t border-[#1A223E] px-6 py-2 shadow-2xl shadow-black flex items-center justify-around safe-bottom">
      {/* Tab 1: Match Lobby */}
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

      {/* Tab 2: My Selections */}
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

      {/* Tab 3: Avatar / Personal Details */}
      <button
        onClick={() => {
          if (user.id === 'u_guest') {
            openAuthModal();
          } else {
            openPersonalDetailsModal();
          }
        }}
        className="flex flex-col items-center justify-center gap-1 text-slate-400 hover:text-slate-200 transition-all active:scale-95"
        id="mobile-nav-profile"
      >
        {user.id === 'u_guest' ? (
          <div className="p-1 rounded-xl bg-[#131A38] text-slate-300">
            <UserIcon className="w-5 h-5" />
          </div>
        ) : (
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-7 h-7 rounded-xl object-cover ring-2 ring-[#FF6B00]/60 shadow-md"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#4ADE80] border-2 border-[#080C1D]" />
          </div>
        )}
        <span className="text-[10px] font-black tracking-tight">Profile</span>
      </button>
    </nav>
  );
};
