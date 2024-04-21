import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
// import { cookies } from "next/headers";
// import { AUTH_COOKIE_KEY } from "@/constants";
// import { redirect } from "next/navigation";

export default function DashboardLayout({ children }) {
  // const cookieStore = cookies();
  // const cookie = cookieStore.get(AUTH_COOKIE_KEY);

  // if (!cookie?.value) redirect("/login");

  return (
    <div className="App">
      <div className="container">
        <Header />
        <div className="pages">{children}</div>
        <Footer />
      </div>
    </div>
  );
}
