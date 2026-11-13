import { useEffect, useState } from "react";
import { getProjectFiles, deleteFile } from "../services/api";

function FileList({ projectId, refreshKey }) {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function loadFiles() {
        try {
            setError("");
            const data = await getProjectFiles(projectId);
            setFiles(data.files || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadFiles();
    }, [projectId, refreshKey]);

    async function handleDelete(fileId) {
        if (!window.confirm("Delete this file?")) return;

        try {
            await deleteFile(projectId, fileId);

            setFiles(prev =>
                prev.filter(file => file._id !== fileId)
            );
        } catch (err) {
            setError(err.message);
        }
    }

    if (loading) return <p>Loading files...</p>;

    return (
        <section className="file-list">
            <h3>Project Files ({files.length})</h3>

            {error && <p className="error-message">{error}</p>}

            {files.length === 0 ? (
                <p>No files uploaded yet.</p>
            ) : (
                files.map(file => (
                    <div className="file-card" key={file._id}>
                        <div>
                            <strong>{file.originalName}</strong>

                            <p>
                                Uploaded by:{" "}
                                {file.uploadedBy?.name || "Unknown"}
                            </p>

                            <p>
                                {(file.size / 1024).toFixed(2)} KB
                            </p>
                        </div>

                        {file.mimeType?.startsWith("image/") &&
                            file.resourceType === "image" && (
                                <img
                                    src={file.fileUrl}
                                    alt={file.originalName}
                                    className="file-preview"
                                />
                            )}

                        {file.mimeType?.startsWith("text/") && (
                            <a
                                href={file.fileUrl}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Open Text File
                            </a>
                        )}

                        <a
                            href={file.fileUrl}
                            target="_blank"
                            rel="noreferrer"
                        >
                            Download / Open
                        </a>

                        <button
                            className="danger-button"
                            onClick={() => handleDelete(file._id)}
                        >
                            Delete
                        </button>
                    </div>
                ))
            )}
        </section>
    );
}

export default FileList;
