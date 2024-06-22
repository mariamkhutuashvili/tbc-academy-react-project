"use client";

import Modal from "@mui/material/Modal";
import { useI18n } from "../../../locales/client";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { PutBlobResult } from "@vercel/blob";
import { createAddBlogAction } from "../../../app/actions";
import Image from "next/image";

export default function AddNewBlog() {
  const t = useI18n();

  const validationSchema = Yup.object({
    title: Yup.string().required(t("titleRequired")),
    description: Yup.string().required(t("descriptionRequired")),
    photo: Yup.string().required(t("imageRequired")),
  });

  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [preview, setPreview] = useState<string | null>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    event.preventDefault();

    if (!inputFileRef.current?.files) {
      throw new Error("No file selected");
    }

    const file = inputFileRef.current.files[0];
    setPreview(URL.createObjectURL(file));
    setLoading(true);

    try {
      const response = await fetch(`/api/upload?filename=${file.name}`, {
        method: "POST",
        body: file,
      });

      const newBlob = (await response.json()) as PutBlobResult;
      setFieldValue("photo", newBlob.url);
      setLoading(false);
    } catch (error) {
      console.error("Error uploading file:", error);
      setLoading(false);
    }
  };

  return (
    <>
      <button className="button add-blog-button" onClick={handleOpen}>
        {t("addBlog")}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modal-center"
      >
        <Formik
          initialValues={{ title: "", description: "", photo: "" }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const blogData: AddBlogData = {
              title: values.title,
              description: values.description,
              photo: values.photo,
            };

            try {
              await createAddBlogAction(blogData);
            } catch (error) {
              console.error("Error creating blog:", error);
            }
            handleClose();
            router.refresh();
            setSubmitting(false);
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
                  onChange={(event) => handleFileUpload(event, setFieldValue)}
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
    </>
  );
}
