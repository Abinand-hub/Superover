import mongoose, { Schema, Document, Model } from 'mongoose';

export interface PlatformSettingsDocument extends Document {
  flashMessage: string;
  flashBadge?: string;
  isFlashActive?: boolean;
  banners?: any[];
  homeBanners?: string[];
  wheelProbabilities: {
    multiplier?: number;
    segment?: string;
    probability: number;
  }[];
  updatedAt: Date;
}

const PlatformSettingsSchema = new Schema(
  {
    flashMessage: { type: String, default: '⚡ Mega Jackpot Live: Predict 6 Stats in CSK vs MI & Win up to 500X Instant Cash! Guaranteed UPI Payouts within 5 minutes.' },
    flashBadge: { type: String, default: 'News 📰' },
    isFlashActive: { type: Boolean, default: true },
    banners: { type: [Schema.Types.Mixed], default: [] },
    homeBanners: { type: [String], default: [] },
    wheelProbabilities: {
      type: [{
        multiplier: Number,
        segment: String,
        probability: Number
      }],
      default: [
        { multiplier: 50, probability: 20 },
        { multiplier: 60, probability: 15 },
        { multiplier: 75, probability: 14 },
        { multiplier: 80, probability: 10 },
        { multiplier: 100, probability: 10 },
        { multiplier: 110, probability: 8 },
        { multiplier: 120, probability: 6 },
        { multiplier: 140, probability: 5 },
        { multiplier: 150, probability: 4 },
        { multiplier: 175, probability: 3 },
        { multiplier: 200, probability: 2 },
        { multiplier: 250, probability: 1 },
        { multiplier: 300, probability: 1 },
        { multiplier: 400, probability: 0.5 },
        { multiplier: 500, probability: 0.5 },
      ]
    },
    updatedAt: { type: Date, default: Date.now }
  }
);

const PlatformSettings: Model<PlatformSettingsDocument> = mongoose.models.PlatformSettings || mongoose.model<PlatformSettingsDocument>('PlatformSettings', PlatformSettingsSchema);

export default PlatformSettings;
