"use client";

import Modal from "@mui/material/Modal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createAddReviewAction } from "../../app/actions";
import { useI18n } from "../../locales/client";
import "./StarRating.css";

export default function StarRating({
  userName,
  user_id,
  reviews,
  product_id,
  userAlreadyWroteReview,
}: {
  userName: string;
  user_id: number;
  product_id: number;
  reviews: Review[];
  userAlreadyWroteReview: boolean;
}) {
  const t = useI18n();

  const [open, setOpen] = useState<boolean>(false);
  const [star, setStar] = useState<number>(0);
  const [hover, setHover] = useState<number | null>(null);
  const [comment, setComment] = useState<string>("");
  const router = useRouter();

  const handleClose = () => setOpen(false);

  const handleSendReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const reviewData: ReviewData = {
      user_id,
      product_id,
      star,
      comment,
    };
    try {
      await createAddReviewAction(reviewData);
      console.log("Review added successfully");
    } catch (error) {
      console.error("Error creating review:", error);
    }
    handleClose();
    router.refresh();
  };

  const reviewsData: Review[] = reviews;

  const totalStars = reviewsData.reduce((sum, review) => sum + review.star, 0);
  const averageStars =
    reviewsData.length > 0 ? totalStars / reviewsData.length : 0;

  const generateStars = (averageStars = 0) => {
    // Ensure averageStars is a valid number and clamp it between 0 and 5
    averageStars = Math.max(0, Math.min(averageStars, 5));

    const fullStars = Math.floor(averageStars);
    const halfStar = averageStars % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {Array.from({ length: fullStars }).map((_, index) => (
          <svg
            key={`full-${index}`}
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
        {halfStar && (
          <svg
            key="half-star"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            className="star-icon"
          >
            <defs>
              <linearGradient id="half-gradient">
                <stop
                  offset={`${(averageStars % 1) * 100}%`}
                  stopColor="#F6BE59"
                />
                <stop
                  offset={`${(averageStars % 1) * 100}%`}
                  stopColor="transparent"
                  stroke="#e4e5e9"
                />
              </linearGradient>
            </defs>
            <path
              fill="url(#half-gradient)"
              stroke="#F6BE59"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
            />
          </svg>
        )}
        {Array.from({ length: emptyStars }).map((_, index) => (
          <svg
            key={`empty-${index}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            className="star-icon star-empty"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
            />
          </svg>
        ))}
      </>
    );
  };

  const renderModalStars = () => {
    return (
      <div className="modal-star-container">
        {Array.from({ length: 5 }).map((_, index) => {
          const ratingValue = index + 1;
          return (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              className={`star-icon ${
                ratingValue <= (hover || star) ? "star-filled" : "star-empty"
              }`}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
              onClick={() => setStar(ratingValue)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
              />
            </svg>
          );
        })}
      </div>
    );
  };

  return (
    <div className="star-rating-container">
      <label className="star-label">
        {generateStars(averageStars)}
        <p className="star-average">({averageStars.toFixed(1)})</p>
      </label>
      {!(userAlreadyWroteReview || userName === undefined) && (
        <button
          className="button add-review-button"
          onClick={() => setOpen(true)}
        >
          {t("addReview")}
        </button>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modal-container"
      >
        <div className="modal-content">
          <form onSubmit={handleSendReview} className="review-form">
            <p>{t("evaluateTheProduct")}</p>
            <div className="modal-stars">{renderModalStars()}</div>
            <p className="modal-star-count">
              ({star} {t("outOf5")})
            </p>
            <div className="form-group">
              <label className="form-label" htmlFor="userName">
                {t("name")}
              </label>
              <input
                type="text"
                value={userName}
                readOnly
                disabled
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="comment">
                {t("comment")}
              </label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={t("yourComment")}
                className="form-input"
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="button submit-button">
                {t("comment")}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
