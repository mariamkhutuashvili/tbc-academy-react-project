"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import blogImage from "../../../../public/assets/blog.jpg";
import "../../../../styles/Post.css";

const URL = "https://dummyjson.com/posts";

export default function Post({ params }) {
  const [post, setPost] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`${URL}/${params.id}`);
      const data = await response.json();
      setPost(data);
      console.log(data);
    };

    fetchPosts();
  }, [params.id, setPost]);

  return (
    <div key={post.index} className="post-page">
      <Image src={blogImage} alt="Post Image" priority />
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
}
