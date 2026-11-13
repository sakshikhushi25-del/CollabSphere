
import { NavLink, useNavigate } from "react-router-dom";

function Sidebar({ currentUser }) {

    const navigate = useNavigate();

    // Logout
    function handleLogout() {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");

    }

    return (

        <aside className="workspace-sidebar">

            {/* Brand */}
            <div className="sidebar-brand">

                <div className="sidebar-brand-icon">
                    C
                </div>

                <h2>CollabSphere</h2>

            </div>


            <div className="sidebar-menu">

                {/* Workspace */}
                <p className="sidebar-label">
                    WORKSPACE
                </p>


                <NavLink
                    to="/dashboard"
                    end
                    className={({ isActive }) =>
                        isActive
                            ? "sidebar-link active"
                            : "sidebar-link"
                    }
                >
                    <span>▦</span>
                    Dashboard
                </NavLink>


                <NavLink
                    to="/projects"
                    end
                    className={({ isActive }) =>
                        isActive
                            ? "sidebar-link active"
                            : "sidebar-link"
                    }
                >
                    <span>▱</span>
                    Projects
                </NavLink>


                {/* Project Tools */}
                <p className="sidebar-label sidebar-label-spaced">
                    PROJECT TOOLS
                </p>


                <NavLink
                    to="/team-members"
                    className={({ isActive }) =>
                        isActive
                            ? "sidebar-link active"
                            : "sidebar-link"
                    }
                >
                    <span>♙</span>
                    Team Members
                </NavLink>


                <NavLink
                    to="/notes"
                    className={({ isActive }) =>
                        isActive
                            ? "sidebar-link active"
                            : "sidebar-link"
                    }
                >
                    <span>▤</span>
                    Notes
                </NavLink>


                <NavLink
                    to="/files"
                    className={({ isActive }) =>
                        isActive
                            ? "sidebar-link active"
                            : "sidebar-link"
                    }
                >
                    <span>▯</span>
                    Files
                </NavLink>


                <NavLink
                    to="/ai-assistant"
                    className={({ isActive }) =>
                        isActive
                            ? "sidebar-link active"
                            : "sidebar-link"
                    }
                >
                    <span>✧</span>
                    AI Assistant
                </NavLink>


                <NavLink
                    to="/analytics"
                    className={({ isActive }) =>
                        isActive
                            ? "sidebar-link active"
                            : "sidebar-link"
                    }
                >
                    <span>⌁</span>
                    Analytics
                </NavLink>

            </div>


            {/* User Profile */}
            <div className="sidebar-bottom">

                <div className="sidebar-user">

                    <div className="sidebar-avatar">

                        {currentUser?.name?.charAt(0)?.toUpperCase() || "U"}

                    </div>


                    <div className="sidebar-user-info">

                        <strong>
                            {currentUser?.name || "User"}
                        </strong>

                        <span>
                            {currentUser?.email || ""}
                        </span>
                    </div>
                    <button
                        className="sidebar-logout"
                        onClick={handleLogout}
                        title="Logout"
                    >
                        ↪
                    </button>
                </div>
            </div>
        </aside>
    );
}
export default Sidebar;