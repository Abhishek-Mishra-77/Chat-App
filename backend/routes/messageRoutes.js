import { Router } from "express";
const router = Router();

import { sendMessage } from "../controllers/messageControllers.js";
import protectRoute from "../middleware/protectRoute.js";

router.post("/send/:id", protectRoute, sendMessage);

export default router;
