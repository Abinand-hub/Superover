import React, { useState } from 'react';
import { X, Phone, Lock, User as UserIcon, Mail, ShieldCheck, ArrowRight, Loader2, Key } from 'lucide-react';
import { api } from '../services/api';

interface AuthModalProps {
  onClose?: () => void;
  onLoginSuccess: (user: any) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose, onLoginSuccess }) => {
  const [activeTab, setActiveTab] = useState<'LOGIN' | 'REGISTER' | 'FORGOT'>('LOGIN');
  
  // LOGIN STATE
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // REGISTER STATE
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regStep, setRegStep] = useState<'DETAILS' | 'OTP' | 'SETUP'>('DETAILS');

  // FORGOT PASSWORD STATE
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotNewPassword, setForgotNewPassword] = useState('');
  const [forgotStep, setForgotStep] = useState<'EMAIL' | 'OTP'>('EMAIL');

  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const resetMessages = () => {
    setError('');
    setMessage('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginUsername || !loginPassword) {
      setError('Username and password are required');
      return;
    }
    setError('');
    setIsLoading(true);
    try {
      const data = await api.login({ username: loginUsername, password: loginPassword });
      if (data.error) throw new Error(data.error);
      onLoginSuccess(data.user);
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOtp = async (email: string, action: 'register' | 'reset-password') => {
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

    resetMessages();
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, action }),
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error);
      
      setMessage(`OTP sent to ${email} (Please check your inbox)`);
      if (action === 'register') setRegStep('OTP');
      else setForgotStep('OTP');
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtpIntermediate = async (email: string, action: 'register' | 'reset-password') => {
    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }
    resetMessages();
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, action }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      
      setMessage('OTP Verified! Please proceed.');
      if (action === 'register') setRegStep('SETUP');
    } catch (err: any) {
      setError(err.message || 'Invalid OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinalRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regUsername || !regPassword) {
      setError('Username and password are required');
      return;
    }
    resetMessages();
    setIsLoading(true);
    try {
      const data = await api.register({
        name: regName,
        phone: regPhone,
        email: regEmail,
        otp,
        username: regUsername,
        password: regPassword
      });
      if (data.error) throw new Error(data.error);
      onLoginSuccess(data.user);
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || !forgotNewPassword) {
      setError('OTP and new password are required');
      return;
    }
    resetMessages();
    setIsLoading(true);
    try {
      const data = await api.resetPassword({
        email: forgotEmail,
        otp,
        newPassword: forgotNewPassword
      });
      if (data.error) throw new Error(data.error);
      setMessage(data.message);
      setTimeout(() => {
        setActiveTab('LOGIN');
        setForgotStep('EMAIL');
        resetMessages();
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Reset failed');
    } finally {
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
              <h2 className="text-xl font-black text-white font-display">SuperOver</h2>
              <p className="text-xs text-slate-400 font-medium">Secure Authentication</p>
            </div>
          </div>
          {onClose && (
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800/50 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Segmented Control */}
        <div className="flex p-2 bg-[#080C1D] border-b border-[#1A223E]">
          <button
            onClick={() => { setActiveTab('LOGIN'); resetMessages(); setOtp(''); }}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
              activeTab === 'LOGIN' ? 'bg-[#FF6B00]/20 text-[#FF6B00]' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => { setActiveTab('REGISTER'); resetMessages(); setOtp(''); setRegStep('DETAILS'); }}
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
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Username, Email, or Phone</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <UserIcon className="w-4 h-4 text-slate-500" />
                    </div>
                    <input
                      type="text"
                      value={loginUsername}
                      onChange={(e) => setLoginUsername(e.target.value)}
                      placeholder="super_fan_99 or email"
                      className="w-full bg-[#050816] border border-[#1A223E] rounded-xl py-3 pl-10 pr-4 text-white text-sm font-bold focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="w-4 h-4 text-slate-500" />
                    </div>
                    <input
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-[#050816] border border-[#1A223E] rounded-xl py-3 pl-10 pr-4 text-white text-sm font-bold focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => { setActiveTab('FORGOT'); resetMessages(); setOtp(''); setForgotStep('EMAIL'); }}
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-bold"
                  >
                    Forgot Password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Login securely'}
                  {!isLoading && <ArrowRight className="w-4 h-4" />}
                </button>
              </form>
            </div>
          )}

          {/* ===================== REGISTER FLOW ===================== */}
          {activeTab === 'REGISTER' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              {regStep === 'DETAILS' && (
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
              )}

              {regStep === 'OTP' && (
                <form onSubmit={(e) => { e.preventDefault(); handleVerifyOtpIntermediate(regEmail, 'register'); }} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Enter 6-digit OTP</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Key className="w-4 h-4 text-slate-500" />
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
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Verify OTP'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setRegStep('DETAILS'); resetMessages(); }}
                    className="w-full text-xs text-slate-400 hover:text-white"
                  >
                    Go Back
                  </button>
                </form>
              )}

              {regStep === 'SETUP' && (
                <form onSubmit={handleFinalRegister} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Choose Username</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <UserIcon className="w-4 h-4 text-slate-500" />
                      </div>
                      <input
                        type="text"
                        value={regUsername}
                        onChange={(e) => setRegUsername(e.target.value)}
                        placeholder="unique_username"
                        className="w-full bg-[#050816] border border-[#1A223E] rounded-xl py-3 pl-10 pr-4 text-white text-sm font-bold focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Create Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="w-4 h-4 text-slate-500" />
                      </div>
                      <input
                        type="password"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-[#050816] border border-[#1A223E] rounded-xl py-3 pl-10 pr-4 text-white text-sm font-bold focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 mt-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-black text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create Account'}
                    {!isLoading && <ArrowRight className="w-4 h-4" />}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* ===================== FORGOT PASSWORD FLOW ===================== */}
          {activeTab === 'FORGOT' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              {forgotStep === 'EMAIL' ? (
                <form onSubmit={(e) => { e.preventDefault(); handleSendOtp(forgotEmail, 'reset-password'); }} className="space-y-4">
                  <p className="text-sm text-slate-400 mb-4 text-center">
                    Enter your registered email address to receive a password reset OTP.
                  </p>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="w-4 h-4 text-slate-500" />
                      </div>
                      <input
                        type="email"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full bg-[#050816] border border-[#1A223E] rounded-xl py-3 pl-10 pr-4 text-white text-sm font-bold focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 mt-4 rounded-xl bg-gradient-to-r from-[#FF6B00] to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-black text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Send Reset OTP'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setActiveTab('LOGIN'); resetMessages(); setOtp(''); }}
                    className="w-full text-xs text-slate-400 hover:text-white"
                  >
                    Back to Login
                  </button>
                </form>
              ) : (
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Enter 6-digit OTP</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Key className="w-4 h-4 text-slate-500" />
                      </div>
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="000000"
                        maxLength={6}
                        className="w-full bg-[#050816] border border-[#1A223E] rounded-xl py-3 pl-10 pr-4 text-white text-xl tracking-widest text-center font-black focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">New Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="w-4 h-4 text-slate-500" />
                      </div>
                      <input
                        type="password"
                        value={forgotNewPassword}
                        onChange={(e) => setForgotNewPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-[#050816] border border-[#1A223E] rounded-xl py-3 pl-10 pr-4 text-white text-sm font-bold focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 mt-4 rounded-xl bg-gradient-to-r from-[#FF6B00] to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-black text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Confirm New Password'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setForgotStep('EMAIL'); resetMessages(); }}
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
