import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../services/api";
import "../App.css";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const data = await registerUser(formData);

      setSuccess(data.message || "Registration successful! You can now login.");

      setFormData({
        name: "",
        email: "",
        password: ""
      });
    } catch(error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <main className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>Create Account</h1>
        <p>Register to start collaborating.</p>
        <input type="text" name="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} required />

        {error && <p className="auth-error">{error}</p>}
        {success && <p className="auth-success">{success}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        <p>Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </main>
  )
}

export default Register;