import { expect, it } from '@jest/globals';
import request from 'supertest';
import { Question } from '../../models/questionModel';
import app from '../../app';

describe("/questions", () => {
    
    describe("Quiz creation, random", () => {
        it("should pull 5 random questions", async () => {
        const response = await request(app)
            .get("/questions")
            
        expect(response.statusCode).toBe(200);

        const questions = response.body.questions;
        expect(questions.length).toBe(5);
        });
    })
    
    describe("Quiz creation with a specific category", () => { 
        const category: string = "History";
        it("should pull category specific questions when specified", async () => {
        const response = await request(app)
            .get("/questions")
            .query({ category: category});
        
        expect(response.statusCode).toBe(200);

        const questions = response.body.questions;

        expect(questions.length).toBe(5);
        questions.forEach((question:any) => {
            expect(question.category).toBe(category)
        });
        })
    })
});
