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
    username: {required: true},
    email: {required: true },
    password: { required: true },
    quiz : quizEntrySchema,
});

const User = model<IUser>('User', userSchema)

export { User }; 