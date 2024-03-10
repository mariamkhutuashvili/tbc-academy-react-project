import "./App.css";

function toggleTheme() {
  const mainContent = document.querySelector(".main-content");
  mainContent.classList.toggle("dark-theme");
}

function App() {
  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <nav>
            <a href="#home" className="nav-link">
              Home
            </a>
            <a href="#about" className="nav-link">
              About
            </a>
            <a href="#services" className="nav-link">
              Services
            </a>
            <a href="#contact" className="nav-link">
              Contact
            </a>
          </nav>
        </header>
        <main className="main-content">
          <h1>Your Story Starts With Us.</h1>
          <button className="button">Learn More</button>
          <button className="button" onClick={toggleTheme}>
            Switch Theme
          </button>
        </main>
        <footer className="footer">
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
            <h3>Quick Links</h3>
            <ul className="footer-nav">
              <li>
                <a href="#home" className="nav-link">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="nav-link">
                  About
                </a>
              </li>
              <li>
                <a href="#services" className="nav-link">
                  Services
                </a>
              </li>
              <li>
                <a href="#contact" className="nav-link">
                  Contact
                </a>
              </li>
            </ul>
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
      </div>
    </div>
  );
}

export default App;
