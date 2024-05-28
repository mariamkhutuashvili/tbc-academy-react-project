"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { handleAddToCart } from "../../app/[locale]/actions";
import Search from "../search/Search";
import Sort from "../sort/Sort";
import AddToCartButton from "./AddToCartButton";
import { useI18n } from "../../locales/client";
import Title from "./Title";
import "../../styles/page.css";

interface ProductFromVercel {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
}
interface HomeClientProps {
  filter: any;
  product: ProductFromVercel[];
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

export default function Products({ product }: { product: HomeClientProps }) {
  const t = useI18n();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isSorted, setIsSorted] = useState<boolean>(false);

  const router = useRouter();

  const debouncedSetSearchTerm = debounce(
    (value: string) => setSearchTerm(value),
    300
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
    <div className="store">
      <Title titleName={t("onlineStore")} />
      <Search onChange={(e) => debouncedSetSearchTerm(e.target.value)} />
      <Sort isSorted={isSorted} onToggleSort={() => setIsSorted(!isSorted)} />
      <div className="products-grid">
        {filteredAndSortedProducts.map((p: ProductFromVercel) => (
          <div
            key={p.id}
            className="product"
            onClick={() => handleProductClick(p.id)}
          >
            {/* <Image
              src={product.thumbnail}
              alt={product.title}
              width={500}
              height={500}
            /> */}
            <div className="product-content">
              <h2>{p.title}</h2>
              <p>{p.description}</p>
              <div className="price-container">
                <p className="product-price">${p.price}</p>
                <AddToCartButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(p.id.toString());
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
