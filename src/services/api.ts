import {
  CricketMatch,
  MatchResults,
  PlatformMetrics,
  UserAccount,
  UserPredictionSlip,
  Wallet,
  WalletTransaction
} from '../types';

import {
  INITIAL_ALL_USERS,
  INITIAL_FAQS,
  INITIAL_MATCHES,
  INITIAL_PLATFORM_METRICS,
  INITIAL_SLIPS,
  INITIAL_TRANSACTIONS,
  INITIAL_USER,
  INITIAL_WALLET
} from '../data/initialData';

// Replace this with your actual backend URL once it's ready.
const BASE_URL = 'http://localhost:8080/api';

/**
 * Helper to fetch data from the API with a fallback to mock data.
 * This ensures the frontend doesn't break while you are still building your backend endpoints.
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
  getMatches: () => fetchWithMockFallback<CricketMatch[]>('/matches', { method: 'GET' }, INITIAL_MATCHES),
  
  // User Data
  getCurrentUser: () => fetchWithMockFallback<UserAccount>('/user/current', { method: 'GET' }, INITIAL_USER),
  getAllUsers: () => fetchWithMockFallback<UserAccount[]>('/users', { method: 'GET' }, INITIAL_ALL_USERS),
  
  // Wallet & Transactions
  getWallet: () => fetchWithMockFallback<Wallet>('/wallet', { method: 'GET' }, INITIAL_WALLET),
  getTransactions: () => fetchWithMockFallback<WalletTransaction[]>('/transactions', { method: 'GET' }, INITIAL_TRANSACTIONS),
  
  // Slips
  getSlips: () => fetchWithMockFallback<UserPredictionSlip[]>('/slips', { method: 'GET' }, INITIAL_SLIPS),
  submitPredictionSlip: (payload: any) => 
    fetchWithMockFallback<UserPredictionSlip>('/slips', { 
      method: 'POST', 
      body: JSON.stringify(payload) 
    }, {
      id: `slip_${Date.now()}`,
      ...payload,
      submittedAt: new Date().toISOString(),
      status: 'PENDING'
    } as UserPredictionSlip),

  // Platform
  getMetrics: () => fetchWithMockFallback<PlatformMetrics>('/metrics', { method: 'GET' }, INITIAL_PLATFORM_METRICS),
};
