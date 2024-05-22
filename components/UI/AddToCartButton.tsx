"use client";

import { useI18n } from "../../locales/client";

interface AddToCartButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function AddToCartButton({ onClick }: AddToCartButtonProps) {
  const t = useI18n();

  return (
    <button className="button cart-button" onClick={onClick}>
      {t("addToCart")}
    </button>
  );
}
