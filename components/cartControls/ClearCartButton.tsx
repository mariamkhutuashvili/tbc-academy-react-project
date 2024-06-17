"use client";

import { handleClearCart } from "../../app/actions";
import { useI18n } from "../../locales/client";

export default function ClearCartButton() {
  const t = useI18n();

  return (
    <button
      onClick={() => handleClearCart()}
      className="button clear-cart-button"
    >
      {t("clearCart")}
    </button>
  );
}
