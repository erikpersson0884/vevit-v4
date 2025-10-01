import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import vevRoutes from "./routes/vevRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import achievementRoutes from "./routes/achievementRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/vev", vevRoutes);
app.use("/api/achievements", achievementRoutes);

app.use(errorHandler);

export default app;