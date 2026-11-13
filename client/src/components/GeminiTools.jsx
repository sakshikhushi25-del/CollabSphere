import { useState } from "react";
import { explainContent, improveContent, generateDocs, generateReadme } from "../services/api";

function GeminiTools({ projectId, projectName, description = "" }) {
    const [content, setContent] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function runAI(action) {
        if (!content.trim()) {
            setError("Please enter some code or content first.");
            return;
        }

        try {
            setLoading(true);
            setError("");
            setAnswer("");

            let result;

            switch (action) {
                case "explain":
                    result = await explainContent(projectId, content);
                    break;

                case "improve":
                    result = await improveContent(projectId, content);
                    break;

                case "docs":
                    result = await generateDocs(
                        projectId,
                        content,
                        projectName
                    );
                    break;

                case "readme":
                    result = await generateReadme(
                        projectId,
                        content,
                        projectName,
                        description
                    );
                    break;

                default:
                    throw new Error("Invalid AI operation");
            }

            setAnswer(result.answer || "No response received.");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    async function copyAnswer() {
        try {
            await navigator.clipboard.writeText(answer);
        } catch {
            setError("Unable to copy the response.");
        }
    }

    return (
        <section className="feature-section">
            <h2>Gemini AI Assistant</h2>

            <textarea
                rows={10}
                placeholder="Paste your code, project notes, or content here..."
                value={content}
                onChange={e => setContent(e.target.value)}
            />

            <div className="ai-actions">
                <button disabled={loading} onClick={() => runAI("explain")}>
                    Explain Code
                </button>

                <button disabled={loading} onClick={() => runAI("improve")}>
                    Improve Content
                </button>

                <button disabled={loading} onClick={() => runAI("docs")}>
                    Generate Docs
                </button>

                <button disabled={loading} onClick={() => runAI("readme")}>
                    Generate README
                </button>
            </div>

            {loading && <p>Gemini is generating your response...</p>}
            {error && <p className="error-message">{error}</p>}

            {answer && (
                <div className="ai-result">
                    <h3>AI Generated Result</h3>

                    <button onClick={copyAnswer}>
                        Copy Result
                    </button>

                    <pre>{answer}</pre>
                </div>
            )}
        </section>
    );
}

export default GeminiTools;
