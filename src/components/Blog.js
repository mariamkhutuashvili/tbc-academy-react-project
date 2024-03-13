import Article from "./Article";

function Blog() {
  const articles = [
    {
      title: "Article 1",
      date: "March 10, 2024",
      photo: require("../assets/blog-1.jpg"),
      summary: "This is a summary of the first article...",
    },
    {
      title: "Article 2",
      date: "March 11, 2024",
      photo: require("../assets/blog-2.jpg"),
      summary: "This is a summary of the second article...",
    },
  ];

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ flex: 3 }}>
        {articles.map((article, index) => (
          <Article key={index} {...article} />
        ))}
      </div>
      <div style={{ flex: 1, margin: "50px" }}>
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
