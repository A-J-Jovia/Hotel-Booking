// src/api.js
import axios from "axios";

const FAKE_BASE = "https://my-fake-api.dev"; // placeholder, not required for local fallback

// axios instance (you can swap baseURL to RapidAPI endpoints if you want)
export const api = axios.create({
  baseURL: FAKE_BASE,
  timeout: 8000,
});

// Example functions with fallback local data
const sampleHotels = [
  {
    id: 1,
    name: "Grand Palace Hotel",
    location: "Chennai",
    price: 3500,
    image: "https://images.unsplash.com/photo-1559599238-0a5cd54c2c74?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 2,
    name: "Ocean View Resort",
    location: "Goa",
    price: 5500,
    image: "https://images.unsplash.com/photo-1501117716987-c8e1ecb210d5?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 3,
    name: "City Comfort Inn",
    location: "Bangalore",
    price: 2500,
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80"
  }
];

export async function fetchHotels() {
  try {
    // try real request (replace endpoint later)
    const res = await api.get("/hotels");
    if (res?.data?.length) return res.data;
  } catch (e) {
    // ignore, we'll fallback to sample
  }
  return sampleHotels;
}

export async function fetchHotelById(id) {
  try {
    const res = await api.get(`/hotels/${id}`);
    if (res?.data) return res.data;
  } catch (e) {}
  return sampleHotels.find((h) => Number(h.id) === Number(id));
}

// Booking create — for demo we persist to localStorage
export async function createBooking(booking) {
  // booking => { userEmail, hotelId, hotel, checkin, checkout, guests, name }
  const key = "hb_bookings";
  const raw = localStorage.getItem(key);
  const bookings = raw ? JSON.parse(raw) : [];
  bookings.push({ id: Date.now(), ...booking });
  localStorage.setItem(key, JSON.stringify(bookings));
  return { ok: true, booking: bookings[bookings.length - 1] };
}

export async function fetchBookingsByEmail(email) {
  const key = "hb_bookings";
  const raw = localStorage.getItem(key);
  const bookings = raw ? JSON.parse(raw) : [];
  return bookings.filter((b) => b.userEmail === email);
}