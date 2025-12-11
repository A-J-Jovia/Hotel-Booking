// src/components/Navbar.jsx
import React from "react";
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
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm px-3">
      <div className="container-fluid">

        {/* LOGO */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <i className="fa-solid fa-hotel fs-3 me-2"></i>

          <span className="fw-bold">HotelBooking</span>
        </Link>

        <div className="collapse navbar-collapse show">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><NavLink className="nav-link" to="/hotels">Hotels</NavLink></li>
          </ul>

          <ul className="navbar-nav ms-auto">

            {isAuthenticated ? (
              <>
                <li className="nav-item me-3 text-white fw-bold">
                  Hi, {user.name}
                </li>

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
                <li className="nav-item"><NavLink className="nav-link" to="/login">Login</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/register">Register</NavLink></li>
              </>
            )}

            <li className="nav-item ms-3">
              <NavLink className="nav-link" to="/admin">Admin</NavLink>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}