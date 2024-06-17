"use client";

import Image from "next/image";
import { Modal } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { useI18n } from "../../../locales/client";
import { createAddProductAction } from "../../../app/actions";

export default function AddNewProduct() {
  const t = useI18n();

  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [discountprice, setDiscountprice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [category, setCategory] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [photo_gallery, setPhoto_gallery] = useState<
    { id: number; img_url: string; name: string }[]
  >([]);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const productData: Products = {
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
      await createAddProductAction(productData);
    } catch (error) {
      console.error("Error creating product:", error);
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
      }
    }

    setPhoto_gallery((prev) => [...prev, ...newImageUrls]);
  };

  const handleDeleteImage = (id: number) => {
    setPhoto_gallery((prev) => prev.filter((image) => image.id !== id));
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
                  <button
                    type="button"
                    className="button"
                    onClick={() => handleDeleteImage(image.id)}
                  >
                    {t("delete")}
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
