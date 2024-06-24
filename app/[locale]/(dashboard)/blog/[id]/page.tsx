import Image from "next/image";
import { getBlogDetail, getBlogs } from "../../../../api";
import "../../../../../styles/Post.css";

export async function generateMetadata({ params }: MetaDataProps) {
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
      <div className="blog-image-container">
        <Image
          src={blogData.photo}
          alt={blogData.title}
          width={500}
          height={300}
          className="blog-image"
          priority
        />
      </div>
      <p>{dateAdded}</p>
      <h1>{blogData.title}</h1>
      <p>{blogData.description}</p>
    </div>
  );
}
