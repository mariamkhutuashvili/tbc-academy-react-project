import Search from "../../components/search/Search";
import productsData from "./productsData";
import "./Products.css";

function Products() {
  return (
    <div className="store">
      <h1>Refresh & Refill Online Store</h1>
      <Search />
      <div className="products-grid">
        {productsData.map(({ id, headline, description, photo, price }) => (
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
