"use client";

import Modal from "@mui/material/Modal";
import Image from "next/image";
import { useI18n } from "../../../locales/client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { editProductAction } from "../../../app/actions";

export default function EditProduct({
  product,
}: {
  product: ProductFromVercel;
}) {
  const t = useI18n();

  const validationSchema = Yup.object({
    title: Yup.string().required(t("titleRequired")),
    description: Yup.string().required(t("descriptionRequired")),
    price: Yup.number().required(t("priceRequired")).min(1, t("priceMin")),
    discountprice: Yup.number().required(t("discountPriceRequired")),
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
  const [photo_gallery, setPhoto_gallery] = useState<
    { id: number; img_url: string; name: string }[]
  >(product?.photo_gallery || []);

  const router = useRouter();
  const inputFileRef = useRef<HTMLInputElement>(null);

  const id = product.id;

  useEffect(() => {
    setPhoto_gallery(product?.photo_gallery || []);
  }, [product?.photo_gallery]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const initialValues: any = {
    id: Number(id),
    title: product.title,
    description: product.description,
    price: product.price,
    discountprice: product.discountprice,
    stock: product.stock,
    category: product.category,
    brand: product.brand,
    photo_gallery: product.photo_gallery || [],
  };

  const handleSubmit = async (values: any, { resetForm }: any) => {
    const productData = { ...values, photo_gallery };

    if (photo_gallery.length === 0) {
      alert("Image cannot be empty");
      return;
    }

    try {
      await editProductAction(productData);
      console.log("Product edited successfully");
      resetForm();
      handleClose();
      router.refresh();
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any
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
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
    setFieldValue("img_url", newImageUrls[0]?.img_url || "");
    setPhoto_gallery((prev) => [...prev, ...newImageUrls]);
    setLoading(false);

    // const updatedPhotoGallery = [...photo_gallery, ...newImageUrls];
    // setPhoto_gallery(updatedPhotoGallery);
    // setFieldValue("photo_gallery", updatedPhotoGallery);
    // setLoading(false);
  };

  // const handleDeleteImage = (id: number, setFieldValue: any) => {
  //   const updatedGallery = photo_gallery.filter((image) => image.id !== id);
  //   setPhoto_gallery(updatedGallery);
  //   setFieldValue("photo_gallery", updatedGallery);
  //   if (updatedGallery.length > 0) {
  //     setFieldValue("img_url", updatedGallery[0].img_url);
  //   } else {
  //     setFieldValue("img_url", "");
  //   }
  // };

  // const handleMoveToFirst = (id: number, setFieldValue: any) => {
  //   setPhoto_gallery((prev) => {
  //     const index = prev.findIndex((image) => image.id === id);
  //     if (index > -1) {
  //       const [selectedImage] = prev.splice(index, 1);
  //       const updatedGallery = [selectedImage, ...prev];
  //       setFieldValue("photo_gallery", updatedGallery);
  //       setFieldValue("img_url", updatedGallery[0].img_url);
  //       return updatedGallery;
  //     }
  //     return prev;
  //   });
  // };

  const handleDeleteImage = (id: number, setFieldValue: any) => {
    const newImageGallery = photo_gallery.filter((image) => image.id !== id);
    setPhoto_gallery(newImageGallery);
    if (newImageGallery.length > 0) {
      setFieldValue("img_url", newImageGallery[0].img_url);
    } else {
      setFieldValue("img_url", "");
    }
  };

  const handleMoveToFirst = (id: number, setFieldValue: any) => {
    const index = photo_gallery.findIndex((image) => image.id === id);
    if (index > -1) {
      const selectedImage = photo_gallery[index];
      const updatedGallery = [
        selectedImage,
        ...photo_gallery.slice(0, index),
        ...photo_gallery.slice(index + 1),
      ];
      setPhoto_gallery(updatedGallery);
      setFieldValue("img_url", updatedGallery[0].img_url);
    }
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
        className="modal-center"
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
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
                  onChange={(e) => handleFileChange(e, setFieldValue)}
                  multiple
                />
                <ErrorMessage
                  name="photo_gallery"
                  component="div"
                  className="error-message"
                />
                {loading && <p>{t("loading")}...</p>}
              </div>
              <div className="form-group">
                {photo_gallery.map((image) => (
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
                      onClick={() => handleDeleteImage(image.id, setFieldValue)}
                    >
                      {t("delete")}
                    </button>
                    <button
                      type="button"
                      className="button"
                      onClick={() => handleMoveToFirst(image.id, setFieldValue)}
                    >
                      {t("makePrimary")}
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
