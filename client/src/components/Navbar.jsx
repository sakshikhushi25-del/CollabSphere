
import { useNavigate } from "react-router-dom";

function Navbar({ onSearch, searchStatus, onStatusChange }) {
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    }

    return (
        <header className="navbar">
            <div className="navbar-brand">
                <div className="brand-icon">C</div>
                <h2>CollabSphere</h2>
            </div>

            <div className="navbar-tools">
                <input
                    type="text"
                    placeholder="Search projects..."
                    className="navbar-search"
                    onChange={(e) => onSearch(e.target.value)}
                />

                <select
                    className="navbar-status-filter"
                    value={searchStatus}
                    onChange={(e) => onStatusChange(e.target.value)}
                >
                    <option value="All">All Statuses</option>
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>

                <button
                    type="button"
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </header>
    );
}

export default Navbar;