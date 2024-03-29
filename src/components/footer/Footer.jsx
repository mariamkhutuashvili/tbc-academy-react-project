import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h3>Quick Links</h3>
        <div className="footer-nav">
          <Link to="/products" className="footer-link">
            Products
          </Link>
          <Link to="/blog" className="footer-link">
            Blog
          </Link>
          <Link to="/contact" className="footer-link">
            Contact
          </Link>
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
            className="newsletter-input"
          />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </footer>
  );
}

export default Footer;
