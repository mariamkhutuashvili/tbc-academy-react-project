"use client";

import { handleAddToCart } from "../../app/actions";
import { useI18n } from "../../locales/client";
import { toast } from "react-toastify";

export default function AddToCartButton({ id }: { id: string }) {
  const t = useI18n();

  const handleAddToCartClick = (productId: string) => {
    handleAddToCart(productId);
    toast.success(t("productAddedToCart"), {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <button
      className="button cart-button"
      onClick={(e) => {
        e.stopPropagation();
        handleAddToCartClick(id);
      }}
    >
      {t("addToCart")}
    </button>
  );
}
