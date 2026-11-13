
import ProjectToolPage from "../components/ProjectToolPage";
import ProjectFiles from "../components/ProjectFiles";

function Files() {
    return (
        <ProjectToolPage title="Project Files">
            {(project) => (
                <ProjectFiles projectId={project._id} />
            )}
        </ProjectToolPage>
    );
}

export default Files;