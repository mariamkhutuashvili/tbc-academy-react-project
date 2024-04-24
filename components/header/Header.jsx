"use client";

import Link from "next/link";
import ToggleThemeButton from "../toggleTheme/ToggleTheme";
import LogoutButton from "../UI/LogoutButton";
import { useTranslation } from "react-i18next";
import i18n from "../../app/i18n";
import "./Header.css";

export default function Header() {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const currentLanguage = i18n.language;
    const nextLanguage = currentLanguage === "en" ? "ge" : "en";
    i18n.changeLanguage(nextLanguage);
  };

  return (
    <header className="header">
      <ToggleThemeButton />
      <nav className="nav">
        <Link href="/" className="nav-link">
          {t("home")}
        </Link>
        <Link href="/about" className="nav-link">
          {t("about")}
        </Link>
        <Link href="/blog" className="nav-link">
          {t("blog")}
        </Link>
        <Link href="/contact" className="nav-link">
          {t("contact")}
        </Link>
        <button onClick={toggleLanguage} className="button translate-button">
          {i18n.language === "en" ? "Geo" : "Eng"}
        </button>
        <Link href="/profile" className="nav-link">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-user"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </Link>
        <LogoutButton />
      </nav>
    </header>
  );
}
