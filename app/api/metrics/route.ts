import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import Match from '@/models/Match';
import Slip from '@/models/Slip';
import Transaction from '@/models/Transaction';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectToDatabase();
    
    // Aggregate data using efficient DB queries
    const [totalUsers, activeMatches, slipsAgg, transactionsAgg] = await Promise.all([
      User.countDocuments({}),
      Match.countDocuments({ status: { $in: ['LIVE', 'UPCOMING', 'LOCKED'] } }),
      Slip.aggregate([
        { $group: { _id: null, totalPoolCollected: { $sum: '$entryFee' } } }
      ]),
      Transaction.aggregate([
        { $match: { type: { $in: ['CONTEST_PAYOUT', 'PAYOUT'] } } },
        { $group: { _id: null, totalPayoutsDisbursed: { $sum: '$amount' } } }
      ])
    ]);

    const totalPoolCollected = slipsAgg[0]?.totalPoolCollected || 0;
    const totalPayoutsDisbursed = transactionsAgg[0]?.totalPayoutsDisbursed || 0;
    
    // Calculate platform profit based on the same formula used in admin page
    const platformProfit = totalPoolCollected - totalPayoutsDisbursed;

    const metrics = {
      totalUsers,
      activeMatches,
      totalPoolCollected,
      totalPayoutsDisbursed,
      platformProfit,
      commissionRate: 0.15
    };

    return NextResponse.json(metrics);
  } catch (error: any) {
    console.error('Fetch Metrics Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
