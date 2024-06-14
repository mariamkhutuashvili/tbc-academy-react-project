import Image from "next/image";
import blogImage from "../../../../../public/assets/blog.jpg";
import { getBlogDetail } from "../../../../api";
import "../../../../../styles/Post.css";

export default async function Post({
  params: { id },
}: {
  params: { id: string };
}) {
  const blogData = await getBlogDetail(id);
  const dateAdded = new Date(blogData.date_added).toLocaleDateString();

  return (
    <div key={blogData.id} className="post-page">
      <Image src={blogImage} alt="Blog Image" priority />
      <p>{dateAdded}</p>
      <h1>{blogData.title}</h1>
      <p>{blogData.description}</p>
    </div>
  );
}
