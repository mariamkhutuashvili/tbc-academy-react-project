import Products from "./products/Products";
import Search from "./search/Search";

function MainContent() {
  return (
    <main className="main-content">
      <h1>Refresh & Refill Online Store</h1>
      <Search />
      <Products />
    </main>
  );
}

export default MainContent;
