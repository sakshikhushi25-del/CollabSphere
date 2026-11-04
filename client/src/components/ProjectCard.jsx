import "../App.css";

function ProjectCard({title, description, status, onView, onEdit, onDelete}) {
  return (
    <article className='project-card'>
        <h3>{title}</h3>
        <p>{description}</p>
        <span>{status}</span>

        <button className="view-btn" onClick={onView}>View Details</button>
        <button className="edit-btn" onClick={onEdit}>Edit</button>
        <button className="delete-btn" onClick={onDelete}>Delete</button>
    </article>
  )
}

export default ProjectCard;
