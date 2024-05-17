import { Schema, model } from 'mongoose';
import { QuizEntry } from './quiz';
import { quizEntrySchema } from './quiz';

interface IUser {
    username: string;
    email: string;
    password: string;
    quiz : QuizEntry[];
};

const userSchema = new Schema<IUser>({
    username: {type: String, required: true},
    email: {type: String, required: true },
    password: { type: String, required: true },
    quiz : quizEntrySchema,
});

const User = model<IUser>('User', userSchema)

export { User }; 