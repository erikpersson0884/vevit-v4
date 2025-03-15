import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/user", userRoutes);

export default app;