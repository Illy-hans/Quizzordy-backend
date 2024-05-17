"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizEntrySchema = void 0;
const mongoose_1 = require("mongoose");
const quizEntrySchema = new mongoose_1.Schema({
    score: { required: true },
    array: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Question" }],
    createdAt: { default: Date.now, required: true }
});
exports.quizEntrySchema = quizEntrySchema;
