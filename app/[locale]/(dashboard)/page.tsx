"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Search from "../../../components/search/Search";
import Sort from "../../../components/sort/Sort";
import AddToCartButton from "../../../components/UI/AddToCartButton";
import { useI18n } from "../../../locales/client";
import Title from "../../../components/UI/Title";
import "../../../styles/page.css";

interface Product {
  id: number | string;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
}

function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: Parameters<T>) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

export default function Products() {
  const t = useI18n();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isSorted, setIsSorted] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      setProducts(data.products);
    };
    fetchProducts();
  }, []);

  const debouncedSetSearchTerm = debounce(
    (value: string) => setSearchTerm(value),
    300
  );

  const filteredAndSortedProducts = products
    .filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.price.toString().includes(searchTerm)
    )
    .sort((a, b) => (isSorted ? a.price - b.price : 0));

  const handleProductClick = (id: number | string) => {
    router.push(`/products/${id}`);
  };

  return (
    <div className="store">
      <Title titleName={t("onlineStore")} />
      <Search onChange={(e) => debouncedSetSearchTerm(e.target.value)} />
      <Sort isSorted={isSorted} onToggleSort={() => setIsSorted(!isSorted)} />
      <div className="products-grid">
        {filteredAndSortedProducts.map(
          ({ id, title, description, thumbnail, price }) => (
            <div
              key={id}
              className="product"
              onClick={() => handleProductClick(id)}
            >
              <Image src={thumbnail} alt={title} width={500} height={500} />
              <div className="product-content">
                <h2>{title}</h2>
                <p>{description}</p>
                <div className="price-container">
                  <p className="product-price">${price.toFixed(2)}</p>
                  <AddToCartButton />
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
