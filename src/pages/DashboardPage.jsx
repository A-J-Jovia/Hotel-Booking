// src/pages/DashboardPage.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const { getBookings, cancelBooking } = useAuth();
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      const list = await getBookings();
      setBookings(list || []);
    }
    load();
  }, [getBookings]);

  return (
    <div className="container">
      <h2 className="fw-bold mb-4">My Bookings</h2>

      {bookings.length === 0 && (
        <div className="alert alert-info">You have no bookings yet.</div>
      )}

      <div className="row">
        {bookings.map((b) => (
          <div
            key={b._id}
            className="col-md-6 mb-4"
            style={{ cursor: "pointer" }}
            onClick={() =>
              navigate(`/booking/${b._id}`, { state: { booking: b } })
            }
          >
            <div className="card shadow-sm h-100">
              <img
                src={b.hotel.image}
                alt={b.hotel.name}
                className="card-img-top"
                style={{ height: 180, objectFit: "cover" }}
              />

              <div className="card-body">
                <h5 className="fw-bold">{b.hotel.name}</h5>
                <p className="text-muted">{b.hotel.location}</p>

                <p><strong>Check-in:</strong> {b.checkin}</p>
                <p><strong>Check-out:</strong> {b.checkout}</p>
                <p><strong>Guests:</strong> {b.guests}</p>

                <h6 className="fw-bold text-success">
                  ₹{b.totalPrice}
                </h6>

                <button
                  className="btn btn-outline-danger btn-sm mt-2"
                  onClick={async (e) => {
                    e.stopPropagation(); // ⛔ prevent card click

                    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

                    const res = await cancelBooking(b._id);

                    if (!res.ok) {
                      alert(res.message);
                      return;
                    }

                    alert("Booking cancelled");
                    setBookings(bookings.filter(item => item._id !== b._id));
                  }}
                >
                  Cancel Booking
              </button>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
