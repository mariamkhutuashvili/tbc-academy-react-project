"use client";

import Modal from "@mui/material/Modal";
import { useI18n } from "../../../locales/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
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
  const [user, setUser] = useState<UserData>(userData);
  const router = useRouter();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateUserAction(id, user);
      console.log("User updated successfully");
    } catch (error) {
      console.error("Failed to update user:", error);
    }
    router.refresh();
    handleClose();
  };

  const handleChange = (
    field: keyof UserData,
    value: string | number | boolean
  ) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
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
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              {t("name")}
            </label>
            <input
              id="name"
              type="text"
              placeholder={t("name")}
              value={user.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              {t("email")}
            </label>
            <input
              id="email"
              type="text"
              placeholder={t("email")}
              value={user.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="button submit-button">
              {t("save")}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
