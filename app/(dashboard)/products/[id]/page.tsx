import Image from "next/image";
import AddToCartButton from "../../../../components/UI/AddToCartButton";
import "../../../../styles/Product.css";

const URL = "https://dummyjson.com/products";

interface Product {
  id: number;
  title: string;
  brand: string;
  category: string;
  description: string;
  price: number;
  thumbnail: string;
}

interface ProductsResponse {
  products: Product[];
}

export async function generateStaticParams() {
  const response = await fetch("https://dummyjson.com/products");
  const data: ProductsResponse = await response.json();
  const path = data.products.map((product) => ({
    id: `${product.id}`,
  }));
  return path;
}

const fetchProducts = async (productId: string): Promise<Product> => {
  const response = await fetch(`${URL}/${productId}`);
  const data: Product = await response.json();
  return data;
};

export default async function Product({ params }: { params: { id: string } }) {
  const productId = params.id;
  const productData = await fetchProducts(productId);

  return (
    <div key={productData.id} className="product-page">
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
