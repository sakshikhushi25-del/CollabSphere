
import ProjectToolPage from "../components/ProjectToolPage";
import GeminiTools from "../components/GeminiTools";

function AIAssistant() {
    return (
        <ProjectToolPage title="Gemini AI Assistant">
            {(project) => (
                <GeminiTools
                    projectId={project._id}
                    projectName={project.title}
                    description={project.description}
                />
            )}
        </ProjectToolPage>
    );
}

export default AIAssistant;