// import Title from "../../../components/UI/Title";
import { getI18n } from "../../../locales/server";
import Image from "next/image";
import { getProducts } from "../../api";
import HomeData from "../../../components/homeData/HomeData";
import "../../../styles/Home.css";

export const metadata = {
  title: "Home",
  description: "Home - Welcome to Our Website",
};

export default async function Home() {
  const t = await getI18n();

  const products = await getProducts();
  return (
    <>
      {/* Main Banner */}
      <section className="banner_section">
        <div className="container">
          <div className="banner">
            <Image
              src="/assets/banner6.png"
              alt="Banner"
              width={960}
              height={538}
            />
            <div className="banner_text">
              <h1 style={{ textAlign: "center", padding: "50px 0" }}>
                {t("everythingForYourCats")}!
              </h1>
              <a href={"/products"}>
                <p className="button banner-button">{t("shopNow")}</p>
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* Home Data */}
      <HomeData products={products} />
    </>
  );
}
