
import cloudinary from "../config/cloudinary.js";
import File from "../models/File.js";
import { Readable } from "stream";

const uploadToCloudinary = (buffer, options) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    Readable.from(buffer).pipe(stream);
  });
};

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please select a file"
      });
    }

    const result = await uploadToCloudinary(req.file.buffer, {
      folder: `collabsphere/${req.project._id}`,
      resource_type: "raw"
    });

    const file = await File.create({
      originalName: req.file.originalname,
      fileUrl: result.secure_url,
      publicId: result.public_id,
      resourceType: result.resource_type,
      mimeType: req.file.mimetype,
      size: req.file.size,
      project: req.project._id,
      uploadedBy: req.user.userId
    });

    return res.status(201).json({
      message: "File uploaded successfully",
      file
    });
  } catch (error) {
    console.log("Upload File Error:", error);
    return res.status(500).json({
      message: "Failed to upload file"
    });
  }
};

export const getProjectFiles = async (req, res) => {
  try {
    const files = await File.find({
      project: req.project._id
    })
      .populate("uploadedBy", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({ files });
  } catch (error) {
    console.log("Get Files Error:", error);
    return res.status(500).json({
      message: "Failed to fetch files"
    });
  }
};

export const updateFileVisibility = async (req, res) => {
  try {
    if (!req.isProjectOwner) {
      return res.status(403).json({
        message: "Only the project owner can change file visibility"
      });
    }

    const file = await File.findOne({
      _id: req.params.fileId,
      project: req.project._id
    });

    if (!file) {
      return res.status(404).json({
        message: "File not found"
      });
    }

    file.isPublic = Boolean(req.body.isPublic);
    await file.save();

    return res.status(200).json({
      message: "File visibility updated",
      file
    });
  } catch (error) {
    console.log("Update File Visibility Error:", error);
    return res.status(500).json({
      message: "Failed to update file visibility"
    });
  }
};

export const deleteFile = async (req, res) => {
  try {
    const file = await File.findOne({
      _id: req.params.fileId,
      project: req.project._id
    });

    if (!file) {
      return res.status(404).json({
        message: "File not found"
      });
    }

    const isUploader =
      file.uploadedBy.toString() === req.user.userId;

    if (!isUploader && !req.isProjectOwner) {
      return res.status(403).json({
        message: "You cannot delete this file"
      });
    }

    await cloudinary.uploader.destroy(file.publicId, {
      resource_type: file.resourceType
    });

    await file.deleteOne();

    return res.status(200).json({
      message: "File deleted successfully"
    });
  } catch (error) {
    console.log("Delete File Error:", error);
    return res.status(500).json({
      message: "Failed to delete file"
    });
  }
};
