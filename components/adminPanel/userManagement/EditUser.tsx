"use client";

import Modal from "@mui/material/Modal";
import { useI18n } from "../../../locales/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { updateUserAction } from "../../../app/actions";

export default function EditUser({
  id,
  userData,
}: {
  id: number;
  userData: UserData;
}) {
  const t = useI18n();
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  const validationSchema = Yup.object({
    name: Yup.string().required(t("nameRequired")),
    email: Yup.string()
      .email(t("emailIsNotValid"))
      .required(t("emailRequired")),
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (values: UserData) => {
    try {
      await updateUserAction(id, values);
      console.log("User updated successfully");
    } catch (error) {
      console.error("Failed to update user:", error);
    }
    router.refresh();
    handleClose();
  };

  return (
    <div>
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
        className="modal-center"
      >
        <Formik
          initialValues={userData}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, isValid, touched, errors }) => (
            <Form className="modal-form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  {t("name")}
                </label>
                <Field
                  id="name"
                  name="name"
                  type="text"
                  placeholder={t("name")}
                  className={`form-input ${
                    touched.name && errors.name ? "input-error" : ""
                  }`}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  {t("email")}
                </label>
                <Field
                  id="email"
                  name="email"
                  type="text"
                  placeholder={t("email")}
                  className={`form-input ${
                    touched.email && errors.email ? "input-error" : ""
                  }`}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="form-actions">
                <button
                  type="submit"
                  className="button"
                  disabled={isSubmitting || !isValid}
                >
                  {t("save")}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
}
