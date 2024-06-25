"use client";

import { useI18n } from "../../locales/client";
import "./Sort.css";

export default function Sort({ isSorted, onToggleSort }: SortProps) {
  const t = useI18n();
  return (
    <button onClick={onToggleSort} className="button sort-button">
      {isSorted ? t("reset") : t("sortByPrice")}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="sort-icon"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
        />
      </svg>
    </button>
  );
}
