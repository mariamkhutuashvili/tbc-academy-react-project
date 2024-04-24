"use client";

import { useTranslation } from "react-i18next";

export default function Sort({ isSorted, onToggleSort }) {
  const { t } = useTranslation();
  return (
    <button onClick={onToggleSort} className="button">
      {isSorted ? t("reset") : t("sortByPrice")}
    </button>
  );
}
