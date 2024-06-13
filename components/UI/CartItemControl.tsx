"use client";

import {
  handleAddToCart,
  handleDecrement,
  handleRemoveProductFromCart,
} from "../../app/[locale]/actions";
import { useI18n } from "../../locales/client";

export default function ChangeQuantityButton({
  id,
  quantity,
  price,
}: {
  id: string;
  quantity: number;
  price: number;
}) {
  const t = useI18n();

  return (
    <div className="cart-control">
      <button
        className="button decrease-button"
        onClick={() => handleDecrement(id)}
      >
        -
      </button>
      <span className="quantity">{quantity}</span>
      <button
        className="button increase-button"
        onClick={() => handleAddToCart(id)}
      >
        +
      </button>
      <button
        className="button remove-button"
        onClick={() => handleRemoveProductFromCart(id)}
      >
        {t("remove")}
      </button>
      <span>${price * quantity}</span>
    </div>
  );
}
