import React, { useState } from "react";
import Search from "../../components/search/Search";
import productsData from "./productsData";
import "./Products.css";

function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSorted, setIsSorted] = useState(false);

  const filteredAndSortedProducts = productsData
    .filter(
      (product) =>
        product.headline.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.price.toString().includes(searchTerm)
    )
    .sort((a, b) => (isSorted ? a.price - b.price : 0));

  return (
    <div className="store">
      <h1>Refresh & Refill Online Store</h1>
      <Search onChange={(e) => setSearchTerm(e.target.value)} />
      <button onClick={() => setIsSorted(!isSorted)} className="button">
        {isSorted ? "Reset" : "Sort by Price"}
      </button>
      <div className="products-grid">
        {filteredAndSortedProducts.map(
          ({ id, headline, description, photo, price }) => (
            <div key={id} className="product">
              <img src={photo} alt={headline} />
              <h2>{headline}</h2>
              <p>{description}</p>
              <p className="product-price">${price.toFixed(2)}</p>
              <button className="button">Add to Cart</button>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Products;
