import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3">
      <Link className="navbar-brand fw-bold" to="/">
        HotelBooking
      </Link>

      <ul className="navbar-nav me-auto">
        <li className="nav-item">
          <NavLink className="nav-link" to="/hotels">Hotels</NavLink>
        </li>
      </ul>

      <ul className="navbar-nav ms-auto">
        {isAuthenticated ? (
          <>
            <li className="nav-item text-white fw-bold me-3">
              Hi, {user.name}
            </li>

            {user.role === "admin" && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin">Admin</NavLink>
              </li>
            )}

            <li className="nav-item">
              <NavLink className="nav-link" to="/dashboard">My Bookings</NavLink>
            </li>

            <li className="nav-item ms-3">
              <button className="btn btn-outline-light" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">Login</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/register">Register</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
