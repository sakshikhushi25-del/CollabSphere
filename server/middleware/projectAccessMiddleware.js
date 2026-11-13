
import Project from "../models/Project.js";

const projectAccessMiddleware = async (req, res, next) => {
    try {
        const projectId = req.params.projectId || req.params.id;
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(401).json({
                message: "Authentication required"
            });
        }

        if (!projectId) {
            return res.status(400).json({
                message: "Project ID is required"
            });
        }

        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        const isOwner =
            project.user.toString() === userId.toString();

        const isMember = project.members.some(
            member => member.toString() === userId.toString()
        );

        if (!isOwner && !isMember) {
            return res.status(403).json({
                message: "You do not have access to this project"
            });
        }

        req.project = project;
        req.isProjectOwner = isOwner;

        next();

    } catch (error) {
        console.log("Project Access Error:", error);

        if (error.name === "CastError") {
            return res.status(400).json({
                message: "Invalid project ID"
            });
        }

        return res.status(500).json({
            message: "Failed to verify project access"
        });
    }
};

export default projectAccessMiddleware;