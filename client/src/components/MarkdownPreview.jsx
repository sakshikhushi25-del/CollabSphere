import ReactMarkdown from "react-markdown";

function MarkdownPreview({ content }) {
    return (
        <div className="markdown-preview">
            {content?.trim() ? (
                <ReactMarkdown>{content}</ReactMarkdown>
            ) : (
                <p className="empty-message">
                    Your Markdown preview will appear here.
                </p>
            )}
        </div>
    );
}

export default MarkdownPreview;
