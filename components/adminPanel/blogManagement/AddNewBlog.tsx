"use client";

import Modal from "@mui/material/Modal";
import { useI18n } from "../../../locales/client";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { PutBlobResult } from "@vercel/blob";
import { createAddBlogAction } from "../../../app/actions";

export default function AddNewBlog() {
  const t = useI18n();

  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [photo, setPhoto] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const blogData: AddBlogData = {
      title,
      description,
      photo,
    };

    try {
      await createAddBlogAction(blogData);
    } catch (error) {
      console.error("Error creating blog:", error);
    }
    handleClose();
    router.refresh();
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();

    if (!inputFileRef.current?.files) {
      throw new Error("No file selected");
    }

    const file = inputFileRef.current.files[0];
    setLoading(true);

    try {
      const response = await fetch(`/api/upload?filename=${file.name}`, {
        method: "POST",
        body: file,
      });

      const newBlob = (await response.json()) as PutBlobResult;
      setPhoto(newBlob.url);
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
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label className="form-label" htmlFor="name">
              {t("title")}
            </label>
            <input
              className="form-input"
              id="name"
              type="text"
              placeholder={t("title")}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">{t("description")}</label>
            <textarea
              className="form-input"
              placeholder={t("description")}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">{t("image")}</label>
            <input
              className="form-input"
              type="file"
              ref={inputFileRef}
              onChange={handleFileUpload}
            />
            {loading && <p>{t("loading")}...</p>}
          </div>
          <div className="form-actions">
            <button className="button" type="submit" disabled={loading}>
              {t("addBlog")}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
