import { Router } from "express";
import { QuestionController } from "../controllers/questionController";

const router: Router = Router();

router.get("/", QuestionController.createQuiz);
router.get("/add", QuestionController.getQuestions);

export { router as questionsRouter};