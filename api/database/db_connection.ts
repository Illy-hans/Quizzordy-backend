import mongoose from 'mongoose';

const connectToDatabase = async () : Promise<void> => {
    const mongoDbUrl: string | undefined = process.env.MONGODB_URL;

    if (!mongoDbUrl) {
        console.error("No MongoDB url provided.");
        throw new Error("No connection string provided");
    }

    try { 
    await mongoose.connect(mongoDbUrl);

    if (process.env.NODE_ENV) {
        console.log("Successfully connected to MongoDB");
        }
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
        }
    };
    

export { connectToDatabase };
