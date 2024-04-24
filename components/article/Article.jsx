"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function Article({ id, title, date, photo }) {
  const { t } = useTranslation();
  return (
    <div className="article-container">
      <div className="article-image-container">
        <Image src={photo} alt="Article" className="article-image" />
      </div>
      <div className="article-details">
        <h2 className="article-title">{title}</h2>
        <p className="article-date">{date}</p>
        <Link href={`/blog/${id}`} className="button">
          {t("readMore")}
        </Link>
      </div>
    </div>
  );
}
