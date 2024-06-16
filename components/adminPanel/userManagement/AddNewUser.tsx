"use client";

import Modal from "@mui/material/Modal";
import { useI18n } from "../../../locales/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createUserAction } from "../../../app/actions";

export default function AddNewUser() {
  const t = useI18n();
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const router = useRouter();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData: UserData = {
      name,
      email,
    };

    try {
      await createUserAction(userData);
    } catch (error) {
      console.error("Error creating user:", error);
    }
    handleClose();
    router.refresh();
  };

  return (
    <>
      <button className="button add-user-button" onClick={handleOpen}>
        {t("addUser")}
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
            <label htmlFor="name" className="form-label">
              {t("name")}
            </label>
            <input
              id="name"
              type="text"
              placeholder={t("name")}
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
    </>
  );
}
