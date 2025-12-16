// src/pages/BookingPage.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { createBookingAPI } from "../api";
import { useState, useEffect } from "react";
import dayjs from "dayjs";

export default function BookingPage() {
  const { isAuthenticated, user, addBooking } = useAuth(); // Use addBooking from context
  const location = useLocation();
  const navigate = useNavigate();

  const hotel = location.state?.hotel;

  // --- Initialize Dates ---
  // Get today's and tomorrow's date strings in YYYY-MM-DD format
  const today = dayjs().format("YYYY-MM-DD");
  const defaultCheckout = dayjs().add(1, 'day').format("YYYY-MM-DD");

  // Redirect if no hotel selected or user is not logged in
  useEffect(() => {
    if (!hotel) navigate("/hotels");
  }, [hotel, navigate]);

  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated, navigate]);

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    checkin: today,
    checkout: defaultCheckout,
    guests: 1,
  });
  
  // --- Dynamic Calculation ---
  const checkInDate = dayjs(form.checkin);
  const checkOutDate = dayjs(form.checkout);

  const nights = checkOutDate.isValid() && checkInDate.isValid() && checkOutDate.isAfter(checkInDate, 'day') 
    ? checkOutDate.diff(checkInDate, 'day') 
    : 0;

  // Price = Hotel Price * Nights * Guests (assuming hotel.price is per night)
  const totalPrice = (hotel?.price || 0) * nights * Number(form.guests);

  // --- Handlers ---
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submitBooking(e) {
    e.preventDefault();
    
    // Client-side date validation check
    if (nights === 0) {
      alert("Please select valid dates (Check-out must be after Check-in).");
      return;
    }

    try {
      const payload = {
        hotelId: hotel.id || hotel._id,
        checkin: form.checkin,
        checkout: form.checkout,
        guests: Number(form.guests),
      };

      // Use context's addBooking which handles the API call and error wrapping
      const res = await addBooking(payload);

      if (!res.ok) {
        // If backend returns 409 (Conflict/Already booked), res.message will contain the error
        alert(res.message || "Booking failed due to a server error.");
        return;
      }

      // ✅ SUCCESS
      navigate("/confirm", { state: { booking: res.booking } });
    } catch (err) {
      alert("Something went wrong while confirming the booking.");
      console.error(err);
    }
  }

  if (!hotel) return null;

  return (
    <div className="container">
      <h2 className="fw-bold mb-4">Complete Your Booking</h2>

      <div className="row">
        {/* LEFT FORM */}
        <div className="col-md-7">
          <div className="card shadow-sm p-4 mb-4">
            <h4 className="fw-bold mb-3">Guest Details</h4>

            <form onSubmit={submitBooking}>
              {/* User Name & Email - Disabled for authenticated user */}
              <div className="mb-3">
                <label className="form-label fw-bold">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={form.name}
                  disabled
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={form.email}
                  disabled
                />
              </div>

              <hr />

              <h5 className="fw-bold mb-3">Booking Dates</h5>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">Check-In</label>
                  <input
                    type="date"
                    name="checkin"
                    className="form-control"
                    value={form.checkin}
                    onChange={handleChange}
                    min={today} // Restrict check-in to today or later
                    required
                  />
              </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">Check-Out</label>
                  <input
                    type="date"
                    name="checkout"
                    className="form-control"
                    value={form.checkout}
                    onChange={handleChange}
                    min={dayjs(form.checkin).add(1, 'day').format("YYYY-MM-DD")} // Must be at least 1 day after check-in
                    required
                  />
                </div>
              </div>
              
              {nights > 0 && (
                <p className="text-info fw-bold">
                  Booking for {nights} night{nights > 1 ? "s" : ""}
                </p>
              )}

              <div className="mb-3">
                <label className="form-label fw-bold">Guests</label>
                <select
                  name="guests"
                  className="form-select"
                  value={form.guests}
                  onChange={handleChange}
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                </select>
              </div>

              <button className="btn btn-success w-100 py-2 fw-bold fs-5" disabled={nights === 0}>
                Confirm Booking ({nights} night{nights > 1 ? "s" : ""})
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT SUMMARY */}
        <div className="col-md-5">
          <div className="card shadow-sm p-4">
            <h4 className="fw-bold mb-3">Booking Summary</h4>

            <img
              src={hotel.image}
              alt={hotel.name}
              className="rounded mb-3"
              style={{ height: 200, width: "100%", objectFit: "cover" }}
            />

            <h5 className="fw-bold">{hotel.name}</h5>
            <p className="text-muted">{hotel.location}</p>

            <hr />

            <div className="d-flex justify-content-between mb-2">
              <span><strong>Price per Night:</strong></span>
              <span className="fw-bold">₹{hotel.price}</span>
            </div>
            
            <div className="d-flex justify-content-between mb-2">
              <span><strong>Nights:</strong></span>
              <span>{nights}</span>
            </div>
            
            <div className="d-flex justify-content-between mb-2">
              <span><strong>Guests:</strong></span>
              <span>{form.guests}</span>
            </div>

            <hr />
            
            <div className="d-flex justify-content-between mb-3">
              <span><strong>Check-In:</strong></span>
              <span>{form.checkin || "—"}</span>
            </div>
            
            <div className="d-flex justify-content-between mb-3">
              <span><strong>Check-Out:</strong></span>
              <span>{form.checkout || "—"}</span>
            </div>

            <h3 className="fw-bold mt-3 text-success text-center border-top pt-3">
              Total: ₹{totalPrice} 
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}