import React from "react";
import HomeClient from "../../../components/UI/HomeClient";
import { getProducts } from "../../api";

export default async function Home() {
  const products = await getProducts();
  console.log(products);

  return <HomeClient product={products} />;
}
