import mongoose from "mongoose";
// import Project from "./Project.js";

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100
    },
    content: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50000
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    isPublic: {
        type: Boolean,
        default: false
    }
},{timestamps: true}
);

const Note = mongoose.model("Note", noteSchema);
export default Note;