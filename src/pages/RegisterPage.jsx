import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await register(form);
    if (!res.ok) {
      setError(res.message);
      return;
    }
    navigate("/login");
  }

  return (
    <div className="col-md-6 mx-auto">
      <h2 className="fw-bold text-center">Register</h2>

      <form onSubmit={handleSubmit} className="border p-4 rounded">
        {error && <div className="alert alert-danger">{error}</div>}

        <input className="form-control mb-2" placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })} />

        <input className="form-control mb-2" placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })} />

        <input className="form-control mb-3" type="password" placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })} />

        <button className="btn btn-success w-100">Register</button>
      </form>
    </div>
  );
}
