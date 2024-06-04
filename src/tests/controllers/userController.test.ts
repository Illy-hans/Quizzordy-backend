import { expect, it } from '@jest/globals';
import request from 'supertest';
import { User, IUser } from '../../models/userModel';
import app from '../../app';
import mongoose from 'mongoose';

describe("/users", () => {
    let newUser: mongoose.Document<any> & IUser;

    afterEach(async () => {
        if (newUser ) {
            await newUser.deleteOne();
        }
    });
    
    describe("POST, when username, email and password are provided", () => {
        it("should create a user", async () => {
        const response = await request(app)
            .post("/users")
            .send({ username: "Kora1", email: "scarconstt1@email.com", password: "1234" });

        expect(response.statusCode).toBe(201);

        newUser = await User.findOne({ username: "Kora"});
        expect(newUser.email).toEqual("scarconstt@email.com");
        expect(newUser.username).toEqual("Kora");
        });
    });

    describe("POST, a new account cannot be created with existing email", () => {
        it("should return a 401 error with a message", async () => {
        const response = await request(app)
            .post("/users")
            .send({ username: "Kora", email: "scarconstt@email.com", password: "1234" });

        console.log(response)
        expect(response.statusCode).toBe(401);
        expect(response.text).toContain("Email already in use")
        })

    })
});
