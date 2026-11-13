import { useState } from "react";
import { enableProjectSharing, disableProjectSharing } from "../services/api";

function ProjectSharing({ projectId, isOwner }) {
    const [shareUrl, setShareUrl] = useState("");
    const [enabled, setEnabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    async function handleEnable() {
        try {
            setLoading(true);
            setError("");

            const data = await enableProjectSharing(projectId);

            setShareUrl(data.shareUrl);
            setEnabled(true);
            setMessage(data.message);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    async function handleDisable() {
        try {
            setLoading(true);
            setError("");

            await disableProjectSharing(projectId);

            setEnabled(false);
            setShareUrl("");
            setMessage("Public sharing disabled.");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    async function copyLink() {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setMessage("Share link copied!");
        } catch {
            setError("Unable to copy link.");
        }
    }

    if (!isOwner) return null;

    return (
        <section className="feature-section">
            <h2>Public Project Sharing</h2>

            <p>
                Share a read-only version of your project with others.
            </p>

            {error && <p className="error-message">{error}</p>}
            {message && <p className="success-message">{message}</p>}

            {!enabled ? (
                <button disabled={loading} onClick={handleEnable}>
                    {loading ? "Enabling..." : "Enable Public Sharing"}
                </button>
            ) : (
                <>
                    <p>Public sharing is enabled.</p>

                    <input
                        readOnly
                        value={shareUrl}
                        aria-label="Public project link"
                    />

                    <button onClick={copyLink}>
                        Copy Share Link
                    </button>

                    <button
                        className="danger-button"
                        disabled={loading}
                        onClick={handleDisable}
                    >
                        Disable Sharing
                    </button>
                </>
            )}
        </section>
    );
}

export default ProjectSharing;
