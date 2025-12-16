// src/pages/LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
  e.preventDefault();
  setError("");

  try {
    const res = await login(formData);

    if (res.ok) {
      navigate(res.user.role === "admin" ? "/admin" : "/");
    } else {
      setError(res.message);
    }
  } catch (err) {
    setError(
      err?.response?.data?.message ||
      "Login failed. Check email or password."
    );
  }
}


  return (
    <div className="col-md-6 mx-auto">
      <h2 className="fw-bold mb-3 text-center">Login</h2>

      <form className="border p-4 rounded shadow-sm" onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100 mt-2">
          Login
        </button>

        <p className="text-center mt-3">
          Don't have an account?{" "}
          <a href="/register" className="fw-bold">Register</a>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
