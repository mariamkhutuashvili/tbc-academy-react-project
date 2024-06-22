"use client";

import Modal from "@mui/material/Modal";
import Image from "next/image";
import { useI18n } from "../../../locales/client";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { updateBlog } from "../../../app/actions";

export default function EditBlog({ blogData }: { blogData: PostData }) {
  const t = useI18n();

  const validationSchema = Yup.object({
    title: Yup.string().required(t("titleRequired")),
    description: Yup.string().required(t("descriptionRequired")),
    photo: Yup.string().required(t("imageRequired")),
  });

  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [preview, setPreview] = useState<string>(blogData.photo);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    if (!e.target.files) {
      throw new Error("No file selected");
    }

    const file = e.target.files[0];
    setPreview(URL.createObjectURL(file));
    setLoading(true);

    try {
      const response = await fetch(`/api/upload?filename=${file.name}`, {
        method: "POST",
        body: file,
      });

      const newBlob = await response.json();
      setFieldValue("photo", newBlob.url);
      setLoading(false);
    } catch (error) {
      console.error("Error uploading file:", error);
      setLoading(false);
    }
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
          initialValues={{
            title: blogData.title,
            description: blogData.description,
            photo: blogData.photo || "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await updateBlog({ ...blogData, ...values });
              console.log("Blog updated successfully");
            } catch (error) {
              console.error("Failed to update blog:", error);
            }
            setSubmitting(false);
            router.refresh();
            handleClose();
          }}
        >
          {({ setFieldValue, errors, touched, isValidating, isValid }) => (
            <Form className="modal-form">
              <div className="form-group">
                <label className="form-label" htmlFor="title">
                  {t("title")}
                </label>
                <Field
                  className={`form-input ${
                    touched.title && errors.title ? "input-error" : ""
                  }`}
                  id="title"
                  name="title"
                  type="text"
                  placeholder={t("title")}
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="description">
                  {t("description")}
                </label>
                <Field
                  className={`form-input ${
                    touched.description && errors.description
                      ? "input-error"
                      : ""
                  }`}
                  as="textarea"
                  name="description"
                  placeholder={t("description")}
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="form-group">
                <label className="form-label">{t("image")}</label>
                <input
                  className={`form-input ${
                    touched.photo && errors.photo ? "input-error" : ""
                  }`}
                  type="file"
                  ref={inputFileRef}
                  onChange={(e) => handleFileChange(e, setFieldValue)}
                />
                {loading && <p>{t("loading")}...</p>}
                <ErrorMessage
                  name="photo"
                  component="div"
                  className="error-message"
                />
              </div>
              {preview && (
                <div className="form-group">
                  <Image
                    src={preview}
                    alt="Blog Image"
                    className="blog-image"
                    width={100}
                    height={100}
                  />
                </div>
              )}
              <div className="form-actions">
                <button
                  className="button"
                  type="submit"
                  disabled={loading || isValidating || !isValid}
                >
                  {loading ? t("loading") : t("save")}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
}
