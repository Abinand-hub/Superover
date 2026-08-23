import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, AlertCircle, RefreshCw, FileText } from 'lucide-react';
import { UserAccount } from '../types';

interface KYCModalProps {
  user: UserAccount;
  onClose: () => void;
  onCompleteKyc: (panNumber: string) => void;
}

export const KYCModal: React.FC<KYCModalProps> = ({ user, onClose, onCompleteKyc }) => {
  const [panNumber, setPanNumber] = useState<string>(user.panNumber || 'ABCDE1234F');
  const [aadhaarLast4, setAadhaarLast4] = useState<string>('8829');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (panNumber.length !== 10) return;

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setSuccess(true);
      onCompleteKyc(panNumber.toUpperCase());
      setTimeout(() => {
        onClose();
      }, 1200);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-auto p-5 sm:p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-white font-display">KYC Verification</h2>
              <p className="text-xs text-slate-400">Required for 100% Tax-Compliant Instant Cashouts</p>
            </div>
          </div>

          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {success ? (
          <div className="p-6 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h3 className="text-base font-black text-white">KYC Verified Successfully!</h3>
            <p className="text-xs text-emerald-300">You can now withdraw winnings to any verified UPI ID without limits.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 space-y-1">
              <span className="font-bold text-amber-400 block">Why is KYC required?</span>
              <p className="text-[11px] text-slate-400">
                In compliance with Indian skill-based digital gaming laws and TDS guidelines, verified PAN enables instant 24x7 IMPS/UPI transfers.
              </p>
            </div>

            <div>
              <label className="text-slate-400 font-bold block mb-1">PAN Card Number (10 Characters):</label>
              <input
                type="text"
                maxLength={10}
                value={panNumber}
                onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                placeholder="e.g. ABCDE1234F"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono uppercase tracking-widest font-black focus:outline-none focus:border-emerald-400"
                required
              />
            </div>

            <div>
              <label className="text-slate-400 font-bold block mb-1">Aadhaar (Last 4 Digits):</label>
              <input
                type="text"
                maxLength={4}
                value={aadhaarLast4}
                onChange={(e) => setAadhaarLast4(e.target.value.replace(/\D/g, ''))}
                placeholder="e.g. 8829"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono font-black focus:outline-none focus:border-emerald-400"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isVerifying || panNumber.length !== 10}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:brightness-110 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all disabled:opacity-50"
            >
              {isVerifying ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying with NSDL Database...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verify PAN & Enable Instant Cashout</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
