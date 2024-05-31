// import Image from "next/image";
// import { setStaticParamsLocale } from "next-international/server";
import { getProductDetail } from "../../../../api";
import AddToCartButton from "../../../../../components/UI/AddToCartButton";
import "../../../../../styles/Product.css";

// const URL = "https://dummyjson.com/products";

// interface Product {
//   id: number;
//   title: string;
//   brand: string;
//   category: string;
//   description: string;
//   price: number;
//   thumbnail: string;
// }

// interface ProductsResponse {
//   products: Product[];
// }

// export async function generateStaticParams() {
//   const response = await fetch("https://dummyjson.com/products");
//   const data: ProductsResponse = await response.json();
//   const path = data.products.map((product) => ({
//     id: `${product.id}`,
//   }));
//   return path;
// }

// const fetchProducts = async (productId: string): Promise<Product> => {
//   const response = await fetch(`${URL}/${productId}`);
//   const data: Product = await response.json();
//   return data;
// };

export default async function Product({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await getProductDetail(id);
  console.log(product);
  //   {
  //   params: { id, locale },
  // }: {
  //   params: { id: string; locale: string };
  // }
  // setStaticParamsLocale(locale);
  // const productData = await fetchProducts(id);

  return (
    <div key={product.id} className="product-page">
      {/* <Image
        src={productData.thumbnail}
        alt="product"
        width={400}
        height={400}
        priority
      /> */}
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p className="product-price">Price: ${product.price}</p>
      <p className="product-price">Discount Price: ${product.discountprice}</p>
      <h4>Brand: {product.brand}</h4>
      <h4>Category: {product.category}</h4>
      <p>Stock: {product.stock}</p>
      <AddToCartButton id={product.id.toString()} />
    </div>
  );
}
