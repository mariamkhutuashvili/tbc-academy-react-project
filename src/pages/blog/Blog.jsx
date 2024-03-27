import Article from "./Article";
import "./Blog.css";

function Blog() {
  const articles = [
    {
      title: "Article 1",
      date: "March 10, 2024",
      photo: require("../../assets/blog-1.jpg"),
      summary: "This is a summary of the first article...",
    },
    {
      title: "Article 2",
      date: "March 11, 2024",
      photo: require("../../assets/blog-2.jpg"),
      summary: "This is a summary of the second article...",
    },
    {
      title: "Article 3",
      date: "March 10, 2024",
      photo: require("../../assets/blog-1.jpg"),
      summary: "This is a summary of the first article...",
    },
    {
      title: "Article 4",
      date: "March 11, 2024",
      photo: require("../../assets/blog-2.jpg"),
      summary: "This is a summary of the second article...",
    },
    {
      title: "Article 5",
      date: "March 10, 2024",
      photo: require("../../assets/blog-1.jpg"),
      summary: "This is a summary of the first article...",
    },
    {
      title: "Article 6",
      date: "March 11, 2024",
      photo: require("../../assets/blog-2.jpg"),
      summary: "This is a summary of the second article...",
    },
    {
      title: "Article 7",
      date: "March 10, 2024",
      photo: require("../../assets/blog-1.jpg"),
      summary: "This is a summary of the first article...",
    },
    {
      title: "Article 8",
      date: "March 11, 2024",
      photo: require("../../assets/blog-2.jpg"),
      summary: "This is a summary of the second article...",
    },
    {
      title: "Article 9",
      date: "March 10, 2024",
      photo: require("../../assets/blog-1.jpg"),
      summary: "This is a summary of the first article...",
    },
    {
      title: "Article 10",
      date: "March 11, 2024",
      photo: require("../../assets/blog-2.jpg"),
      summary: "This is a summary of the second article...",
    },
    {
      title: "Article 11",
      date: "March 10, 2024",
      photo: require("../../assets/blog-1.jpg"),
      summary: "This is a summary of the first article...",
    },
    {
      title: "Article 12",
      date: "March 11, 2024",
      photo: require("../../assets/blog-2.jpg"),
      summary: "This is a summary of the second article...",
    },
    {
      title: "Article 13",
      date: "March 10, 2024",
      photo: require("../../assets/blog-1.jpg"),
      summary: "This is a summary of the first article...",
    },
    {
      title: "Article 14",
      date: "March 11, 2024",
      photo: require("../../assets/blog-2.jpg"),
      summary: "This is a summary of the second article...",
    },
    {
      title: "Article 15",
      date: "March 10, 2024",
      photo: require("../../assets/blog-1.jpg"),
      summary: "This is a summary of the first article...",
    },
    {
      title: "Article 16",
      date: "March 11, 2024",
      photo: require("../../assets/blog-2.jpg"),
      summary: "This is a summary of the second article...",
    },
    {
      title: "Article 17",
      date: "March 10, 2024",
      photo: require("../../assets/blog-1.jpg"),
      summary: "This is a summary of the first article...",
    },
    {
      title: "Article 18",
      date: "March 11, 2024",
      photo: require("../../assets/blog-2.jpg"),
      summary: "This is a summary of the second article...",
    },
    {
      title: "Article 19",
      date: "March 10, 2024",
      photo: require("../../assets/blog-1.jpg"),
      summary: "This is a summary of the first article...",
    },
    {
      title: "Article 20",
      date: "March 11, 2024",
      photo: require("../../assets/blog-2.jpg"),
      summary: "This is a summary of the second article...",
    },
  ];

  return (
    <div className="blog-container">
      <div className="blog-articles">
        {articles.map((article, index) => (
          <Article key={index} {...article} />
        ))}
      </div>
      <div className="blog-archives">
        <h3>Archives</h3>
        <ul>
          {articles.map((article, index) => (
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
