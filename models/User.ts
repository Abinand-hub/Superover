import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username?: string;
  password?: string;
  refId: string;
  name: string;
  phone: string;
  email: string;
  address?: string;
  role: 'FAN' | 'ADMIN';
  kycVerified: boolean;
  kycStatus?: 'UNVERIFIED' | 'SUBMITTED' | 'VERIFIED' | 'REJECTED';
  isBlocked?: boolean;
  joinedDate?: string;
  dailyDepositLimit?: number;
  totalContestsJoined?: number;
  avatar?: string;
  wallet: {
    depositBalance: number;
    winningsBalance: number;
    bonusBalance: number;
  };
  totalWon: number;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    username: { type: String, unique: true, sparse: true },
    password: { type: String },
    refId: { type: String, unique: true, sparse: true, index: true },
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    address: { type: String },
    role: { type: String, enum: ['FAN', 'ADMIN'], default: 'FAN' },
    kycVerified: { type: Boolean, default: false },
    kycStatus: { type: String, enum: ['UNVERIFIED', 'SUBMITTED', 'VERIFIED', 'REJECTED'], default: 'UNVERIFIED' },
    isBlocked: { type: Boolean, default: false },
    joinedDate: { type: String },
    dailyDepositLimit: { type: Number, default: 10000 },
    totalContestsJoined: { type: Number, default: 0 },
    avatar: { type: String },
    wallet: {
      depositBalance: { type: Number, default: 0 },
      winningsBalance: { type: Number, default: 0 },
      bonusBalance: { type: Number, default: 0 },
    },
    totalWon: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

// Auto-generate 6-digit refId
UserSchema.pre('save', async function() {
  if (this.isNew && !this.refId) {
    let unique = false;
    let attempts = 0;
    while (!unique && attempts < 10) {
      const randomRef = Math.floor(100000 + Math.random() * 900000).toString();
      const existing = await (this.constructor as mongoose.Model<IUser>).findOne({ refId: randomRef });
      if (!existing) {
        this.refId = randomRef;
        unique = true;
      }
      attempts++;
    }
  }
});

// Virtual for totalBalance
UserSchema.virtual('wallet.totalBalance').get(function(this: any) {
  return this.wallet.depositBalance + this.wallet.winningsBalance + this.wallet.bonusBalance;
});

// Ensure virtuals are included in JSON/Object conversions
UserSchema.set('toJSON', { virtuals: true });
UserSchema.set('toObject', { virtuals: true });

const User = (mongoose.models.User as mongoose.Model<IUser>) || mongoose.model<IUser>('User', UserSchema);
export default User;
