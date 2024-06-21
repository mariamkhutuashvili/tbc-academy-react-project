"use client";

import Link from "next/link";
import Image from "next/image";
import { useI18n } from "../../locales/client";
import "./Article.css";

export default function Article({ id, title, date, photo }: ArticleProps) {
  const t = useI18n();

  return (
    <div className="article-container">
      <div className="article-image-container">
        <Image
          src={photo}
          alt="Article"
          className="article-image"
          width={500}
          height={300}
        />
      </div>
      <div className="article-details">
        <h2 className="article-title">{title}</h2>
        <p className="article-date">{date}</p>
        <Link href={`/blog/${id}`} className="button read-more-button">
          {t("readMore")}
        </Link>
      </div>
    </div>
  );
}
