import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import projectAccessMiddleware from "../middleware/projectAccessMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

import {uploadFile, getProjectFiles, updateFileVisibility, deleteFile} from "../controllers/fileController.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/:projectId",projectAccessMiddleware, getProjectFiles);

router.post("/:projectId", projectAccessMiddleware, upload.single("file"), uploadFile);

router.patch("/:projectId/:fileId/visibility", projectAccessMiddleware, updateFileVisibility);

router.delete("/:projectId/:fileId", projectAccessMiddleware, deleteFile);

export default router;
