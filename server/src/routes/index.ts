import { Router } from "express";
import authRoutes from "./auth.js";
import instrumentRoutes from "./instruments.js";

const router = Router();

router.use(authRoutes);
router.use(instrumentRoutes);

export default router;
