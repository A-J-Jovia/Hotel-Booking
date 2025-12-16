// src/pages/AdminPage.jsx
import { useEffect, useState } from "react";
import { fetchHotels, addHotelAPI, deleteHotelAPI } from "../api";
import { useAuth } from "../context/AuthContext";

function AdminPage() {
  const { user } = useAuth();
  const [hotels, setHotels] = useState([]);
  const [form, setForm] = useState({
    name: "",
    location: "",
    price: "",
    image: "",
    description: "",
    amenities: "",
  });

  useEffect(() => {
    loadHotels();
  }, []);

  async function loadHotels() {
    const data = await fetchHotels();
    setHotels(data);
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function addHotel(e) {
    e.preventDefault();

    const payload = {
      ...form,
      price: Number(form.price),
      amenities: form.amenities.split(",").map(a => a.trim()),
    };

    await addHotelAPI(payload);
    setForm({
      name: "",
      location: "",
      price: "",
      image: "",
      description: "",
      amenities: "",
    });

    loadHotels();
  }

  async function deleteHotel(id) {
    if (!window.confirm("Delete this hotel?")) return;
    await deleteHotelAPI(id);
    loadHotels();
  }

  return (
    <div>
      <h2 className="fw-bold mb-4">
        Admin Panel
        <span className="text-muted fs-6 ms-2">({user?.name})</span>
      </h2>

      <form className="border p-4 rounded mb-4" onSubmit={addHotel}>
        <h5 className="fw-bold mb-3">Add Hotel</h5>

        <input className="form-control mb-2" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input className="form-control mb-2" name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
        <input className="form-control mb-2" name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required />
        <input className="form-control mb-2" name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />
        <textarea className="form-control mb-2" name="description" placeholder="Description" value={form.description} onChange={handleChange}></textarea>
        <input className="form-control mb-3" name="amenities" placeholder="Amenities (comma separated)" value={form.amenities} onChange={handleChange} />

        <button className="btn btn-success">Add Hotel</button>
      </form>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Hotel</th>
            <th>Location</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {hotels.map((h, i) => (
            <tr key={h.id}>
              <td>{i + 1}</td>
              <td>{h.name}</td>
              <td>{h.location}</td>
              <td>₹{h.price}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteHotel(h.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPage;