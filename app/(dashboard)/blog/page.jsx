import Article from "../../../components/article/Article";
import blogImage from "../../../public/assets/blog.jpg";
import Title from "../../../components/UI/Title";
import "../../../styles/blog.css";

const fetchPosts = async () => {
  const response = await fetch("https://dummyjson.com/posts");
  const data = await response.json();
  return data.posts;
};

export default async function Blog() {
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
            photo={blogImage}
          />
        ))}
      </div>
      <div className="blog-archives">
        <Title titleName="Archive" />
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
