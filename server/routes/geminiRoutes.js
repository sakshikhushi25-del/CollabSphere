
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import projectAccessMiddleware from "../middleware/projectAccessMiddleware.js";

import {
  explainContent,
  improveContent,
  generateDocs,
  generateReadme
} from "../controllers/geminiController.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/:projectId/explain", projectAccessMiddleware, explainContent);
router.post("/:projectId/improve", projectAccessMiddleware, improveContent);
router.post("/:projectId/docs", projectAccessMiddleware, generateDocs);
router.post("/:projectId/readme", projectAccessMiddleware, generateReadme);

export default router;
