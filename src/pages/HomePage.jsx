// src/pages/HomePage.jsx
import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import HotelCard from "../components/HotelCard";
import { fetchHotels } from "../api";

function HomePage() {
  const [hotels, setHotels] = useState([]);
  const [allHotels, setAllHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const list = await fetchHotels();
      setAllHotels(list);
      setHotels(list);
      setLoading(false);
    }
    load();
  }, []);

  // Filter hotels by location
  function handleSearch(location) {
    if (!location || !location.trim()) {
      setHotels(allHotels);
      return;
    }
    const filtered = allHotels.filter((hotel) =>
      (hotel.location || "").toLowerCase().includes(location.toLowerCase())
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

      {loading ? (
        <p>Loading hotels…</p>
      ) : (
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
      )}
    </div>
  );
}

export default HomePage;
