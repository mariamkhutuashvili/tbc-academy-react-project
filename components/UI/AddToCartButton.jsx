"use client";

import { useTranslation } from "react-i18next";

export default function AddToCartButton({ onClick }) {
  const { t } = useTranslation();
  return (
    <button className="button" onClick={onClick}>
      {t("addToCart")}
    </button>
  );
}
