function Search() {
    return (
      <div className="search-container">
        <input
          type="text"
          placeholder="Search products..."
          className="search-input"
        />
        <button className="button search-button">Search</button>
      </div>
    );
  }
  
  export default Search;