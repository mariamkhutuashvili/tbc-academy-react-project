"use client";

import { handleLogout } from "../../scripts/logout";
import { useTranslation } from "react-i18next";

export default function LogoutButton() {
  const { t } = useTranslation();

  return (
    <button
      onClick={() =>
        handleLogout().then(() => {
          window.location.reload();
        })
      }
      className="button logout-button"
    >
      {t("logOut")}
    </button>
  );
}
