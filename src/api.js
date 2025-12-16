// src/api.js
import axios from "axios";

const BASE = "http://localhost:5000/api";

export const api = axios.create({
  baseURL: BASE,
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
  const res = await api.get("/hotels");
  return (res.data || []).map((h) => ({
    ...h,
    id: h._id,
  }));
}

export async function fetchHotelById(id) {
  const res = await api.get(`/hotels/${id}`);
  const h = res.data;
  return { ...h, id: h._id };
}

// ================== ADMIN HOTEL APIs ==================
export async function addHotelAPI(data) {
  const res = await api.post("/hotels", data);
  return res.data;
}

export async function deleteHotelAPI(id) {
  const res = await api.delete(`/hotels/${id}`);
  return res.data;
}

export async function updateHotelAPI(id, data) {
  const res = await api.put(`/hotels/${id}`, data);
  return res.data;
}

// ================== BOOKINGS ==================
export async function createBookingAPI(payload) {
  const res = await api.post("/bookings", payload);
  return res.data;
}

export async function fetchUserBookingsAPI() {
  const res = await api.get("/bookings");
  return res.data;
}

// ================== AUTH ==================
export async function loginAPI(body) {
  const res = await api.post("/auth/login", body);
  return res.data;
}

export async function registerAPI(body) {
  const res = await api.post("/auth/register", body);
  return res.data;
}

// ================== CANCEL BOOKING ==================
export async function cancelBookingAPI(id) {
  const res = await api.delete(`/bookings/${id}`);
  return res.data;
}

// ================== REVIEWS ==================
export async function fetchHotelReviewsAPI(hotelId) {
  const res = await api.get(`/reviews/${hotelId}`);
  return res.data;
}

export async function addReviewAPI(payload) {
  const res = await api.post("/reviews", payload);
  return res.data;
}
