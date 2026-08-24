import mongoose, { Schema, Document } from 'mongoose';

export interface ITransaction extends Document {
  userId: mongoose.Types.ObjectId;
  type: 'DEPOSIT' | 'WITHDRAWAL' | 'ENTRY_FEE' | 'PAYOUT' | 'BONUS' | 'FREE_HIT_FEE';
  amount: number;
  status: 'PENDING' | 'SUCCESS' | 'FAILED' | 'REJECTED';
  referenceId?: string; // e.g. slip ID or UPI reference
  createdAt: Date;
}

const TransactionSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['DEPOSIT', 'WITHDRAWAL', 'ENTRY_FEE', 'PAYOUT', 'BONUS', 'FREE_HIT_FEE'], required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['PENDING', 'SUCCESS', 'FAILED', 'REJECTED'], default: 'SUCCESS' },
    referenceId: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Transaction || mongoose.model<ITransaction>('Transaction', TransactionSchema);
