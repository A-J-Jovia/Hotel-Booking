export default function Gallery() {
  return (
    <div>
      <h2 className="fw-bold">Gallery</h2>
      <div className="row g-3">
        {/* sample images */}
        {[1,2,3,4].map(i=>(
          <div key={i} className="col-md-3" data-aos="zoom-in">
            <img src={`https://source.unsplash.com/collection/190727/800x600?sig=${i}`} alt="gallery" className="rounded w-100" style={{height:150,objectFit:'cover'}}/>
          </div>
        ))}
      </div>
    </div>
  );
}
