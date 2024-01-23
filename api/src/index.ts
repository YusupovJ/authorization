import "reflect-metadata";
import express from "express";
import env from "./config/env.config";
import db from "./config/db.config";
import authRoute from "./routes/authRoute";

const app = express();
const port = env.PORT;

app.use(express.json());
app.use("/auth", authRoute);

const start = async () => {
    try {
        await db.initialize();

        console.log("Connected to database");

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
