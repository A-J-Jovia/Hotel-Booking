// src/api.js
import axios from "axios";

// ================== BASE URL ==================
const BASE_URL = import.meta.env.VITE_API_URL;

if (!BASE_URL) {
  console.error("❌ VITE_API_URL is not defined");
}

// ================== AXIOS INSTANCE ==================
export const api = axios.create({
  baseURL: BASE_URL,
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
export async function fetchHotels() {
  const res = await api.get("/api/hotels");
  return res.data.map((h) => ({ ...h, id: h._id }));
}

export async function fetchHotelById(id) {
  const res = await api.get(`/api/hotels/${id}`);
  return { ...res.data, id: res.data._id };
}

// ================== BOOKINGS ==================
export async function createBookingAPI(payload) {
  const res = await api.post("/api/bookings", payload);
  return res.data;
}

export async function fetchUserBookingsAPI() {
  const res = await api.get("/api/bookings");
  return res.data;
}

export async function cancelBookingAPI(id) {
  const res = await api.delete(`/api/bookings/${id}`);
  return res.data;
}

// ================== AUTH ==================
export async function loginAPI(body) {
  const res = await api.post("/api/auth/login", body);
  return res.data;
}

export async function registerAPI(body) {
  const res = await api.post("/api/auth/register", body);
  return res.data;
}

// ================== REVIEWS ==================
export async function fetchHotelReviewsAPI(hotelId) {
  const res = await api.get(`/api/reviews/${hotelId}`);
  return res.data;
}

export async function addReviewAPI(payload) {
  const res = await api.post("/api/reviews", payload);
  return res.data;
}
