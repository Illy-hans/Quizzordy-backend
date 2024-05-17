import { ObjectId, Schema } from 'mongoose';

interface QuizEntry {
    score: Number;
    array: ObjectId[];
    createdAt: Date;
}

const quizEntrySchema = new Schema<QuizEntry>({
    score: { type: Number, required: true },
    array: [{ type: Schema.Types.ObjectId, ref: "Question" }],
    createdAt: { type: Date, default : Date.now, required: true }
});


export { quizEntrySchema }; 
export { QuizEntry }; 