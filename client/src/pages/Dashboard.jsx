import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ProjectCard from '../components/ProjectCard';
import { useNavigate } from 'react-router-dom';
import "../App.css";
import { getProjects, createProject, deleteProject, updateProject } from '../services/api';

function Dashboard() {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchText, setSearchText] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [newProject, setNewProject] = useState({
        title: "",
        description: "",
        status: "Not Started"
    });
    const [editingProject, setEditingProject] = useState(null);
    const [searchStatus, setSearchStatus] = useState("All");

    useEffect(() => {
        async function loadProjects() {
            try {
                setLoading(true);
                setError("");

                const data = await getProjects();
                setProjects(data.projects);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        loadProjects();
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setNewProject({
            ...newProject,
            [name]: value
        });
    }

    async function handleCreateProject(e) {
        e.preventDefault();

        setError("");

        const title = newProject.title.trim();
        const description = newProject.description.trim();

        if(title.length < 5) {
            setError("Project title must be at least 5 characters.");
            return;
        }

        if(description.length < 30) {
            setError("Description must be at least 30 characters.");
            return;
        }

        try {
            const projectData = ({
                title,
                description,
                status: newProject.status
            });
            if(editingProject) {
                const data = await updateProject(
                    editingProject._id,
                    projectData
                );
                setProjects((previousProjects) => 
                    previousProjects.map((project) =>
                        project._id === editingProject._id ? data.project : project
                    )
                )
            } else {
                const data = await createProject(projectData);
                setProjects((previousProjects) => [
                    data.project,
                    ...previousProjects
                ]);
            }
            setNewProject({
                title: "",
                description: "",
                status: "Not Started"
            });
            setEditingProject(null);
            setShowForm(false);
        } catch(error) {
            setError(error.message);
        }
    }

    async function handleDeleteProject(projectId) {
        try {
            await deleteProject(projectId);

            setProjects((previousProjects) => 
                previousProjects.filter((project) => project._id !== projectId)
            )
        } catch(error) {
            setError(error.message);
        }
    }

    function handleEditProject(project) {
        setEditingProject(project);

        setNewProject({
            title: project.title,
            description: project.description,
            status: project.status
        });
        setShowForm(true);
    }

    const filteredProjects = projects.filter((project) => {
        const matchesSearch = project.title.toLowerCase().includes(searchText.toLowerCase());
        const matchesStatus = searchStatus === "All" || project.status === searchStatus;
        return matchesSearch && matchesStatus;
    });
    return (
        <div className='dashboard'>
            <Navbar onSearch={setSearchText} searchStatus={searchStatus} onStatusChange={setSearchStatus} />
            <main className='dashboard-content'>
                <div className='dashboard-heading'>
                    <div>
                        <h2>My Project</h2>
                        <p>Manage all your development projects in one place.</p>
                    </div>
                    <button className='create-project-btn' onClick={() => setShowForm(!showForm)}>{showForm ? "close Form" : "+ Create New Project"}</button>
                </div>
                {showForm && (
                    <form className='project-form' onSubmit={handleCreateProject}>
                        <h2>{editingProject ? "Edit Project" : "Create a New Project"}</h2>
                        <label htmlFor="title">Project Title</label>
                        <input type="text" id='title' name='title' placeholder='Enter project title' value={newProject.title} onChange={handleChange} required maxLength={100} />

                        <label htmlFor="description">Project Description</label>
                        <textarea type="text" id='description' name='description' placeholder='Describe about you project' value={newProject.description} onChange={handleChange} required maxLength={1000} />

                        <label htmlFor="status">Project Status</label>
                        <select name="status" id="status" value={newProject.status} onChange={handleChange}>
                            <option value="Not Started">Not Started</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>

                        <div className='form-actions'>
                            <button type='submit'>{editingProject ? "Update Project": "Create Project"}</button>

                            <button type='button' onClick={() => {setShowForm(false); setEditingProject(null); setNewProject({
                                title: "",
                                description: "",
                                status: "Not Started"
                            })}}>Cancel</button>
                        </div>
                    </form>
                )}

                {loading && <p>Loading projects...</p>}

                {error && (<p className='auth-error'>Could not load projects: {error}</p>)}

                {!loading && !error && (
                    <div className='project-list'>
                        {filteredProjects.map((project) => (
                            <ProjectCard key={project._id} title={project.title} description={project.description} status={project.status} onView={() => navigate(`/projects/${project._id}`)} onEdit={() => handleEditProject(project)} onDelete={() => handleDeleteProject(project._id)} />
                        ))}
                    </div>
                )}

                {!loading && !error && filteredProjects.length === 0 && (<p className='no-projects'>
                    {projects.length === 0 ? "No projects yet. Create your first project!" : "No projects match your search or selected status."}
                </p>)}
            </main>
        </div>
    )
}

export default Dashboard;