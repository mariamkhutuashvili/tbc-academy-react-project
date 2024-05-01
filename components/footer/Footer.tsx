import Link from "next/link";
import { getI18n } from "../../locales/server";
import "./Footer.css";

export default async function Footer() {
  const t = await getI18n();
  return (
    <footer className="footer">
      <div className="footer-section">
        <h3>{t("quickLinks")}</h3>
        <div className="footer-nav">
          <Link href="/about" className="footer-link">
            {t("about")}
          </Link>
          <Link href="/blog" className="footer-link">
            {t("blog")}
          </Link>
          <Link href="/contact" className="footer-link">
            {t("contact")}
          </Link>
        </div>
      </div>
      <div className="footer-section">
        <h3>{t("information")}</h3>
        <a href="#terms" className="footer-link">
          {t("termsAndConditions")}
        </a>
        <a href="#privacy" className="footer-link">
          {t("privacyPolicy")}
        </a>
      </div>
      <div className="footer-section">
        <h3>{t("newsletter")}</h3>
        <form>
          <label htmlFor="email">{t("subscribeToOurNewsletter")}</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder={t("enterYourEmail")}
            className="newsletter-input"
          />
          <button type="submit">{t("subscribe")}</button>
        </form>
      </div>
    </footer>
  );
}
