"use client";

import Link from "next/link";
import Image from "next/image";
import ToggleThemeButton from "../UI/ToggleTheme";
import ToggleLanguage from "../UI/ToggleLanguage";
import LogoutButton from "../UI/LogoutButton";
import { useTranslation } from "react-i18next";
import "./Header.css";

export default function Header() {
  const { t } = useTranslation();

  return (
    <header className="header">
      <div className="left-section">
        <Link href="/">
          <Image src="/assets/logo.png" alt="Logo" width={50} height={50} />
        </Link>
      </div>
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
      </nav>
      <div className="right-section">
        <ToggleThemeButton />
        <ToggleLanguage />
        <Link href="/profile" className="profile-link">
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
      </div>
    </header>
  );
}
