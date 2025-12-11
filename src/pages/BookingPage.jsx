// src/pages/BookingPage.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";

export default function BookingPage() {
  const { isAuthenticated, user, addBooking } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const hotel = location.state?.hotel;

  // Redirect if no hotel
  useEffect(() => {
    if (!hotel) navigate("/hotels");
  }, [hotel]);

  // Redirect if not logged in
  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated]);

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    checkin: "",
    checkout: "",
    guests: 1,
  });

  const totalPrice = (hotel?.price || 0) * form.guests;

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function submitBooking(e) {
    e.preventDefault();

    const bookingPayload = {
      userEmail: user.email,
      userName: user.name,
      hotelId: hotel.id,
      hotel,
      checkin: form.checkin,
      checkout: form.checkout,
      guests: form.guests,
      price: totalPrice,
      createdAt: new Date().toISOString(),
    };

    addBooking(bookingPayload);
    navigate("/dashboard");
  }

  if (!hotel) return null;

  return (
    <div className="container">
      <h2 className="fw-bold mb-4">Complete Your Booking</h2>

      <div className="row">
        <div className="col-md-7">

          <div className="card shadow-sm p-4 mb-4">
            <h4 className="fw-bold mb-3">Guest Details</h4>

            <form onSubmit={submitBooking}>
              <div className="mb-3">
                <label className="form-label fw-bold">Full Name</label>
                <input type="text" name="name" className="form-control"
                  value={form.name} onChange={handleChange} required />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Email</label>
                <input type="email" name="email" className="form-control"
                  value={form.email} onChange={handleChange} required />
              </div>

              <hr />

              <h5 className="fw-bold mb-3">Booking Dates</h5>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">Check-In</label>
                  <input type="date" name="checkin"
                    className="form-control" value={form.checkin}
                    onChange={handleChange} required />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">Check-Out</label>
                  <input type="date" name="checkout"
                    className="form-control" value={form.checkout}
                    onChange={handleChange} required />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Guests</label>
                <select name="guests" className="form-select"
                  value={form.guests} onChange={handleChange}>
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                </select>
              </div>

              <button className="btn btn-success w-100 py-2 mt-3 fw-bold fs-5">
                Confirm Booking
              </button>
            </form>
          </div>

        </div>

        <div className="col-md-5">
          <div className="card shadow-sm p-4">
            <h4 className="fw-bold mb-3">Booking Summary</h4>

            <img src={hotel.image} className="rounded mb-3"
              style={{ height: 200, width: "100%", objectFit: "cover" }} />

            <h5 className="fw-bold">{hotel.name}</h5>
            <p className="text-muted">{hotel.location}</p>

            <hr />

            <p><strong>Check-In:</strong> {form.checkin || "—"}</p>
            <p><strong>Check-Out:</strong> {form.checkout || "—"}</p>
            <p><strong>Guests:</strong> {form.guests}</p>

            <h5 className="fw-bold mt-3">₹{totalPrice} total</h5>
          </div>
        </div>
      </div>
    </div>
  );
}