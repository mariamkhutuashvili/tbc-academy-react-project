"use client";

import Image from "next/image";
import { useState, useEffect, useReducer } from "react";
import { useRouter } from "next/navigation";
import Search from "../../../components/search/Search";
import Sort from "../../../components/sort/Sort";
import AddToCartButton from "../../../components/UI/AddToCartButton";
import { useI18n } from "../../../locales/client";
import Title from "../../../components/UI/Title";
import "../../../styles/page.css";
import { reducer } from "../../useReducerHook";
import { useLocalStorage } from "../../useLocalStorageHook";
import Link from "next/link";

interface Product {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
}

interface SelectedProd {
  id: number;
  count: number;
}
const initialState: SelectedProd[] = [];

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
  const [value, setCachedValue] = useLocalStorage(
    "selectedProducts",
    initialState
  );
  const [selectedProducts, dispatch] = useReducer(reducer, value);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    setCachedValue(selectedProducts);
  }, [selectedProducts, setCachedValue]);

  const selectedProductCount = selectedProducts.reduce((acc, curr) => {
    return acc + curr?.count;
  }, 0);

  const router = useRouter();

  const handleClick = (card: Product) => {
    dispatch({ type: "INCREMENT", payload: card });
  };

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
      <div className="cart-message">
        <Link href={"/cart"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>{" "}
          {isClient && selectedProductCount} Items in Cart
        </Link>
      </div>
      <div className="products-grid">
        {filteredAndSortedProducts.map((product) => (
          <div
            key={product.id}
            className="product"
            onClick={() => handleProductClick(product.id)}
          >
            <Image
              src={product.thumbnail}
              alt={product.title}
              width={500}
              height={500}
            />
            <div className="product-content">
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <div className="price-container">
                <p className="product-price">${product.price.toFixed(2)}</p>
                <AddToCartButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClick(product);
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
