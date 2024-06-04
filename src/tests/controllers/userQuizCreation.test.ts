import { expect, it } from '@jest/globals';
import request from 'supertest';
import { User, IUser } from '../../models/userModel';
import app from '../../app';
import mongoose from 'mongoose';
import { generateToken } from '../../middleware/token';

describe("User quiz record /users/addquiz", () => {
    let token: string;
    let user: mongoose.Document<any> & IUser;

    beforeAll(async () => {
        const newUser = new User({
            username: "Test user",
            email: "Test email",
            password: "12345678",
        });
        user = await newUser.save();
        token = generateToken(user._id);
    });

    afterAll(async () => {
        if (user) { 
            await user.deleteOne();
        }
    });

    describe("PATCH, creates a record of a quiz completed", () => {
        it("should save the quiz in the array for a user", async () => {

            // creates instances of ObjectIds 
            const questionArray1 = [
                '6659e2360dae48e36a7ae638',
                '6659e2360dae48e36a7ae639',
                '6659e2360dae48e36a7ae63a',
                '6659e2360dae48e36a7ae64a',
                '6659e2360dae48e36a7ae65a'
            ];

            const newQuiz = {
                score: 0.8,
                questionArray: questionArray1,
                createdAt: Date.now()
            }

            const response = await request(app)
                .patch(`/users/${user._id}/addquiz`)
                .send( newQuiz )
                .set("Authorization", `Bearer ${token}`);

            expect(response.status).toEqual(201);
            expect(response.body.message).toContain("Quiz added to user successfully");

            const user1 = await User.findById(user._id);

            // map object IDs to strings to test for equality 
            const userQuestionArray = user1.quiz[0].questionArray.map(id => id.toString());
            expect(userQuestionArray).toEqual(questionArray1);
            expect(user1.quiz[0].score).toBe(0.8);
        })
    });
})