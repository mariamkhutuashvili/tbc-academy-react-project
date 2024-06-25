import { getUserInfo } from "../../app/api";
import ProfileDropdown from "../profileDropdown/ProfileDropdown";

export default async function ProfileIcon() {
  const userInfo = await getUserInfo();
  return <ProfileDropdown userInfo={userInfo} />;
}
