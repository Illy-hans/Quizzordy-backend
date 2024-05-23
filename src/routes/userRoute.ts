import { Router } from "express";
import { tokenChecker } from "../middleware/token_checker";
import { UsersController } from "../controllers/userController";

const router = Router();

router.post("/", UsersController.create);
// router.get("/", tokenChecker, UsersController.getAllUserInfo);
// router.patch("/",tokenChecker, UsersController.updateUserInfo);

export { router as usersRouter };