import { useState } from "react";
import FileUpload from "./FileUpload";
import FileList from "./FileList";

function ProjectFiles({ projectId }) {
    const [refreshKey, setRefreshKey] = useState(0);

    function handleUploaded() {
        setRefreshKey(prev => prev + 1);
    }

    return (
        <section className="feature-section">
            <h2>Project Files</h2>

            <FileUpload
                projectId={projectId}
                onUploaded={handleUploaded}
            />

            <FileList
                projectId={projectId}
                refreshKey={refreshKey}
            />
        </section>
    );
}

export default ProjectFiles;