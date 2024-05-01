"use client";

import { useI18n } from "../../locales/client";

export default function AddToCartButton() {
  const t = useI18n();
  return (
    <button
      className="button cart-button"
      onClick={() => console.log("Added to cart")}
    >
      {t("addToCart")}
    </button>
  );
}
