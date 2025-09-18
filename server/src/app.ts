import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import vevRoutes from "./routes/vevRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import path from "path";
import { fileURLToPath } from "url";

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/vev", vevRoutes);

// Serve static files from `public`
app.use(express.static(path.join(__dirname, "../public")));

// Serve index.html specifically on /api
app.get("/api", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.use(errorHandler);

export default app;