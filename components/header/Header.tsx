import Link from "next/link";
import Image from "next/image";
import ToggleThemeButton from "../UI/ToggleTheme";
import ToggleLanguage from "../UI/ToggleLanguage";
import LogoutButton from "../UI/LogoutButton";
import { getI18n } from "../../locales/server";
import { cookies } from "next/headers";
import "./Header.css";

export default async function Header() {
  const t = await getI18n();

  const cookieStore = cookies();
  const curr = cookieStore.get("Next-Locale");

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
        <Link href="/admin" className="nav-link">
          {t("admin")}
        </Link>
      </nav>
      <div className="right-section">
        <ToggleThemeButton />
        <ToggleLanguage curr={curr?.value} />
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
        <Link href="/cart" className="cart-link">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
        </Link>
        <LogoutButton />
      </div>
    </header>
  );
}
