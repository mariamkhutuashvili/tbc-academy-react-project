// import { useState } from "react";
// import Image from "next/image";
import Title from "../../../../components/UI/Title";
import ProfilePicture from "../../../../components/profilePicture/ProfilePicture";
import { getI18n } from "../../../../locales/server";
import { getSession } from "@auth0/nextjs-auth0";
import { getUserPicture } from "../../../api";
import "../../../../styles/Profile.css";

export default async function Profile() {
  const t = await getI18n();

  const session = await getSession();
  const user = session?.user;
  console.log(user);

  const userPicture = await getUserPicture();
  console.log(userPicture);

  // const [newPassword, setNewPassword] = useState<string>("");
  // const [confirmPassword, setConfirmPassword] = useState<string>("");

  // const handleSave = () => {
  //   if (newPassword !== confirmPassword) {
  //     alert("Passwords do not match.");
  //     return;
  //   }

  //   console.log("New password saved:", newPassword);

  //   setNewPassword("");
  //   setConfirmPassword("");
  // };

  return (
    <div className="profile-container">
      <Title titleName={t("userInformation")} />
      <div className="user-info">
        <ProfilePicture userImage={userPicture} />
        {/* <Image
          src={user?.picture ? user?.picture : ""}
          alt="Profile picture"
          width={200}
          height={200}
          priority
        /> */}
        <p>
          <strong>{t("name")}: </strong>
          {user?.nickname}
        </p>
        <p>
          <strong>{t("email")}: </strong>
          {user?.email}
        </p>
      </div>
      <div className="password-update">
        <h2>{t("changePassword")}</h2>
        <input
          type="password"
          placeholder={t("newPassword")}
          // value={newPassword}
          // onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder={t("confirmNewPassword")}
          // value={confirmPassword}
          // onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          type="button"
          className="button save-button"
          // onClick={handleSave}
        >
          {t("save")}
        </button>
      </div>
    </div>
  );
}
