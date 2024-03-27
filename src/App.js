import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import Footer from "./components/footer/Footer";
import Products from "./pages/products/Products";
import Blog from "./pages/blog/Blog";
import Contact from "./pages/contact/Contact";
import Profile from "./pages/profile/Profile";
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
              <Route path="/" element={<Home />} />
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
