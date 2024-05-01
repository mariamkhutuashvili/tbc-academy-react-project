import { getI18n } from "../../locales/server";
import "./ContactForm.css";

export default async function ContactForm() {
  const t = await getI18n();

  return (
    <form className="contact-form">
      <label htmlFor="name">{t("name")}</label>
      <input type="text" id="name" name="name" placeholder={t("yourName")} />

      <label htmlFor="email">{t("email")}</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder={t("yourEmail")}
      />

      <label htmlFor="subject">{t("subject")}</label>
      <input
        type="text"
        id="subject"
        name="subject"
        placeholder={t("subject")}
      />

      <label htmlFor="message">{t("message")}</label>
      <textarea
        id="message"
        name="message"
        placeholder={t("writeSomething")}
        style={{ height: "200px" }}
      ></textarea>

      <button type="submit" className="button submit-button">
        {t("send")}
      </button>
    </form>
  );
}
