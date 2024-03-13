import Header from "./components/Header";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import "./App.css";

function toggleTheme() {
  const mainContent = document.querySelector(".main-content");
  mainContent.classList.toggle("dark-theme");
}

function App() {
  return (
    <div className="App">
      <div className="container">
        <Header toggleTheme={toggleTheme} />
        <MainContent />
        <Footer />
      </div>
    </div>
  );
}

export default App;
