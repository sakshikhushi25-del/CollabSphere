import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { createProject, getProjects, deleteProject, updateProject, getProjectById, inviteMember } from "../controllers/projectController.js";

const router = express.Router();

router.get("/", authMiddleware, getProjects);
router.get("/:id", authMiddleware, getProjectById);
router.post("/", authMiddleware, createProject);
router.post("/:id/invite", authMiddleware, inviteMember);
router.put("/:id", authMiddleware, updateProject);
router.delete("/:id", authMiddleware, deleteProject);

export default router;