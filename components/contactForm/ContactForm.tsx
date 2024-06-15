"use client";

import { useState } from "react";
import { useI18n } from "../../locales/client";
import { createContactAction } from "../../app/[locale]/actions";
import "./ContactForm.css";

export interface ContactData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function ContactForm() {
  const t = useI18n();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [messageSent, setMessageSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData: ContactData = {
      name,
      email,
      phone,
      message,
    };
    try {
      await createContactAction(formData);
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setMessageSent(true);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label htmlFor="name">{t("name")}</label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder={t("yourName")}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor="email">{t("email")}</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder={t("yourEmail")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="phone">{t("phone")}</label>
      <input
        type="text"
        id="phone"
        name="phone"
        placeholder={t("yourPhone")}
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <label htmlFor="message">{t("message")}</label>
      <textarea
        id="message"
        name="message"
        placeholder={t("writeSomething")}
        style={{ height: "200px" }}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button type="submit" className="button submit-button">
        {t("send")}
      </button>
      {messageSent && <p>{t("messageIsSent")}!</p>}
    </form>
  );
}
