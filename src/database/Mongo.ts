import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();

export class MongoConnection {
    private static instance: MongoConnection;

    private constructor() {
        const url = process.env.MONGOURL;

        if (!url) {
            throw new Error("Environment variable MONGOURL is not defined");
        }
    }

    public static getInstance(): MongoConnection {
        if (!MongoConnection.instance) {
            MongoConnection.instance = new MongoConnection();
        }
        return MongoConnection.instance;
    }

    public async connect(): Promise<void> {
        try {
            const url = process.env.MONGOURL;

            if (!url) {
                throw new Error("Environment variable MONGOURL is not defined");
            }

            await mongoose.connect(url);

            console.log("Connection to MongoDB via Mongoose was successful: 200 OK");
        } catch (error) {
            console.error("Error occurred while connecting to MongoDB via Mongoose:", error);
            throw new Error(`Failed to connect to MongoDB via Mongoose: ${error}`);
        }
    }

    public async disconnect(): Promise<void> {
        try {
            await mongoose.disconnect();
            console.log("Disconnected from MongoDB via Mongoose");
        } catch (error) {
            console.error("Error occurred while disconnecting from MongoDB via Mongoose:", error);
            throw new Error(`Failed to disconnect from MongoDB via Mongoose: ${error}`);
        }
    }
}
