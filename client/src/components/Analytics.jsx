import { useEffect, useState } from "react";
import { getProjectAnalytics } from "../services/api";

function Analytics({ projectId }) {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadAnalytics() {
            try {
                const data = await getProjectAnalytics(projectId);
                setAnalytics(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        loadAnalytics();
    }, [projectId]);

    if (loading) return <p>Loading analytics...</p>;

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    if (!analytics) return null;

    return (
        <section className="feature-section">
            <h2>Project Analytics</h2>

            <div className="analytics-cards">
                <div className="analytics-card">
                    <h3>{analytics.summary.totalNotes}</h3>
                    <p>Total Notes</p>
                </div>

                <div className="analytics-card">
                    <h3>{analytics.summary.totalFiles}</h3>
                    <p>Total Files</p>
                </div>

                <div className="analytics-card">
                    <h3>{analytics.summary.totalContributions}</h3>
                    <p>Total Contributions</p>
                </div>
            </div>

            <h3>Member Contributions</h3>

            <div className="table-wrapper">
                <table className="analytics-table">
                    <thead>
                        <tr>
                            <th>Member</th>
                            <th>Notes</th>
                            <th>Files</th>
                            <th>Total</th>
                        </tr>
                    </thead>

                    <tbody>
                        {analytics.contributions.map(item => (
                            <tr key={item.user.id}>
                                <td>{item.user.name}</td>
                                <td>{item.notesCreated}</td>
                                <td>{item.filesUploaded}</td>
                                <td>{item.totalContributions}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default Analytics;