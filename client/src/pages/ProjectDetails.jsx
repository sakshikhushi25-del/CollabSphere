import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getProjectById, inviteMember } from "../services/api";
import "../App.css";

function ProjectDetails() {
  const {id} = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [inviteMessage, setInviteMessage] = useState("");
  const [inviting, setInviting] = useState(false);

  useEffect(() => {
    async function loadProject() {
      try {
        setLoading(true);
        setError("");

        const data = await getProjectById(id);
        setProject(data.project);
      } catch(error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    loadProject();
  }, [id]);

  const handleInvite = async (e) => {
    e.preventDefault();
    try{
      setInviting(true);
      setInviteMessage("");
      
      const data = await inviteMember(id, email);
      setEmail("");
      setInviteMessage(data.message);

      await loadProject();
    } catch(error) {
      setInviteMessage(error.message);
    } finally {
      setInviting(false);
    }
  }

  if(loading) {
    return <p>Loading project details...</p>;
  }

  if(error) {
    return <p className="auth-error">{error}</p>
  }

  if(!project) {
    return <p>Project not found.</p>;
  }
  return (
    <main className="dashboard-content">
      <Link to="/dashboard">← Back to Dashboard</Link>

      <section className="project-card">
        <h1>{project.title}</h1>
        <p>{project.description}</p>
        <p><strong>Status:</strong>{project.status}</p>
        <p><strong>Created:</strong>{" "}{new Date(project.createdAt).toLocaleDateString()}</p>
        <p><strong>Last updated:</strong>{" "}{new Date(project.updatedAt).toLocaleDateString()}</p>

        <section className="team-section">
          <h2>Team Members</h2>
          <p><strong>Owner:</strong>{" "} {project.user?.name || "Project Owner"}</p>
          {project.members?.length > 0 ? (
            project.members.map((member) => (
              <p key={member._id}><strong>Member:</strong>{member.name}({member.email})</p>
            ))
          ) : (<p>No team member invited yet.</p>)}
        </section>

        <section className="invite-section">
          <h2>Invite a team member</h2>
          <form onSubmit={handleInvite}>
            <input type="email" placeholder="Enter registered user's email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <button type="submit" disabled={inviting}>{inviting ? "Inviting..." : "Invite Member"}</button>
          </form>
          {inviteMessage && (<p>{inviteMessage}</p>)}
        </section>
      </section>
    </main>
  )
}

export default ProjectDetails;