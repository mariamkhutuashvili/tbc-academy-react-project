function Article({ title, date, photo, summary }) {
  return (
    <div className="article-container">
      <div className="article-image-container">
        <img
          src={photo}
          alt="Article"
          className="article-image"
        />
      </div>
      <div className="article-details">
        <h2 className="article-title">{title}</h2>
        <p className="article-date">{date}</p>
        <p>{summary}</p>
        <button className="button">Read More</button>
      </div>
    </div>
  );
}

export default Article;
