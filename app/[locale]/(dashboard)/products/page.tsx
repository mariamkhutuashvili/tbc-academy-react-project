import ProductsData from "../../../../components/productsData/ProductsData";
import { getProducts } from "../../../api";
import { getI18n } from "../../../../locales/server";
import Title from "../../../../components/UI/Title";

export const metadata = {
  title: "Products",
  description: "Products - Online Shop",
};

export default async function Products() {
  const t = await getI18n();

  const products = await getProducts();

  return (
    <div className="store">
      <Title titleName={t("onlineStore")} />
      <ProductsData product={products} />
    </div>
  );
}
