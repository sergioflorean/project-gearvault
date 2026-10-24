import "dotenv/config";

import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import { notFoundHandler, errorHandler } from "./middleware/error.js";
import instrumentRoutes from "./routes/instruments.js";

const app = express();

app.use(express.json());
app.use(authRoutes);
app.use(instrumentRoutes);

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    message: "GearVault server is running",
  });
});

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

mongoose
  .connect(process.env.MONGO_URI!, {
    maxPoolSize: 10,
  })
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  });

export default app;
