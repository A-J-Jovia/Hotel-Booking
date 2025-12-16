// src/pages/HotelDetailsPage.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchHotelById } from "../api";
import { fetchHotelReviewsAPI, addReviewAPI } from "../api";
import { useAuth } from "../context/AuthContext";

export default function HotelDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  // ⭐ Reviews state
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviewError, setReviewError] = useState("");

  // ---------------- LOAD HOTEL ----------------
  useEffect(() => {
    async function loadHotel() {
      try {
        const data = await fetchHotelById(id);
        setHotel(data);
      } finally {
        setLoading(false);
      }
    }
    loadHotel();
  }, [id]);

  // ---------------- LOAD REVIEWS ----------------
  useEffect(() => {
    async function loadReviews() {
      const res = await fetchHotelReviewsAPI(id);
      if (res.ok) {
        setReviews(res.reviews);
        setAvgRating(res.avgRating);
      }
    }
    loadReviews();
  }, [id]);

  if (loading) return <p>Loading hotel…</p>;
  if (!hotel) return <h2>Hotel not found</h2>;

  return (
    <div className="container mb-5">

      {/* HERO IMAGE */}
      <div
        className="hotel-hero"
        style={{ backgroundImage: `url(${hotel.image})` }}
      >
        <div className="hotel-hero-text">
          <h1>{hotel.name}</h1>
          <p>{hotel.location}</p>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="mt-4">
        <h3>About This Hotel</h3>
        <p>{hotel.description}</p>
      </div>

      {/* ⭐ RATING SUMMARY */}
      <div className="mt-4">
        <h4>
          ⭐ {avgRating} / 5{" "}
          <span className="text-muted">({reviews.length} reviews)</span>
        </h4>
      </div>

      {/* AMENITIES */}
      {hotel.amenities?.length > 0 && (
        <div className="mt-4">
          <h4>Amenities</h4>
          <ul className="amenities-list">
            {hotel.amenities.map((a, i) => (
              <li key={i}>✅ {a}</li>
            ))}
          </ul>
        </div>
      )}

      {/* 📝 REVIEWS LIST */}
      <div className="mt-4">
        <h4>Guest Reviews</h4>

        {reviews.length === 0 && (
          <p className="text-muted">No reviews yet.</p>
        )}

        {reviews.map((r) => (
          <div key={r._id} className="card p-3 mb-3">
            <div className="d-flex justify-content-between">
              <strong>{r.userId?.name || "Guest"}</strong>
              <span>⭐ {r.rating}</span>
            </div>
            {r.comment && <p className="mt-2 mb-0">{r.comment}</p>}
          </div>
        ))}
      </div>

      {/* ✍️ ADD REVIEW */}
      {isAuthenticated && (
        <div className="card p-4 mt-4">
          <h5 className="fw-bold mb-3">Write a Review</h5>

          {reviewError && (
            <div className="alert alert-danger">{reviewError}</div>
          )}

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setReviewError("");

              try {
                const res = await addReviewAPI({
                  hotelId: hotel.id || hotel._id,
                  rating,
                  comment,
                });

                if (!res.ok) {
                  setReviewError(res.message);
                  return;
                }

                // Refresh reviews after submit
                const refreshed = await fetchHotelReviewsAPI(id);
                setReviews(refreshed.reviews);
                setAvgRating(refreshed.avgRating);

                setRating(5);
                setComment("");
              } catch (err) {
                setReviewError("Failed to submit review");
              }
            }}
          >
            <div className="mb-3">
              <label className="form-label">Rating</label>
              <select
                className="form-select"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
              >
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>
                    {n} Star{n > 1 && "s"}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Comment (optional)</label>
              <textarea
                className="form-control"
                rows="3"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>

            <button className="btn btn-primary">Submit Review</button>
          </form>
        </div>
      )}

      {/* PRICE + BOOK */}
      <div className="price-box mt-5">
        <h3>₹ {hotel.price} / night</h3>
        <button
          className="btn btn-success btn-lg w-100 mt-3"
          onClick={() => navigate("/booking", { state: { hotel } })}
        >
          Book Now
        </button>
      </div>
    </div>
  );
}