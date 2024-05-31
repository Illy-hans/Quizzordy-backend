import { expect, it, beforeAll, afterAll } from '@jest/globals';
import { User } from '../../models/userModel';
import mongoose from 'mongoose';
import { connectToDatabase } from '../../config/db_connection';

beforeAll(async () => {
    await connectToDatabase();
});

afterAll(async () => {
    await mongoose.connection.close();
})
describe('User Model Test', () => {
    // beforeEach(async () => {
    //     await User.deleteMany({});
    // });

    it('should create and save a user successfully', async () => {
        const userData = {
            username: "testuser",
            email: "testuser@example.com",
            password: "securepasswor",
        };

        const validUser = new User(userData);
        const savedUser = await validUser.save();

        expect(savedUser._id).toBeDefined();
        expect(savedUser.username).toBe(userData.username);
        expect(savedUser.email).toBe(userData.email);
        // expect(savedUser.password).toBe(userData.password);
        });

    it('should fail to create user without required field', async () => {
        const userData = {
            username: 'testuser',
            //  no email
            password: 'securepassword',
            quiz: []
            };

        const invalidUser = new User(userData);
        let err;
            try {
                await invalidUser.save();
            } catch (error) {
                err = error;
            }

        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    });
});