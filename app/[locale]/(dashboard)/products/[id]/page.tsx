import {
  getProductDetail,
  getProducts,
  getUserId,
  getUserInfo,
} from "../../../../api";
import ProductGallery from "../../../../../components/productGallery/ProductGallery";
import AddToCartButton from "../../../../../components/cartControls/AddToCartButton";
import ShareButtons from "../../../../../components/shareButtons/ShareButtons";
import AddReview from "../../../../../components/reviews/AddReview";
import AddedReviews from "../../../../../components/reviews/AddedReviews";
import { ToastContainer } from "react-toastify";
import { getI18n } from "../../../../../locales/server";
import "react-toastify/dist/ReactToastify.css";
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
  const t = await getI18n();

  const {
    product,
    reviews,
  }: { product: ProductFromVercel; reviews: Review[] } = await getProductDetail(
    id
  );

  const user = await getUserInfo();
  const userName = user?.name;
  const user_id = await getUserId();

  const userReviewIds = reviews.map((review: any) => review.user_id);
  const userAlreadyWroteReview = userReviewIds.includes(user_id);

  return (
    <div key={product.id} className="product-page">
      <div className="product-container">
        <div className="product-gallery">
          <ProductGallery gallery={product.photo_gallery} />
        </div>
        <div className="product-details">
          <h2 className="product-title">{product.title}</h2>
          <p className="product-price">${product.price}</p>
          {/* <p className="product-price">{t("discountPrice")}: ${product.discountprice}</p> */}
          <AddReview
            user_id={user_id}
            product_id={product.id}
            userName={userName}
            reviews={reviews}
            userAlreadyWroteReview={userAlreadyWroteReview}
          />
          <p className="product-description">{product.description}</p>
          <div className="product-actions">
            <AddToCartButton id={product.id.toString()} />
          </div>
          <h4>
            {t("brand")}: {product.brand}
          </h4>
          <h4>
            {t("category")}:{" "}
            {t(
              product.category as
                | "categories"
                | "food"
                | "toys"
                | "beds"
                | "accessories"
                | "grooming"
                | "litter"
            )}
          </h4>
          <p>
            {t("stock")}: {product.stock}
          </p>

          <ShareButtons data={product} path="products" />
        </div>
      </div>
      <ToastContainer position="top-right" className="toast-container" />
      {reviews.length > 0 && <AddedReviews reviews={reviews} />}
    </div>
  );
}
