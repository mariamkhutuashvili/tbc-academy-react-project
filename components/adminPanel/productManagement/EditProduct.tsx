"use client";

import { Modal } from "@mui/material";
import Image from "next/image";
import { useI18n } from "../../../locales/client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { editProductAction } from "../../../app/actions";

export default function EditProduct({
  product,
}: {
  product: ProductFromVercel;
}) {
  const t = useI18n();

  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(product?.title || "");
  const [description, setDescription] = useState<string>(
    product?.description || ""
  );
  const [price, setPrice] = useState<number>(product?.price || 0);
  const [discountprice, setDiscountprice] = useState<number>(
    product?.discountprice || 0
  );
  const [stock, setStock] = useState<number>(product?.stock || 0);
  const [category, setCategory] = useState<string>(product?.category || "");
  const [brand, setBrand] = useState<string>(product?.brand || "");
  const [photo_gallery, setPhoto_gallery] = useState<
    { id: number; img_url: string; name: string }[]
  >(product?.photo_gallery || []);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const id = product.id;
  useEffect(() => {
    setPhoto_gallery(product?.photo_gallery || []);
  }, [product?.photo_gallery]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const productData: ProductFromVercel = {
      id: product.id,
      title,
      description,
      price,
      discountprice,
      stock,
      category,
      brand,
      photo_gallery,
    };

    try {
      await editProductAction(productData);
    } catch (error) {
      console.error("Error editing product:", error);
    }
    handleClose();
    router.refresh();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
        setLoading(false);
      }
    }

    setPhoto_gallery((prev) => [...prev, ...newImageUrls]);
  };

  const handleDeleteImage = (id: number) => {
    setPhoto_gallery((prev) => prev.filter((image) => image.id !== id));
  };

  const handleMoveToFirst = (id: number) => {
    setPhoto_gallery((prev) => {
      const index = prev.findIndex((image) => image.id === id);
      if (index > -1) {
        const [selectedImage] = prev.splice(index, 1);
        return [selectedImage, ...prev];
      }
      return prev;
    });
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
        <div className="modal-form">
          <form onSubmit={handleSubmit} className="edit-form">
            <div className="form-group">
              <label className="form-label" htmlFor="title">
                {t("title")}
              </label>
              <input
                className="form-input"
                id="title"
                type="text"
                placeholder={t("title")}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="description">
                {t("description")}
              </label>
              <textarea
                className="form-input"
                placeholder={t("description")}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="price">
                {t("price")}
              </label>
              <input
                className="form-input"
                id="price"
                type="text"
                placeholder={t("price")}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="discountprice">
                {t("discountPrice")}
              </label>
              <input
                className="form-input"
                id="discountprice"
                type="number"
                placeholder={t("discountPrice")}
                value={discountprice}
                onChange={(e) => setDiscountprice(Number(e.target.value))}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="stock">
                {t("stock")}
              </label>
              <input
                className="form-input"
                id="stock"
                type="number"
                placeholder={t("stock")}
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="brand">
                {t("brand")}
              </label>
              <input
                className="form-input"
                id="brand"
                type="text"
                placeholder={t("brand")}
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="category">
                {t("category")}
              </label>
              <input
                className="form-input"
                id="category"
                type="text"
                placeholder={t("category")}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">{t("image")}</label>
              <input
                className="form-input"
                type="file"
                ref={inputFileRef}
                onChange={handleFileChange}
                multiple
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
                  {/* <span>{image.name}</span> */}
                  <button
                    type="button"
                    className="button"
                    onClick={() => handleDeleteImage(image.id)}
                  >
                    {t("delete")}
                  </button>
                  <button
                    type="button"
                    className="button"
                    onClick={() => handleMoveToFirst(image.id)}
                  >
                    {t("makePrimary")}
                  </button>
                </div>
              ))}
            </div>
            <div className="form-actions">
              <button
                className="button submit-button"
                type="submit"
                disabled={loading}
              >
                {loading ? t("loading") : t("save")}{" "}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
