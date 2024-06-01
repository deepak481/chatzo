import { Router } from "express";
import {
  userLogin,
  userRegisteration,
} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.route("/register").post(userRegisteration);
userRouter.route("/login").post(userLogin);

export default userRouter;
