import { expect, it } from '@jest/globals';
import request from 'supertest';
import { Question } from '../../models/questionModel';
import app from '../../app';

describe("/questions", () => {
    
    describe("Quiz creation, random", () => {
        it("should pull 5 random questions matching Question model objects", async () => {
        const response = await request(app)
            .get("/questions")
            
        expect(response.statusCode).toBe(200);

        const questions = response.body.questions;
        expect(questions.length).toBe(5);

        const sampleQuestion: Partial<Question> = {
            question: expect.any(String) as unknown as string,
            category: expect.any(String) as unknown as string,
            correct_answer: expect.any(String) as unknown as string,
            incorrect_answers: expect.arrayContaining([expect.any(String)]) as unknown as string[]
        };

          // Check each question in the response
        questions.forEach((question: Partial<Question>) => {
            expect(question).toMatchObject(sampleQuestion);
        });
    });
    });
    
    describe("Quiz creation with a specific category", () => { 
        const category: string = "History";
        it("should pull category specific objects matching the Question model", async () => {
        const response = await request(app)
            .get("/questions")
            .query({ category: category});
        
        expect(response.statusCode).toBe(200);

        const questions = response.body.questions;

        expect(questions.length).toBe(5);
        questions.forEach((question:any) => {
            expect(question.category).toBe(category)
        });
        });
    });
});
