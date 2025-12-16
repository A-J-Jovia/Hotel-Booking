// src/pages/HotelListPage.jsx
import { useEffect, useState } from "react";
import HotelCard from "../components/HotelCard";
import { fetchHotels } from "../api";

export default function HotelListPage() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const list = await fetchHotels();
      setHotels(list);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div>
      <h2 className="fw-bold mb-4">Available Hotels</h2>

      {loading ? (
        <p>Loading hotels…</p>
      ) : (
        <div className="row">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="col-md-4 mb-4">
              <HotelCard hotel={hotel} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
