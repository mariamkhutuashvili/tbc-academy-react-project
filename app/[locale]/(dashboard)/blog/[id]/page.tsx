import Image from "next/image";
import blogImage from "../../../../../public/assets/blog.jpg";
import { setStaticParamsLocale } from "next-international/server";
import "../../../../../styles/Post.css";

const URL = "https://dummyjson.com/posts";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface PostsResponse {
  posts: Post[];
}

export async function generateStaticParams() {
  const response = await fetch("https://dummyjson.com/posts");
  const data: PostsResponse = await response.json();
  const path = data.posts.map((post) => ({
    id: `${post.id}`,
  }));
  return path;
}

const fetchPosts = async (postId: string): Promise<Post> => {
  const response = await fetch(`${URL}/${postId}`);
  const postData: Post = await response.json();
  return postData;
};

export default async function Post({
  params: { id, locale },
}: {
  params: { id: string; locale: string };
}) {
  setStaticParamsLocale(locale);

  const postData = await fetchPosts(id);

  return (
    <div key={postData.id} className="post-page">
      <Image src={blogImage} alt="Post Image" priority />
      <h1>{postData.title}</h1>
      <p>{postData.body}</p>
    </div>
  );
}
