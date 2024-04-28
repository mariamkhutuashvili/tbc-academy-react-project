"use client";

import { useTranslation } from "react-i18next";

interface TitleProps {
  titleName: string;
}

export default function Title({ titleName }: TitleProps) {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t(`${titleName}`)}</h1>
    </div>
  );
}
