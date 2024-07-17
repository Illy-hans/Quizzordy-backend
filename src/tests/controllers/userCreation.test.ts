import { expect, it } from '@jest/globals';
import request from 'supertest';
import { User, IUser } from '../../models/userModel';
import app from '../../app';
import mongoose from 'mongoose';

describe("/users", () => {
    let newUser: mongoose.Document<any> & IUser;

    afterEach(async () => {
        await newUser.deleteOne();
    });
    
    describe("POST, when username, email and password are provided", () => {
        it("should create a user", async () => {
        const response = await request(app)
            .post("/users")
            .send({ username: "newUser", email: "newUser@email.com", password: "1234" });
        
        console.log(response.body)
        expect(response.statusCode).toBe(201);

        newUser = await User.findOne({ username: "newUser"});
        expect(newUser.email).toEqual("newUser@email.com");
        expect(newUser.username).toEqual("newUser");
        });
    });

    describe("POST, a new account cannot be created with existing email", () => {
        it("should return a 401 error with a message", async () => {
        const response = await request(app)
            .post("/users")
            .send({ username: "Kora", email: "scarconstt@email.com", password: "1234" });

        expect(response.statusCode).toBe(401);
        expect(response.text).toContain("Email already in use")
        })
    })
});
