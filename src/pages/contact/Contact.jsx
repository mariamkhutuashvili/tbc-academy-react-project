import ContactForm from "./ContactForm";
import "./Contact.css";

function Contact() {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
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

export default Contact;
