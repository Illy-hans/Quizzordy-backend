import { ObjectId, Schema } from 'mongoose';

interface QuizEntry {
    score: Number;
    questionArray: ObjectId[];
    createdAt: Date;
}

const quizEntrySchema = new Schema<QuizEntry>({
    score: { type: Number, required: true },
    questionArray: [{ type: Schema.Types.ObjectId, ref: "Question" }],
    createdAt: { type: Date, default : Date.now, required: true }
});

export { quizEntrySchema }; 
export { QuizEntry }; 