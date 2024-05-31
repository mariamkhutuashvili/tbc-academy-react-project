"use client";

import { handleAddToCart } from "../../app/[locale]/actions";
import { useI18n } from "../../locales/client";

interface AddToCartButtonProps {
  id: string;
}

export default function AddToCartButton({ id }: AddToCartButtonProps) {
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
