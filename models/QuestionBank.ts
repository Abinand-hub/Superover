import mongoose, { Schema, Document } from 'mongoose';

export interface IQuestionBank extends Document {
  title: string;
  shortTitle: string;
  subtitle: string;
  type: string;
  optionsType: 'FIXED' | 'DYNAMIC_SQUAD';
  options?: string[];
  iconName: string;
}

const QuestionBankSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    shortTitle: { type: String, required: true },
    subtitle: { type: String, required: true },
    type: { type: String, enum: ['PLAYER', 'TEAM', 'NUMBER', 'YES_NO', 'MULTIPLE_CHOICE'], required: true },
    optionsType: { type: String, enum: ['FIXED', 'DYNAMIC_SQUAD'], required: true },
    options: [{ type: String }],
    iconName: { type: String, required: true, default: 'STAR' },
  },
  { timestamps: true }
);

const QuestionBank = (mongoose.models.QuestionBank as mongoose.Model<IQuestionBank>) || mongoose.model<IQuestionBank>('QuestionBank', QuestionBankSchema);
export default QuestionBank;
