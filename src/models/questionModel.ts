import { Schema, model } from 'mongoose';

interface Question {
    question: string;
    category: string;
    correct_answer: string;
    incorrect_answers: string[];
};

const questionSchema = new Schema<Question>({
    question: {type: String, required: true},
    category: {type: String, required: true},
    correct_answer: {type: String, required: true},
    incorrect_answers: {type: [String], required: true},
});

const Question = model<Question>('Question', questionSchema)

export { Question };

