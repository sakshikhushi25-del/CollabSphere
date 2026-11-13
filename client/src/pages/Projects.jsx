
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getProjects,
    createProject,
    updateProject,
    deleteProject
} from "../services/api";

function Projects() {

    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [search, setSearch] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("Active");
    const [editingId, setEditingId] = useState(null);
    const [saving, setSaving] = useState(false);

    async function loadProjects() {

        try {

            setLoading(true);
            setError("");

            const data = await getProjects();

            setProjects(data.projects || []);

        } catch (err) {

            setError(err.message);

        } finally {

            setLoading(false);

        }

    }

    useEffect(() => {
        loadProjects();
    }, []);
    function resetForm() {
        setTitle("");
        setDescription("");
        setStatus("Active");
        setEditingId(null);

    }
    async function handleSubmit(e) {

        e.preventDefault();

        if (!title.trim() || !description.trim()) {
            setError("Please enter project title and description.");
            return;
        }

        try {

            setSaving(true);
            setError("");
            setMessage("");

            const projectData = {
                title: title.trim(),
                description: description.trim(),
                status
            };

            if (editingId) {

                const data = await updateProject(
                    editingId,
                    projectData
                );

                setMessage(
                    data.message || "Project updated successfully."
                );

            } else {

                const data = await createProject(projectData);
                setMessage(
                    data.message || "Project created successfully."
                );
            }
            resetForm();
            await loadProjects();
        } catch (err) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    }
    function handleEdit(project) {

        setEditingId(project._id);
        setTitle(project.title || "");
        setDescription(project.description || "");
        setStatus(project.status || "Active");

        setMessage("");
        setError("");
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
    async function handleDelete(projectId) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this project?"
        );
        if (!confirmed) return;
        try {
            setError("");
            setMessage("");
            const data = await deleteProject(projectId);
            setMessage(
                data.message || "Project deleted successfully."
            );
            setProjects(prev =>
                prev.filter(project => project._id !== projectId)
            );
        } catch (err) {
            setError(err.message);
        }
    }
    const filteredProjects = projects.filter(project => {
        const projectTitle = project.title || "";
        const projectDescription = project.description || "";
        return (
            projectTitle.toLowerCase().includes(search.toLowerCase()) ||
            projectDescription.toLowerCase().includes(search.toLowerCase())
        );
    });
    if (loading) {
        return <p>Loading projects...</p>;
    }
    return (
        <div className="workspace-content">
            <div className="workspace-heading">
                <div>
                    <p className="workspace-eyebrow">
                        COLLABSPHERE WORKSPACE
                    </p>
                    <h1>My Projects</h1>
                    <p>
                        Create, manage and collaborate on your projects.
                    </p>
                </div>
            </div>
            {error && (
                <p className="error-message">
                    {error}
                </p>
            )}
            {message && (
                <p className="success-message">
                    {message}
                </p>
            )}
            <section className="feature-section">
                <h2>
                    {editingId ? "Update Project" : "Create New Project"}
                </h2>
                <form onSubmit={handleSubmit}>
                    <label>Project Title</label>
                    <input
                        type="text"
                        placeholder="Enter project title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                    />
                    <label>Project Description</label>
                    <textarea
                        rows="4"
                        placeholder="Enter project description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                    />
                    <label>Project Status</label>
                    <select
                        value={status}
                        onChange={e => setStatus(e.target.value)}
                    >
                        <option value="Active">Active</option>
                        <option value="Completed">Completed</option>
                        <option value="Pending">Pending</option>
                    </select>
                    <div className="project-form-actions">
                        <button type="submit" disabled={saving}>
                            {saving
                                ? "Saving..."
                                : editingId
                                    ? "Update Project"
                                    : "Create Project"
                            }
                        </button>
                        {editingId && (
                            <button
                                type="button"
                                className="secondary-button"
                                onClick={resetForm}
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </section>
            <section className="feature-section">
                <div className="projects-heading">
                    <h2>
                        All Projects ({projects.length})
                    </h2>
                    <input
                        type="search"
                        placeholder="Search projects..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
                {filteredProjects.length === 0 ? (
                    <p>
                        {search
                            ? "No matching projects found."
                            : "No projects created yet."
                        }
                    </p>
                ) : (
                    <div className="projects-grid">
                        {filteredProjects.map(project => (
                            <div
                                className="project-card"
                                key={project._id}
                            >
                                <h3>{project.title}</h3>
                                <p>
                                    {project.description}
                                </p>
                                <p>
                                    <strong>Status:</strong>{" "}
                                    {project.status || "Active"}
                                </p>
                                <p>
                                    <strong>Created:</strong>{" "}
                                    {project.createdAt
                                        ? new Date(
                                            project.createdAt
                                        ).toLocaleDateString()
                                        : "N/A"
                                    }
                                </p>
                                <div className="project-actions">
                                    <button
                                        onClick={() =>
                                            navigate(`/projects/${project._id}`)
                                        }
                                    >
                                        View Details
                                    </button>
                                    <button
                                        className="secondary-button"
                                        onClick={() => handleEdit(project)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="danger-button"
                                        onClick={() =>
                                            handleDelete(project._id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}

export default Projects;