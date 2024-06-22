"use client";

import { useRouter } from "next/navigation";
import { handleAddToCart } from "../../app/actions";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useI18n } from "../../locales/client";
import { toast } from "react-toastify";
import Modal from "@mui/material/Modal";
import { useState } from "react";

export default function AddToCartButton({ id }: { id: string }) {
  const t = useI18n();

  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => setOpen(false);

  const handleAddToCartClick = (productId: string) => {
    if (!user) {
      setOpen(true);
    } else {
      handleAddToCart(productId);
      toast.success(t("productAddedToCart"), {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const { user } = useUser();
  const router = useRouter();

  return (
    <>
      <button
        className="button cart-button"
        onClick={(e) => {
          e.stopPropagation();
          handleAddToCartClick(id);
        }}
      >
        {t("addToCart")}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">
          <h3>{t("authorization")}</h3>
          <p>{t("redirectToLogin")}</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              router.push("/api/auth/login");
            }}
            className="button login-button"
          >
            {t("login")}
          </button>
        </div>
      </Modal>
    </>
  );
}
