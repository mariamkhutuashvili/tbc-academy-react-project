import Image from "next/image";
import AddToCartButton from "../../../../components/UI/AddToCartButton";
import "../../../../styles/Product.css";

const URL = "https://dummyjson.com/products";

export async function generateStaticParams() {
  const response = await fetch("https://dummyjson.com/products");
  const data = await response.json();
  const path = data.products.map((product) => ({
    params: { id: product.id },
  }));
  return path;
}

const fetchProducts = async (productId) => {
  const response = await fetch(`${URL}/${productId}`);
  const data = await response.json();
  return data;
};

export default async function Product({ params }) {
  const productId = params.id;
  const productData = await fetchProducts(productId);

  return (
    <div key={productData.index} className="product-page">
      <Image
        src={productData.thumbnail}
        alt="product"
        width={400}
        height={400}
        priority
      />
      <h2>{productData.title}</h2>
      <h4>Brand: {productData.brand}</h4>
      <h4>Category: {productData.category}</h4>
      <p>{productData.description}</p>
      <p className="product-price">${productData.price}</p>
      <AddToCartButton />
    </div>
  );
}
