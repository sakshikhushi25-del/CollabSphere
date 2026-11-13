
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";
import "../App.css";

function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleRegister(e) {
        e.preventDefault();
        setError("");

        if (name.trim().length < 2) {
            setError("Name must contain at least 2 characters.");
            return;
        }

        if (password.length < 8) {
            setError("Password must contain at least 8 characters.");
            return;
        }

        try {
            setLoading(true);

            await registerUser({
                name: name.trim(),
                email: email.trim(),
                password
            });

            navigate("/login");
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="login-page">

            {/* LEFT BRANDING PANEL */}
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

            {/* RIGHT REGISTER PANEL */}
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

                <div className="login-form-wrapper register-form-wrapper">

                    <span className="form-tagline">
                        START YOUR JOURNEY
                    </span>

                    <h2>Create your account</h2>

                    <p className="login-subtitle">
                        Join your team and start building together.
                    </p>

                    <form onSubmit={handleRegister}>

                        <label htmlFor="name">
                            Full name
                        </label>

                        <div className="login-input-wrapper">
                            <span>♙</span>
                            <input
                                type="text"
                                id="name"
                                placeholder="Enter your full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                autoComplete="name"
                                required
                                minLength={2}
                                maxLength={50}
                            />
                        </div>

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

                        <label htmlFor="password">
                            Password
                        </label>

                        <div className="login-input-wrapper">
                            <span>♙</span>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder="Create a password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="new-password"
                                required
                                minLength={8}
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
                            {loading ? "Creating account..." : "Create account  →"}
                        </button>

                    </form>

                    <p className="register-prompt">
                        Already have an account?{" "}
                        <Link to="/login">Sign in</Link>
                    </p>

                    <p className="login-terms">
                        By creating an account, you agree to use
                        CollabSphere responsibly with your team.
                    </p>

                </div>
            </section>

        </div>
    );
}

export default Register;