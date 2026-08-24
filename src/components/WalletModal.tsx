import React, { useState } from 'react';
import { 
  X, 
  Wallet as WalletIcon, 
  ArrowUpRight, 
  ArrowDownLeft, 
  QrCode, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Clock, 
  CreditCard,
  Building2,
  RefreshCw,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { UserAccount, Wallet, WalletTransaction } from '../types';
import { formatINR } from '../utils/payoutCalculator';
import { api } from '../services/api';

interface WalletModalProps {
  wallet: Wallet;
  user: UserAccount;
  transactions: WalletTransaction[];
  initialTab?: 'deposit' | 'withdraw' | 'passbook';
  onClose: () => void;
  onDeposit: (payload: any, method: string) => void;
  onWithdraw: (amount: number, upiId: string) => void;
  onOpenKyc: () => void;
}

export const WalletModal: React.FC<WalletModalProps> = ({
  wallet,
  user,
  transactions,
  initialTab = 'deposit',
  onClose,
  onDeposit,
  onWithdraw,
  onOpenKyc,
}) => {
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw' | 'passbook'>(initialTab);

  // Deposit state
  const [depositAmount, setDepositAmount] = useState<number>(100);
  const [selectedUpiApp, setSelectedUpiApp] = useState<string>('gpay');
  const [customUpiId, setCustomUpiId] = useState<string>(user.upiId || 'user@okaxis');
  const [isProcessingDeposit, setIsProcessingDeposit] = useState<boolean>(false);
  const [depositSuccess, setDepositSuccess] = useState<boolean>(false);

  // Withdraw state
  const [withdrawAmount, setWithdrawAmount] = useState<number>(Math.min(wallet.winningsBalance, 200));
  const [withdrawUpiId, setWithdrawUpiId] = useState<string>(user.upiId || 'rohitfan@okaxis');
  const [isProcessingWithdraw, setIsProcessingWithdraw] = useState<boolean>(false);
  const [withdrawSuccess, setWithdrawSuccess] = useState<boolean>(false);
  const [withdrawError, setWithdrawError] = useState<string>('');

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleDepositSubmit = async () => {
    if (depositAmount < 5) return;
    setIsProcessingDeposit(true);

    const res = await loadRazorpayScript();
    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      setIsProcessingDeposit(false);
      return;
    }

    try {
      // 1. Create Order on Backend
      const order = await api.createOrder({ amount: depositAmount });

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_TTavRCG2g2HcRS', 
        amount: order.amount,
        currency: order.currency,
        order_id: order.orderId,
        name: 'SuperOver',
        description: 'Add Cash to Wallet',
        handler: function (response: any) {
          // Payment successful
          setIsProcessingDeposit(false);
          setDepositSuccess(true);
          
          // Send verification details to App.tsx
          onDeposit({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            amount: depositAmount
          }, `Razorpay ID: ${response.razorpay_payment_id}`);
          
          setTimeout(() => {
            setDepositSuccess(false);
          }, 2500);
        },
        prefill: {
          name: user.name,
          contact: user.phone,
        },
        theme: {
          color: '#FF6B00',
        }
      };

      const rzp1 = new (window as any).Razorpay(options);
      rzp1.on('payment.failed', function (response: any) {
        alert(response.error.description);
        setIsProcessingDeposit(false);
      });
      rzp1.open();
    } catch (err) {
      console.error('Failed to create order', err);
      alert('Could not initialize payment. Please try again.');
      setIsProcessingDeposit(false);
    }
  };

  const handleWithdrawSubmit = () => {
    setWithdrawError('');
    if (withdrawAmount < 5) {
      setWithdrawError('Minimum withdrawal amount is ₹5');
      return;
    }
    if (withdrawAmount > wallet.winningsBalance) {
      setWithdrawError(`Maximum withdrawable winnings balance is ${formatINR(wallet.winningsBalance)}`);
      return;
    }
    if (!withdrawUpiId.includes('@')) {
      setWithdrawError('Please provide a valid UPI ID (e.g., name@okhdfcbank)');
      return;
    }

    setIsProcessingWithdraw(true);

    setTimeout(() => {
      setIsProcessingWithdraw(false);
      setWithdrawSuccess(true);
      onWithdraw(withdrawAmount, withdrawUpiId);

      setTimeout(() => {
        setWithdrawSuccess(false);
      }, 2500);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <WalletIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white font-display">SuperOver Wallet</h2>
              <p className="text-xs text-slate-400">Instant UPI Deposits & Fast Payout Withdrawals</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            id="btn-close-wallet-modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Balance Overview Card */}
        <div className="p-4 sm:p-5 bg-slate-950/70 border-b border-slate-800 flex-shrink-0">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Available Balance</span>
            <span className="text-2xl font-black text-white font-display">{formatINR(wallet.totalBalance)}</span>
          </div>

          {/* Breakdown Pills */}
          <div className="grid grid-cols-3 gap-2">
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 font-bold block uppercase">Deposit Cash</span>
              <span className="text-xs font-black text-slate-200 mt-0.5 block">{formatINR(wallet.depositBalance)}</span>
              <span className="text-[9px] text-slate-400 block mt-0.5">Usable for Contests</span>
            </div>

            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center">
              <span className="text-[10px] text-emerald-400 font-bold block uppercase">Winnings</span>
              <span className="text-xs font-black text-emerald-400 mt-0.5 block">{formatINR(wallet.winningsBalance)}</span>
              <span className="text-[9px] text-emerald-400/80 block mt-0.5">100% Withdrawable</span>
            </div>

            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-center">
              <span className="text-[10px] text-purple-300 font-bold block uppercase">Bonus Cash</span>
              <span className="text-xs font-black text-purple-300 mt-0.5 block">{formatINR(wallet.bonusBalance)}</span>
              <span className="text-[9px] text-purple-400/80 block mt-0.5">Applied on entries</span>
            </div>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 px-4 pt-2 gap-2 flex-shrink-0">
          <button
            onClick={() => setActiveTab('deposit')}
            className={`pb-2.5 px-4 text-xs font-extrabold transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'deposit'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
            id="tab-wallet-deposit"
          >
            <ArrowDownLeft className="w-3.5 h-3.5" />
            Add Cash (UPI)
          </button>

          <button
            onClick={() => setActiveTab('withdraw')}
            className={`pb-2.5 px-4 text-xs font-extrabold transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'withdraw'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
            id="tab-wallet-withdraw"
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
            Withdraw Winnings
          </button>

          <button
            onClick={() => setActiveTab('passbook')}
            className={`pb-2.5 px-4 text-xs font-extrabold transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'passbook'
                ? 'border-purple-500 text-purple-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
            id="tab-wallet-passbook"
          >
            <Clock className="w-3.5 h-3.5" />
            Passbook ({transactions.length})
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5">
          {/* 1. DEPOSIT TAB */}
          {activeTab === 'deposit' && (
            <div className="space-y-5">
              {depositSuccess ? (
                <div className="p-6 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 text-slate-950 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-base font-black text-white">Payment Successful!</h3>
                  <p className="text-xs text-emerald-300">
                    {formatINR(depositAmount)} added instantly to your SuperOver wallet balance.
                  </p>
                </div>
              ) : (
                <>
                  {/* Quick Amount Selector */}
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                      Select Deposit Amount:
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {[5, 25, 50, 100, 250, 500].map((amt) => (
                        <button
                          key={amt}
                          onClick={() => setDepositAmount(amt)}
                          className={`py-2 rounded-xl text-xs font-extrabold transition-all border ${
                            depositAmount === amt
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500 shadow-md shadow-emerald-500/20'
                              : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800'
                          }`}
                          id={`btn-deposit-chip-${amt}`}
                        >
                          ₹{amt}
                        </button>
                      ))}
                    </div>

                    {/* Custom Amount Input */}
                    <div className="mt-3 relative">
                      <span className="absolute left-3.5 top-2.5 text-sm font-bold text-slate-400">₹</span>
                      <input
                        type="number"
                        min="5"
                        max="20000"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(Number(e.target.value))}
                        className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-black text-sm focus:outline-none focus:border-emerald-500"
                        placeholder="Enter amount (min ₹5)"
                      />
                    </div>
                  </div>

                  {/* UPI Gateway Method Selection */}
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                      Select Payment Method (UPI):
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {[
                        { id: 'gpay', name: 'Google Pay', icon: '⚡' },
                        { id: 'phonepe', name: 'PhonePe', icon: '🟣' },
                        { id: 'paytm', name: 'Paytm UPI', icon: '🔵' },
                        { id: 'qr', name: 'Scan UPI QR', icon: '📱' },
                      ].map((m) => (
                        <button
                          key={m.id}
                          onClick={() => setSelectedUpiApp(m.id)}
                          className={`p-3 rounded-xl border text-center transition-all ${
                            selectedUpiApp === m.id
                              ? 'bg-emerald-500/15 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500/30'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                          }`}
                          id={`btn-upi-app-${m.id}`}
                        >
                          <span className="text-lg block mb-0.5">{m.icon}</span>
                          <span className="text-xs font-bold block">{m.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom UPI ID or QR Simulator */}
                  {selectedUpiApp === 'qr' ? (
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center gap-4">
                      <div className="w-20 h-20 bg-white rounded-lg p-1 flex items-center justify-center text-slate-950">
                        <QrCode className="w-16 h-16 text-slate-900" />
                      </div>
                      <div className="text-xs space-y-1">
                        <div className="font-bold text-white">Scan via any UPI App</div>
                        <div className="text-slate-400 text-[11px]">GPay, PhonePe, Paytm, BHIM, Cred</div>
                        <div className="text-emerald-400 font-mono font-bold">VPA: superover@icici</div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-300">Instant Verification Simulator:</span>
                        <span className="text-emerald-400 font-bold">100% Zero Gateway Fee</span>
                      </div>
                      <p className="text-[11px]">
                        Payment request for {formatINR(depositAmount)} will be routed via secure Razorpay / PhonePe UPI intent.
                      </p>
                    </div>
                  )}

                  {/* Deposit CTA */}
                  <button
                    onClick={handleDepositSubmit}
                    disabled={isProcessingDeposit || depositAmount < 25}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:brightness-110 active:scale-[0.99] text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all disabled:opacity-50"
                    id="btn-confirm-deposit"
                  >
                    {isProcessingDeposit ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Processing UPI Payment...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>Pay {formatINR(depositAmount)} via UPI</span>
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          )}

          {/* 2. WITHDRAW TAB */}
          {activeTab === 'withdraw' && (
            <div className="space-y-5">
              {withdrawSuccess ? (
                <div className="p-6 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-amber-400 text-slate-950 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-base font-black text-white">Withdrawal Request Placed!</h3>
                  <p className="text-xs text-amber-300">
                    {formatINR(withdrawAmount)} has been initiated to {withdrawUpiId}. Amount will reflect in your bank account in 2-5 minutes.
                  </p>
                </div>
              ) : (
                <>
                  {/* Withdrawable notice */}
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-slate-400 block">Available to Withdraw</span>
                      <span className="text-lg font-black text-emerald-400 font-display">
                        {formatINR(wallet.winningsBalance)}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block">Min. Withdrawal</span>
                      <span className="text-xs font-bold text-white">₹5</span>
                    </div>
                  </div>

                  {/* KYC check alert */}
                  {user.kycStatus !== 'VERIFIED' && (
                    <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs text-amber-300">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                        <span>KYC Verification speeds up instant payouts</span>
                      </div>
                      <button
                        onClick={onOpenKyc}
                        className="px-2.5 py-1 rounded-lg bg-amber-400 text-slate-950 font-bold text-[11px]"
                      >
                        Verify PAN
                      </button>
                    </div>
                  )}

                  {/* Amount input */}
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                      Withdrawal Amount:
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-2.5 text-sm font-bold text-slate-400">₹</span>
                      <input
                        type="number"
                        min="5"
                        max={wallet.winningsBalance}
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                        className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-black text-sm focus:outline-none focus:border-amber-400"
                        placeholder="Enter amount (min ₹5)"
                        id="input-withdraw-amount"
                      />
                    </div>
                  </div>

                  {/* UPI VPA address */}
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                      Enter Receiver UPI ID / VPA:
                    </label>
                    <input
                      type="text"
                      value={withdrawUpiId}
                      onChange={(e) => setWithdrawUpiId(e.target.value)}
                      placeholder="e.g. mobile@okaxis or name@paytm"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-medium text-xs focus:outline-none focus:border-amber-400"
                      id="input-withdraw-upi"
                    />
                    <span className="text-[10px] text-slate-400 block mt-1">
                      Direct instant IMPS transfer to the bank linked with this UPI ID.
                    </span>
                  </div>

                  {withdrawError && (
                    <div className="text-xs text-rose-400 font-semibold p-2 bg-rose-500/10 rounded-lg border border-rose-500/20">
                      {withdrawError}
                    </div>
                  )}

                  {/* Withdraw CTA */}
                  <button
                    onClick={handleWithdrawSubmit}
                    disabled={isProcessingWithdraw || wallet.winningsBalance < 50}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:brightness-110 active:scale-[0.99] text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 transition-all disabled:opacity-50"
                    id="btn-confirm-withdraw"
                  >
                    {isProcessingWithdraw ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Sending UPI Payout...</span>
                      </>
                    ) : (
                      <>
                        <ArrowUpRight className="w-4 h-4" />
                        <span>Withdraw {formatINR(withdrawAmount || 0)} Instantly</span>
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          )}

          {/* 3. PASSBOOK / TRANSACTION AUDIT */}
          {activeTab === 'passbook' && (
            <div className="space-y-3">
              {transactions.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-xs">
                  No transactions recorded yet.
                </div>
              ) : (
                transactions.map((tx) => {
                  const isCredit = tx.type === 'DEPOSIT' || tx.type === 'CONTEST_PAYOUT' || tx.type === 'BONUS_REWARD';

                  return (
                    <div
                      key={tx.id}
                      className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between gap-3 text-xs"
                      id={`tx-row-${tx.id}`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black ${
                            tx.type === 'CONTEST_PAYOUT'
                              ? 'bg-amber-400/20 text-amber-400 border border-amber-500/30'
                              : tx.type === 'DEPOSIT'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : tx.type === 'WITHDRAWAL'
                              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                              : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          {tx.type === 'CONTEST_PAYOUT' ? '🏆' : isCredit ? '↓' : '↑'}
                        </div>

                        <div>
                          <div className="font-bold text-white">{tx.description}</div>
                          <div className="text-[10px] text-slate-400 flex items-center gap-2 mt-0.5">
                            <span>{new Date(tx.timestamp).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                            <span>•</span>
                            <span className="font-mono">Ref: {tx.referenceId}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <span
                          className={`text-sm font-black font-display block ${
                            isCredit ? 'text-emerald-400' : 'text-slate-300'
                          }`}
                        >
                          {isCredit ? '+' : '-'}{formatINR(tx.amount)}
                        </span>
                        <span className="px-1.5 py-0.2 rounded bg-emerald-500/15 text-emerald-400 text-[9px] font-bold uppercase">
                          {tx.status}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
