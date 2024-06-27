"use client";

import { useState } from "react";
import Link from "next/link";
import { useI18n } from "../../locales/client";
import "../header/Header.css";

export default function MobileMenu({ isAdmin }: { isAdmin: boolean }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const t = useI18n();

  return (
    <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
      <button onClick={toggleMenu}>☰</button>
      {isOpen && (
        <nav>
          <Link href="/" onClick={toggleMenu}>
            {t("home")}
          </Link>
          <Link href="/products" onClick={toggleMenu}>
            {t("products")}
          </Link>
          <Link href="/about" onClick={toggleMenu}>
            {t("about")}
          </Link>
          <Link href="/blog" onClick={toggleMenu}>
            {t("blog")}
          </Link>
          <Link href="/contact" onClick={toggleMenu}>
            {t("contact")}
          </Link>
          {isAdmin && (
            <Link href="/admin" onClick={toggleMenu}>
              {t("admin")}
            </Link>
          )}
        </nav>
      )}
    </div>
  );
}
