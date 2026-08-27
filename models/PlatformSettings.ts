import mongoose, { Schema, Document, Model } from 'mongoose';

export interface PlatformSettingsDocument extends Document {
  flashMessage: string;
  homeBanners: string[];
  wheelProbabilities: {
    segment: string; // e.g. "75X", "100X"
    probability: number; // 0 to 100
  }[];
  updatedAt: Date;
}

const PlatformSettingsSchema = new Schema<PlatformSettingsDocument>({
  flashMessage: { type: String, default: 'Welcome to SuperOver!' },
  homeBanners: { type: [String], default: [] },
  wheelProbabilities: {
    type: [{
      segment: String,
      probability: Number
    }],
    default: [
      { segment: '75X', probability: 40 },
      { segment: '100X', probability: 25 },
      { segment: '150X', probability: 15 },
      { segment: '200X', probability: 10 },
      { segment: '500X', probability: 1 },
      { segment: 'Oops', probability: 9 } // Total must equal 100
    ]
  },
  updatedAt: { type: Date, default: Date.now }
});

const PlatformSettings: Model<PlatformSettingsDocument> = mongoose.models.PlatformSettings || mongoose.model<PlatformSettingsDocument>('PlatformSettings', PlatformSettingsSchema);

export default PlatformSettings;
