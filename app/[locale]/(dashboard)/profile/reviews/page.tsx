import Title from "../../../../../components/UI/Title";
import { getI18n } from "../../../../../locales/server";
import { getReviewsForUser } from "../../../../api";
import EditReview from "../../../../../components/adminPanel/reviewManagement/EditReview";
import DeleteReview from "../../../../../components/adminPanel/reviewManagement/DeleteReview";
import "../../../../../styles/Reviews.css";

export default async function page() {
  const t = await getI18n();

  const user_review = await getReviewsForUser();

  return (
    <div className="reviews-management">
      <div className="admin-header">
        <Title titleName={t("myReviews")} />
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>{t("name")}</th>
            <th>{t("product")}</th>
            <th>{t("star")}</th>
            <th>{t("comment")}</th>
            <th>{t("actions")}</th>
          </tr>
        </thead>
        <tbody>
          {user_review?.reviews?.map((user_review: Reviews) => (
            <tr key={user_review.review_id}>
              <td>{user_review.email}</td>
              <td>{user_review.product_name}</td>
              <td>{user_review.star}</td>
              <td>{user_review.comment}</td>
              <td className="admin-table-cell-actions">
                <div className="admin-actions-container">
                  <EditReview
                    user_id={user_review.user_id}
                    id={user_review.review_id}
                    product_id={user_review.product_id}
                    userName={user_review.user_name}
                    reviewMessage={user_review.comment}
                    rating={user_review.star}
                  />
                  <DeleteReview id={user_review.review_id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
