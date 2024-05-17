import { beforeEach, afterEach, expect, it, jest} from '@jest/globals';
require("api/test.setup.ts")
import { User } from '../../models/userModel';
import mongoose from 'mongoose';

describe('User Model Test', () => {
    it('should create & save a user successfully', async () => {
    const userData = {
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'securepassword',
        quiz: []
    };

    const validUser = new User(userData);
    const savedUser = await validUser.save();

      // Object Id should be defined when successfully saved to MongoDB.
    expect(savedUser._id).toBeDefined();
    expect(savedUser.username).toBe(userData.username);
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.password).toBe(userData.password);
    expect(savedUser.quiz).toEqual(userData.quiz);
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
    // expect(err.email).toBeDefined();
    });
});