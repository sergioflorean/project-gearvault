import { Router } from "express";
import { register, login, getProfile } from "../controllers/auth.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.post("/signup", register);
router.post("/signin", login);
router.get("/users/me", auth, getProfile);

export default router;
