"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import DebounceSearch from "../debounceSearch/DebounceSearch";
import Sort from "../sort/Sort";
import AddToCartButton from "../cartControls/AddToCartButton";
import "../../styles/Products.css";

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

  const router = useRouter();

  const debouncedSetSearchTerm = debounce(
    (value: string) => setSearchTerm(value),
    1000
  );

  const filteredAndSortedProducts = product
    .filter(
      (p: ProductFromVercel) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        // p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.price.toString().includes(searchTerm)
    )
    .sort((a: { price: string }, b: { price: string }) =>
      isSorted ? Number(a.price) - Number(b.price) : 0
    );

  const handleProductClick = (id: number | string) => {
    router.push(`/products/${id}`);
  };

  return (
    <div className="store-data">
      <DebounceSearch
        onChange={(e) => debouncedSetSearchTerm(e.target.value)}
      />
      <Sort isSorted={isSorted} onToggleSort={() => setIsSorted(!isSorted)} />
      <div className="products-grid">
        {filteredAndSortedProducts.map((p: ProductFromVercel) => (
          <div
            key={p.id}
            className="product"
            onClick={() => handleProductClick(p.id)}
          >
            {p.photo_gallery && p.photo_gallery.length > 0 ? (
              <Image
                src={p.photo_gallery[0].img_url}
                alt={p.title}
                width={500}
                height={500}
              />
            ) : (
              <div className="placeholder-image">No Image Available</div>
            )}
            <div className="product-content">
              <h2>{p.title}</h2>
              <p>{p.description}</p>
              <div className="price-container">
                <p className="product-price">${p.price}</p>
                <AddToCartButton id={p.id.toString()} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
