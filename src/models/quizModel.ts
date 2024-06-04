import mongoose, { Schema, model } from 'mongoose';

interface QuizEntry {
    score: Number;
    questionArray: mongoose.Types.ObjectId[];
    createdAt: Date;
}

const quizEntrySchema = new Schema<QuizEntry>({
    score: { type: Number, required: true, default: 0 },
    questionArray: [{ type: mongoose.Types.ObjectId, ref: "Question" }],
    createdAt: { type: Date, default : Date.now, required: true }
});

const quiz = model<QuizEntry>('Quiz', quizEntrySchema)

export { quizEntrySchema }; 
export { QuizEntry, quiz }; 