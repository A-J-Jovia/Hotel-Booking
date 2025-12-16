// src/pages/BookingDetailsPage.jsx
import { useLocation, useNavigate } from "react-router-dom";

export default function BookingDetailsPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const booking = state?.booking;
  const hotel = booking?.hotel;

  if (!booking || !hotel) {
    return (
      <div className="container mt-5">
        <h3 className="text-danger">Booking not found</h3>
        <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="container mb-5">
      <button className="btn btn-outline-secondary mb-3" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <img
        src={hotel.image}
        alt={hotel.name}
        className="w-100 rounded shadow mb-4"
        style={{ height: 350, objectFit: "cover" }}
      />

      <h2 className="fw-bold">{hotel.name}</h2>
      <p className="text-muted">{hotel.location}</p>

      <hr />

      <h4>About Hotel</h4>
      <p>{hotel.description}</p>

      <h4>Amenities</h4>
      <ul>
        {hotel.amenities.map((a, i) => (
          <li key={i}>✅ {a}</li>
        ))}
      </ul>

      <hr />

      <h4>Booking Details</h4>
      <p><strong>Check-in:</strong> {booking.checkin}</p>
      <p><strong>Check-out:</strong> {booking.checkout}</p>
      <p><strong>Guests:</strong> {booking.guests}</p>
      <p><strong>Booked On:</strong> {new Date(booking.createdAt).toLocaleString()}</p>

      <h3 className="text-success mt-3">
        Total Paid: ₹{booking.totalPrice}
      </h3>
    </div>
  );
}
