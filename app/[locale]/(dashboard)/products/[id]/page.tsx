import {
  getProductDetail,
  getProducts,
  getUserId,
  getUserInfo,
} from "../../../../api";
import ProductGallery from "../../../../../components/productGallery/ProductGallery";
import AddToCartButton from "../../../../../components/cartControls/AddToCartButton";
import ShareButtons from "../../../../../components/UI/ShareButtons";
import StarRating from "../../../../../components/starRating/StarRating";
import Reviews from "../../../../../components/reviews/Reviews";
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
  const {
    product,
    reviews,
  }: { product: ProductFromVercel; reviews: Review[] } = await getProductDetail(
    id
  );
  console.log(product);

  const user = await getUserInfo();
  const userName = user?.name;
  const user_id = await getUserId();

  const userReviewIds = reviews.map((review: any) => review.user_id);
  const userAlreadyWroteReview = userReviewIds.includes(user_id);

  return (
    <div key={product.id} className="product-page">
      <ProductGallery gallery={product.photo_gallery} />
      <ShareButtons product={product} />
      <StarRating
        user_id={user_id}
        product_id={product.id}
        userName={userName}
        reviews={reviews}
        userAlreadyWroteReview={userAlreadyWroteReview}
      />

      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p className="product-price">Price: ${product.price}</p>
      <p className="product-price">Discount Price: ${product.discountprice}</p>
      <h4>Brand: {product.brand}</h4>
      <h4>Category: {product.category}</h4>
      <p>Stock: {product.stock}</p>
      <AddToCartButton id={product.id.toString()} />
      {reviews.length > 0 && <Reviews reviews={reviews} />}
    </div>
  );
}
