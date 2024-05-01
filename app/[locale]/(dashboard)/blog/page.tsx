import Article from "../../../../components/article/Article";
import { getI18n } from "../../../../locales/server";
import Title from "../../../../components/UI/Title";
import "../../../../styles/blog.css";

interface Post {
  id: number;
  title: string;
}

const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch("https://dummyjson.com/posts");
  const data = await response.json();
  return data.posts as Post[];
};

export default async function Blog() {
  const t = await getI18n();

  const postData = await fetchPosts();

  return (
    <div className="blog-container">
      <div className="blog-articles">
        {postData.map((post) => (
          <Article
            key={post.id}
            id={post.id}
            title={post.title}
            date={new Date().toLocaleDateString()}
          />
        ))}
      </div>
      <div className="blog-archives">
        <Title titleName={t("archive")} />
        <ul>
          {postData.map((post) => (
            <li key={post.id} style={{ cursor: "pointer" }}>
              {post.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
