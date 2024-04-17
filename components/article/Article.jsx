import Image from "next/image";

export default function Article({ id, title, date, photo, onReadMore }) {
  return (
    <div className="article-container">
      <div className="article-image-container">
        <Image src={photo} alt="Article" className="article-image" />
      </div>
      <div className="article-details">
        <h2 className="article-title">{title}</h2>
        <p className="article-date">{date}</p>
        <button className="button" onClick={() => onReadMore(id)}>
          Read More
        </button>
      </div>
    </div>
  );
}
