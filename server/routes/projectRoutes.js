import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { createProject, getProjects, deleteProject, updateProject, getProjectById, inviteMember, removeMember, enableProjectSharing, disableProjectSharing } from "../controllers/projectController.js";

const router = express.Router();

router.get("/", authMiddleware, getProjects);
router.get("/:id", authMiddleware, getProjectById);
router.post("/", authMiddleware, createProject);
router.post("/:id/invite", authMiddleware, inviteMember);
router.put("/:id", authMiddleware, updateProject);
router.delete("/:id", authMiddleware, deleteProject);
router.delete("/:id/members/:memberId", authMiddleware, removeMember)
router.post("/:id/share", authMiddleware, enableProjectSharing);
router.delete("/:id/share", authMiddleware, disableProjectSharing);


export default router;