"use client";

import { handleLogout } from "../../scripts/logout";

export default function LogoutButton() {
  return (
    <button
      onClick={() =>
        handleLogout().then(() => {
          window.location.reload();
        })
      }
      className="button logout-button"
    >
      Logout
    </button>
  );
}
