import { configDotenv } from "dotenv";
import { MongoConnection } from "./database/Mongo";
import express from "express";

configDotenv();

const server = express();

const PORT = process.env.PORT;

server.use(express.json());

server.use('/api', (req, res) => {
    res.send({ message: "API is running!" });
});

const startServer = async () => {
    try {
        await MongoConnection.getInstance().connect();

        server.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start the server:", error);
        process.exit(1); 
    }
};


startServer();
