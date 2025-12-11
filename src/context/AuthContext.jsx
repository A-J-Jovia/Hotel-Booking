// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const STORAGE_USER = "hb_user";
const STORAGE_USERS = "hb_registered_users";
const STORAGE_BOOKINGS = "hb_bookings";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load logged-in user
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_USER);
    if (raw) setUser(JSON.parse(raw));
  }, []);

  // Save logged-in user
  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_USER, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_USER);
  }, [user]);

  // LOGIN
  function login({ email, password }) {
    const users = JSON.parse(localStorage.getItem(STORAGE_USERS) || "[]");

    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!found) {
      return { ok: false, message: "Invalid email or password" };
    }

    const userData = {
      name: found.name,
      email: found.email,
    };

    setUser(userData);
    return { ok: true, user: userData };
  }

  // REGISTER
  function register({ name, email, password }) {
    const users = JSON.parse(localStorage.getItem(STORAGE_USERS) || "[]");

    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, message: "Email already registered" };
    }

    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem(STORAGE_USERS, JSON.stringify(users));

    const userData = { name, email };
    setUser(userData);

    return { ok: true, user: userData };
  }

  function logout() {
    setUser(null);
  }

  // ADD BOOKING
  function addBooking(booking) {
    const bookings = JSON.parse(localStorage.getItem(STORAGE_BOOKINGS) || "[]");
    const newBooking = { id: Date.now(), ...booking };
    bookings.push(newBooking);
    localStorage.setItem(STORAGE_BOOKINGS, JSON.stringify(bookings));
    return newBooking;
  }

  // GET USER BOOKINGS
  function getBookings() {
    if (!user) return [];
    const bookings = JSON.parse(localStorage.getItem(STORAGE_BOOKINGS) || "[]");
    return bookings.filter((b) => b.userEmail === user.email);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        addBooking,
        getBookings,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}