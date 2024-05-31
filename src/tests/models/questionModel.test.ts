import { expect, it, beforeAll, afterAll } from '@jest/globals';
import { Question } from '../../models/questionModel';
import mongoose from 'mongoose';
import { connectToDatabase } from '../../config/db_connection';

// beforeAll(async () => {
//     await connectToDatabase();
// });

// afterAll(async () => {
//     await mongoose.connection.close();
// })

// describe('Question model test', () => {
//     // beforeEach(async () => {
//     //     await Question.deleteMany({});
//     // });

//     it('should create and save a question successfully', async () => {
//         const questionData = {
//             question: "Who's the author of: Who's afraid of Virginia Woolf?",
//             category: "Literary Fiction",
//             correct_answer: "Virginia Woolf",
//             incorrect_answers: ["Bram Stoker, Lady Gaga, Jill Scott"]
//         };

//         const validQuestion = new Question(questionData);
//         const savedQuestion = await validQuestion.save();

//         expect(savedQuestion._id).toBeDefined();
//         expect(savedQuestion.question).toBe(questionData.question);
//         expect(savedQuestion.category).toBe(questionData.category);
//         expect(savedQuestion.incorrect_answers).toEqual(questionData.incorrect_answers);
//     });

//     it('should fail to create user without required field', async () => {
//         const questionData = {
//             question: "Who's the author of: Who's afraid of Virginia Woolf?",
//             correct_answer: "Virginia Woolf",
//             incorrect_answers: ["Bram Stoker, Lady Gaga, Jill Scott"]
//         };

//         const invalidQuestion = new Question(questionData);
//         let err;
//             try {
//                 await invalidQuestion.save();
//             } catch (error) {
//                 err = error;
//             }

//         expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
//     });
// });