require('dotenv').config();
import { connectToDatabase } from "./config/db_connection";
import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import { usersRouter } from "./routes/userRoute";
import { tokenChecker } from "./middleware/token_checker";
import { questionsRouter } from "./routes/questionRoute";

const app: Application = express();

app.use(cors({ credentials: true }));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const loggerMiddleware = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next(); 
};
app.use('/users', loggerMiddleware, usersRouter, tokenChecker);
app.use('/questions', loggerMiddleware, questionsRouter);

// No app.listen()!
// Instead, ensure DB is connected when app is loaded
connectToDatabase().catch((err) => {
    console.error("Database connection failed:", err);
});

export default app;