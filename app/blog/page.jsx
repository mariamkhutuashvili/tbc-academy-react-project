"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Article from "../../components/article/Article";
import blogImage from "../../public/assets/blog.jpg";
import "../../styles/blog.css";

function Blog() {
  const [posts, setPosts] = useState([]);
  const router = useRouter();

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

  const handlePostClick = (id) => {
    router.push(`/blog/${id}`);
  };

  return (
    <div className="blog-container">
      <div className="blog-articles">
        {posts.map((post) => (
          <Article
            key={post.id}
            id={post.id}
            title={post.title}
            date={new Date().toLocaleDateString()}
            photo={blogImage}
            onReadMore={handlePostClick}
          />
        ))}
      </div>
      <div className="blog-archives">
        <h3>Archives</h3>
        <ul>
          {posts.map((post) => (
            <li
              key={post.id}
              onClick={() => handlePostClick(post.id)}
              style={{ cursor: "pointer" }}
            >
              {post.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Blog;
