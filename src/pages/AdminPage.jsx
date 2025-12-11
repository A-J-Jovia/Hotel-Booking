import { useState } from "react";

function AdminPage() {
  const [hotels, setHotels] = useState([
    { id: 1, name: "Grand Palace Hotel", location: "New York", price: 120 },
    { id: 2, name: "Ocean View Resort", location: "Goa", price: 200 },
  ]);

  const [newHotel, setNewHotel] = useState({
    name: "",
    location: "",
    price: "",
  });

  function handleChange(e) {
    setNewHotel({
      ...newHotel,
      [e.target.name]: e.target.value,
    });
  }

  function addHotel(e) {
    e.preventDefault();

    const newEntry = {
      id: hotels.length + 1,
      ...newHotel,
      price: Number(newHotel.price),
    };

    setHotels([...hotels, newEntry]);

    setNewHotel({ name: "", location: "", price: "" });
  }

  function deleteHotel(id) {
    setHotels(hotels.filter((h) => h.id !== id));
  }

  return (
    <div>
      <h2 className="fw-bold mb-4">Admin Panel — Manage Hotels</h2>

      {/* Add Hotel Form */}
      <form className="border p-4 rounded shadow-sm mb-4" onSubmit={addHotel}>
        <h5 className="mb-3 fw-bold">Add New Hotel</h5>

        <div className="row">
          <div className="col-md-4 mb-3">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Hotel Name"
              value={newHotel.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4 mb-3">
            <input
              type="text"
              name="location"
              className="form-control"
              placeholder="Location"
              value={newHotel.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4 mb-3">
            <input
              type="number"
              name="price"
              className="form-control"
              placeholder="Price Per Night"
              value={newHotel.price}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button className="btn btn-success">Add Hotel</button>
      </form>

      {/* Hotels Table */}
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Hotel</th>
            <th>Location</th>
            <th>Price (₹)</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {hotels.map((h) => (
            <tr key={h.id}>
              <td>{h.id}</td>
              <td>{h.name}</td>
              <td>{h.location}</td>
              <td>{h.price}</td>
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
