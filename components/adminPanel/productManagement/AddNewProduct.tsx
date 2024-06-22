"use client";

import Image from "next/image";
import Modal from "@mui/material/Modal";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { useI18n } from "../../../locales/client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createAddProductAction } from "../../../app/actions";

export default function AddNewProduct() {
  const t = useI18n();

  const validationSchema = Yup.object({
    title: Yup.string().required(t("titleRequired")),
    description: Yup.string().required(t("descriptionRequired")),
    price: Yup.number().required(t("priceRequired")).min(1, t("priceMin")),
    discountprice: Yup.number()
      .required(t("discountPriceRequired"))
      .min(1, t("discountPriceMin")),
    stock: Yup.number().required(t("stockRequired")).min(1, t("stockMin")),
    category: Yup.string().required(t("categoryRequired")),
    brand: Yup.string().required(t("brandRequired")),
    photo_gallery: Yup.array()
      .of(
        Yup.object().shape({
          img_url: Yup.string().required(t("imageRequired")),
        })
      )
      .min(1, t("imageRequired"))
      .required(t("imageRequired")),
  });

  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void,
    photo_gallery: { id: number; img_url: string; name: string }[]
  ) => {
    if (!e.target.files) {
      throw new Error("No file selected");
    }

    const files = Array.from(e.target.files);
    const newImageUrls: { id: number; img_url: string; name: string }[] = [];
    setLoading(true);

    const startId = photo_gallery.length + 1;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      try {
        const response = await fetch(`/api/upload?filename=${file.name}`, {
          method: "POST",
          body: file,
        });

        const newBlob = await response.json();
        console.log("File uploaded successfully:", newBlob);

        newImageUrls.push({
          id: startId + i,
          img_url: newBlob.url,
          name: file.name,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }

    setFieldValue("photo_gallery", [...photo_gallery, ...newImageUrls]);
  };

  const handleDeleteImage = (
    id: number,
    setFieldValue: (field: string, value: any) => void,
    photo_gallery: { id: number; img_url: string; name: string }[]
  ) => {
    const updatedGallery = photo_gallery.filter((image) => image.id !== id);
    setFieldValue("photo_gallery", updatedGallery);
  };

  return (
    <>
      <button className="button add-product-button" onClick={handleOpen}>
        {t("addProduct")}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modal-center"
      >
        <Formik
          initialValues={{
            title: "",
            description: "",
            price: 0,
            discountprice: 0,
            stock: 0,
            category: "",
            brand: "",
            photo_gallery: [],
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const productData: Products = {
              title: values.title,
              description: values.description,
              price: values.price,
              discountprice: values.discountprice,
              stock: values.stock,
              category: values.category,
              brand: values.brand,
              photo_gallery: values.photo_gallery,
            };

            try {
              await createAddProductAction(productData);
            } catch (error) {
              console.error("Error creating product:", error);
            }
            handleClose();
            router.refresh();
            setSubmitting(false);
          }}
        >
          {({
            setFieldValue,
            errors,
            touched,
            isValidating,
            isValid,
            values,
          }) => (
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
                <label className="form-label" htmlFor="price">
                  {t("price")}
                </label>
                <Field
                  className={`form-input ${
                    touched.price && errors.price ? "input-error" : ""
                  }`}
                  id="price"
                  name="price"
                  type="number"
                  placeholder={t("price")}
                />
                <ErrorMessage
                  name="price"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="discountprice">
                  {t("discountPrice")}
                </label>
                <Field
                  className={`form-input ${
                    touched.discountprice && errors.discountprice
                      ? "input-error"
                      : ""
                  }`}
                  id="discountprice"
                  name="discountprice"
                  type="number"
                  placeholder={t("discountPrice")}
                />
                <ErrorMessage
                  name="discountprice"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="stock">
                  {t("stock")}
                </label>
                <Field
                  className={`form-input ${
                    touched.stock && errors.stock ? "input-error" : ""
                  }`}
                  id="stock"
                  name="stock"
                  type="number"
                  placeholder={t("stock")}
                />
                <ErrorMessage
                  name="stock"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="brand">
                  {t("brand")}
                </label>
                <Field
                  className={`form-input ${
                    touched.brand && errors.brand ? "input-error" : ""
                  }`}
                  id="brand"
                  name="brand"
                  type="text"
                  placeholder={t("brand")}
                />
                <ErrorMessage
                  name="brand"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="category">
                  {t("category")}
                </label>
                <Field
                  className={`form-input ${
                    touched.category && errors.category ? "input-error" : ""
                  }`}
                  id="category"
                  name="category"
                  type="text"
                  placeholder={t("category")}
                />
                <ErrorMessage
                  name="category"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="form-group">
                <label className="form-label">{t("image")}</label>
                <input
                  className={`form-input ${
                    touched.photo_gallery && errors.photo_gallery
                      ? "input-error"
                      : ""
                  }`}
                  type="file"
                  ref={inputFileRef}
                  onChange={(e) =>
                    handleFileChange(e, setFieldValue, values.photo_gallery)
                  }
                  multiple
                />
                {loading && <p>{t("loading")}...</p>}
                <ErrorMessage
                  name="photo_gallery"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="form-group">
                {values.photo_gallery.map((image: Gallery) => (
                  <div key={image.id}>
                    <Image
                      src={image.img_url}
                      alt={"gallery-image"}
                      className="product-image"
                      width={64}
                      height={64}
                    />
                    <button
                      type="button"
                      className="button"
                      onClick={() =>
                        handleDeleteImage(
                          image.id,
                          setFieldValue,
                          values.photo_gallery
                        )
                      }
                    >
                      {t("delete")}
                    </button>
                  </div>
                ))}
              </div>
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
