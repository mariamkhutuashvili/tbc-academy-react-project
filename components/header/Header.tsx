import Link from "next/link";
import Image from "next/image";
import { getI18n } from "../../locales/server";
import { cookies } from "next/headers";
import { getSession } from "@auth0/nextjs-auth0";
import ToggleThemeButton from "../UI/ToggleTheme";
import ToggleLanguage from "../UI/ToggleLanguage";
import CartIcon from "../UI/CartIcon";
import ProfileIcon from "../UI/ProfileIcon";
import "./Header.css";

export default async function Header() {
  const t = await getI18n();

  const cookieStore = cookies();
  const curr = cookieStore.get("Next-Locale");

  const session = await getSession();
  const user = session?.user;
  const isAdmin = Array.isArray(user?.role) && user.role.includes("Admin");

  return (
    <header className="header">
      <div className="left-section">
        <Link href="/">
          <Image src="/assets/logo.png" alt="Logo" width={150} height={40} />
        </Link>
      </div>
      <nav className="nav">
        <Link href="/" className="nav-link">
          {t("home")}
        </Link>
        <Link href="/products" className="nav-link">
          {t("products")}
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
        {isAdmin && (
          <Link href="/admin" className="nav-link">
            {t("admin")}
          </Link>
        )}
      </nav>
      <div className="right-section">
        <ToggleThemeButton />
        <ToggleLanguage curr={curr?.value} />
        <ProfileIcon />
        {user && <CartIcon />}
      </div>
    </header>
  );
}
