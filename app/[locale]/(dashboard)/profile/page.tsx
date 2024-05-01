"use client";

import { useState } from "react";
import { useI18n } from "../../../../locales/client";
import Title from "../../../../components/UI/Title";
import "../../../../styles/Profile.css";

export default function Profile() {
  const t = useI18n();
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSave = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    console.log("New password saved:", newPassword);

    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="profile-container">
      <Title titleName={t("userInformation")} />
      <div className="user-info">
        <p>
          <strong>{t("name")}:</strong> Mariam Khutuashvili
        </p>
        <p>
          <strong>{t("email")}:</strong> khutuashvili.mariam@gmail.com
        </p>
      </div>
      <div className="password-update">
        <h2>{t("changePassword")}</h2>
        <input
          type="password"
          placeholder={t("newPassword")}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder={t("confirmNewPassword")}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          type="button"
          className="button save-button"
          onClick={handleSave}
        >
          {t("save")}
        </button>
      </div>
    </div>
  );
}
