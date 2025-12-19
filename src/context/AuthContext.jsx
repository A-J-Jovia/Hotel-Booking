import React, { createContext, useContext, useEffect, useState } from "react";

import {
  setAuthToken,
  loginAPI,
  registerAPI,
  createBookingAPI,
  fetchUserBookingsAPI,
  cancelBookingAPI,
} from "../api";

// ================= CONTEXT =================
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

// ================= PROVIDER =================
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("hb_user"))
  );
  const [token, setToken] = useState(null);

  // 🔑 Attach token ONCE on app load (FIX)
  useEffect(() => {
    const storedToken = localStorage.getItem("hb_token");
    if (storedToken) {
      setAuthToken(storedToken);
      setToken(storedToken);
    }
  }, []);

  // ---------------- LOGIN ----------------
  async function login(data) {
    const res = await loginAPI(data);

    if (res.ok) {
      localStorage.setItem("hb_user", JSON.stringify(res.user));
      localStorage.setItem("hb_token", res.token);
      setUser(res.user);
      setToken(res.token);
      setAuthToken(res.token); // ✅ attach immediately
    }

    return res;
  }

  // ---------------- REGISTER ----------------
  async function register(data) {
    return await registerAPI(data);
  }

  // ---------------- LOGOUT ----------------
  function logout() {
    localStorage.removeItem("hb_user");
    localStorage.removeItem("hb_token");
    setUser(null);
    setToken(null);
    setAuthToken(null); // ✅ remove token
  }

  // ---------------- ADD BOOKING ----------------
  async function addBooking(payload) {
    try {
      const res = await createBookingAPI(payload);
      return { ok: true, booking: res.booking };
    } catch (err) {
      return {
        ok: false,
        message: err?.response?.data?.message || "Booking failed",
      };
    }
  }

  // ---------------- GET BOOKINGS ----------------
  async function getBookings() {
    try {
      const res = await fetchUserBookingsAPI();
      return res;
    } catch (err) {
      return [];
    }
  }

  // ---------------- CANCEL BOOKING ----------------
  async function cancelBooking(id) {
    try {
      const res = await cancelBookingAPI(id);
      return res;
    } catch (err) {
      return {
        ok: false,
        message:
          err?.response?.data?.message || "Cancellation failed",
      };
    }
  }

  // ================= CONTEXT VALUE =================
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        addBooking,
        getBookings,
        cancelBooking,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
