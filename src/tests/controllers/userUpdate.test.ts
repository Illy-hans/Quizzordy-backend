import { expect, it } from '@jest/globals';
import request from 'supertest';
import { User, IUser } from '../../models/userModel';
import app from '../../app';
import mongoose from 'mongoose';
import { generateToken } from '../../middleware/token';


describe("User update tests- /users", () => {
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

    describe("GET, when a token is present", () => {
            it("should return all user data when a token is present", async () => {
                const response = await request(app)
                    .get("/users")
                    .set("Authorization", `Bearer ${token}`);
                
                expect(response.status).toEqual(200);
                const user1 = response.body;

                expect(user1.username).toContain("Test user");
                expect(user1.email).toContain("Test email");
            });
        })

    describe("GET, no token present", () => {
            it("should return no data without a token", async () => {
                const response = await request(app)
                    .get("/users")
                    .set("Authorization", `Bearer `);
                
                expect(response.status).toEqual(401)
            })
        });
    
    describe("PATCH, user data", () => { 
            it("should update when token is present", async () => {
            const response = await request(app)
                .patch(`/users/${user._id}`)
                .send({ username: "newUser"})
                .set("Authorization", `Bearer ${token}`);
            
            expect(response.status).toBe(200);
            expect(response.body.message).toContain("User updated");
            
            const updatedUser = await User.findById(user._id);
            expect(updatedUser.username).toBe("newUser");
        })
    })

    describe("PATCH fails when a token is missing", () => {
        it("should fail with a 401", async () => {
            const response = await request(app).patch("/users");
            
            expect(response.status).toEqual(401);
        })
    })
});


