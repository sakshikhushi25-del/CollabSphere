import express from "express";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors({
    origin: "http://localhost:5173"
}));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

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