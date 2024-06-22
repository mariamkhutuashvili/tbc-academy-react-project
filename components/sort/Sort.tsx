"use client";

import { useI18n } from "../../locales/client";
import "./Sort.css";

export default function Sort({ isSorted, onToggleSort }: SortProps) {
  const t = useI18n();
  return (
    <button onClick={onToggleSort} className="button sort-button">
      {isSorted ? t("reset") : t("sortByPrice")}
    </button>
  );
}
