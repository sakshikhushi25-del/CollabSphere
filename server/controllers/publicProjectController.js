import Project from "../models/Project.js";
import Note from "../models/Note.js";
import File from "../models/File.js";

export const getPublicProject = async (req, res) => {
  try {
    const project = await Project.findOne({
      shareToken: req.params.shareToken,
      isPublic: true
    }).select("title description status createdAt");

    if (!project) {
      return res.status(404).json({
        message: "Public project not found"
      });
    }

    const [notes, files] = await Promise.all([
      Note.find({
        project: project._id,
        isPublic: true
      })
        .select("title content createdAt")
        .sort({ createdAt: -1 }),

      File.find({
        project: project._id,
        isPublic: true
      })
        .select("originalName fileUrl mimeType size createdAt")
        .sort({ createdAt: -1 })
    ]);

    return res.status(200).json({
      project,
      notes,
      files
    });
  } catch (error) {
    console.log("Public Project Error:", error);
    return res.status(500).json({
      message: "Failed to fetch public project"
    });
  }
};