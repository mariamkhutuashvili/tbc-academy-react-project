"use client";

import Modal from "@mui/material/Modal";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createEditReviewAction } from "../../../app/actions";
import { useI18n } from "../../../locales/client";

export default function EditReview({
  user_id,
  product_id,
  id,
  userName,
  rating,
  reviewMessage,
}: {
  user_id: number;
  product_id: number;
  id: number;
  userName: string;
  reviewMessage: string;
  rating: number;
}) {
  const t = useI18n();

  const validationSchema = Yup.object({
    comment: Yup.string().max(255, t("commentMaxLength")),
  });

  const [open, setOpen] = useState<boolean>(false);
  const [star, setStar] = useState<number>(rating || 0);
  const [hover, setHover] = useState<number | null>(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const router = useRouter();

  useEffect(() => {
    setStar(rating);
  }, [rating]);

  const renderModalStars = (
    setFieldValue: (field: string, value: any) => void
  ) => {
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
              onClick={() => {
                setStar(ratingValue);
                setFieldValue("star", ratingValue);
              }}
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
    <>
      <svg
        onClick={handleOpen}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="edit-icon"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
        />
      </svg>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modal-container"
      >
        <Formik
          initialValues={{ star: rating || 0, comment: reviewMessage || "" }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const reviewData: EditReviewData = {
              id,
              user_id,
              product_id,
              star: values.star,
              comment: values.comment,
            };

            try {
              await createEditReviewAction(reviewData);
              console.log("Review edited successfully");
            } catch (error) {
              console.error("Error editing review:", error);
            }
            setSubmitting(false);
            handleClose();
            router.refresh();
          }}
        >
          {({ setFieldValue, errors, touched, isValid, isSubmitting }) => (
            <Form className="modal-form">
              <div className="modal-stars">
                {renderModalStars(setFieldValue)}
              </div>
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
                <Field
                  as="textarea"
                  id="comment"
                  name="comment"
                  placeholder={t("yourComment")}
                  className={`form-input ${
                    touched.comment && errors.comment ? "input-error" : ""
                  }`}
                />
                <ErrorMessage
                  name="comment"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="form-actions">
                <button
                  type="submit"
                  className="button"
                  disabled={!isValid || isSubmitting}
                >
                  {t("save")}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
}
