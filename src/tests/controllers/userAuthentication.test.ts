import { expect, it } from '@jest/globals';
import request from 'supertest';
import { User, IUser } from '../../models/userModel';
import app from '../../app';
import mongoose from 'mongoose';

describe("User authentication tests- /users/authenticate", () => {
    let user: mongoose.Document<any> & IUser;

    beforeAll(async () => {
        const newUser = new User({
            username: "Test user",
            email: "test@email.com",
            password: "12345678",
        });
        user = await newUser.save();
    });

    afterAll(async () => {
        if (user) { 
            await user.deleteOne();
        }
    });

    describe("POST /users/authenticate", () => {
        it("should return a token when credentials are correct", async () => {
            const response = await request(app)
                .post("/users/authenticate")
                .send({
                    email: "test@email.com",
                    password: "12345678"
                });
            
            console.log(response.body)
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message', 'Authentication successful');
            expect(response.body).toHaveProperty('token');
        });

        it("should return 404 when user is not found", async () => {
            const response = await request(app)
                .post("/users/authenticate")
                .send({
                    email: "nonexistent@email.com",
                    password: "30448430"
                });

            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty('message', 'User not found');
        });
    });
});