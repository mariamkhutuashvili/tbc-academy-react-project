"use client";

import { useI18n } from "../../locales/client";
import { handleLogout } from "../../scripts/logout";

export default function LogoutButton() {
  const t = useI18n();

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
