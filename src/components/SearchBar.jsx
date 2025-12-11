import { useState } from "react";

function SearchBar({ onSearch }) {
  const [location, setLocation] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(location);   // send value to parent page
  }

  return (
    <form className="d-flex gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        className="form-control"
        placeholder="Search hotels by location..."
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <button className="btn btn-primary" type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
