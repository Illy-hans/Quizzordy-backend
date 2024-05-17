"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const db_connection_1 = require("../../database/db_connection");
const globals_1 = require("@jest/globals");
globals_1.jest.mock('mongoose');
describe('connectToDatabase', () => {
    const mockConnect = mongoose_1.default.connect;
    (0, globals_1.beforeEach)(() => {
        process.env.MONGODB_URL = 'mongodb://localhost:27017/acebook_test';
        globals_1.jest.clearAllMocks();
    });
    (0, globals_1.afterEach)(() => {
        delete process.env.MONGODB_URL;
    });
    it('should connect to MongoDB successfully', async () => {
        mockConnect.mockResolvedValueOnce(mongoose_1.default);
        await (0, db_connection_1.connectToDatabase)();
        (0, globals_1.expect)(mockConnect).toHaveBeenCalledWith(process.env.MONGODB_URL);
        (0, globals_1.expect)(console.log).toHaveBeenCalledWith('Successfully connected to MongoDB');
    });
    it('should throw an error if no MongoDB URL is provided', async () => {
        process.env.MONGODB_URL = '';
        await (0, globals_1.expect)((0, db_connection_1.connectToDatabase)()).rejects.toThrow('No connection string provided');
        (0, globals_1.expect)(console.error).toHaveBeenCalledWith('No MongoDB URL provided.');
    });
    it('should log an error if connection fails', async () => {
        const error = new Error('Connection error');
        mockConnect.mockRejectedValueOnce(error);
        await (0, globals_1.expect)((0, db_connection_1.connectToDatabase)()).rejects.toThrow(error);
        (0, globals_1.expect)(console.error).toHaveBeenCalledWith('Error connecting to MongoDB:', error);
    });
});
