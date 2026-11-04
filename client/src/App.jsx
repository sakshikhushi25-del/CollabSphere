import Navbar from "./components/Navbar"
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProjectDetails from "./pages/ProjectDetails";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
    return (
        <div>
            {/* <Navbar /> */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/projects/:id" element={<ProjectDetails />} />
            </Routes>
        </div>
    )
}

export default App;