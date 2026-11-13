
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";

function WorkspaceLayout() {

    const [currentUser] = useState(() => {
        try {
            return JSON.parse(
                localStorage.getItem("user") || "null"
            );
        } catch {
            return null;
        }
    });

    return (
        <div className="workspace-layout">

            <Sidebar currentUser={currentUser} />

            <main className="workspace-main">
                <Outlet />
            </main>

        </div>
    );
}

export default WorkspaceLayout;