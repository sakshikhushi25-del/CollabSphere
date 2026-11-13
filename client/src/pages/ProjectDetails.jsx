
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import { getProjectById } from "../services/api";

import "../App.css";

function ProjectDetails() {

    const { id } = useParams();

    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // Load project details
    useEffect(() => {

        async function loadProject() {

            try {

                setLoading(true);
                setError("");

                const data = await getProjectById(id);

                setProject(data.project);

            } catch (error) {

                setError(error.message);

            } finally {

                setLoading(false);

            }

        }

        loadProject();

    }, [id]);


    if (loading) {
        return <p>Loading project details...</p>;
    }

    if (error) {
        return <p className="auth-error">{error}</p>;
    }

    if (!project) {
        return <p>Project not found.</p>;
    }


    return (

        <main className="dashboard-content">

            <Link to="/dashboard">
                ← Back to Dashboard
            </Link>


            <section className="project-card">

                <h1>{project.title}</h1>

                <p>{project.description}</p>

                <p>
                    <strong>Status:</strong>{" "}
                    {project.status}
                </p>

                <p>
                    <strong>Created:</strong>{" "}
                    {new Date(
                        project.createdAt
                    ).toLocaleDateString()}
                </p>

                <p>
                    <strong>Last updated:</strong>{" "}
                    {new Date(
                        project.updatedAt
                    ).toLocaleDateString()}
                </p>

            </section>

        </main>

    );

}

export default ProjectDetails;