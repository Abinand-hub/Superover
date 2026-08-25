import {
  CricketMatch,
  MatchResults,
  PlatformMetrics,
  UserAccount,
  UserPredictionSlip,
  Wallet,
  WalletTransaction
} from '../types';

  INITIAL_USER,
  INITIAL_WALLET
} from '../data/initialData';

const BASE_URL = '/api';

/**
 * Helper to fetch data from the API with a fallback to mock data.
 * It will try to read from localStorage first if the API fails, and if empty, use the provided mockData.
 */
async function fetchWithMockFallback<T>(endpoint: string, options?: RequestInit, mockData?: T): Promise<T> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer YOUR_TOKEN`, // Uncomment if using auth
        ...options?.headers,
      }
    });

    if (!response.ok) {
      throw new Error(`API returned status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.warn(`[API Stub] ${endpoint} failed, falling back to mock data.`, error);
    if (mockData !== undefined) {
      return mockData;
    }
    throw error;
  }
}

export const api = {
  // Matches
  getMatches: async () => {
    let rawMatches = [];
    try {
      const res = await fetch('/api/matches', { method: 'GET' });
      if (res.ok) {
        rawMatches = await res.json();
      }
    } catch (e) {
      console.warn('Failed to fetch matches:', e);
    }
    return rawMatches.map((m: any) => {
      // API returns matchStartTime and _id, need to map to frontend types
      const startTimeIso = m.matchStartTime || m.startTime;
      let lockTimeIso = m.lockTime;
      if (!lockTimeIso && startTimeIso) {
        // Default lock time is 1 min before start
        lockTimeIso = new Date(new Date(startTimeIso).getTime() - 60 * 1000).toISOString();
      }
      
      let status = m.status;
      if (status === 'UPCOMING' && new Date() >= new Date(lockTimeIso)) {
        status = 'LOCKED';
      }

      return {
        ...m,
        id: m._id || m.id,
        startTime: startTimeIso,
        lockTime: lockTimeIso,
        status: status,
        results: m.actualResults || m.results,
      } as CricketMatch;
    });
  },
  updateMatch: (payload: any) => fetch('/api/matches/update', { method: 'POST', body: JSON.stringify(payload) }).then(r => r.json()),
  
  // User Data
  getCurrentUser: () => fetch('/api/user/current', { method: 'GET' }).then(r => r.json()),
  getAllUsers: () => fetch('/api/users', { method: 'GET' }).then(r => r.json()),
  
  // Wallet & Transactions
  getWallet: async () => {
    const response = await fetch('/api/wallet', { method: 'GET' });
    return response.json();
  },
  getTransactions: async () => {
    const response = await fetch('/api/transactions', { method: 'GET' });
    if (!response.ok) return [];
    return response.json();
  },
  createOrder: (payload: { amount: number }) => fetchWithMockFallback<{ orderId: string, amount: number, currency: string }>('/wallet/create-order', { method: 'POST', body: JSON.stringify(payload) }),
  verifyPayment: (payload: any) => fetchWithMockFallback<{ success: boolean, wallet: Wallet, transaction: WalletTransaction }>('/wallet/verify-payment', { method: 'POST', body: JSON.stringify(payload) }),
  withdrawFunds: (payload: any) => fetchWithMockFallback<{ wallet: Wallet, transaction: WalletTransaction }>('/wallet/withdraw', { method: 'POST', body: JSON.stringify(payload) }),
  
  // Match Settlement
  settleMatch: (payload: any) => fetchWithMockFallback<{ success: boolean, message: string }>('/matches/settle', { method: 'POST', body: JSON.stringify(payload) }),
  autoDetectMatchResults: (matchId: string) => fetchWithMockFallback<{ answers: any, summaryNote: string }>(`/matches/scorecard?matchId=${matchId}`, { method: 'GET' }),
  
  // Slips
  getSlips: () => fetchWithMockFallback<UserPredictionSlip[]>('/slips', { method: 'GET' }, []),
  submitPredictionSlip: (payload: any) => 
    fetchWithMockFallback<{ message: string, slip: UserPredictionSlip, wallet: Wallet }>('/slips', { 
      method: 'POST', 
      body: JSON.stringify(payload) 
    }, {
      message: 'Success mock',
      slip: {
        id: `slip_${Date.now()}`,
        ...payload,
        submittedAt: new Date().toISOString(),
        status: 'PENDING'
      } as UserPredictionSlip,
      wallet: INITIAL_WALLET
    }),

  // Platform
  getMetrics: () => fetchWithMockFallback<PlatformMetrics>('/metrics', { method: 'GET' }, INITIAL_PLATFORM_METRICS),
};
