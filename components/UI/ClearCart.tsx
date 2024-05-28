"use client";

import { handleClearCart } from "../../app/[locale]/actions";

export default function clearCart() {
  return (
    <button
      onClick={() => handleClearCart()}
      className="button clear-cart-button"
    >
      Clear Cart
    </button>
  );
}
