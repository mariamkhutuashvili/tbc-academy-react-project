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
        <Link href={`/blog/${id}`} className="read-more-button">
          {t("readMore")}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13px"
            height="10px"
            viewBox="0 0 13 10"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M1,5 L11,5" />
            <polyline points="8 1 12 5 8 9" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
