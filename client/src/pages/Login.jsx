import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/api";
import "../App.css";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    async function handleLogin(e) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const data = await loginUser({ email, password });

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            navigate("/dashboard");
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="login-page">

            <section className="login-brand-panel">

                <div className="brand-logo">
                    <span className="brand-icon">C</span>
                    <h1>CollabSphere</h1>
                </div>

                <div className="brand-content">
                    <span className="brand-tagline">
                        COLLABORATION, WITHOUT THE FRICTION
                    </span>

                    <h2>
                        Build better,
                        <br />
                        together.
                    </h2>

                    <p className="brand-description">
                        CollabSphere brings your people, projects, and ideas
                        into one focused workspace—so your team can spend
                        less time coordinating and more time creating.
                    </p>

                    <div className="brand-features">

                        <div className="brand-feature">
                            <span className="feature-icon">▱</span>
                            <div>
                                <h3>Smart Project Management</h3>
                                <p>
                                    Bring plans, project updates, and
                                    decisions into one clear workspace.
                                </p>
                            </div>
                        </div>

                        <div className="brand-feature">
                            <span className="feature-icon">✧</span>
                            <div>
                                <h3>AI-Powered Collaboration</h3>
                                <p>
                                    Use contextual AI to turn notes and
                                    code into sharper shared ideas.
                                </p>
                            </div>
                        </div>

                        <div className="brand-feature">
                            <span className="feature-icon">⌁</span>
                            <div>
                                <h3>Team Activity & Analytics</h3>
                                <p>
                                    Track contributions and keep everyone
                                    aligned with shared activity.
                                </p>
                            </div>
                        </div>

                    </div>

                    <div className="brand-footer">
                        <span></span>
                        One connected workspace for your team.
                    </div>
                </div>
            </section>

            {/* RIGHT LOGIN PANEL */}
            <section className="login-form-panel">

                <header className="login-topbar">
                    <div className="topbar-logo">
                        <span>C</span>
                        <strong>CollabSphere</strong>
                    </div>

                    <button
                        type="button"
                        className="theme-button"
                        aria-label="Theme icon"
                    >
                        ◐
                    </button>
                </header>

                <div className="login-form-wrapper">

                    <span className="form-tagline">
                        YOUR WORKSPACE AWAITS
                    </span>

                    <h2>Welcome back</h2>

                    <p className="login-subtitle">
                        Sign in to pick up where your team left off.
                    </p>

                    <form onSubmit={handleLogin}>

                        <label htmlFor="email">
                            Email address
                        </label>

                        <div className="login-input-wrapper">
                            <span>✉</span>
                            <input
                                type="email"
                                id="email"
                                placeholder="you@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                                required
                            />
                        </div>

                        <div className="password-label">
                            <label htmlFor="password">
                                Password
                            </label>
                            <button type="button" className="forgot-password">
                                Forgot password?
                            </button>
                        </div>

                        <div className="login-input-wrapper">
                            <span>♙</span>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                                required
                            />

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>

                        {error && (
                            <p className="login-error">{error}</p>
                        )}

                        <button
                            type="submit"
                            className="login-submit-button"
                            disabled={loading}
                        >
                            {loading ? "Signing in..." : "Sign in  →"}
                        </button>

                    </form>

                    <p className="register-prompt">
                        New to CollabSphere?{" "}
                        <Link to="/register">Create an account</Link>
                    </p>

                    <p className="login-terms">
                        By continuing, you agree to use CollabSphere
                        responsibly with your team.
                    </p>

                </div>
            </section>
        </div>
    );
}

export default Login;