import Search from "../search/Search";
import productsData from "./productsData";
import "./Products.css";

function Products() {
  return (
    <div className="store">
      <h1>Refresh & Refill Online Store</h1>
      <Search />
      <div className="products-grid">
        {productsData.map(({ id, headline, description, photo }) => (
          <div key={id} className="product">
            <img src={photo} alt={headline} />
            <h2>{headline}</h2>
            <p>{description}</p>
            <button className="button">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
