import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="App">
          <div className="container">
            <Header />
            <div className="pages">{children}</div>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
