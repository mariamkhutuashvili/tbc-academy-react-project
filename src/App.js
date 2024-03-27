import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import Products from "./components/products/Products";
import Blog from "./components/blog/Blog";
import Contact from "./components/contact/Contact";
import Profile from "./components/profile/Profile";
import "./App.css";

function toggleTheme() {
  const pageContent = document.querySelector(".pages");
  pageContent.classList.toggle("dark-theme");
}

function App() {
  return (
    <Router>
      <div className="App">
        <div className="container">
          <Header toggleTheme={toggleTheme} />
          <div className="pages">
            <Routes>
              <Route path="/" element={<MainContent />} />
              <Route path="/products" element={<Products />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
