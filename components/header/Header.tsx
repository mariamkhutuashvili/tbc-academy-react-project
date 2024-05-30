import Link from "next/link";
import Image from "next/image";
import ToggleThemeButton from "../UI/ToggleTheme";
import ToggleLanguage from "../UI/ToggleLanguage";
import ProfileIcon from "../UI/ProfileIcon";
import CartIcon from "../UI/CartIcon";
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
        <ProfileIcon />
        <CartIcon />
        <LogoutButton />
      </div>
    </header>
  );
}
