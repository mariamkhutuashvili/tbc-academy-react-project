"use client";

import { useEffect, useState } from "react";
import { changeLanguage } from "../../scripts/changeLang";

export default function ToggleLanguage({ curr }: { curr: any }) {
  const [locale, setLocale] = useState(curr || "en");

  const toggleLanguage = async () => {
    await changeLanguage();
    window.location.reload();
  };

  useEffect(() => {
    setLocale(curr || "en");
  }, [curr]);

  return (
    <button onClick={toggleLanguage} className="button translate-button">
      {locale === "en" ? "KA" : "ENG"}
    </button>
  );
}
