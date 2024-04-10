import Image from "next/image";

function Article({ title, date, photo }) {
  return (
    <div className="article-container">
      <div className="article-image-container">
        <Image src={photo} alt="Article" className="article-image" />
      </div>
      <div className="article-details">
        <h2 className="article-title">{title}</h2>
        <p className="article-date">{date}</p>
        <button className="button">Read More</button>
      </div>
    </div>
  );
}

export default Article;
