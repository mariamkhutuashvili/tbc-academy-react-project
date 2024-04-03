import "./Search.css";

function Search({ onChange }) {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search products..."
        className="search-input"
        onChange={onChange}
      />
      <button className="button search-button">Search</button>
    </div>
  );
}

export default Search;
