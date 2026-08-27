import mongoose, { Schema, Document } from 'mongoose';

export interface ISlip extends Document {
  userId: mongoose.Types.ObjectId;
  userName: string;
  userPhone?: string;
  matchId: mongoose.Types.ObjectId;
  matchTitle: string;
  series: string;
  team1Code: string;
  team2Code: string;
  matchStartTime: string;
  answers: Map<string, string>;
  entryFee: number;
  jackpotMultiplier: number;
  freeHit?: boolean;
  freeHitFee?: number;
  totalPayable: number;
  wheelMultiplier?: number;
  status: 'PENDING' | 'LIVE' | 'WON' | 'LOST' | 'PENDING_APPROVAL' | 'REFUNDED';
  streakCount?: number;
  correctCount?: number;
  multiplierWon?: number;
  payoutAmount?: number;
  submittedAt: Date;
  createdAt: Date;
}

const SlipSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    userName: { type: String, required: true },
    userPhone: { type: String },
    matchId: { type: Schema.Types.ObjectId, ref: 'Match', required: true },
    matchTitle: { type: String, required: true },
    series: { type: String, required: true },
    team1Code: { type: String, required: true },
    team2Code: { type: String, required: true },
    matchStartTime: { type: String, required: true },
    answers: { type: Map, of: String, required: true },
    entryFee: { type: Number, required: true },
    jackpotMultiplier: { type: Number, default: 100 },
    freeHit: { type: Boolean, default: false },
    freeHitFee: { type: Number, default: 0 },
    totalPayable: { type: Number, required: true },
    wheelMultiplier: { type: Number },
    status: { type: String, enum: ['PENDING', 'LIVE', 'WON', 'LOST', 'PENDING_APPROVAL', 'REFUNDED'], default: 'PENDING' },
    streakCount: { type: Number },
    correctCount: { type: Number },
    multiplierWon: { type: Number },
    payoutAmount: { type: Number },
    submittedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Slip = (mongoose.models.Slip as mongoose.Model<ISlip>) || mongoose.model<ISlip>('Slip', SlipSchema);
export default Slip;
