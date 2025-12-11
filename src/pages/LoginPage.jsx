import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [error, setError] = useState("");

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

    function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const result = login(formData);
    if (!result.ok) {
      setError(result.message || "Login failed");
      return;
    }
    // success
    const from = location.state?.from;
    const hotel = location.state?.hotel;
    if (from === "/booking" && hotel) {
      navigate("/booking", { state: { hotel } });
    } else {
      navigate("/dashboard");
    }
  }

  return (
    <div className="col-md-6 mx-auto">
      <h2 className="fw-bold mb-3 text-center">Login</h2>

      <form className="border p-4 rounded shadow-sm" onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-3">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
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
            placeholder="Enter your password"
          />
        </div>

        <button type="submit" className="btn btn-primary w-100 mt-2">
          Login
        </button>

        <p className="text-center mt-3">
          Don't have an account?{" "}
          <a href="/register" className="fw-bold">
            Register here
          </a>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
