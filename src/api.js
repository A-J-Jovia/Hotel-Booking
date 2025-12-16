// src/api.js
import axios from "axios";

// ================== BASE URL ==================
// MUST be only the domain, NO /api here
const BASE_URL = import.meta.env.VITE_API_URL;

if (!BASE_URL) {
  console.error("❌ VITE_API_URL is not defined");
}

// ================== AXIOS INSTANCE ==================
export const api = axios.create({
  baseURL: BASE_URL, // https://hotel-booking-backend-k8ip.onrender.com
  timeout: 10000,
});

// ================== AUTH TOKEN ==================
export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
}

// ================== HOTELS ==================
// Backend route: /api/hotels
export async function fetchHotels() {
  const res = await api.get("/api/hotels");
  return (res.data || []).map((h) => ({
    ...h,
    id: h._id,
  }));
}

export async function fetchHotelById(id) {
  const res = await api.get(`/api/hotels/${id}`);
  const h = res.data;
  return { ...h, id: h._id };
}

// ================== ADMIN HOTEL APIs ==================
export async function addHotelAPI(data) {
  const res = await api.post("/api/hotels", data);
  return res.data;
}

export async function deleteHotelAPI(id) {
  const res = await api.delete(`/api/hotels/${id}`);
  return res.data;
}

export async function updateHotelAPI(id, data) {
  const res = await api.put(`/api/hotels/${id}`, data);
  return res.data;
}

// ================== BOOKINGS ==================
// Backend route: /bookings
export async function createBookingAPI(payload) {
  const res = await api.post("/bookings", payload);
  return res.data;
}

export async function fetchUserBookingsAPI() {
  const res = await api.get("/bookings");
  return res.data;
}

export async function cancelBookingAPI(id) {
  const res = await api.delete(`/bookings/${id}`);
  return res.data;
}

// ================== AUTH ==================
// Backend route: /auth
export async function loginAPI(body) {
  const res = await api.post("/api/auth/login", body);
  return res.data;
}

export async function registerAPI(body) {
  const res = await api.post("/api/auth/register", body);
  return res.data;
}

// ================== REVIEWS ==================
// Backend route: /reviews
export async function fetchHotelReviewsAPI(hotelId) {
  const res = await api.get(`/reviews/${hotelId}`);
  return res.data;
}

export async function addReviewAPI(payload) {
  const res = await api.post("/reviews", payload);
  return res.data;
}
