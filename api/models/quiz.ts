import { ObjectId, Schema } from 'mongoose';

interface QuizEntry {
    score: number;
    array: ObjectId[];
    createdAt: Date;
}

const quizEntrySchema = new Schema<QuizEntry>({
    score: { required: true },
    array: [{ type: Schema.Types.ObjectId, ref: "Question" }],
    createdAt: { default : Date.now, required: true }
});


export { quizEntrySchema }; 
export { QuizEntry }; 