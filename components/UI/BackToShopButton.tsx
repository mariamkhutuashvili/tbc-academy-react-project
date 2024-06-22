"use client";

import { useRouter } from "next/navigation";
import { useI18n } from "../../locales/client";

export default function BackToShopButton() {
  const t = useI18n();

  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (
    <button onClick={handleClick} className="button back-to-shop-button">
      {t("backToShop")}
    </button>
  );
}
