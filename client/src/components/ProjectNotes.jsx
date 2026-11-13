import { useEffect, useState } from "react";
import { createNote, getProjectNotes, updateNote, deleteNote } from "../services/api";

import NotesEditor from "./NotesEditor";
import NoteCard from "./NoteCard";

function ProjectNotes({ projectId }) {
    const [notes, setNotes] = useState([]);
    const [editingNote, setEditingNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    async function loadNotes() {
        try {
            setError("");
            const data = await getProjectNotes(projectId);
            setNotes(data.notes || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadNotes();
    }, [projectId]);

    async function handleSave(noteData) {
        try {
            setError("");
            setMessage("");

            if (editingNote) {
                await updateNote(
                    projectId,
                    editingNote._id,
                    noteData
                );

                setMessage("Note updated successfully");
                setEditingNote(null);
            } else {
                await createNote(projectId, noteData);
                setMessage("Note created successfully");
            }

            await loadNotes();
        } catch (err) {
            setError(err.message);
            throw err;
        }
    }

    async function handleDelete(noteId) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this note?"
        );

        if (!confirmed) return;

        try {
            await deleteNote(projectId, noteId);

            setNotes(prev =>
                prev.filter(note => note._id !== noteId)
            );

            setMessage("Note deleted successfully");
        } catch (err) {
            setError(err.message);
        }
    }

    if (loading) return <p>Loading notes...</p>;

    return (
        <section className="feature-section">
            <h2>Shared Project Notes</h2>

            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}

            <NotesEditor
                onSave={handleSave}
                editingNote={editingNote}
                onCancel={() => setEditingNote(null)}
            />

            <div className="notes-list">
                <h2>Saved Notes ({notes.length})</h2>

                {notes.length === 0 ? (
                    <p>No notes created yet.</p>
                ) : (
                    notes.map(note => (
                        <NoteCard
                            key={note._id}
                            note={note}
                            onEdit={setEditingNote}
                            onDelete={handleDelete}
                        />
                    ))
                )}
            </div>
        </section>
    );
}

export default ProjectNotes;
