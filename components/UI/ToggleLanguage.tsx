"use client";

import { useChangeLocale, useCurrentLocale } from "../../locales/client";

export default function ToggleLanguage() {
  const currentLocale = useCurrentLocale();
  const changeLocale = useChangeLocale();

  const toggleLanguage = () => {
    const nextLanguage = currentLocale === "en" ? "ka" : "en";
    changeLocale(nextLanguage);
  };

  return (
    <button onClick={toggleLanguage} className="button translate-button">
      {currentLocale === "en" ? "KA" : "ENG"}
    </button>
  );
}
