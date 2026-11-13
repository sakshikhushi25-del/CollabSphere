import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import projectAccessMiddleware from "../middleware/projectAccessMiddleware.js";
import {createNote, getProjectNotes, updateNote, deleteNote} from "../controllers/noteController.js";

const router = express.Router();

router.use(authMiddleware);
router.get("/:projectId", projectAccessMiddleware, getProjectNotes);
router.post("/:projectId", projectAccessMiddleware, createNote);
router.put("/:projectId/:noteId", projectAccessMiddleware, updateNote);
router.delete("/:projectId/:noteId", projectAccessMiddleware, deleteNote);

export default router;