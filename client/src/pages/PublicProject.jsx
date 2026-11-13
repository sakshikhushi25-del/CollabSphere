import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getPublicProject } from "../services/api";
import MarkdownPreview from "../components/MarkdownPreview";

function PublicProject() {
    const { shareToken } = useParams();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadProject() {
            try {
                const result = await getPublicProject(shareToken);
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        loadProject();
    }, [shareToken]);

    if (loading) return <p>Loading public project...</p>;

    if (error) {
        return (
            <div className="public-project">
                <h2>Project Unavailable</h2>
                <p>{error}</p>
            </div>
        );
    }

    if (!data) return null;

    const { project, notes, files } = data;

    return (
        <main className="public-project">
            <header>
                <h1>{project.title}</h1>
                <p>{project.description}</p>
                <span>{project.status}</span>
            </header>

            <section>
                <h2>Public Notes</h2>

                {notes.length === 0 ? (
                    <p>No public notes available.</p>
                ) : (
                    notes.map(note => (
                        <article className="note-card" key={note._id}>
                            <h3>{note.title}</h3>
                            <MarkdownPreview content={note.content} />
                        </article>
                    ))
                )}
            </section>

            <section>
                <h2>Public Files</h2>

                {files.length === 0 ? (
                    <p>No public files available.</p>
                ) : (
                    files.map(file => (
                        <div className="file-card" key={file._id}>
                            <p>{file.originalName}</p>

                            <a
                                href={file.fileUrl}
                                target="_blank"
                                rel="noreferrer"
                            >
                                View / Download
                            </a>
                        </div>
                    ))
                )}
            </section>

            <p className="read-only-label">
                Public read-only project
            </p>
        </main>
    );
}

export default PublicProject;