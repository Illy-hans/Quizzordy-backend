"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_connection_1 = require("./api/database/db_connection");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const listenForRequests = () => {
    const port = process.env.PORT;
    if (!port) {
        throw new Error('PORT environment variable is not set');
    }
    app.listen(parseInt(port), () => {
        console.log("Now listening on port", port);
    });
};
(0, db_connection_1.connectToDatabase)().then(() => {
    listenForRequests();
});
