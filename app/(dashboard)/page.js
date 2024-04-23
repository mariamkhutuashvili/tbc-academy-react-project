"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Search from "../../components/search/Search";
import AddToCartButton from "../../components/UI/AddToCartButton";
import "../../styles/Page.css";

function debounce(func, wait) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSorted, setIsSorted] = useState(false);
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      setProducts(data.products);
      console.log(data.products);
    };
    fetchProducts();
  }, []);

  const debouncedSetSearchTerm = debounce(setSearchTerm, 300);

  const filteredAndSortedProducts = products
    .filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.price.toString().includes(searchTerm)
    )
    .sort((a, b) => (isSorted ? a.price - b.price : 0));

  const handleProductClick = (id) => {
    router.push(`/products/${id}`);
  };

  return (
    <div className="store">
      <h1>Online Store</h1>
      <Search onChange={(e) => debouncedSetSearchTerm(e.target.value)} />
      <button onClick={() => setIsSorted(!isSorted)} className="button">
        {isSorted ? "Reset" : "Sort by Price"}
      </button>
      <div className="products-grid">
        {filteredAndSortedProducts.map(
          ({ id, title, description, thumbnail, price }) => (
            <div
              key={id}
              className="product"
              onClick={() => handleProductClick(id)}
            >
              <Image src={thumbnail} alt={title} width={500} height={500} />
              <h2>{title}</h2>
              <p>{description}</p>
              <p className="product-price">${price.toFixed(2)}</p>
              <AddToCartButton />
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Products;
