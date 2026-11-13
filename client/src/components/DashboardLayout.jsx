import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function DashboardLayout({
    children,
    onSearch,
    searchStatus,
    onStatusChange
}) {
    return (
        <div className="app-layout">
            <Navbar
                onSearch={onSearch}
                searchStatus={searchStatus}
                onStatusChange={onStatusChange}
            />

            <div className="app-body">
                <Sidebar />

                <main className="main-content">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default DashboardLayout;