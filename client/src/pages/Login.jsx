import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import "../App.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginUser({
        email,
        password
      });

      localStorage.setItem("token", data.token);

      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/dashboard");

    } catch(error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleLogin}>
        <h1>Welcome Back</h1>
        <p>Log in to continue to CollabSphere</p>

        <label htmlFor="email">Email</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" autoComplete="email" required />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" autoComplete="current-password" required />

        {error && (<p className="auth-error">{error}</p>)}

        <button type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
      </form>
    </div>
  )
}

export default Login;