"use client";

import { useTranslation } from "react-i18next";
import "./ContactForm.css";

export default function ContactForm() {
  const { t } = useTranslation();

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

      <button type="submit" className="button">
        {t("send")}
      </button>
    </form>
  );
}
