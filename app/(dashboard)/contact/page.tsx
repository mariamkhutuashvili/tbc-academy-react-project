"use client";

import { useTranslation } from "react-i18next";
import ContactForm from "../../../components/contactForm/ContactForm";
import Title from "../../../components/UI/Title";
import "../../../styles/Contact.css";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <div className="contact-container">
      <Title titleName="contactUs" />
      <div className="contact-info">
        <p>
          <strong>{t("email")}:</strong> contact@example.com
        </p>
        <p>
          <strong>{t("phone")}:</strong> +123 456 7890
        </p>
        <p>
          <strong>{t("address")}:</strong> 123 Main Street, Anytown, USA
        </p>
      </div>
      <ContactForm />
    </div>
  );
}
