import Title from "../../../../components/UI/Title";
import { getBlogs } from "../../../api";
import { getI18n } from "../../../../locales/server";
import BlogsData from "../../../../components/blogsData/BlogsData";
import "../../../../styles/Blog.css";

export const metadata = {
  title: "Blog",
  description: "Blog - Latest News and Insights",
};

export default async function Blog() {
  const t = await getI18n();

  const blogData: BlogData[] = await getBlogs();

  return (
    <div className="blog-container">
      <div className="blog-articles">
        <Title titleName={t("blog")} />
        <BlogsData blogData={blogData} />
      </div>
    </div>
  );
}
