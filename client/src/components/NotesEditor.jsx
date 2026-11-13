import { useEffect, useState } from "react";
import MarkdownPreview from "./MarkdownPreview";

function NotesEditor({ onSave, editingNote, onCancel }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setTitle(editingNote?.title || "");
        setContent(editingNote?.content || "");
    }, [editingNote]);

    async function handleSubmit(e) {
        e.preventDefault();

        if (!title.trim() || !content.trim()) {
            return;
        }

        try {
            setLoading(true);

            await onSave({
                title: title.trim(),
                content: content.trim()
            });

            setTitle("");
            setContent("");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="notes-editor">
            <h2>
                {editingNote ? "Edit Note" : "Create New Note"}
            </h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter note title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    maxLength={100}
                    required
                />

                <textarea
                    placeholder="Write your Markdown content..."
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    maxLength={50000}
                    rows={10}
                    required
                />

                <div className="editor-actions">
                    <button type="submit" disabled={loading}>
                        {loading
                            ? "Saving..."
                            : editingNote
                                ? "Update Note"
                                : "Save Note"}
                    </button>

                    {editingNote && (
                        <button
                            type="button"
                            className="secondary-button"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            <h3>Live Markdown Preview</h3>

            <MarkdownPreview content={content} />
        </div>
    );
}

export default NotesEditor;
