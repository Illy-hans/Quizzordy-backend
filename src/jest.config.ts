import mongoose from "mongoose";
import { connectToDatabase } from "./config/db_connection";

beforeAll(async () => {
    await connectToDatabase();
});

afterAll(async () => {
    await mongoose.connection.close();
})