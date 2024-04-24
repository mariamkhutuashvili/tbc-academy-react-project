"use client";

import { useTranslation } from "react-i18next";

export default function Title({ titleName }) {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t(`${titleName}`)}</h1>
    </div>
  );
}
