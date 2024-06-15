import Image from "next/image";
import blogImage from "../../../../../public/assets/blog.jpg";
import { getBlogDetail, getBlogs } from "../../../../api";
import { BlogData } from "../page";
import "../../../../../styles/Post.css";

interface ProductsDetailsProps {
  params: {
    id: number;
    locale: string;
  };
}

export async function generateMetadata({ params }: ProductsDetailsProps) {
  const blogData = await getBlogs();
  const blog = blogData.find((blog: BlogData) => blog.id == params.id);

  return {
    title: `${blog.title}`,
    description: `${blog.description}`,
  };
}

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
