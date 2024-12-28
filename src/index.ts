import { configDotenv } from "dotenv";
import { MongoConnection } from "./database/Mongo";
import express from "express";
import router from "./routes/Router";

configDotenv();

const server = express();

const PORT = process.env.PORT;

server.use(express.json());

// server.use('/', (req, res) => {
//     res.send({ message: "API is running!" });
// });

server.use('/api', router)

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
