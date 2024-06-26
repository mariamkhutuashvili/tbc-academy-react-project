// import Title from "../../../components/UI/Title";
import { getProducts } from "../../api";
import HomeData from "../../../components/homeData/HomeData";
import "../../../styles/Home.css";

export const metadata = {
  title: "Home",
  description: "Home - Welcome to Our Website",
};

export default async function Home() {
  const products = await getProducts();
  return (
    // <Title titleName={t("headline")} />
    <HomeData products={products} />
  );
}
