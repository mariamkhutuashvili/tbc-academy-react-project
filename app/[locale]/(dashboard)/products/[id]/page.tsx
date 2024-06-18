import { getProductDetail, getProducts } from "../../../../api";
import ProductGallery from "../../../../../components/productGallery/ProductGallery";
import AddToCartButton from "../../../../../components/cartControls/AddToCartButton";
import ShareButtons from "../../../../../components/UI/ShareButtons";
import "../../../../../styles/Product.css";

export async function generateMetadata({ params }: MetaDataProps) {
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
      <ProductGallery product={product} />
      <ShareButtons product={product} />
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
