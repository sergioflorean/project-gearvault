import { Router } from "express";
import { rateLimit } from "express-rate-limit";
import { register, login, getProfile } from "../controllers/auth.js";
import { auth } from "../middleware/auth.js";
import { AUTH_RATE_LIMIT, ERROR_MESSAGES } from "../config/constants.js";

const router = Router();

const authLimiter = rateLimit({
  windowMs: AUTH_RATE_LIMIT.WINDOW_MS,
  limit: AUTH_RATE_LIMIT.MAX_REQUESTS,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    message: ERROR_MESSAGES.TOO_MANY_AUTH_ATTEMPTS,
  },
});
router.post("/signup", authLimiter, register);
router.post("/signin", authLimiter, login);
router.get("/users/me", auth, getProfile);

export default router;
