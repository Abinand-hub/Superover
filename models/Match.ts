import mongoose, { Schema, Document } from 'mongoose';

export interface IMatch extends Document {
  apiId?: string; // ID from CricAPI
  title: string;
  series: string;
  format: string;
  team1: { name: string; code: string; logoUrl?: string };
  team2: { name: string; code: string; logoUrl?: string };
  matchStartTime: string;
  status: 'FETCHED' | 'DRAFT' | 'UPCOMING' | 'LIVE' | 'LOCKED' | 'COMPLETED';
  totalPool: number;
  totalEntries: number;
  entryFees: number[];
  questions: any[];
  squadTeam1: any[];
  squadTeam2: any[];
  actualResults?: any;
  liveScore?: string;
}

const MatchSchema: Schema = new Schema(
  {
    apiId: { type: String, unique: true, sparse: true },
    title: { type: String, required: true },
    series: { type: String, required: true },
    format: { type: String, required: true },
    team1: {
      name: { type: String, required: true },
      code: { type: String, required: true },
      logoUrl: { type: String },
    },
    team2: {
      name: { type: String, required: true },
      code: { type: String, required: true },
      logoUrl: { type: String },
    },
    matchStartTime: { type: String, required: true },
    status: { type: String, enum: ['FETCHED', 'DRAFT', 'UPCOMING', 'LIVE', 'LOCKED', 'COMPLETED'], default: 'FETCHED' },
    totalPool: { type: Number, default: 0 },
    totalEntries: { type: Number, default: 0 },
    entryFees: { type: [Number], default: [25, 50, 100] },
    questions: [{ type: Schema.Types.Mixed }],
    squadTeam1: [{ type: Schema.Types.Mixed }],
    squadTeam2: [{ type: Schema.Types.Mixed }],
    actualResults: { type: Schema.Types.Mixed },
    liveScore: { type: String, default: '' },
  },
  { timestamps: true }
);

const Match = (mongoose.models.Match as mongoose.Model<IMatch>) || mongoose.model<IMatch>('Match', MatchSchema);
export default Match;
