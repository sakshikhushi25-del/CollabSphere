import Project from "../models/Project.js";
import User from "../models/User.js";
import crypto from "crypto";

export const createProject = async (req, res) => {
    try {
        const { title, description, status } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({
                message: "Project title is required"
            });
        }

        if (!description || !description.trim()) {
            return res.status(400).json({
                message: "Project descruption is required"
            })
        }

        const project = await Project.create({
            title: title.trim(),
            description: description.trim(),
            status: status || "Not Started",
            user: req.user.userId
        });
        return res.status(201).json({
            message: "Project created successfully",
            project
        })

    } catch (error) {
        console.log("Create project error:", error);
        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: error.message
            });
        }

        return res.status(500).json({
            message: "Failed to create project",
            error: error.message
        });
    }
}

export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find({
            $or: [
                { user: req.user.userId },
                { members: req.user.userId }
            ]
        }).sort({ createdAt: -1 });
        return res.status(200).json({
            count: projects.length,
            projects
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch projects"
        })
    }
}


export const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id)
            .populate("user", "name email")
            .populate("members", "name email");

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        const isOwner =
            project.user?._id?.toString() === req.user.userId;

        const isMember = project.members.some(
            (member) =>
                member._id.toString() === req.user.userId
        );

        if (!isOwner && !isMember) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        return res.status(200).json({
            project
        });

    } catch (error) {
        console.log("Get Project Error:", error);

        if (error.name === "CastError") {
            return res.status(400).json({
                message: "Invalid project ID"
            });
        }

        return res.status(500).json({
            message: "Failed to fetch project",
            error: error.message
        });
    }
};


export const deleteProject = async (req, res) => {
    try {
        const project = await Project.findOneAndDelete({
            _id: req.params.id,
            user: req.user.userId
        });

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }
        return res.status(200).json({
            message: "Project deleted successfully"
        });
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({
                message: "Invalid project ID"
            });
        }
        return res.status(500).json({
            message: "Failed to delete project"
        });
    }
}

export const updateProject = async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const project = await Project.findOneAndUpdate({
            _id: req.params.id,
            user: req.user.userId
        }, {
            title,
            description,
            status
        }, {
            new: true,
            runValidators: true
        });
        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }
        return res.status(200).json({
            message: "Project updated successfully",
            project
        })
    } catch (error) {
        if (error.name === "ValidationError" || error.name === "CastError") {
            return res.status(400).json({
                message: error.message
            })
        }
        return res.status(500).json({
            message: "Project not found"
        })
    }
}

export const inviteMember = async (req, res) => {
    try {
        const { email } = req.body;
        const { id } = req.params;

        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({
                message: "Project not founnd"
            });
        }

        if (project.user.toString() !== req.user.userId) {
            return res.status(403).json({
                message: "Only the project member can invite members."
            });
        }

        if (!email || !email.trim()) {
            return res.status(400).json({
                message: "Email is required"
            });
        }

        const inviteUser = await User.findOne({
            email: email.trim().toLowerCase()
        });

        if (!inviteUser) {
            return res.status(404).json({
                message: "No registered user found with this email"
            });
        }

        if (inviteUser._id.toString() === req.user.userId) {
            return res.status(400).json({
                message: "You cannot invite yourself"
            });
        }

        const alreadyMember = project.members.some(
            (memberId) => memberId.toString() === inviteUser._id.toString()
        );

        if (alreadyMember) {
            return res.status(409).json({
                message: "This user is already a project member"
            });
        }

        project.members.push(inviteUser._id);
        await project.save();

        return res.status(200).json({
            message: "Member invited successfully",
            member: {
                id: inviteUser._id,
                name: inviteUser.name,
                email: inviteUser.email
            }
        });
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({
                message: "Invalid project ID"
            });
        }
        return res.status(500).json({
            message: "Failed to invite member"
        })
    }
}

export const removeMember = async (req, res) => {
    try {
        const { id, memberId } = req.params;
        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        if (project.user.toString() !== req.user.userId) {
            return res.status(403).json({
                message: "Only the project owner can remove members"
            });
        }
        const isMember = project.members.some(
            (member) => member.toString() === memberId
        );

        if (!isMember) {
            return res.status(404).json({
                message: "Team member not found"
            })
        }
        project.members = project.members.filter(
            (member) => member.toString() !== memberId
        );
        await project.save();
        return res.status(200).json({
            message: "Team member removed successfully"
        });
    } catch (error) {
        console.log("Remove Member error:", error);
        if (error.name === "CastError") {
            return res.status(400).json({
                message: "Invalid project or member ID"
            })
        }
        return res.status(500).json({
            message: "Failed to remove team member"
        });
    }
}

export const enableProjectSharing = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        if (project.user.toString() !== req.user.userId) {
            return res.status(403).json({
                message: "Only the project owner can share this project"
            });
        }

        if (!project.shareToken) {
            project.shareToken = crypto.randomBytes(24).toString("hex");
        }

        project.isPublic = true;
        await project.save();

        return res.status(200).json({
            message: "Public sharing enabled",
            shareUrl: `${process.env.CLIENT_URL}/public/projects/${project.shareToken}`
        });
    } catch (error) {
        console.log("Enable Sharing Error:", error);
        return res.status(500).json({
            message: "Failed to enable project sharing"
        });
    }
};

export const disableProjectSharing = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        if (project.user.toString() !== req.user.userId) {
            return res.status(403).json({
                message: "Only the project owner can change sharing settings"
            });
        }

        project.isPublic = false;
        project.shareToken = undefined;

        await project.save();

        return res.status(200).json({
            message: "Public sharing disabled"
        });
    } catch (error) {
        console.log("Disable Sharing Error:", error);
        return res.status(500).json({
            message: "Failed to disable project sharing"
        });
    }
};