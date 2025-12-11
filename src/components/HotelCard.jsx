// src/components/HotelCard.jsx
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function HotelCard({ hotel }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  function handleViewDetails() {
    navigate(`/hotel/${hotel.id}`);
  }

  function handleBookNow() {
    if (!isAuthenticated) {
      // redirect to login and remember where we came from, include hotel data
      navigate("/login", { state: { from: "/booking", hotel } });
      return;
    }
    // logged in - proceed to booking page
    navigate("/booking", { state: { hotel } });
  }

  return (
    <div
      className="card h-100 shadow-sm border-0"
      style={{
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        borderRadius: "10px",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1)";
      }}
      data-aos="fade-up"
    >
      <div style={{ overflow: "hidden" }}>
        <img
          src={hotel.image}
          alt={hotel.name}
          className="card-img-top"
          style={{
            height: "180px",
            width: "100%",
            objectFit: "cover",
            transition: "transform 0.4s ease",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        />
      </div>

      <div className="card-body">
        <h5 className="card-title fw-bold">{hotel.name}</h5>
        <p className="text-muted mb-1">{hotel.location}</p>
        <p className="fw-bold mb-3">₹ {hotel.price} / night</p>

        <div className="d-flex justify-content-between">
          <button className="btn btn-primary btn-sm" onClick={handleViewDetails}>
            View Details
          </button>

          <button className="btn btn-success btn-sm" onClick={handleBookNow}>
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
