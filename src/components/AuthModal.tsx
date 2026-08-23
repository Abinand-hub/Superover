import React, { useState } from 'react';
import { 
  X, 
  Phone, 
  ShieldCheck, 
  CheckCircle2, 
  User, 
  Sparkles, 
  RefreshCw, 
  KeyRound, 
  Mail, 
  MapPin, 
  AlertCircle, 
  ArrowRight,
  Gift,
  UserPlus,
  LogIn
} from 'lucide-react';
import { UserAccount } from '../types';

interface AuthModalProps {
  currentUser: UserAccount;
  onClose: () => void;
  onUpdateProfile: (updated: UserAccount) => void;
  onSwitchUser: (newUser: UserAccount) => void;
  onRegisterUser: (newUser: UserAccount, welcomeBonus: number) => void;
  allUsers: UserAccount[];
}

const INDIAN_STATES = [
  'Maharashtra', 'Karnataka', 'Delhi (NCR)', 'Tamil Nadu', 'Uttar Pradesh', 
  'Gujarat', 'Rajasthan', 'West Bengal', 'Punjab', 'Haryana', 
  'Madhya Pradesh', 'Kerala', 'Bihar', 'Jharkhand', 'Himachal Pradesh',
  'Uttarakhand', 'Goa', 'Chhattisgarh',
  // Restricted states flagged:
  'Andhra Pradesh (Restricted)', 'Telangana (Restricted)', 'Assam (Restricted)', 
  'Odisha (Restricted)', 'Nagaland (Restricted)', 'Sikkim (Restricted)'
];

export const AuthModal: React.FC<AuthModalProps> = ({
  currentUser,
  onClose,
  onUpdateProfile,
  onSwitchUser,
  onRegisterUser,
  allUsers,
}) => {
  const [authMode, setAuthMode] = useState<'register' | 'login' | 'profile'>('register');

  // Form Fields
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [upiId, setUpiId] = useState<string>('');
  const [stateName, setStateName] = useState<string>('Maharashtra');
  const [is18Plus, setIs18Plus] = useState<boolean>(true);
  const [referralCode, setReferralCode] = useState<string>('SUPEROVER50');

  // OTP State
  const [otpStep, setOtpStep] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>('582910');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');

  // Login specific state
  const [loginPhone, setLoginPhone] = useState<string>('');

  const isRestrictedState = stateName.includes('(Restricted)');

  const handleSendOtp = () => {
    setErrorMsg('');
    const targetPhone = authMode === 'register' ? phone : loginPhone;
    
    if (targetPhone.replace(/\D/g, '').length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number');
      return;
    }

    if (authMode === 'register') {
      if (!name.trim()) {
        setErrorMsg('Please enter your full name as per Government ID');
        return;
      }
      if (isRestrictedState) {
        setErrorMsg('Real-money skill gaming is restricted in this state due to local state regulations.');
        return;
      }
      if (!is18Plus) {
        setErrorMsg('You must be 18 years or older to participate.');
        return;
      }
    }

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setOtpStep(true);
      setOtp('582910'); // Simulated instant OTP code
    }, 600);
  };

  const handleVerifyAndSubmit = () => {
    setErrorMsg('');
    if (otp.length < 6) {
      setErrorMsg('Please enter the 6-digit OTP sent to your phone');
      return;
    }

    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);

      if (authMode === 'register') {
        const cleanPhone = phone.replace(/\D/g, '').slice(-10);
        const newUser: UserAccount = {
          id: `usr_${Date.now()}`,
          phone: `+91 ${cleanPhone.slice(0, 5)} ${cleanPhone.slice(5)}`,
          name: name.trim(),
          email: email.trim() || undefined,
          avatar: `https://images.unsplash.com/photo-${1534528741775 + Math.floor(Math.random() * 1000)}?w=150&auto=format&fit=crop&q=80`,
          kycStatus: 'SUBMITTED',
          upiId: upiId.trim() || `${cleanPhone}@upi`,
          isBlocked: false,
          joinedDate: new Date().toISOString().slice(0, 10),
          dailyDepositLimit: 10000,
          totalContestsJoined: 0,
          totalWon: 0,
        };

        onRegisterUser(newUser, 50); // ₹50 Welcome Bonus
        setSuccessMsg(`Welcome ${newUser.name}! ₹50 Welcome Bonus credited to your wallet.`);
      } else if (authMode === 'login') {
        const cleanPhone = loginPhone.replace(/\D/g, '').slice(-10);
        const existing = allUsers.find(
          (u) => u.phone.replace(/\D/g, '').endsWith(cleanPhone)
        );

        if (existing) {
          onSwitchUser(existing);
          setSuccessMsg(`Welcome back, ${existing.name}! Logged in successfully.`);
        } else {
          // Auto create or fallback
          const newUser: UserAccount = {
            id: `usr_${Date.now()}`,
            phone: `+91 ${cleanPhone.slice(0, 5)} ${cleanPhone.slice(5)}`,
            name: 'Cricket Enthusiast',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
            kycStatus: 'UNVERIFIED',
            upiId: `${cleanPhone}@upi`,
            isBlocked: false,
            joinedDate: new Date().toISOString().slice(0, 10),
            dailyDepositLimit: 10000,
            totalContestsJoined: 0,
            totalWon: 0,
          };
          onRegisterUser(newUser, 50);
          setSuccessMsg(`Logged in successfully as +91 ${cleanPhone}!`);
        }
      } else {
        // Profile update
        onUpdateProfile({
          ...currentUser,
          name: name.trim() || currentUser.name,
          email: email.trim() || currentUser.email,
          upiId: upiId.trim() || currentUser.upiId,
        });
        setSuccessMsg('Profile updated successfully!');
      }

      setTimeout(() => {
        onClose();
      }, 1200);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-[#050816]/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#0D122B] border border-[#1A223E] rounded-2xl shadow-2xl shadow-black/80 overflow-hidden my-auto p-5 sm:p-6 space-y-5">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6B00] to-[#FFAA00] text-white flex items-center justify-center shadow-lg shadow-[#FF6B00]/30 font-display">
              {authMode === 'register' ? <UserPlus className="w-5 h-5" /> : <LogIn className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="text-lg font-black text-white font-display">
                {authMode === 'register' ? 'Register New Account' : authMode === 'login' ? 'User Sign In' : 'Account Profile'}
              </h2>
              <p className="text-xs text-slate-400">
                {authMode === 'register' ? 'Join & get instant ₹50 bonus' : 'Enter OTP to access your predictions & wallet'}
              </p>
            </div>
          </div>

          <button 
            onClick={onClose} 
            className="w-8 h-8 rounded-lg bg-[#131A38] text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            id="btn-close-auth-modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center p-1 rounded-xl bg-[#080C1D] border border-[#1A223E]">
          <button
            onClick={() => {
              setAuthMode('register');
              setOtpStep(false);
              setErrorMsg('');
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              authMode === 'register'
                ? 'bg-gradient-to-r from-[#FF6B00] to-[#FF8800] text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
            id="tab-auth-register"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>1. Register New</span>
          </button>

          <button
            onClick={() => {
              setAuthMode('login');
              setOtpStep(false);
              setErrorMsg('');
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              authMode === 'login'
                ? 'bg-gradient-to-r from-[#FF6B00] to-[#FF8800] text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
            id="tab-auth-login"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>2. Login</span>
          </button>

          <button
            onClick={() => {
              setAuthMode('profile');
              setName(currentUser.name);
              setEmail(currentUser.email || '');
              setUpiId(currentUser.upiId || '');
              setOtpStep(false);
              setErrorMsg('');
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              authMode === 'profile'
                ? 'bg-[#1A223E] text-[#FF6B00] shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
            id="tab-auth-profile"
          >
            <User className="w-3.5 h-3.5" />
            <span>Switch / Edit</span>
          </button>
        </div>

        {/* Welcome Bonus Callout on Register */}
        {authMode === 'register' && (
          <div className="p-3 rounded-xl bg-gradient-to-r from-[#FF6B00]/15 via-[#FFAA00]/10 to-transparent border border-[#FF6B00]/30 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#FF6B00]/20 text-[#FF6B00] flex items-center justify-center flex-shrink-0">
              <Gift className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-black text-white block">₹50 Free Signup Welcome Bonus</span>
              <span className="text-[11px] text-slate-300 block">Instant bonus balance ready to enter 100X cricket prediction contests!</span>
            </div>
          </div>
        )}

        {/* Notifications */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3 rounded-xl bg-[#4ADE80]/20 border border-[#4ADE80]/40 text-[#4ADE80] text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#4ADE80] flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* REGISTER FORM */}
        {authMode === 'register' && (
          <div className="space-y-3.5 text-xs">
            <div>
              <label className="text-slate-300 font-bold block mb-1">Full Legal Name (as on PAN/Aadhaar): *</label>
              <input
                type="text"
                placeholder="e.g. Rahul Dravid"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white font-medium focus:outline-none focus:border-[#FF6B00]"
                id="input-reg-name"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-300 font-bold block mb-1">Mobile Phone Number: *</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 font-bold text-slate-400">+91</span>
                  <input
                    type="tel"
                    maxLength={10}
                    placeholder="9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    className="w-full pl-12 pr-3.5 py-2.5 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white font-mono focus:outline-none focus:border-[#FF6B00]"
                    id="input-reg-phone"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Email Address (optional):</label>
                <input
                  type="email"
                  placeholder="fan@cricket.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white focus:outline-none focus:border-[#FF6B00]"
                  id="input-reg-email"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-300 font-bold block mb-1">UPI ID (for fast withdrawals):</label>
                <input
                  type="text"
                  placeholder="e.g. name@okhdfcbank"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white font-mono focus:outline-none focus:border-[#FF6B00]"
                  id="input-reg-upi"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">State of Residence: *</label>
                <select
                  value={stateName}
                  onChange={(e) => setStateName(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-[#080C1D] border text-white font-medium focus:outline-none ${
                    isRestrictedState ? 'border-rose-500 text-rose-300' : 'border-[#1A223E] focus:border-[#FF6B00]'
                  }`}
                  id="select-reg-state"
                >
                  {INDIAN_STATES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {isRestrictedState && (
              <p className="text-[11px] text-rose-400 bg-rose-500/10 p-2.5 rounded-xl border border-rose-500/30">
                ⚠️ Residents of Andhra Pradesh, Assam, Nagaland, Odisha, Sikkim, and Telangana cannot play real-money contests.
              </p>
            )}

            <div className="pt-1 flex items-center gap-2">
              <input
                type="checkbox"
                id="check-18plus"
                checked={is18Plus}
                onChange={(e) => setIs18Plus(e.target.checked)}
                className="w-4 h-4 rounded text-[#FF6B00] bg-[#080C1D] border-[#1A223E] focus:ring-0 cursor-pointer"
              />
              <label htmlFor="check-18plus" className="text-slate-300 text-xs font-semibold cursor-pointer">
                I declare that I am 18+ years of age and agree to SuperOver Terms & Fair Play Rules.
              </label>
            </div>
          </div>
        )}

        {/* LOGIN FORM */}
        {authMode === 'login' && (
          <div className="space-y-3.5 text-xs">
            <div>
              <label className="text-slate-300 font-bold block mb-1">Registered Mobile Number:</label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 font-bold text-slate-400">+91</span>
                <input
                  type="tel"
                  maxLength={10}
                  placeholder="9876543210"
                  value={loginPhone}
                  onChange={(e) => setLoginPhone(e.target.value.replace(/\D/g, ''))}
                  className="w-full pl-12 pr-3.5 py-2.5 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white font-mono text-sm focus:outline-none focus:border-[#FF6B00]"
                  id="input-login-phone"
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#080C1D] border border-[#1A223E] space-y-2">
              <span className="text-[11px] text-slate-400 font-bold block uppercase">Quick One-Click Test Accounts:</span>
              <div className="grid grid-cols-2 gap-2">
                {allUsers.slice(0, 4).map((u) => (
                  <button
                    key={u.id}
                    onClick={() => {
                      setLoginPhone(u.phone.replace(/\D/g, '').slice(-10));
                    }}
                    className="p-2 rounded-lg bg-[#131A38] hover:bg-[#1A223E] border border-[#1A223E] text-left transition-colors flex items-center gap-2"
                  >
                    <img src={u.avatar} alt={u.name} className="w-6 h-6 rounded-md object-cover" />
                    <div className="truncate">
                      <div className="font-bold text-white text-[11px] truncate">{u.name}</div>
                      <div className="text-[10px] text-slate-400">{u.phone.slice(-10)}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PROFILE / SWITCHER FORM */}
        {authMode === 'profile' && (
          <div className="space-y-3.5 text-xs">
            <div>
              <label className="text-slate-300 font-bold block mb-1">Your Full Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white focus:outline-none focus:border-[#FF6B00]"
              />
            </div>

            <div>
              <label className="text-slate-300 font-bold block mb-1">UPI ID:</label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white font-mono focus:outline-none focus:border-[#FF6B00]"
              />
            </div>

            <div className="pt-2 border-t border-[#1A223E] space-y-2">
              <span className="text-[11px] text-slate-400 font-bold block uppercase">Switch Persona:</span>
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {allUsers.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => {
                      onSwitchUser(u);
                      setName(u.name);
                      setEmail(u.email || '');
                      setUpiId(u.upiId || '');
                      setSuccessMsg(`Switched to ${u.name}`);
                      setTimeout(() => setSuccessMsg(''), 2000);
                    }}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-all flex-shrink-0 ${
                      currentUser.id === u.id
                        ? 'bg-[#FF6B00]/20 border-[#FF6B00] text-white shadow-md'
                        : 'bg-[#080C1D] border-[#1A223E] text-slate-400 hover:bg-[#131A38]'
                    }`}
                  >
                    <div className="font-bold text-white text-[11px] truncate max-w-[120px]">{u.name}</div>
                    <div className="text-[10px] text-slate-400">KYC: {u.kycStatus}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* OTP Verification Step */}
        {otpStep ? (
          <div className="p-4 rounded-xl bg-[#FF6B00]/10 border border-[#FF6B00]/30 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-[#FFAA00] font-black text-xs block">Enter 6-Digit OTP Code:</label>
              <span className="text-[10px] text-[#4ADE80] font-bold">Auto-generated code: 582910</span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#080C1D] border border-[#FF6B00]/50 text-[#FFAA00] font-mono font-black text-center text-lg tracking-widest focus:outline-none"
                id="input-auth-otp"
              />
              <button
                onClick={handleVerifyAndSubmit}
                disabled={isVerifying}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#FF8800] text-white font-black text-xs whitespace-nowrap shadow-md hover:brightness-110 active:scale-95 transition-all"
                id="btn-verify-otp-submit"
              >
                {isVerifying ? 'Verifying...' : 'Confirm & Login'}
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={handleSendOtp}
            disabled={isVerifying}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF6B00] via-[#FF8800] to-[#FFAA00] hover:brightness-110 active:scale-[0.99] text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#FF6B00]/30 transition-all"
            id="btn-send-auth-otp"
          >
            {isVerifying ? <RefreshCw className="w-4 h-4 animate-spin" /> : <KeyRound className="w-4 h-4" />}
            <span>
              {authMode === 'register' ? 'Register Account & Get ₹50 Bonus' : authMode === 'login' ? 'Send Login OTP' : 'Save Changes'}
            </span>
          </button>
        )}
      </div>
    </div>
  );
};
