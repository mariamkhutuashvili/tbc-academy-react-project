"use client";

import { useTranslation } from "react-i18next";

export default function AddToCartButton() {
  const { t } = useTranslation();
  return (
    <button className="button" onClick={() => console.log("Added to cart")}>
      {t("addToCart")}
    </button>
  );
}
