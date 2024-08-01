import { Router } from "express";
import { userLogin, userRegistration } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const userRouter = Router();

userRouter.route("/register").post(upload.single("avatar"), userRegistration);
userRouter.route("/login").post(userLogin);

export default userRouter;
