import Match from '@/models/Match';

export async function autoLockMatches() {
  const now = new Date();
  const oneMinuteFromNow = new Date(now.getTime() + 60 * 1000);
  
  // 1. Matches starting within 1 minute -> Auto-transition to LOCKED
  const matchesToLock = await Match.find({
    status: 'UPCOMING',
    matchStartTime: { $lte: oneMinuteFromNow.toISOString(), $gt: now.toISOString() }
  });

  for (const match of matchesToLock) {
    match.status = 'LOCKED';
    await match.save();
  }

  // 2. Matches whose official start time has arrived -> Auto-transition to LIVE
  const matchesToLive = await Match.find({
    status: { $in: ['UPCOMING', 'LOCKED'] },
    matchStartTime: { $lte: now.toISOString() }
  });

  for (const match of matchesToLive) {
    match.status = 'LIVE';
    if (!match.liveScore || match.liveScore === '') {
      match.liveScore = `${match.team1?.code || 'T1'} vs ${match.team2?.code || 'T2'} • Match In Progress`;
    }
    await match.save();
  }
}
