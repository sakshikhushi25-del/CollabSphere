import { NavLink, useNavigate } from "react-router-dom";

function Navbar({ onSearch, searchStatus, onStatusChange }) {
    return (
        <header className="navbar">
            <h2 className="navbar-logo">Collabsphere</h2>

            <input type="text" placeholder="Search projects..." className="navbar-search" onChange={(e) => onSearch(e.target.value)} />

            <select className="navbar-status-filter" value={searchStatus} onChange={(e) => onStatusChange(e.target.value)}>
                <option value="all">All Statuses</option>
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
            </select>

            <nav className="navbar-links">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/Login">Login</NavLink>
                <NavLink to="/Register">Register</NavLink>
                <NavLink to="/Dashboard">Dashboard</NavLink>
                <NavLink to="/ProjectDetails">ProjectDetails</NavLink>
            </nav>
        </header>

    )
}

export default Navbar;