"use client";

import { handleRemoveProductFromCart } from "../../app/actions";
// import { useI18n } from "../../locales/client";

export default function RemoveFromCartButton({ id }: { id: string }) {
  // const t = useI18n();

  return (
    <div
      className="delete-icon"
      onClick={() => handleRemoveProductFromCart(id)}
    >
      {/* <span className="hover-text">{t("remove")}</span> */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    </div>
  );
}
