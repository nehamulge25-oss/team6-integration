import { Router } from "express";
import { sendTextMessage } from "../controllers/meta.controller.js";

const router = Router();

router.post("/messages", sendTextMessage);

export default router;