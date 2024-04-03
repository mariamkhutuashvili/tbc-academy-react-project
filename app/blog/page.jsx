import Article from "../../components/article/Article";
import articlesData from "../../data/articlesData";
import "../../styles/blog.css";

function Blog() {
  return (
    <div className="blog-container">
      <div className="blog-articles">
        {articlesData.map((article, index) => (
          <Article key={index} {...article} />
        ))}
      </div>
      <div className="blog-archives">
        <h3>Archives</h3>
        <ul>
          {articlesData.map((article, index) => (
            <li key={index}>
              <a href="#blog">{article.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Blog;
