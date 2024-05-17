import { Schema, model } from 'mongoose';

interface Question {
    question: string;
    category: string;
    correct_answer: string;
    incorrect_answers: string[];
};

const questionSchema = new Schema<Question>({
    question: {required: true},
    category: {required: true},
    correct_answer: {required: true},
    incorrect_answers: {required: true},
}, { _id: true } );

const Question = model<Question>('Question', questionSchema)

export { Question };

