import { Router } from "express";
const router = Router();

import { login, signup, logout } from "../controllers/authControllers.js";

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;
