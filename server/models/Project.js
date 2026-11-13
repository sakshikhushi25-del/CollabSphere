import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Project title is required"],
        trim: true,
        minlength: 5,
        maxlength: 100
    },
    description: {
        type: String,
        required: [true, "Project description is required"],
        trim: true,
        minlength: 10,
        maxlength: 1000
    },
    status: {
        type: String,
        enum: ["Not Started", "In Progress", "Completed"],
        default: "Not Started"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    isPublic: {
        type: Boolean,
        default: false
    },
    shareToken: {
        type: String,
        unique: true,
        sparse: true
    }
},
    {
        timestamps: true
    });
const Project = mongoose.model("Project", projectSchema);

export default Project;