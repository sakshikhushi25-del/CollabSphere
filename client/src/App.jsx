import "./App.css";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import PublicProject from "./pages/PublicProject";

import TeamMembers from "./pages/TeamMembers";
import Notes from "./pages/Notes";
import Files from "./pages/Files";
import AIAssistant from "./pages/AIAssistant";
import AnalyticsPage from "./pages/AnalyticsPage";

import WorkspaceLayout from "./components/WorkspaceLayout";

function App() {

    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/public/projects/:shareToken" element={<PublicProject />} />
            <Route element={<WorkspaceLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/home" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:id" element={<ProjectDetails />} />
                <Route path="/team-members" element={<TeamMembers />} />
                <Route path="/notes" element={<Notes />} />
                <Route path="/files" element={<Files />} />
                <Route path="/ai-assistant" element={<AIAssistant />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
            </Route>
        </Routes>
    );
}

export default App;