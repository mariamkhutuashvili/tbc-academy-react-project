import Image from "next/image";
import { getProductDetail, getProducts } from "../../../../api";
import AddToCartButton from "../../../../../components/UI/AddToCartButton";
import "../../../../../styles/Product.css";

export interface Gallery {
  id: number;
  img_url: string;
}

interface ProductFromVercel {
  id: number;
  description: string;
  price: number;
  title: string;
  discount: string;
  category: string;
  stock: number;
  brand: string;
  photo_gallery: Gallery[];
}

interface ProductsDetailsProps {
  params: {
    id: number;
    locale: string;
  };
}

export async function generateMetadata({ params }: ProductsDetailsProps) {
  const productsData = await getProducts();
  const product = productsData.find(
    (product: ProductFromVercel) => product.id == params.id
  );

  return {
    title: `${product.title}`,
    description: `${product.description}`,
  };
}

export default async function Product({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await getProductDetail(id);
  console.log(product);

  return (
    <div key={product.id} className="product-page">
      <Image
        src={product.photo_gallery[0].img_url}
        alt="product"
        width={400}
        height={400}
        priority
      />
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
