import { Router } from "express";
import { QuestionController } from "controllers/questionController";

const router = Router();

router.get("/", QuestionController.createQuiz);

export { router as questionsRouter};