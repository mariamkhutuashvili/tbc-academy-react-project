function Footer() {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h3>Quick Links</h3>
        <div className="footer-nav">
          <a href="#about" className="footer-link">
            About
          </a>
          <a href="#products" className="footer-link">
            Products
          </a>
          <a href="#contact" className="footer-link">
            Contact
          </a>
        </div>
      </div>
      <div className="footer-section">
        <h3>Information</h3>
        <a href="#terms" className="footer-link">
          Terms and Conditions
        </a>
        <a href="#privacy" className="footer-link">
          Privacy Policy
        </a>
      </div>
      <div className="footer-section">
        <h3>Newsletter</h3>
        <form>
          <label htmlFor="email">Subscribe to our newsletter:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
          />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </footer>
  );
}

export default Footer;
