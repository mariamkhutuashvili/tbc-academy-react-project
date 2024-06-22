"use client";

import { useRouter } from "next/navigation";
import { useI18n } from "../../locales/client";

export default function LoginButton() {
  const t = useI18n();

  const router = useRouter();

  const handleLogin = () => {
    router.push("/api/auth/login");
  };
  return (
    <button onClick={handleLogin} className="button login-button">
      {t("login")}
    </button>
  );
}
