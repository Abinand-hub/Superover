import React, { useState } from 'react';
import { X, ShieldCheck, AlertCircle, CheckCircle2, HeartHandshake } from 'lucide-react';
import { UserAccount } from '../types';
import { formatINR } from '../utils/payoutCalculator';

interface ResponsibleGamingModalProps {
  user: UserAccount;
  onClose: () => void;
  onUpdateLimit: (limit: number) => void;
}

export const ResponsibleGamingModal: React.FC<ResponsibleGamingModalProps> = ({
  user,
  onClose,
  onUpdateLimit,
}) => {
  const [dailyLimit, setDailyLimit] = useState<number>(user.dailyDepositLimit || 5000);
  const [saved, setSaved] = useState<boolean>(false);

  const handleSaveLimit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateLimit(dailyLimit);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-auto p-5 sm:p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-white font-display">Responsible Gaming</h2>
              <p className="text-xs text-slate-400">Play Smart, Stay in Control</p>
            </div>
          </div>

          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {saved && (
          <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Daily deposit limit updated to {formatINR(dailyLimit)}</span>
          </div>
        )}

        <div className="space-y-4 text-xs">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-slate-300">
            <span className="font-bold text-amber-400 flex items-center gap-1.5">
              <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-400 text-[10px] font-black border border-amber-500/30">18+ ONLY</span>
              Strict Age & Location Policy
            </span>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              SuperOver is intended solely for players aged 18 and above residing in permitted Indian states. Players from Assam, Andhra Pradesh, Nagaland, Odisha, Sikkim, and Telangana are strictly excluded.
            </p>
          </div>

          <form onSubmit={handleSaveLimit} className="space-y-3">
            <div>
              <label className="text-slate-400 font-bold block mb-1.5">
                Set Your Daily Deposit Ceiling:
              </label>
              <div className="grid grid-cols-3 gap-2 mb-2">
                {[1000, 2500, 5000, 10000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setDailyLimit(amt)}
                    className={`py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                      dailyLimit === amt
                        ? 'bg-amber-400 text-slate-950 border-amber-400'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>
              <input
                type="number"
                min="100"
                max="50000"
                value={dailyLimit}
                onChange={(e) => setDailyLimit(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono font-bold focus:outline-none focus:border-amber-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:brightness-110 text-slate-950 font-black text-xs shadow-md shadow-amber-500/20"
            >
              Save Responsible Limit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
