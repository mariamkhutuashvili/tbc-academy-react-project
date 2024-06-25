"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import DebounceSearch from "../debounceSearch/DebounceSearch";
import Sort from "../sort/Sort";
import AddToCartButton from "../cartControls/AddToCartButton";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/Products.css";
import FilterCategory from "../filterCategory/FilterCategory";

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

export default function ProductsData({
  product,
}: {
  product: ProductsDataProps;
}) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isSorted, setIsSorted] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState("categories");

  const router = useRouter();

  const debouncedSetSearchTerm = debounce(
    (value: string) => setSearchTerm(value),
    1000
  );

  let filteredAndSortedProducts = product
    .filter(
      (p: ProductFromVercel) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        // p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.price.toString().includes(searchTerm)
    )
    .sort((a: { price: string }, b: { price: string }) =>
      isSorted ? Number(a.price) - Number(b.price) : 0
    );
  // .filter((p: ProductFromVercel) => p.category === selectedCategory);
  if (selectedCategory !== "categories") {
    filteredAndSortedProducts = filteredAndSortedProducts.filter(
      (p: ProductFromVercel) => p.category === selectedCategory
    );
  }

  const handleProductClick = (id: number | string) => {
    router.push(`/products/${id}`);
  };

  return (
    <div className="store-data">
      <div className="search-filter-container">
        <DebounceSearch
          onChange={(e) => debouncedSetSearchTerm(e.target.value)}
        />
        <FilterCategory
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
      <div className="sort-container">
        <Sort isSorted={isSorted} onToggleSort={() => setIsSorted(!isSorted)} />
      </div>
      <div className="products-grid">
        {filteredAndSortedProducts.map((p: ProductFromVercel) => (
          <div
            key={p.id}
            className="product"
            onClick={() => handleProductClick(p.id)}
          >
            {p.photo_gallery && p.photo_gallery.length > 0 ? (
              <div className="image-container">
                <Image
                  className="image-zoom"
                  src={p.photo_gallery[0].img_url}
                  alt={p.title}
                  width={500}
                  height={500}
                />
              </div>
            ) : (
              <div className="placeholder-image">No Image Available</div>
            )}
            <div className="product-content">
              <h2>{p.title}</h2>
              <div className="price-container">
                <p className="product-price">${p.price}</p>
                <AddToCartButton id={p.id.toString()} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer position="top-right" className="toast-container" />
    </div>
  );
}
