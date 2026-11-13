import Note from "../models/Note.js";

export const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const { projectId } = req.params;

        if (!title?.trim() || !content?.trim()) {
            return res.status(400).json({
                message: "Title and content are required"
            });
        }

        const note = await Note.create({
            title: title.trim(),
            content: content.trim(),
            project: projectId,
            createdBy: req.user.userId
        });

        return res.status(201).json({
            message: "Note created successfully",
            note
        });
    } catch (error) {
        console.log("Create Note Error:", error);
        return res.status(500).json({
            message: "Failed to create note",
            error: error.message
        });
    }
}

export const getProjectNotes = async (req, res) => {
    try {
        const notes = await Note.find({
            project: req.project._id
        })
            .populate("createdBy", "name email")
            .sort({ createdAt: -1 });

        return res.status(200).json({ notes });
    } catch (error) {
        console.log("Get Notes Error:", error);
        return res.status(500).json({
            message: "Failed to fetch notes"
        });
    }
}

export const updateNote = async (req, res) => {
    try {
        const { title, content, isPublic } = req.body;
        const note = await Note.findOne({
            _id: req.params.noteId,
            project: req.project._id
        });
        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            });
        }
        const isCreator = note.createdBy.toString() === req.user.userId;

        if (!isCreator && !req.isProjectOwner) {
            return res.status(403).json({
                message: "You cannot edit this note"
            });
        }
        if (title !== undefined) {
            if (!title.trim()) {
                return res.status(400).json({
                    message: "Title cannot be empty"
                });
            }
            note.title = title.trim();
        }

        if (content !== undefined) {
            if (!content.trim()) {
                return res.status(400).json({
                    message: "Content cannot be empty"
                });
            }
            note.content = content.trim();
        }

        if (isPublic !== undefined) {
            if (!req.isProjectOwner) {
                return res.status(403).json({
                    message: "Only the project owner can change note visibility"
                });
            }
            note.isPublic = Boolean(isPublic);
        }

        await note.save();

        return res.status(200).json({
            message: "Nte updated successfully",
            note
        });
    } catch (error) {
        console.log("Update Note Error:", error);
        return res.status(500).json({
            message: "Failed to update note"
        });
    }
}
export const deleteNote = async (req, res) => {
    try {
        const note = await Note.findOne({
            _id: req.params.noteId,
            project: req.project._id
        });

        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        const isCreator =
            note.createdBy.toString() === req.user.userId;

        if (!isCreator && !req.isProjectOwner) {
            return res.status(403).json({
                message: "You cannot delete this note"
            });
        }

        await note.deleteOne();

        return res.status(200).json({
            message: "Note deleted successfully"
        });
    } catch (error) {
        console.log("Delete Note Error:", error);
        return res.status(500).json({
            message: "Failed to delete note"
        });
    }
};