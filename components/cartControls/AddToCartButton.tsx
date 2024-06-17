"use client";

import { handleAddToCart } from "../../app/actions";
import { useI18n } from "../../locales/client";

export default function AddToCartButton({ id }: { id: string }) {
  const t = useI18n();

  return (
    <button
      className="button cart-button"
      onClick={(e) => {
        e.stopPropagation();
        handleAddToCart(id);
      }}
    >
      {t("addToCart")}
    </button>
  );
}
