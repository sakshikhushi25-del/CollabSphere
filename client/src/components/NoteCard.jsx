import MarkdownPreview from "./MarkdownPreview";

function NoteCard({ note, onEdit, onDelete }) {
    return (
        <div className="note-card">
            <div className="note-card-header">
                <div>
                    <h3>{note.title}</h3>

                    <p className="note-meta">
                        Created by {note.createdBy?.name || "Unknown"}
                    </p>
                </div>

                <span className="note-visibility">
                    {note.isPublic ? "Public" : "Private"}
                </span>
            </div>

            <MarkdownPreview content={note.content} />

            <div className="note-actions">
                <button onClick={() => onEdit(note)}>
                    Edit
                </button>

                <button
                    className="danger-button"
                    onClick={() => onDelete(note._id)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default NoteCard;