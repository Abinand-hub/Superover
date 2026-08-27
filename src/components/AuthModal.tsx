import React, { useState } from 'react';
import { X, Phone, Lock, User as UserIcon, Mail, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';

interface AuthModalProps {
  onClose: () => void;
  onLoginSuccess: (user: any) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose, onLoginSuccess }) => {
  const [activeTab, setActiveTab] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  
  // LOGIN STATE
  const [loginEmail, setLoginEmail] = useState('');
  const [loginStep, setLoginStep] = useState<'EMAIL' | 'OTP'>('EMAIL');
  
  // REGISTER STATE
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regStep, setRegStep] = useState<'DETAILS' | 'OTP'>('DETAILS');

  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSendOtp = async (email: string, action: 'login' | 'register') => {
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    if (action === 'register') {
      if (!regName || !regPhone || regPhone.length < 10) {
        setError('Name and a valid 10-digit phone number are required for registration');
        return;
      }
    }

    setError('');
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, action }),
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error);
      
      setMessage(`OTP sent to ${email} (Please check your inbox/spam)`);
      if (action === 'login') setLoginStep('OTP');
      else setRegStep('OTP');
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (email: string, action: 'login' | 'register') => {
    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setError('');
    setIsLoading(true);
    try {
      const body: any = { email, otp, action };
      if (action === 'register') {
        body.name = regName;
        body.phone = regPhone;
      }

      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error);
      
      onLoginSuccess(data.user);
    } catch (err: any) {
      setError(err.message || 'Failed to verify OTP');
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#03050D]/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-md bg-[#0D122B] border border-[#1A223E] rounded-3xl shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-br from-indigo-950/40 to-slate-900 border-b border-[#1A223E] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6B00] to-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white">SuperOver</h2>
              <p className="text-xs text-slate-400">Secure Authentication</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#131A38] hover:bg-[#1A223E] text-slate-400 flex items-center justify-center transition-colors border border-[#1A223E]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Segmented Control */}
        <div className="flex p-2 bg-[#080C1D] border-b border-[#1A223E]">
          <button
            onClick={() => {
              setActiveTab('LOGIN');
              setError('');
              setMessage('');
              setOtp('');
              setLoginStep('EMAIL');
            }}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
              activeTab === 'LOGIN' ? 'bg-[#FF6B00]/20 text-[#FF6B00]' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => {
              setActiveTab('REGISTER');
              setError('');
              setMessage('');
              setOtp('');
              setRegStep('DETAILS');
            }}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
              activeTab === 'REGISTER' ? 'bg-[#FF6B00]/20 text-[#FF6B00]' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Register
          </button>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-bold text-center">
              {error}
            </div>
          )}
          {message && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold text-center">
              {message}
            </div>
          )}

          {/* ===================== LOGIN FLOW ===================== */}
          {activeTab === 'LOGIN' && (
            <div className="animate-in fade-in slide-in-from-left-4 duration-300">
              {loginStep === 'EMAIL' ? (
                <form onSubmit={(e) => { e.preventDefault(); handleSendOtp(loginEmail, 'login'); }} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Registered Email</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="w-4 h-4 text-slate-500" />
                      </div>
                      <input
                        type="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full bg-[#050816] border border-[#1A223E] rounded-xl py-3 pl-10 pr-4 text-white text-sm font-bold focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Get OTP'}
                    {!isLoading && <ArrowRight className="w-4 h-4" />}
                  </button>
                </form>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); handleVerifyOtp(loginEmail, 'login'); }} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Enter 6-digit OTP</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="w-4 h-4 text-slate-500" />
                      </div>
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="000000"
                        maxLength={6}
                        className="w-full bg-[#050816] border border-[#1A223E] rounded-xl py-3 pl-10 pr-4 text-white text-xl tracking-widest text-center font-black focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF6B00] to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-black text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Secure Login'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setLoginStep('EMAIL'); setOtp(''); setMessage(''); setError(''); }}
                    className="w-full text-xs text-slate-400 hover:text-white"
                  >
                    Change Email Address
                  </button>
                </form>
              )}
            </div>
          )}

          {/* ===================== REGISTER FLOW ===================== */}
          {activeTab === 'REGISTER' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              {regStep === 'DETAILS' ? (
                <form onSubmit={(e) => { e.preventDefault(); handleSendOtp(regEmail, 'register'); }} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <UserIcon className="w-4 h-4 text-slate-500" />
                      </div>
                      <input
                        type="text"
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        placeholder="Virat Kohli"
                        className="w-full bg-[#050816] border border-[#1A223E] rounded-xl py-3 pl-10 pr-4 text-white text-sm font-bold focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Phone Number</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Phone className="w-4 h-4 text-slate-500" />
                      </div>
                      <input
                        type="tel"
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        placeholder="9876543210"
                        maxLength={10}
                        className="w-full bg-[#050816] border border-[#1A223E] rounded-xl py-3 pl-10 pr-4 text-white text-sm font-bold focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="w-4 h-4 text-slate-500" />
                      </div>
                      <input
                        type="email"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="virat@example.com"
                        className="w-full bg-[#050816] border border-[#1A223E] rounded-xl py-3 pl-10 pr-4 text-white text-sm font-bold focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 mt-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-black text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Get OTP to Register'}
                    {!isLoading && <ArrowRight className="w-4 h-4" />}
                  </button>
                </form>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); handleVerifyOtp(regEmail, 'register'); }} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Enter 6-digit OTP</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="w-4 h-4 text-slate-500" />
                      </div>
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="000000"
                        maxLength={6}
                        className="w-full bg-[#050816] border border-[#1A223E] rounded-xl py-3 pl-10 pr-4 text-white text-xl tracking-widest text-center font-black focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-black text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Complete Registration'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setRegStep('DETAILS'); setOtp(''); setMessage(''); setError(''); }}
                    className="w-full text-xs text-slate-400 hover:text-white"
                  >
                    Go Back
                  </button>
                </form>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
