"use client";

import { useState } from "react";
import { useI18n } from "../../locales/client";
import { editProfileInfo } from "../../app/actions";

export default function ProfileInfo({ user }: any) {
  const t = useI18n();

  const [nickname, setNickname] = useState(user?.name);
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address || "");
  const [infoUpdated, setInfoUpdated] = useState<Boolean>(false);

  const userSub = user?.sub;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData: ProfileData = {
      userSub,
      nickname,
      phone,
      address,
    };
    try {
      await editProfileInfo(formData);
      setInfoUpdated(true);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="user-info-update">
      <p>
        <strong>{t("email")}: </strong>
        {user?.email}
      </p>
      <form onSubmit={handleSubmit}>
        <p>
          <strong>{t("name")}: </strong>
          <input
            type="text"
            placeholder={t("yourName")}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </p>
        <p>
          <strong>{t("phone")}: </strong>
          <input
            type="text"
            placeholder={t("phone")}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </p>
        <p>
          <strong>{t("address")}: </strong>
          <input
            type="text"
            placeholder={t("address")}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </p>
        <button type="submit" className="button submit-button">
          {t("change")}
        </button>
        {infoUpdated && <p>Your info is updated!</p>}
      </form>
    </div>
  );
}
