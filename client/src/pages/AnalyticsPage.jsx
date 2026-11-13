
import ProjectToolPage from "../components/ProjectToolPage";
import Analytics from "../components/Analytics";

function AnalyticsPage() {
    return (
        <ProjectToolPage title="Project Analytics">
            {(project) => (
                <Analytics projectId={project._id} />
            )}
        </ProjectToolPage>
    );
}

export default AnalyticsPage;