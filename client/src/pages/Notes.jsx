
import ProjectToolPage from "../components/ProjectToolPage";
import ProjectNotes from "../components/ProjectNotes";

function Notes() {
    return (
        <ProjectToolPage title="Project Notes">
            {(project) => (
                <ProjectNotes projectId={project._id} />
            )}
        </ProjectToolPage>
    );
}

export default Notes;
