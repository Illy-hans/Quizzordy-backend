"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const quiz_1 = require("./quiz");
;
const userSchema = new mongoose_1.Schema({
    username: { required: true },
    email: { required: true },
    password: { required: true },
    quiz: quiz_1.quizEntrySchema,
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.User = User;
