import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: [2, "Name must contain at least 2 characters"],
        maxlength: [50, "Name cannot exceed 50 characters"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        maxlength: [254, "Email is too long"]
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        select: false
    }
},
{
    timestamps: true
});
const User = mongoose.model("User", userSchema);

export default User;