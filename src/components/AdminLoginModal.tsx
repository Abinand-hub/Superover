import React, { useState } from 'react';
import { ShieldAlert, KeyRound, X } from 'lucide-react';

interface AdminLoginModalProps {
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ onClose, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Mock network request delay
    setTimeout(() => {
      // Basic static admin credentials for demo
      if (username === 'admin' && password === 'superover2026') {
        onLoginSuccess();
      } else {
        setError('Invalid admin credentials. Please try again.');
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050816]/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#0D122B] w-full max-w-sm rounded-3xl border border-[#1A223E] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#1A223E]">
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-purple-500" />
            Admin Access
          </h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#131A38] text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-sm text-slate-400 mb-6">
            This area is restricted to authorized personnel only. Please enter your admin credentials to proceed.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#080C1D] border border-[#1A223E] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all placeholder-slate-600"
                placeholder="Enter admin username"
                required
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#080C1D] border border-[#1A223E] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all placeholder-slate-600"
                placeholder="Enter admin password"
                required
              />
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs text-center font-medium">
                {error}
              </div>
            )}

            <button 
              type="submit"
              disabled={isLoading || !username || !password}
              className="w-full py-3.5 mt-2 rounded-xl font-bold text-white text-base bg-purple-600 hover:bg-purple-500 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(147,51,234,0.3)]"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <KeyRound className="w-4 h-4" />
                  <span>Authenticate</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
