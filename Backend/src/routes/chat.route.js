import { Router } from "express";
import { allchats, singlechat } from "../controllers/chat.controller.js";

const chatRouter = Router();

chatRouter.route("/all").get(allchats);
chatRouter.route("/all/:chat_id").get(singlechat);

export default chatRouter;
