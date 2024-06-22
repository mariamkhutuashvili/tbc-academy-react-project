"use client";

import { useI18n } from "../../locales/client";
import { ChangeEvent } from "react";
import "./DebounceSearch.css";

interface SearchProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function Search({ onChange }: SearchProps) {
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