import { Router } from "express";
import {
  getInstruments,
  createInstrument,
  getInstrumentById,
  updateInstrument,
  deleteInstrument,
} from "../controllers/instruments.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.get("/api/instruments", auth, getInstruments);
router.post("/api/instruments", auth, createInstrument);
router.get("/api/instruments/:id", auth, getInstrumentById);
router.patch("/api/instruments/:id", auth, updateInstrument);
router.delete("/api/instruments/:id", auth, deleteInstrument);

export default router;
