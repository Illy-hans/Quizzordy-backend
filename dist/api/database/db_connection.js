"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectToDatabase = async () => {
    const mongoDbUrl = process.env.MONGODB_URL;
    if (!mongoDbUrl) {
        console.error("No MongoDB url provided.");
        throw new Error("No connection string provided");
    }
    try {
        await mongoose_1.default.connect(mongoDbUrl);
        if (process.env.NODE_ENV) {
            console.log("Successfully connected to MongoDB");
        }
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
};
exports.connectToDatabase = connectToDatabase;
