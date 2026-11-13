import { useEffect, useState } from "react";
import { getProjects } from "../services/api";

function ProjectToolPage({ title, children }) {

    const [projects, setProjects] = useState([]);
    const [projectId, setProjectId] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        async function loadProjects() {
            try {
                const data = await getProjects();
                setProjects(data.projects || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        loadProjects();

    }, []);

    const selectedProject = projects.find(
        project => project._id === projectId
    );

    if (loading) return <p>Loading projects...</p>;

    return (
        <div className="workspace-content">

            <h1>{title}</h1>

            <p>Select a project to continue.</p>

            {error && (
                <p className="error-message">{error}</p>
            )}

            <section className="feature-section">

                <label htmlFor="projectSelect">
                    Select Project
                </label>

                <select
                    id="projectSelect"
                    value={projectId}
                    onChange={e => setProjectId(e.target.value)}
                >
                    <option value="">Choose a project</option>

                    {projects.map(project => (
                        <option
                            key={project._id}
                            value={project._id}
                        >
                            {project.title}
                        </option>
                    ))}
                </select>

            </section>

            {selectedProject ? (
                children(selectedProject)
            ) : (
                <p>Please select a project to continue.</p>
            )}

        </div>
    );
}

export default ProjectToolPage;