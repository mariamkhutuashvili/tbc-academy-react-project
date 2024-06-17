"use client";

import { handleAddToCart, handleDecrement } from "../../app/actions";

export default function ChangeQuantityButton({
  id,
  quantity,
  price,
}: QuantityProps) {
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
      <span>${price * quantity}</span>
    </div>
  );
}
