import ContactForm from "../../../components/contactForm/ContactForm";
import Title from "../../../components/UI/Title";
import "../../../styles/Contact.css";

export default function Contact() {
  return (
    <div className="contact-container">
      <Title titleName="Contact Us" />
      <div className="contact-info">
        <p>
          <strong>Email:</strong> contact@example.com
        </p>
        <p>
          <strong>Phone:</strong> +123 456 7890
        </p>
        <p>
          <strong>Address:</strong> 123 Main Street, Anytown, USA
        </p>
      </div>
      <ContactForm />
    </div>
  );
}
