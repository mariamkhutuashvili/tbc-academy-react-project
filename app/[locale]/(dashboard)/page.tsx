import React from "react";
import HomeClient from "../../../components/UI/HomeClient";
import { getProducts } from "../../api";

export const metadata = {
  title: "Home",
  description: "Home - Welcome to Our Website",
};

export default async function Home() {
  const products = await getProducts();
  console.log(products);

  return <HomeClient product={products} />;
}
