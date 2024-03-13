function Article({ title, date, photo, summary }) {
  return (
    <div
      className="article"
      style={{ display: "flex", margin: "50px", alignItems: "center" }}
    >
      <div style={{ flex: 2, marginRight: "20px" }}>
        <img
          src={photo}
          alt="Article"
          style={{ width: "100%", height: "auto", borderRadius: "5px" }}
        />
      </div>
      <div style={{ flex: 3 }}>
        <h2 style={{ marginTop: "0" }}>{title}</h2>
        <p style={{ fontStyle: "italic", color: "#777" }}>{date}</p>
        <p>{summary}</p>
        <button className="button">Read More</button>
      </div>
    </div>
  );
}

export default Article;
