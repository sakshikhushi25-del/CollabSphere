import dotenv from "dotenv/config";

import express from "express";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import cors from "cors";
import noteRoutes from "./routes/noteRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";
import geminiRoutes from "./routes/geminiRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import publicProjectRoutes from "./routes/publicProjectRoutes.js";

console.log(
    "Gemini API Key Loaded:",
    Boolean(process.env.GEMINI_API_KEY)
);

const app = express();
app.use(cors({
    origin: "http://localhost:5173"
}));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/gemini", geminiRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/public/projects", publicProjectRoutes);


app.get("/", (req, res) => {
    res.send("Welcome to CollabSphere Api!");
})

const startServer = async () => {
    try {
        await connectDB();
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch(error) {
        console.error("Failed to start server:", error.message);
        process.getMaxListeners(1);
    }
}
startServer();