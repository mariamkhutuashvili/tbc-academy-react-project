import ProductsData from "../../../../components/productsData/ProductsData";
import { getProducts } from "../../../api";

export const metadata = {
  title: "Products",
  description: "Products - Online Shop",
};

export default async function Products() {
  const products = await getProducts();

  return <ProductsData product={products} />;
}
