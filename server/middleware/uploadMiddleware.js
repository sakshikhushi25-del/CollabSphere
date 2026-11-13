
import multer from "multer";

const allowedTypes = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "application/pdf",
  "text/plain",
  "text/markdown",
  "text/css",
  "text/javascript",
  "application/javascript",
  "application/json",
  "text/html",
  "text/xml",
  "application/xml",
  "application/zip"
];

const storage = multer.memoryStorage();

const fileFilter = (req, file, callback) => {
  if (allowedTypes.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(new Error("This file type is not allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,
    files: 1
  }
});

export default upload;
