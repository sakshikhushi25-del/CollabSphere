import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import projectAccessMiddleware from "../middleware/projectAccessMiddleware.js";
import { getProjectAnalytics } from "../controllers/analyticsController.js";

const router = express.Router();

router.get(
  "/:projectId",
  authMiddleware,
  projectAccessMiddleware,
  getProjectAnalytics
);

export default router;