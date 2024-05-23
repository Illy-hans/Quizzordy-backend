import mongoose from 'mongoose';
require('dotenv').config();

const connectToDatabase = async () : Promise<void> => {
    const mongoDbUrl: string = process.env.MONGODB_URL;

    if (!mongoDbUrl) {
        console.error("No MongoDB url provided.");
        throw new Error("No connection string provided");
    }

    try { 
    await mongoose.connect(mongoDbUrl);
    console.log("Successfully connected to MongoDB");
        
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
        }
    };
    

export { connectToDatabase };
