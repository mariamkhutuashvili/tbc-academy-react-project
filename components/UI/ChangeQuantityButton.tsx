"use client";

import {
  handleAddToCart,
  handleDecrement,
  handleRemoveProductFromCart,
} from "../../app/[locale]/actions";

export default function ChangeQuantityButton({
  id,
  quantity,
}: {
  id: string;
  quantity: number;
}) {
  return (
    <div className="quantity-control">
      <button className="decrease-button" onClick={() => handleDecrement(id)}>
        -
      </button>
      <span className="quantity">{quantity}</span>
      <button className="increase-button" onClick={() => handleAddToCart(id)}>
        +
      </button>
      <button
        className="remove-button"
        onClick={() => handleRemoveProductFromCart(id)}
      >
        Remove
      </button>
    </div>
  );
}
