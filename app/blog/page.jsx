"use client";

import { useState, useEffect } from "react";
import Article from "../../components/article/Article";
import blogImage from "../../public/assets/blog.jpg";
import "../../styles/blog.css";

function Blog() {
  const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const response = await fetch("https://dummyjson.com/posts");
  //     const data = await response.json();
  //     setPosts(data.posts);
  //   };
  //   fetchPosts();
  // }, []);

  useEffect(() => {
    fetch("https://dummyjson.com/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.posts);
      });
  }, []);

  return (
    <div className="blog-container">
      <div className="blog-articles">
        {posts.map((post) => (
          <Article
            key={post.id}
            title={post.title}
            date={new Date().toLocaleDateString()}
            photo={blogImage}
          />
        ))}
      </div>
      <div className="blog-archives">
        <h3>Archives</h3>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <a href="#blog">{post.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Blog;
