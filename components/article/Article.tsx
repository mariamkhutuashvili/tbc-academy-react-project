"use client";

import Link from "next/link";
import Image from "next/image";
import blogImage from "../../public/assets/blog.jpg";
import { useTranslation } from "react-i18next";

interface ArticleProps {
  id: number;
  title: string;
  date: string;
}

export default function Article({ id, title, date }: ArticleProps) {
  const { t } = useTranslation();

  return (
    <div className="article-container">
      <div className="article-image-container">
        <Image src={blogImage} alt="Article" className="article-image" />
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
