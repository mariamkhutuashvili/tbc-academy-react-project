import React, { useState } from "react";
import Search from "../../components/search/Search";
import productsData from "./productsData";
import "./Products.css";

function Products() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = productsData.filter((product) =>
    product.headline.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="store">
      <h1>Refresh & Refill Online Store</h1>
      <Search onChange={(e) => setSearchTerm(e.target.value)} />
      <div className="products-grid">
        {filteredProducts.map(({ id, headline, description, photo, price }) => (
          <div key={id} className="product">
            <img src={photo} alt={headline} />
            <h2>{headline}</h2>
            <p>{description}</p>
            <p className="product-price">${price.toFixed(2)}</p>
            <button className="button">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
