import { expect, it } from '@jest/globals';
import { User, IUser } from '../../models/userModel';
import mongoose from 'mongoose';

describe('User Model Test', () => {
    let createdUser: mongoose.Document<any> & IUser;

    afterEach(async () => {
        if (createdUser) {
                await createdUser.deleteOne();
            }
    });

    it('should create and save a user successfully', async () => {
        const userData = {
            username: "testuser",
            email: "testuser@example.com",
            password: "securepasswor",
        };

        const validUser = new User(userData);
        const savedUser = await validUser.save();
        createdUser = savedUser;

        expect(savedUser._id).toBeDefined();
        expect(savedUser.username).toBe(userData.username);
        expect(savedUser.email).toBe(userData.email);
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