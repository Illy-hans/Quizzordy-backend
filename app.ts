import { connectToDatabase } from "./src/config/db_connection";
import express, { Application } from 'express';
import dotenv from 'dotenv'; 
require('dotenv').config();

const app: Application = express();

const listenForRequests = (): void => {
    const port : string | undefined = process.env.PORT;

    if (!port) {
        throw new Error('PORT environment variable is not set');
    }

    app.listen(parseInt(port), () => {
        console.log("Now listening on port", port);
    });
};

connectToDatabase().then(() => {
    listenForRequests();
});

