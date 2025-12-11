import { useState } from "react";
import SearchBar from "../components/SearchBar";
import HotelCard from "../components/HotelCard";

function HomePage() {
  // Hotel Data with online images
  <h2><i className="fa-solid fa-hotel me-2"></i> Welcome to Hotel Booking</h2>

  const hotelData = [
  {
    id: 1,
    name: "Grand Palace Hotel",
    location: "Chennai",
    price: 3500,
    image: "https://p4.wallpaperbetter.com/wallpaper/4/496/990/palace-4k-high-resolution-wallpaper-preview.jpg",
  },
  {
    id: 2,
    name: "Ocean View Resort",
    location: "Goa",
    price: 5500,
    image: "https://wallpaperbat.com/img/615705-hd-desktop-wallpaper-of-maldives-desktop-wallpaper-of-ocean-resort.jpg",
  },
  {
    id: 3,
    name: "City Comfort Inn",
    location: "Bangalore",
    price: 2500,
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80",
  },
];


  const [hotels, setHotels] = useState(hotelData);

  // Filter hotels by location
  function handleSearch(location) {
    if (!location.trim()) {
      setHotels(hotelData);
      return;
    }

    const filtered = hotelData.filter((hotel) =>
      hotel.location.toLowerCase().includes(location.toLowerCase())
    );

    setHotels(filtered);
  }

  return (
    <div>

      {/* HERO SECTION */}
      <div
        className="position-relative p-5 mb-5 rounded shadow"
        style={{
          height: "350px",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ background: "rgba(0,0,0,0.45)", borderRadius: "8px" }}
        ></div>

        {/* Content */}
        <div className="position-relative text-center text-white">
          <h1 className="fw-bold">Find Your Perfect Hotel Stay</h1>
          <p className="mt-2">
            Luxury rooms, best prices, instant booking — plan your travel now.
          </p>

          {/* Search Bar */}
          <div className="mt-4 d-flex justify-content-center">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </div>

      {/* SECTION: TOP HOTELS */}
      <h2 className="fw-bold mb-4">Top Hotels</h2>

      <div className="row">
        {hotels.length > 0 ? (
          hotels.map((hotel) => (
            <div key={hotel.id} className="col-md-4 mb-4">
              <HotelCard hotel={hotel} />
            </div>
          ))
        ) : (
          <p className="text-muted">No hotels found for this location.</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;