import { Router } from "express";
import { tokenChecker } from "../middleware/token_checker";
import { UsersController } from "../controllers/userController";

const router: Router = Router();

router.post("/", UsersController.create);
router.get("/", tokenChecker, UsersController.getAllUserData);
// router.patch("/",tokenChecker, UsersController.updateUserInfo);

export { router as usersRouter };