import React, { useState } from 'react';
import { ShieldCheck, KeyRound, X } from 'lucide-react';

interface AdminLoginModalProps {
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ onClose, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (res.ok) {
        onLoginSuccess();
      } else {
        setError(data.error || 'Invalid admin credentials. Please try again.');
      }
    } catch (err: any) {
      setError(err.message || 'Login request failed. Please check network.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050816]/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0D122B] w-full max-w-sm rounded-3xl border border-[#1A223E] overflow-hidden shadow-2xl shadow-black/80 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 bg-[#080C1D] border-b border-[#1A223E]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FF6B00] to-[#FF8800] text-slate-950 flex items-center justify-center shadow-md shadow-[#FF6B00]/30 font-black">
              <ShieldCheck className="w-4 h-4 text-slate-950" />
            </div>
            <div>
              <span className="text-[10px] font-black text-[#FF8800] uppercase tracking-wider block">SuperOver Suite</span>
              <h2 className="text-base font-black text-white">
                Admin Authentication
              </h2>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl bg-[#131A38] text-slate-400 hover:text-white hover:bg-[#1A223E] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-xs text-slate-400 mb-5 leading-relaxed">
            Restricted to platform organizers. Please enter your credentials to access the Management Suite.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-black text-slate-300 uppercase tracking-wider">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#080C1D] border border-[#1A223E] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]/50 transition-all placeholder-slate-600"
                placeholder="Enter admin username"
                required
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[11px] font-black text-slate-300 uppercase tracking-wider">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#080C1D] border border-[#1A223E] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]/50 transition-all placeholder-slate-600"
                placeholder="Enter admin password"
                required
              />
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs text-center font-bold">
                {error}
              </div>
            )}

            <button 
              type="submit"
              disabled={isLoading || !username || !password}
              className="w-full py-3 mt-2 rounded-xl font-black text-slate-950 text-xs sm:text-sm bg-gradient-to-r from-[#FF6B00] to-[#FF8800] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#FF6B00]/25"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
              ) : (
                <>
                  <KeyRound className="w-4 h-4 text-slate-950" />
                  <span>Authenticate & Enter</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
