"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import "../../../../styles/Product.css";

const URL = "https://dummyjson.com/products";

export default function Product({ params }) {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`${URL}/${params.id}`);
      const data = await response.json();
      setProduct(data);
      console.log(data);
    };

    fetchProducts();
  }, [params.id, setProduct]);

  return (
    <div key={product.index} className="product-page">
      <Image
        src={product.thumbnail}
        alt="product"
        width={400}
        height={400}
        priority
      />
      <h2>{product.title}</h2>
      <h4>Brand: {product.brand}</h4>
      <h4>Category: {product.category}</h4>
      <p>{product.description}</p>
      <p className="product-price">${product.price}</p>
      <button className="button">Add to Cart</button>
    </div>
  );
}
