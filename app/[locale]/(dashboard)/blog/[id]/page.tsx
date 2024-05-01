import Image from "next/image";
import blogImage from "../../../../../public/assets/blog.jpg";
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

interface Params {
  id: string;
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

interface PostProps {
  params: Params;
}

export default async function Post({ params }: PostProps) {
  const postId = params.id;
  const postData = await fetchPosts(postId);

  return (
    <div key={postData.id} className="post-page">
      <Image src={blogImage} alt="Post Image" priority />
      <h1>{postData.title}</h1>
      <p>{postData.body}</p>
    </div>
  );
}
