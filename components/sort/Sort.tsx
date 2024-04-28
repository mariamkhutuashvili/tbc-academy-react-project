"use client";

import { useTranslation } from "react-i18next";
import "./Sort.css";

interface SortProps {
  isSorted: boolean;
  onToggleSort: () => void;
}

export default function Sort({ isSorted, onToggleSort }: SortProps) {
  const { t } = useTranslation();
  return (
    <button onClick={onToggleSort} className="button sort-button">
      {isSorted ? t("reset") : t("sortByPrice")}
    </button>
  );
}
