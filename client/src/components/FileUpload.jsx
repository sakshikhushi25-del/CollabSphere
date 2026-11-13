import { useState } from "react";
import { uploadFile } from "../services/api";

function FileUpload({ projectId, onUploaded }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    async function handleUpload(e) {
        e.preventDefault();

        if (!selectedFile) {
            setError("Please select a file.");
            return;
        }

        try {
            setLoading(true);
            setError("");
            setMessage("");

            await uploadFile(projectId, selectedFile);

            setMessage("File uploaded successfully!");
            setSelectedFile(null);

            e.target.reset();
            await onUploaded();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="file-upload">
            <h3>Upload Project File</h3>

            <form onSubmit={handleUpload}>
                <input
                    type="file"
                    onChange={e => setSelectedFile(e.target.files[0])}
                />

                {selectedFile && (
                    <p>Selected: {selectedFile.name}</p>
                )}

                <button disabled={loading}>
                    {loading ? "Uploading..." : "Upload File"}
                </button>
            </form>

            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
}

export default FileUpload;