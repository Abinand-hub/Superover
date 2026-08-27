'use client';
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Target, Award, Crosshair, ShieldCheck, Zap, Flame } from 'lucide-react';
import { PayoutRuleBanner } from './components/PayoutRuleBanner';
import { MatchLobby } from './components/MatchLobby';
import { LogoLoader } from './components/Loader';
const PredictionModal = React.lazy(() => import('./components/PredictionModal').then(m => ({ default: m.PredictionModal })));
const SlipResultModal = React.lazy(() => import('./components/SlipResultModal').then(m => ({ default: m.SlipResultModal })));
const MyContestsView = React.lazy(() => import('./components/MyContestsView').then(m => ({ default: m.MyContestsView })));
const WalletModal = React.lazy(() => import('./components/WalletModal').then(m => ({ default: m.WalletModal })));
const AuthModal = React.lazy(() => import('./components/AuthModal').then(m => ({ default: m.AuthModal })));
const KYCModal = React.lazy(() => import('./components/KYCModal').then(m => ({ default: m.KYCModal })));
const RulesFAQModal = React.lazy(() => import('./components/RulesFAQModal').then(m => ({ default: m.RulesFAQModal })));
const ResponsibleGamingModal = React.lazy(() => import('./components/ResponsibleGamingModal').then(m => ({ default: m.ResponsibleGamingModal })));


import { 
  CricketMatch, 
  MatchResults, 
  PlatformMetrics, 
  UserAccount, 
  UserPredictionSlip, 
  Wallet, 
  WalletTransaction 
} from './types';

import { 
  INITIAL_FAQS, 
  INITIAL_MATCHES, 
  INITIAL_PLATFORM_METRICS, 
  INITIAL_SLIPS, 
  INITIAL_TRANSACTIONS, 
  INITIAL_USER, 
  INITIAL_WALLET 
} from './data/initialData';

import { settlePredictionSlip } from './utils/payoutCalculator';
import { api } from './services/api';

interface AppProps {
  initialMatches?: CricketMatch[];
}

export default function App({ initialMatches = [] }: AppProps) {
  // If we have initialMatches (from SSR), we don't need to block rendering
  const [isInitializing, setIsInitializing] = useState(initialMatches.length === 0);

  // Core Application State
  const [matches, setMatches] = useState<CricketMatch[]>(initialMatches.length > 0 ? initialMatches : []);
  const [currentUser, setCurrentUser] = useState<UserAccount>(INITIAL_USER);
  const [wallet, setWallet] = useState<Wallet>(INITIAL_WALLET);
  const [slips, setSlips] = useState<UserPredictionSlip[]>(INITIAL_SLIPS);
  const [transactions, setTransactions] = useState<WalletTransaction[]>(INITIAL_TRANSACTIONS);
  const [metrics, setMetrics] = useState<PlatformMetrics>(INITIAL_PLATFORM_METRICS);

  const [activeTab, setActiveTab] = useState<'lobby' | 'my-contests' | 'payouts-rules'>('lobby');

  useEffect(() => {
    async function loadInitialData() {
      try {
        // Only fetch matches client-side if we didn't get them from SSR
        const matchesPromise = initialMatches.length === 0 ? api.getMatches() : Promise.resolve(initialMatches);

        const [
          fetchedMatches,
          fetchedUser,
          fetchedWallet,
          fetchedSlips,
          fetchedTransactions,
          fetchedMetrics
        ] = await Promise.all([
          matchesPromise,
          api.getCurrentUser(),
          api.getWallet(),
          api.getSlips(),
          api.getTransactions(),
          api.getMetrics()
        ]);

        if (initialMatches.length === 0) {
          setMatches(fetchedMatches);
        }
        setCurrentUser(fetchedUser.error ? INITIAL_USER : fetchedUser);
        setWallet(fetchedWallet.error ? INITIAL_WALLET : fetchedWallet);
        setSlips(fetchedSlips);
        setTransactions(fetchedTransactions);
        setMetrics(fetchedMetrics);
      } catch (err) {
        console.error("Failed to fetch from API", err);
      } finally {
        setIsInitializing(false);
      }
    }
    loadInitialData();
  }, [initialMatches]);

  // Modals
  const [selectedMatchForPlay, setSelectedMatchForPlay] = useState<{ match: CricketMatch; fee: number } | null>(null);
  const [selectedMatchForResults, setSelectedMatchForResults] = useState<{ match: CricketMatch; slip?: UserPredictionSlip } | null>(null);
  const [walletModalState, setWalletModalState] = useState<{ open: boolean; tab: 'deposit' | 'withdraw' | 'passbook' }>({ open: false, tab: 'deposit' });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isKycModalOpen, setIsKycModalOpen] = useState<boolean>(false);
  const [isRulesModalOpen, setIsRulesModalOpen] = useState<boolean>(false);
  const [isResponsibleModalOpen, setIsResponsibleModalOpen] = useState<boolean>(false);


  const pendingSlipsCount = slips.filter((s) => s.status === 'PENDING' || s.status === 'LIVE').length;

  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {
      console.error('Logout failed:', e);
    }
    setCurrentUser(INITIAL_USER);
    setActiveTab('lobby');
    setSlips([]);
    setTransactions([]);
    setWallet(INITIAL_WALLET);
  };

  const handleSubmitSelectionSlip = async (
    answers: Record<string, string>, 
    entryFee: number, 
    totalPaid: number, 
    jackpotMultiplier: number,
    freeHit: boolean = false,
    freeHitFee: number = 0,
    wheelMultiplier?: number
  ) => {
    if (!selectedMatchForPlay) return;
    const match = selectedMatchForPlay.match;

    try {
      const response = await api.submitPredictionSlip({
        matchId: match.id,
        answers,
        entryFee,
        freeHit,
        freeHitFee,
        totalPayable: totalPaid,
        wheelMultiplier
      });

      // Update state with response from backend
      if (response && response.slip) {
        setWallet(response.wallet);
        setSlips((prev) => [response.slip as any, ...prev]);
        
        // Add local transaction history log
        const newTx: WalletTransaction = {
          id: `tx_ent_${Date.now()}`,
          userId: currentUser.id,
          type: 'CONTEST_ENTRY',
          amount: -totalPaid,
          status: 'SUCCESS',
          timestamp: new Date().toISOString(),
          description: `Stake for ${match.title}${freeHit ? ' + Free Hit' : ''}`,
          referenceId: `ENTRY-${match.team1.code}${match.team2.code}-${Date.now().toString().slice(-4)}`,
        };
        setTransactions((prev) => [newTx, ...prev]);

        // Update match pool and entry counts
        setMatches((prev) =>
          prev.map((m) =>
            m.id === match.id
              ? { ...m, totalEntries: (m.totalEntries || 0) + 1, totalPool: (m.totalPool || 0) + entryFee }
              : m
          )
        );

        // Update platform metrics
        setMetrics((prev) => ({
          ...prev,
          totalPoolCollected: prev.totalPoolCollected + entryFee,
        }));

        // Close prediction modal and redirect to My Contests tab
        setSelectedMatchForPlay(null);
        setActiveTab('my-contests');
      }
    } catch (error) {
      console.error('Failed to submit slip:', error);
      alert('Failed to submit prediction. Please check your balance or try again.');
    }
  };

  // Handler: Add Cash (Deposit via UPI)
  const handleDepositCash = async (payload: any, method: string) => {
    try {
      // payload contains razorpay_order_id, razorpay_payment_id, razorpay_signature, amount
      const data = await api.verifyPayment(payload);

      if (data.success) {
        // Update local wallet state
        setWallet(data.wallet);
        // Update transactions
        if (data.transaction) {
          setTransactions((prev) => [data.transaction, ...prev]);
        }
        
        console.log('Deposit successful!', data);
      }
    } catch (error) {
      console.error('Deposit Error:', error);
      alert('Failed to verify payment. Please try again or contact support.');
    }
  };

  // Handler: Withdraw winnings
  const handleWithdrawWinnings = (amount: number, upiId: string) => {
    const updatedWallet: Wallet = {
      ...wallet,
      winningsBalance: wallet.winningsBalance - amount,
      totalBalance: wallet.totalBalance - amount,
    };
    setWallet(updatedWallet);

    const newTx: WalletTransaction = {
      id: `tx_wdr_${Date.now()}`,
      userId: currentUser.id,
      type: 'WITHDRAWAL',
      amount,
      status: 'SUCCESS',
      timestamp: new Date().toISOString(),
      description: `Withdrawn to UPI (${upiId})`,
      paymentMethod: `IMPS/UPI: ${upiId}`,
      referenceId: `WDR-UPI-${Date.now().toString().slice(-6)}`,
    };
    setTransactions((prev) => [newTx, ...prev]);
  };

  // Handler: Admin Settle Match & Distribute Payouts
  const handleSettleMatch = (matchId: string, results: MatchResults) => {
    const match = matches.find((m) => m.id === matchId);
    if (!match) return;

    // 1. Mark match as completed with actual results
    const updatedMatch: CricketMatch = {
      ...match,
      status: 'COMPLETED',
      actualResults: results,
    };
    setMatches((prev) => prev.map((m) => (m.id === matchId ? updatedMatch : m)));

    // 2. Settle all user prediction slips for this match
    let totalPaidOutThisMatch = 0;
    let userPayoutAmountForCurrent = 0;

    const updatedSlips = slips.map((slip) => {
      if (slip.matchId !== matchId) return slip;

      const { settledSlip, payoutAmount } = settlePredictionSlip(slip, updatedMatch, results);

      if (payoutAmount > 0 && settledSlip.status === 'WON') {
        totalPaidOutThisMatch += payoutAmount;
        if (slip.userId === currentUser.id) {
          userPayoutAmountForCurrent += payoutAmount;
        }

        // Add payout transaction
        const payoutTx: WalletTransaction = {
          id: `tx_pay_${Date.now()}_${slip.id}`,
          userId: slip.userId,
          type: 'CONTEST_PAYOUT',
          amount: payoutAmount,
          status: 'SUCCESS',
          timestamp: new Date().toISOString(),
          description: `Won ${settledSlip.multiplierWon}X Cash Prize for ${match.title} (${settledSlip.correctCount}/6 Correct)`,
          referenceId: `PAY-${match.team1.code}${match.team2.code}-${settledSlip.multiplierWon}X`,
          payoutMultiplier: settledSlip.multiplierWon,
        };
        setTransactions((prevTxs) => [payoutTx, ...prevTxs]);
      }

      return settledSlip;
    });

    setSlips(updatedSlips);

    // 3. Credit current user's wallet if they won
    if (userPayoutAmountForCurrent > 0) {
      setWallet((prev) => ({
        ...prev,
        winningsBalance: prev.winningsBalance + userPayoutAmountForCurrent,
        totalBalance: prev.totalBalance + userPayoutAmountForCurrent,
      }));
      setCurrentUser((prev) => ({
        ...prev,
        totalWon: prev.totalWon + userPayoutAmountForCurrent,
      }));
    }

    // 4. Update platform financial metrics
    setMetrics((prev) => ({
      ...prev,
      totalPayoutsDisbursed: prev.totalPayoutsDisbursed + totalPaidOutThisMatch,
      platformProfit: prev.platformProfit + (match.totalPool * (prev.commissionRate / 100)),
    }));
  };

  // Handler: Admin Approve Jackpot
  const handleApproveJackpot = (slipId: string) => {
    const slip = slips.find(s => s.id === slipId);
    if (!slip || slip.status !== 'PENDING_APPROVAL' || !slip.payoutAmount) return;

    // Update slip status
    setSlips(prev => prev.map(s => s.id === slipId ? { ...s, status: 'WON' } : s));

    // Update Wallet & Transactions
    const payoutTx: WalletTransaction = {
      id: `tx_pay_${Date.now()}_${slip.id}`,
      userId: slip.userId,
      type: 'CONTEST_PAYOUT',
      amount: slip.payoutAmount,
      status: 'SUCCESS',
      timestamp: new Date().toISOString(),
      description: `Won ${slip.multiplierWon}X Cash Prize for ${slip.matchTitle} (6/6 Correct - Admin Approved)`,
      referenceId: `PAY-${slip.team1Code}${slip.team2Code}-${slip.multiplierWon}X`,
      payoutMultiplier: slip.multiplierWon,
    };
    setTransactions(prev => [payoutTx, ...prev]);

    // Update metrics
    setMetrics(prev => ({
      ...prev,
      totalPayoutsDisbursed: prev.totalPayoutsDisbursed + (slip.payoutAmount || 0)
    }));

    // If it's the current user, update their wallet live
    if (slip.userId === currentUser.id) {
      setWallet(prev => ({
        ...prev,
        winningsBalance: prev.winningsBalance + (slip.payoutAmount || 0),
        totalBalance: prev.totalBalance + (slip.payoutAmount || 0),
      }));
      setCurrentUser(prev => ({
        ...prev,
        totalWon: prev.totalWon + (slip.payoutAmount || 0),
      }));
    }
  };

  // Handler: Admin Reject Jackpot
  const handleRejectJackpot = (slipId: string) => {
    // Just mark it as LOST or REJECTED. We'll use LOST since it's an existing status.
    setSlips(prev => prev.map(s => s.id === slipId ? { ...s, status: 'LOST', payoutAmount: 0 } : s));
  };

  // Handler: Admin Add Bonus Cash
  const handleAdminAddBonus = (userId: string, amount: number) => {
    if (userId === currentUser.id) {
      setWallet((prev) => ({
        ...prev,
        bonusBalance: prev.bonusBalance + amount,
        totalBalance: prev.totalBalance + amount,
      }));
    }

    const bonusTx: WalletTransaction = {
      id: `tx_bon_${Date.now()}`,
      userId,
      type: 'BONUS_REWARD',
      amount,
      status: 'SUCCESS',
      timestamp: new Date().toISOString(),
      description: 'Promotional Bonus Cash Credited by SuperOver Admin',
      referenceId: `BONUS-${Date.now().toString().slice(-4)}`,
    };
    setTransactions((prev) => [bonusTx, ...prev]);
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-[#050816] flex items-center justify-center">
        <LogoLoader size="xl" text="Loading SuperOver..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] text-slate-100 flex flex-col selection:bg-[#FF6B00] selection:text-white">
      {/* Top Main Navigation Header */}
      <Header 
        user={currentUser}
        wallet={wallet}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openWalletModal={(tab = 'deposit') => setWalletModalState({ open: true, tab })}
        openAuthModal={() => setIsAuthModalOpen(true)}
        openKycModal={() => setIsKycModalOpen(true)}
        openRulesModal={() => setIsRulesModalOpen(true)}
        openResponsibleModal={() => setIsResponsibleModalOpen(true)}
        pendingSlipsCount={pendingSlipsCount}
        onSignOut={handleSignOut}
      />

      {/* Main Content Area - Optimized for mobile */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6">

        {/* VIEW 1: MATCH LOBBY & PROMO BANNER */}
        {activeTab === 'lobby' && (
          <div className="space-y-6">
            <PayoutRuleBanner 
              onOpenRules={() => setIsRulesModalOpen(true)}
              onSelectMatchQuick={() => {}}
            />
            <MatchLobby
              matches={matches}
              userSlips={slips}
              onSelectMatchToPlay={(match, fee = 25) => {
                if (currentUser.id === 'u_guest') {
                  setIsAuthModalOpen(true);
                  return;
                }
                setSelectedMatchForPlay({ match, fee });
              }}
              onViewMatchResult={(match, slip) => {
                setSelectedMatchForResults({ match, slip });
              }}
            />
          </div>
        )}

        {/* VIEW 2: MY PREDICTIONS / SLIPS & USER ACTIVITY */}
        {activeTab === 'my-contests' && (
          <React.Suspense fallback={<div className="flex justify-center p-12"><div className="w-8 h-8 border-4 border-[#FF6B00] border-t-transparent rounded-full animate-spin"></div></div>}>
            <MyContestsView
              user={currentUser}
              wallet={wallet}
              slips={slips}
              transactions={transactions}
              matches={matches}
              onViewSlipDetails={(match, slip) => {
                setSelectedMatchForResults({ match, slip });
              }}
              onGoToLobby={() => setActiveTab('lobby')}
              onOpenWallet={(tab) => setWalletModalState({ open: true, tab })}
            />
          </React.Suspense>
        )}

        {/* VIEW 3: 100X PAYOUTS & RULES */}
        {activeTab === 'payouts-rules' && (
          <div className="space-y-6">
            <PayoutRuleBanner 
              onOpenRules={() => setIsRulesModalOpen(true)}
            />
            <div className="p-6 rounded-2xl bg-[#0D122B] border border-[#1A223E] space-y-4 shadow-xl">
              <h2 className="text-xl font-extrabold text-white font-display flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B00]"></span>
                How SuperOver Works
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-[#080C1D] border border-[#1A223E] space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#FF6B00] to-[#FF8800] text-white font-black flex items-center justify-center shadow-md">1</div>
                  <h3 className="font-bold text-white text-sm">Choose Entry Fee</h3>
                  <p className="text-slate-400">Join upcoming IPL or International fixtures starting at just ₹25, ₹50, or ₹100.</p>
                </div>
                <div 
                  className="flex flex-col items-center p-3 sm:p-4 rounded-xl bg-[#0D122B] border border-[#1A223E] hover:border-[#FF6B00]/40 transition-colors text-center"
                >
                  <div className="w-10 h-10 rounded-full bg-[#FF6B00]/20 flex items-center justify-center text-[#FF6B00] mb-3">
                    <Target className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-white text-sm">Crack 6 Stats</h3>
                  <p className="text-xs text-slate-400 mt-1">Select player outcomes (e.g., Top Batter, Most 6s) before the match starts.</p>
                </div>
                <div className="p-4 rounded-xl bg-[#080C1D] border border-[#1A223E] space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#FF6B00] to-[#FF8800] text-white font-black flex items-center justify-center shadow-md">3</div>
                  <h3 className="font-bold text-white text-sm">Win Up to 100X Cash</h3>
                  <p className="text-slate-400">Get 3 right = 0.5X refund guard. 4 right = 3X. 5 right = 10X. 6 right = 100X Jackpot!</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Footer & Compliance Notice */}
      <footer className="bg-[#03050D] border-t border-[#1A223E] py-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="hidden lg:flex items-center gap-2 text-sm font-medium text-slate-400">
                <span className="text-[#FF6B00]">SuperOver</span>
                <span>•</span>
                <span>Low-stakes 6-stat cricket selection game</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <button onClick={() => setIsRulesModalOpen(true)} className="hover:text-white transition-colors">Rules & FAQs</button>
              <button onClick={() => setIsResponsibleModalOpen(true)} className="hover:text-white transition-colors">Responsible Gaming</button>
              <button onClick={() => setWalletModalState({ open: true, tab: 'deposit' })} className="hover:text-white transition-colors">UPI Deposit</button>
            </div>
          </div>

          <div className="pt-4 border-t border-[#1A223E]/50 text-[11px] text-slate-500 text-center sm:text-left leading-relaxed">
            <p>
              Disclaimer: SuperOver is a game of skill compliant with the Public Gambling Act, 1867 and applicable Indian High Court & Supreme Court judgments. Participation is strictly restricted to Indian citizens aged 18 years and above residing in permitted states. Residents of Andhra Pradesh, Assam, Nagaland, Odisha, Sikkim, and Telangana are prohibited from participating in real-money contests.
            </p>
          </div>
        </div>
      </footer>

      {/* ALL MODALS (Lazy Loaded) */}
      <React.Suspense fallback={<div className="fixed inset-0 flex items-center justify-center bg-[#050816]/50 backdrop-blur-sm z-50"><div className="w-8 h-8 border-4 border-[#FF6B00] border-t-transparent rounded-full animate-spin"></div></div>}>
        {/* MODAL 1: 6-Stat Prediction Game Flow */}
        {selectedMatchForPlay && (
          <PredictionModal
            match={selectedMatchForPlay.match}
            user={currentUser}
            wallet={wallet}
            initialFee={selectedMatchForPlay.fee}
            onClose={() => setSelectedMatchForPlay(null)}
            onSubmitSlip={handleSubmitSelectionSlip}
            onOpenDeposit={() => {
              setSelectedMatchForPlay(null);
              setWalletModalState({ open: true, tab: 'deposit' });
            }}
          />
        )}

        {/* MODAL 2: Slip Result & Official Match Breakdown */}
        {selectedMatchForResults && (
          <SlipResultModal
            match={selectedMatchForResults.match}
            slip={selectedMatchForResults.slip}
            onClose={() => setSelectedMatchForResults(null)}
            onPlayAnother={() => {
              setSelectedMatchForResults(null);
              setActiveTab('lobby');
            }}
          />
        )}

        {/* MODAL 3: UPI Wallet (Deposit / Withdraw / Passbook) */}
        {walletModalState.open && (
          <WalletModal
            wallet={wallet}
            user={currentUser}
            transactions={transactions}
            initialTab={walletModalState.tab}
            onClose={() => setWalletModalState({ open: false, tab: 'deposit' })}
            onDeposit={handleDepositCash}
            onWithdraw={handleWithdrawWinnings}
            onOpenKyc={() => {
              setWalletModalState({ open: false, tab: 'deposit' });
              setIsKycModalOpen(true);
            }}
          />
        )}

        {/* MODAL 4: User Authentication & Switcher */}
        {(isAuthModalOpen || (!isInitializing && currentUser.id === 'u_guest')) && (
          <AuthModal
            onClose={currentUser.id === 'u_guest' ? undefined : () => setIsAuthModalOpen(false)}
            onLoginSuccess={(user) => {
              const enrichedUser = {
                ...user,
                avatar: `https://api.dicebear.com/9.x/avataaars/svg?seed=${user.name}&backgroundColor=FF6B00`,
                kycStatus: 'PENDING',
                isBlocked: false,
                joinedDate: new Date().toISOString().split('T')[0],
                dailyDepositLimit: 10000,
                totalContestsJoined: 0,
                totalWon: 0,
                id: user._id || user.id, // Ensure frontend uses .id
              };
              setCurrentUser(enrichedUser);
              setWallet(user.wallet);
              // We no longer manage allUsers here
              setIsAuthModalOpen(false);
            }}
          />
        )}

        {/* MODAL 5: KYC Verification */}
        {isKycModalOpen && (
          <KYCModal
            user={currentUser}
            onClose={() => setIsKycModalOpen(false)}
            onCompleteKyc={(pan) => {
              const updated: UserAccount = {
                ...currentUser,
                kycStatus: 'VERIFIED',
                panNumber: pan,
              };
              setCurrentUser(updated);
              setWallet((prev) => ({ ...prev, kycVerified: true }));
            }}
          />
        )}

        {/* MODAL 6: Rules & FAQs */}
        {isRulesModalOpen && (
          <RulesFAQModal
            faqs={INITIAL_FAQS}
            onClose={() => setIsRulesModalOpen(false)}
          />
        )}

        {/* MODAL 7: Responsible Gaming */}
        {isResponsibleModalOpen && (
          <ResponsibleGamingModal
            user={currentUser}
            onClose={() => setIsResponsibleModalOpen(false)}
            onUpdateLimit={(limit) => {
              setCurrentUser((prev) => ({ ...prev, dailyDepositLimit: limit }));
            }}
          />
        )}

      </React.Suspense>
    </div>
  );
}
