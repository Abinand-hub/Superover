import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { PayoutRuleBanner } from './components/PayoutRuleBanner';
import { MatchLobby } from './components/MatchLobby';
const PredictionModal = React.lazy(() => import('./components/PredictionModal').then(m => ({ default: m.PredictionModal })));
const SlipResultModal = React.lazy(() => import('./components/SlipResultModal').then(m => ({ default: m.SlipResultModal })));
const MyContestsView = React.lazy(() => import('./components/MyContestsView').then(m => ({ default: m.MyContestsView })));
const WalletModal = React.lazy(() => import('./components/WalletModal').then(m => ({ default: m.WalletModal })));
const AuthModal = React.lazy(() => import('./components/AuthModal').then(m => ({ default: m.AuthModal })));
const KYCModal = React.lazy(() => import('./components/KYCModal').then(m => ({ default: m.KYCModal })));
const RulesFAQModal = React.lazy(() => import('./components/RulesFAQModal').then(m => ({ default: m.RulesFAQModal })));
const ResponsibleGamingModal = React.lazy(() => import('./components/ResponsibleGamingModal').then(m => ({ default: m.ResponsibleGamingModal })));
const AdminPanel = React.lazy(() => import('./components/AdminPanel').then(m => ({ default: m.AdminPanel })));

import { 
  CricketMatch, 
  MatchResults, 
  PlatformMetrics, 
  StatQuestionKey, 
  UserAccount, 
  UserPredictionSlip, 
  Wallet, 
  WalletTransaction 
} from './types';

import { 
  INITIAL_ALL_USERS, 
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

export default function App() {
  const [isInitializing, setIsInitializing] = useState(true);

  // Core Application State
  const [matches, setMatches] = useState<CricketMatch[]>(INITIAL_MATCHES);
  const [currentUser, setCurrentUser] = useState<UserAccount>(INITIAL_USER);
  const [allUsers, setAllUsers] = useState<UserAccount[]>(INITIAL_ALL_USERS);
  const [wallet, setWallet] = useState<Wallet>(INITIAL_WALLET);
  const [slips, setSlips] = useState<UserPredictionSlip[]>(INITIAL_SLIPS);
  const [transactions, setTransactions] = useState<WalletTransaction[]>(INITIAL_TRANSACTIONS);
  const [metrics, setMetrics] = useState<PlatformMetrics>(INITIAL_PLATFORM_METRICS);

  // Navigation & View Tabs
  const [activeTab, setActiveTab] = useState<'lobby' | 'my-contests' | 'payouts-rules' | 'admin'>('lobby');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    async function loadInitialData() {
      try {
        const [
          fetchedMatches,
          fetchedUser,
          fetchedAllUsers,
          fetchedWallet,
          fetchedSlips,
          fetchedTransactions,
          fetchedMetrics
        ] = await Promise.all([
          api.getMatches(),
          api.getCurrentUser(),
          api.getAllUsers(),
          api.getWallet(),
          api.getSlips(),
          api.getTransactions(),
          api.getMetrics()
        ]);

        setMatches(fetchedMatches);
        setCurrentUser(fetchedUser);
        setAllUsers(fetchedAllUsers);
        setWallet(fetchedWallet);
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
  }, []);

  // Modals
  const [selectedMatchForPlay, setSelectedMatchForPlay] = useState<{ match: CricketMatch; fee: number } | null>(null);
  const [selectedMatchForResults, setSelectedMatchForResults] = useState<{ match: CricketMatch; slip?: UserPredictionSlip } | null>(null);
  const [walletModalState, setWalletModalState] = useState<{ open: boolean; tab: 'deposit' | 'withdraw' | 'passbook' }>({ open: false, tab: 'deposit' });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isKycModalOpen, setIsKycModalOpen] = useState<boolean>(false);
  const [isRulesModalOpen, setIsRulesModalOpen] = useState<boolean>(false);
  const [isResponsibleModalOpen, setIsResponsibleModalOpen] = useState<boolean>(false);

  // User submissions count awaiting settlement
  const pendingSlipsCount = slips.filter((s) => s.status === 'PENDING' || s.status === 'LIVE').length;

  // Handler: User submits a 6-stat selection slip
  const handleSubmitSelectionSlip = async (answers: Record<StatQuestionKey, string>, entryFee: number, jackpotMultiplier: number) => {
    if (!selectedMatchForPlay) return;
    const match = selectedMatchForPlay.match;

    // Deduct entry fee from wallet (deposit first, then winnings)
    let newDeposit = wallet.depositBalance;
    let newWinnings = wallet.winningsBalance;
    let remainingFee = entryFee;

    if (newDeposit >= remainingFee) {
      newDeposit -= remainingFee;
      remainingFee = 0;
    } else {
      remainingFee -= newDeposit;
      newDeposit = 0;
      newWinnings -= remainingFee;
    }

    const updatedWallet: Wallet = {
      ...wallet,
      depositBalance: newDeposit,
      winningsBalance: newWinnings,
      totalBalance: newDeposit + newWinnings + wallet.bonusBalance,
    };
    setWallet(updatedWallet);

    // Create entry transaction
    const newTx: WalletTransaction = {
      id: `tx_ent_${Date.now()}`,
      userId: currentUser.id,
      type: 'CONTEST_ENTRY',
      amount: -entryFee,
      status: 'SUCCESS',
      timestamp: new Date().toISOString(),
      description: `Entry Fee for ${match.title} (6 Selections)`,
      referenceId: `ENTRY-${match.team1.code}${match.team2.code}-${Date.now().toString().slice(-4)}`,
    };
    setTransactions((prev) => [newTx, ...prev]);

    // Create user prediction slip
    const newSlip: UserPredictionSlip = {
      id: `slip_${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userPhone: currentUser.phone,
      matchId: match.id,
      matchTitle: match.title,
      series: match.series,
      team1Code: match.team1.code,
      team2Code: match.team2.code,
      matchStartTime: match.startTime,
      answers,
      entryFee,
      jackpotMultiplier,
      submittedAt: new Date().toISOString(),
      status: 'PENDING',
    };
    setSlips((prev) => [newSlip, ...prev]);

    // Update match pool and entry counts
    setMatches((prev) =>
      prev.map((m) =>
        m.id === match.id
          ? { ...m, totalEntries: m.totalEntries + 1, totalPool: m.totalPool + entryFee }
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
  };

  // Handler: Deposit cash via UPI
  const handleDepositCash = (amount: number, method: string) => {
    const updatedWallet: Wallet = {
      ...wallet,
      depositBalance: wallet.depositBalance + amount,
      totalBalance: wallet.totalBalance + amount,
    };
    setWallet(updatedWallet);

    const newTx: WalletTransaction = {
      id: `tx_dep_${Date.now()}`,
      userId: currentUser.id,
      type: 'DEPOSIT',
      amount,
      status: 'SUCCESS',
      timestamp: new Date().toISOString(),
      description: `Added cash via ${method}`,
      paymentMethod: method,
      referenceId: `UPI-DEP-${Date.now().toString().slice(-6)}`,
    };
    setTransactions((prev) => [newTx, ...prev]);
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

      if (payoutAmount > 0) {
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
        <div className="w-8 h-8 border-4 border-[#FF6B00] border-t-transparent rounded-full animate-spin"></div>
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
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
        pendingSlipsCount={pendingSlipsCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
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
                    <Crosshair className="w-5 h-5" />
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

        {/* VIEW 4: ORGANIZER ADMIN PANEL */}
        {activeTab === 'admin' && (
          <React.Suspense fallback={<div className="flex justify-center p-12"><div className="w-8 h-8 border-4 border-[#FF6B00] border-t-transparent rounded-full animate-spin"></div></div>}>
            <AdminPanel
              metrics={metrics}
              matches={matches}
              allUsers={allUsers}
              allSlips={slips}
              allTransactions={transactions}
              faqs={INITIAL_FAQS}
              onUpdateMatch={(updated) => setMatches((prev) => prev.map((m) => (m.id === updated.id ? updated : m)))}
              onCreateMatch={(newMatch) => setMatches((prev) => [newMatch, ...prev])}
              onSettleMatch={handleSettleMatch}
              onUpdateUser={(updated) => {
                setAllUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
                if (updated.id === currentUser.id) {
                  setCurrentUser(updated);
                }
              }}
              onApproveWithdrawal={(txId) => {
                setTransactions((prev) =>
                  prev.map((t) => (t.id === txId ? { ...t, status: 'SUCCESS' } : t))
                );
              }}
              onRejectWithdrawal={(txId) => {
                setTransactions((prev) =>
                  prev.map((t) => (t.id === txId ? { ...t, status: 'REJECTED' } : t))
                );
              }}
              onAddBonusCash={handleAdminAddBonus}
              onCloseAdmin={() => setActiveTab('lobby')}
            />
          </React.Suspense>
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
              <button onClick={() => setActiveTab('admin')} className="text-purple-400 hover:text-purple-300 font-bold">Admin Portal</button>
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
        {isAuthModalOpen && (
          <AuthModal
            currentUser={currentUser}
            allUsers={allUsers}
            onClose={() => setIsAuthModalOpen(false)}
            onUpdateProfile={(updated) => {
              setCurrentUser(updated);
              setAllUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
            }}
            onSwitchUser={(newUser) => {
              setCurrentUser(newUser);
            }}
            onRegisterUser={(newUser, welcomeBonus) => {
              setAllUsers((prev) => [newUser, ...prev]);
              setCurrentUser(newUser);
              
              // Credit welcome bonus to user wallet and add bonus transaction
              setWallet((prev) => ({
                ...prev,
                bonusBalance: prev.bonusBalance + welcomeBonus,
                totalBalance: prev.totalBalance + welcomeBonus,
              }));

              const welcomeTx: WalletTransaction = {
                id: `tx_bon_reg_${Date.now()}`,
                userId: newUser.id,
                type: 'BONUS_REWARD',
                amount: welcomeBonus,
                status: 'SUCCESS',
                timestamp: new Date().toISOString(),
                description: '₹50 Signup Welcome Bonus Cash Credited!',
                referenceId: `REG-BONUS-${Date.now().toString().slice(-4)}`,
              };
              setTransactions((prev) => [welcomeTx, ...prev]);
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
              setAllUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
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
