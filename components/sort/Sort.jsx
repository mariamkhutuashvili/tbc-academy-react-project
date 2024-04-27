"use client";

import { useTranslation } from "react-i18next";
import "./Sort.css";

export default function Sort({ isSorted, onToggleSort }) {
  const { t } = useTranslation();
  return (
    <button onClick={onToggleSort} className="button sort-button">
      {isSorted ? t("reset") : t("sortByPrice")}
    </button>
  );
}
