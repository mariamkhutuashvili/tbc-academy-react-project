"use client";

import Modal from "@mui/material/Modal";
import Image from "next/image";
import { useI18n } from "../../locales/client";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { updateBlog } from "../../app/[locale]/actions";

interface BlogClientProps {
  blogData: PostData;
}

export interface PostData {
  id: number;
  title: string;
  description: string;
  photo: string;
}

export default function EditBlog({ blogData }: BlogClientProps) {
  const t = useI18n();

  const [open, setOpen] = useState<boolean>(false);
  const [blog, setBlog] = useState<PostData>(blogData);
  const [loading, setLoading] = useState<boolean>(false);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateBlog(blog);
      console.log("Blog updated successfully");
    } catch (error) {
      console.error("Failed to update blog:", error);
    }
    router.refresh();
    handleClose();
  };

  const handleChange = (
    field: keyof PostData,
    value: string | number | null
  ) => {
    setBlog((prevBlog) => ({
      ...prevBlog,
      [field]: value,
    }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      throw new Error("No file selected");
    }

    const file = e.target.files[0];
    setLoading(true);

    try {
      const response = await fetch(`/api/upload?filename=${file.name}`, {
        method: "POST",
        body: file,
      });

      const newBlob = await response.json();
      setBlog((prevBlog) => ({
        ...prevBlog,
        photo: newBlob.url,
      }));
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
        className="edit-icon w-6 h-6 cursor-pointer"
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
          <form onSubmit={handleSubmit} className="w-full">
            <div className="form-group">
              <label className="form-label" htmlFor="title">
                {t("title")}
              </label>
              <input
                className="form-input"
                id="title"
                type="text"
                placeholder={t("title")}
                value={blog.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="description">
                {t("description")}
              </label>
              <textarea
                className="form-input"
                placeholder={t("description")}
                value={blog.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">{t("image")}</label>
              <input
                className="form-input"
                type="file"
                ref={inputFileRef}
                onChange={handleFileChange}
              />
              {loading && <p>{t("loading")}...</p>}
            </div>
            {blog.photo && (
              <div className="form-group">
                <Image
                  src={blog.photo}
                  alt="Blog Image"
                  className="max-w-full h-auto"
                  width={100}
                  height={100}
                />
              </div>
            )}
            <div className="form-actions">
              <button className="button" type="submit" disabled={loading}>
                {loading ? t("loading") : t("save")}{" "}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
