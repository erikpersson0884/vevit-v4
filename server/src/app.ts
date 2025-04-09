import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import vevRoutes from "./routes/vevRoutes";
import authRoutes from "./routes/authRoutes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/vev", vevRoutes);

app.use(errorHandler);

export default app;