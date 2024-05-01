import Link from "next/link";
import Image from "next/image";
import blogImage from "../../public/assets/blog.jpg";
import { getI18n } from "../../locales/server";
import "./Article.css";

interface ArticleProps {
  id: number;
  title: string;
  date: string;
}

export default async function Article({ id, title, date }: ArticleProps) {
  const t = await getI18n();

  return (
    <div className="article-container">
      <div className="article-image-container">
        <Image src={blogImage} alt="Article" className="article-image" />
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
