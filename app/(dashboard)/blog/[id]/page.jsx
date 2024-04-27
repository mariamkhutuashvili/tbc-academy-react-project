import Image from "next/image";
import blogImage from "../../../../public/assets/blog.jpg";
import "../../../../styles/Post.css";

const URL = "https://dummyjson.com/posts";

export async function generateStaticParams() {
  const response = await fetch("https://dummyjson.com/posts");
  const data = await response.json();
  const path = data.posts.map((post) => ({
    id: `${post.id}`,
  }));
  return path;
}

const fetchPosts = async (postId) => {
  const response = await fetch(`${URL}/${postId}`);
  const data = await response.json();
  return data;
};

export default async function Post({ params }) {
  const postId = params.id;
  const postData = await fetchPosts(postId);

  return (
    <div key={postData.index} className="post-page">
      <Image src={blogImage} alt="Post Image" priority />
      <h1>{postData.title}</h1>
      <p>{postData.body}</p>
    </div>
  );
}
