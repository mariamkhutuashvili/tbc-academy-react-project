import Article from "../../../../components/article/Article";
import Title from "../../../../components/UI/Title";
import { getBlogs } from "../../../api";
import { getI18n } from "../../../../locales/server";
import "../../../../styles/Blog.css";

export const metadata = {
  title: "Blog",
  description: "Blog - Latest News and Insights",
};

export interface BlogData {
  id: number;
  title: string;
  description: string;
  photo: string;
  date_added: string;
}

export default async function Blog() {
  const t = await getI18n();

  const blogData: BlogData[] = await getBlogs();

  return (
    <div className="blog-container">
      <div className="blog-articles">
        <Title titleName={t("blog")} />
        {blogData.map((post) => {
          const dateAdded = new Date(post.date_added);
          return (
            <Article
              key={post.id}
              id={post.id}
              title={post.title}
              date={dateAdded.toLocaleDateString()}
              photo={post.photo}
            />
          );
        })}
      </div>
      <div className="blog-archives">
        <Title titleName={t("archive")} />
        <ul>
          {blogData.map((post) => (
            <li key={post.id} style={{ cursor: "pointer" }}>
              {post.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
