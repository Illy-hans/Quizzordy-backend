import { Router } from "express";
import { tokenChecker } from "../middleware/token_checker";
import { UsersController } from "../controllers/userController";
import { AuthenticationController } from "src/controllers/authenticationController";

const router: Router = Router();

router.post("/", AuthenticationController.create);
router.post("/authenticate", AuthenticationController.authenticate)
router.get("/:id", tokenChecker, UsersController.getAllUserData);
router.patch("/:id",tokenChecker, UsersController.updateUserData);
router.patch("/:id/addquiz", tokenChecker, UsersController.saveQuiz);

export { router as usersRouter };