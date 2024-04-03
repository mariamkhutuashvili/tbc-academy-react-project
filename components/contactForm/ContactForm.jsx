import "./ContactForm.css";

function ContactForm() {
  return (
    <form className="contact-form">
      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name" placeholder="Your name..." />

      <label htmlFor="email">Email</label>
      <input type="email" id="email" name="email" placeholder="Your email..." />

      <label htmlFor="subject">Subject</label>
      <input type="text" id="subject" name="subject" placeholder="Subject..." />

      <label htmlFor="message">Message</label>
      <textarea
        id="message"
        name="message"
        placeholder="Write something..."
        style={{ height: "200px" }}
      ></textarea>

      <button type="submit" className="button">
        Send
      </button>
    </form>
  );
}

export default ContactForm;
