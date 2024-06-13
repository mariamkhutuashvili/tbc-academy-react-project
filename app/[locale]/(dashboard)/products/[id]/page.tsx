// import Image from "next/image";
import { getProductDetail } from "../../../../api";
import AddToCartButton from "../../../../../components/UI/AddToCartButton";
import "../../../../../styles/Product.css";

export default async function Product({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await getProductDetail(id);
  console.log(product);

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
