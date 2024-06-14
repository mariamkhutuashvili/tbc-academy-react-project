// import { useState } from "react";
// import Image from "next/image";
import Title from "../../../../components/UI/Title";
import ProfilePicture from "../../../../components/profilePicture/ProfilePicture";
import ProfileInfo from "../../../../components/profileInfo/ProfileInfo";
import { getI18n } from "../../../../locales/server";
import { getUserInfo, getUserPicture } from "../../../api";
import "../../../../styles/Profile.css";

export default async function Profile() {
  const t = await getI18n();

  const user = await getUserInfo();

  const userPicture = await getUserPicture();

  return (
    <div className="profile-container">
      <Title titleName={t("userInformation")} />
      <div className="user-info">
        <ProfilePicture userImage={userPicture} />
        <ProfileInfo user={user} />
        {/* <Image
          src={user?.picture ? user?.picture : ""}
          alt="Profile picture"
          width={200}
          height={200}
          priority
        /> */}
      </div>
    </div>
  );
}
