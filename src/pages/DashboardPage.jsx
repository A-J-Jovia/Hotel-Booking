// src/pages/DashboardPage.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function DashboardPage() {
  const { user, getBookings } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (user) {
      setBookings(getBookings());
    }
  }, [user]);

  return (
    <div>
      <h2 className="fw-bold mb-4">My Bookings</h2>

      {bookings.length === 0 && (
        <div className="alert alert-info">You have no bookings yet.</div>
      )}

      <div className="row">
        {bookings.map((b) => (
          <div key={b.id} className="col-md-6 mb-3" data-aos="fade-up">
            <div className="card">
              <div className="row g-0">
                <div className="col-4">
                  <img
                    src={b.hotel.image}
                    alt={b.hotel.name}
                    style={{ width: "100%", height: "120px", objectFit: "cover" }}
                  />
                </div>
                <div className="col-8">
                  <div className="card-body">
                    <h5 className="card-title">{b.hotel.name}</h5>
                    <p className="card-text text-muted">{b.hotel.location}</p>
                    <p className="mb-1"><strong>Check-in:</strong> {b.checkin}</p>
                    <p className="mb-1"><strong>Check-out:</strong> {b.checkout}</p>
                    <p><strong>Guests:</strong> {b.guests}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

