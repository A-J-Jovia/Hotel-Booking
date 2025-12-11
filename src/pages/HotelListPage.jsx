function HotelListPage() {
  const hotels = [
    {
      id: 1,
      name: "Grand Palace Hotel",
      location: "Chennai",
      price: 3500,
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"
    },
    {
      id: 2,
      name: "Ocean View Resort",
      location: "Goa",
      price: 5500,
      image: "https://wallpaperbat.com/img/54238755-tropical-evening-beach-resort-maldives.jpg"
    },
    {
      id: 3,
      name: "City Comfort Inn",
      location: "Bangalore",
      price: 2500,
      image: "https://i.pinimg.com/736x/e6/30/db/e630db9e931df9ea09a6090cf5dbfa89.jpg"
    }
  ];

  return (
    <div>
      <h2 className="fw-bold mb-4">Available Hotels</h2>

      <div className="row">
        {hotels.map((hotel) => (
          <div key={hotel.id} className="col-md-4 mb-4">
            <div className="card shadow-sm">

              {/* Hotel Image */}
              <img
                src={hotel.image}
                alt={hotel.name}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />

              <div className="card-body">
                <h5 className="card-title">{hotel.name}</h5>
                <p className="card-text text-muted">{hotel.location}</p>
                <p className="fw-bold">₹ {hotel.price} / night</p>

                <a
                  href={`/hotel/${hotel.id}`}
                  className="btn btn-primary btn-sm"
                >
                  View Details
                </a>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HotelListPage;
