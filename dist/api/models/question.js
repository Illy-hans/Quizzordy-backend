"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Question = void 0;
const mongoose_1 = require("mongoose");
;
const questionSchema = new mongoose_1.Schema({
    question: { required: true },
    category: { required: true },
    correct_answer: { required: true },
    incorrect_answers: { required: true },
}, { _id: true });
const Question = (0, mongoose_1.model)('Question', questionSchema);
exports.Question = Question;
