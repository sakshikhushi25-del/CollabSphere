import { useEffect, useState } from "react";
import {
    getProjects,
    getProjectById,
    inviteMember,
    removeMember
} from "../services/api";

function TeamMembers() {

    const currentUser = JSON.parse(
        localStorage.getItem("user") || "null"
    );

    const [projects, setProjects] = useState([]);
    const [project, setProject] = useState(null);
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        async function loadProjects() {
            try {
                const data = await getProjects();
                setProjects(data.projects || []);
            } catch (err) {
                setMessage(err.message);
            }
        }

        loadProjects();

    }, []);

    async function selectProject(id) {

        try {
            setLoading(true);
            setMessage("");

            const data = await getProjectById(id);
            setProject(data.project);

        } catch (err) {
            setMessage(err.message);
        } finally {
            setLoading(false);
        }

    }

    const currentUserId = currentUser?._id || currentUser?.id;
    const ownerId = project?.user?._id;

    const isOwner = Boolean(
        ownerId &&
        currentUserId &&
        String(ownerId) === String(currentUserId)
    );

    async function handleInvite(e) {

        e.preventDefault();

        try {
            setLoading(true);

            const data = await inviteMember(
                project._id,
                email
            );

            setEmail("");
            setMessage(data.message);

            await selectProject(project._id);

        } catch (err) {
            setMessage(err.message);
        } finally {
            setLoading(false);
        }

    }

    async function handleRemove(memberId) {

        if (!window.confirm("Remove this team member?")) {
            return;
        }

        try {
            setLoading(true);

            const data = await removeMember(
                project._id,
                memberId
            );

            setMessage(data.message);

            await selectProject(project._id);

        } catch (err) {
            setMessage(err.message);
        } finally {
            setLoading(false);
        }

    }

    return (

        <div className="workspace-content">

            <section className="workspace-heading">
                <div>
                    <p className="workspace-eyebrow">
                        COLLABSPHERE WORKSPACE
                    </p>
                    <h1>Team Members</h1>
                    <p>Manage your project team.</p>
                </div>
            </section>

            <section className="feature-section">

                <h2>Select Project</h2>

                <select
                    value={project?._id || ""}
                    onChange={e => selectProject(e.target.value)}
                >
                    <option value="">Choose a project</option>

                    {projects.map(item => (
                        <option key={item._id} value={item._id}>
                            {item.title}
                        </option>
                    ))}
                </select>

            </section>

            {loading && <p>Loading...</p>}

            {message && <p>{message}</p>}

            {project && !loading && (

                <section className="feature-section">

                    <h2>Team Members</h2>

                    <p>
                        <strong>Owner:</strong>{" "}
                        {project.user?.name || "Project Owner"}
                    </p>

                    {project.members?.length > 0 ? (

                        project.members.map(member => (

                            <div
                                className="team-member"
                                key={member._id}
                            >
                                <p>
                                    {member.name} ({member.email})
                                </p>

                                {isOwner && (
                                    <button
                                        onClick={() => handleRemove(member._id)}
                                        disabled={loading}
                                    >
                                        Remove
                                    </button>
                                )}

                            </div>

                        ))

                    ) : (
                        <p>No team members invited yet.</p>
                    )}

                    {isOwner && (

                        <div className="invite-section">

                            <h2>Invite a Team Member</h2>

                            <form onSubmit={handleInvite}>

                                <input
                                    type="email"
                                    placeholder="Enter registered user's email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                />

                                <button disabled={loading}>
                                    Invite Member
                                </button>

                            </form>

                        </div>

                    )}

                </section>

            )}

        </div>

    );

}
export default TeamMembers;