import Note from "../models/Note.js";
import File from "../models/File.js";

export const getProjectAnalytics = async (req, res) => {
  try {
    const projectId = req.project._id;

    const [notesByMember, filesByMember, totalNotes, totalFiles] =
      await Promise.all([
        Note.aggregate([
          { $match: { project: projectId } },
          {
            $group: {
              _id: "$createdBy",
              noteCount: { $sum: 1 }
            }
          }
        ]),

        File.aggregate([
          { $match: { project: projectId } },
          {
            $group: {
              _id: "$uploadedBy",
              fileCount: { $sum: 1 }
            }
          }
        ]),

        Note.countDocuments({ project: projectId }),
        File.countDocuments({ project: projectId })
      ]);

    const userIds = [
      ...new Set([
        ...notesByMember.map(item => item._id.toString()),
        ...filesByMember.map(item => item._id.toString())
      ])
    ];

    const User = (await import("../models/User.js")).default;

    const users = await User.find({
      _id: { $in: userIds }
    }).select("name email");

    const contributions = users.map(user => {
      const noteData = notesByMember.find(
        item => item._id.toString() === user._id.toString()
      );

      const fileData = filesByMember.find(
        item => item._id.toString() === user._id.toString()
      );

      return {
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        },
        notesCreated: noteData?.noteCount || 0,
        filesUploaded: fileData?.fileCount || 0,
        totalContributions:
          (noteData?.noteCount || 0) + (fileData?.fileCount || 0)
      };
    });

    return res.status(200).json({
      summary: {
        totalNotes,
        totalFiles,
        totalContributions: totalNotes + totalFiles
      },
      contributions
    });
  } catch (error) {
    console.log("Analytics Error:", error);
    return res.status(500).json({
      message: "Failed to fetch project analytics"
    });
  }
};
