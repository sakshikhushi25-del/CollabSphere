
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProjects } from "../services/api";

function Dashboard() {

    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const currentUser = JSON.parse(
        localStorage.getItem("user") || "null"
    );

    useEffect(() => {

        async function loadDashboard() {

            try {

                setError("");

                const data = await getProjects();

                setProjects(data.projects || []);

            } catch (err) {

                setError(err.message);

            } finally {

                setLoading(false);

            }

        }

        loadDashboard();

    }, []);

    const totalProjects = projects.length;

    const completedProjects = projects.filter(project =>
        ["completed", "complete"].includes(
            (project.status || "").toLowerCase()
        )
    ).length;

    const notStartedProjects = projects.filter(project =>
        ["not started", "pending"].includes(
            (project.status || "").toLowerCase()
        )
    ).length;

    const inProgressProjects = projects.filter(project =>
        ["in progress", "active"].includes(
            (project.status || "").toLowerCase()
        )
    ).length;

    // Recent projects
    const recentProjects = [...projects]
        .sort((a, b) =>
            new Date(b.updatedAt || b.createdAt) -
            new Date(a.updatedAt || a.createdAt)
        )
        .slice(0, 3);

    return (

        <main className="dashboard-page">

            <header className="dashboard-header">

                <div>
                    <span>Workspace</span>
                    <span className="header-divider">/</span>
                    <strong>Welcome back, {currentUser?.name || "User"}</strong>
                </div>

                <div className="dashboard-avatar">
                    {currentUser?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>

            </header>

            <div className="dashboard-container">

                <section className="dashboard-welcome">

                    <div>

                        <p className="dashboard-eyebrow">
                            COLLABSPHERE WORKSPACE
                        </p>

                        <h1>
                            Welcome back,<br />
                            {currentUser?.name || "User"}
                        </h1>

                        <p>
                            Here's what's happening across your
                            collaboration workspace.
                        </p>

                    </div>

                    <button
                        onClick={() => navigate("/projects")}
                    >
                        + New Project
                    </button>

                </section>

                {error && (
                    <p className="error-message">{error}</p>
                )}

                {/* Statistics */}

                <section className="dashboard-stats">

                    <div className="stat-card">

                        <div className="stat-icon">▱</div>

                        <div>
                            <p>Total Projects</p>
                            <h2>
                                {loading ? "..." : totalProjects}
                            </h2>
                        </div>

                    </div>

                    <div className="stat-card">

                        <div className="stat-icon">♧</div>

                        <div>
                            <p>In Progress</p>
                            <h2>
                                {loading ? "..." : inProgressProjects}
                            </h2>
                        </div>

                    </div>

                    <div className="stat-card">

                        <div className="stat-icon">✓</div>

                        <div>
                            <p>Completed</p>
                            <h2>
                                {loading ? "..." : completedProjects}
                            </h2>
                        </div>

                    </div>

                    <div className="stat-card">

                        <div className="stat-icon">◷</div>

                        <div>
                            <p>Not Started</p>
                            <h2>
                                {loading ? "..." : notStartedProjects}
                            </h2>
                        </div>

                    </div>

                </section>

                {/* Quick Actions */}

                <section className="quick-actions">

                    <div>
                        <h3>Quick Actions</h3>

                        <p>
                            Jump into your team's work.
                        </p>
                    </div>

                    <div className="quick-action-buttons">

                        <button
                            onClick={() => navigate("/projects")}
                        >
                            + Create Project
                        </button>

                        <button
                            className="secondary-button"
                            onClick={() => navigate("/projects")}
                        >
                            ▱ View Projects
                        </button>

                    </div>

                </section>

                {/* Recent Projects */}

                <section className="recent-projects">

                    <div className="section-heading">

                        <div>
                            <h2>Recent Projects</h2>

                            <p>
                                Your recently updated projects.
                            </p>
                        </div>

                        <Link to="/projects">
                            View All Projects →
                        </Link>

                    </div>

                    {loading ? (

                        <p>Loading projects...</p>

                    ) : recentProjects.length === 0 ? (

                        <div className="empty-projects">

                            <h3>No projects yet</h3>

                            <p>
                                Create your first project to get started.
                            </p>

                            <button
                                onClick={() => navigate("/projects")}
                            >
                                Create Your First Project
                            </button>

                        </div>

                    ) : (

                        <div className="recent-projects-grid">

                            {recentProjects.map(project => (

                                <div
                                    className="recent-project-card"
                                    key={project._id}
                                >

                                    <h3>{project.title}</h3>

                                    <p>
                                        {project.description}
                                    </p>

                                    <div className="recent-project-footer">

                                        <span>
                                            {project.status || "Active"}
                                        </span>

                                        <button
                                            onClick={() =>
                                                navigate(`/projects/${project._id}`)
                                            }
                                        >
                                            View Details
                                        </button>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </section>

            </div>

        </main>

    );

}

export default Dashboard;