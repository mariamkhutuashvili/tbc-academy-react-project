import Image from "next/image";
import { getI18n } from "../../locales/server";

const generateStars = (stars: number) => {
  return (
    <div className="star-rating">
      {Array.from({ length: stars }).map((_, index) => (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          className="star-icon star-filled"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
          />
        </svg>
      ))}
    </div>
  );
};

export default async function AddedReviews({ reviews }: { reviews: Review[] }) {
  const t = await getI18n();

  return (
    <div className="reviews">
      <h3>{t("productReviews")}</h3>
      {reviews?.map((review) => (
        <div key={review.id} className="review">
          <Image
            src={review.picture}
            alt={review.name}
            width={50}
            height={50}
            className="review-avatar"
          />
          <div className="review-data">
            <div>{generateStars(review.star)}</div>
            <h4>{review.name}</h4>
            <p>{review.comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
