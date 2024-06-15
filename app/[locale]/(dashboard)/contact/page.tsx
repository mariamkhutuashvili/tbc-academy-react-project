import { getI18n } from "../../../../locales/server";
import ContactForm from "../../../../components/contactForm/ContactForm";
import Title from "../../../../components/UI/Title";
import "../../../../styles/Contact.css";

export const metadata = {
  title: "Contact Us",
  description: "Contact Us - Get in Touch",
};

export default async function Contact() {
  const t = await getI18n();

  return (
    <div className="contact-container">
      <Title titleName={t("contactUs")} />
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
