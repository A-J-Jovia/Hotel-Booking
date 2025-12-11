import { useParams, Link, useNavigate } from "react-router-dom";

function HotelDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Temporary hotel list (API will replace this later)
  const hotels = [
    {
      id: 1,
      name: "Grand Palace Hotel",
      location: "Chennai",
      price: 3500,
      image:
        "https://p4.wallpaperbetter.com/wallpaper/4/496/990/palace-4k-high-resolution-wallpaper-preview.jpg",
      description:
        "Experience luxury and comfort at Grand Palace Hotel. Perfect for business travelers and families, offering world-class amenities and exceptional hospitality.",
      amenities: ["Free Wi-Fi", "Swimming Pool", "Room Service", "Parking"],
    },
    {
      id: 2,
      name: "Ocean View Resort",
      location: "Goa",
      price: 5500,
      image:
        "https://wallpaperbat.com/img/615705-hd-desktop-wallpaper-of-maldives-desktop-wallpaper-of-ocean-resort.jpg",
      description:
        "Wake up to breathtaking ocean views and unwind with beach activities. Ideal for vacation lovers and honeymoon couples.",
      amenities: ["Beach Access", "Spa", "Restaurant", "Free Breakfast"],
    },
    {
      id: 3,
      name: "City Comfort Inn",
      location: "Bangalore",
      price: 2500,
      image:
        "https://i.pinimg.com/736x/e6/30/db/e630db9e931df9ea09a6090cf5dbfa89.jpg",
      description:
        "A budget-friendly stay offering clean rooms, fast Wi-Fi, and easy access to IT hubs and malls.",
      amenities: ["Free Wi-Fi", "Parking", "24/7 Security", "AC Rooms"],
    },
  ];

  // Find selected hotel
  const hotel = hotels.find((h) => h.id === Number(id));

  if (!hotel) return <h2 className="text-danger">Hotel Not Found</h2>;

  // When clicking Book Now
  function goToBooking() {
    navigate("/booking", { state: { hotel } });
  }

  return (
    <div className="container mb-5">

      {/* HERO IMAGE */}
      <div
        className="position-relative mb-4 shadow"
        style={{
          height: "350px",
          backgroundImage: `url(${hotel.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "10px",
        }}
      >
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background: "rgba(0,0,0,0.4)",
            borderRadius: "10px",
          }}
        ></div>

        <div className="position-absolute bottom-0 text-white p-4">
          <h1 className="fw-bold">{hotel.name}</h1>
          <h5>{hotel.location}</h5>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="mb-4">
        <h3 className="fw-bold">About This Hotel</h3>
        <p className="text-muted">{hotel.description}</p>
      </div>

      {/* AMENITIES */}
      <div className="mb-4">
        <h4 className="fw-bold">Amenities</h4>
        <ul className="list-group list-group-flush mt-2">
          {hotel.amenities.map((item, index) => (
            <li key={index} className="list-group-item">
              ✅ {item}
            </li>
          ))}
        </ul>
      </div>

      {/* PRICE + BOOK NOW */}
      <div className="border rounded p-4 shadow">
        <h3 className="fw-bold text-success">₹ {hotel.price} / night</h3>

        <button
          onClick={goToBooking}
          className="btn btn-success w-100 mt-3 py-2 fw-bold fs-5"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}

export default HotelDetailsPage;
