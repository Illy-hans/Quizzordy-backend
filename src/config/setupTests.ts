import mongoose from "mongoose";
import { connectToDatabase } from "./db_connection";

beforeAll(async () => {
    await connectToDatabase();
});

afterAll(async () => {
    await mongoose.connection.close();
})