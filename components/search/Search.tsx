"use client";

import { useI18n } from "../../locales/client";
import "./Search.css";
import { ChangeEvent } from "react";

export default function Search({
  onChange,
}: {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  const t = useI18n();
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder={t("searchProducts")}
        className="search-input"
        onChange={onChange}
      />
      <button className="button search-button">{t("search")}</button>
    </div>
  );
}
