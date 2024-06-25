"use client";

import { useState } from "react";
import Article from "../article/Article";
import AutoCompleteSearch from "../autoCompleteSearch/AutoCompleteSearch";

export default function BlogsData({ blogData }: { blogData: BlogData[] }) {
  const [search, setSearch] = useState<string>("");

  const filteredBlogs = blogData.filter(
    (b: BlogData) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="blogs-data">
      <AutoCompleteSearch blogData={blogData} setSearch={setSearch} />
      <div>
        {filteredBlogs.map((post) => {
          const dateAdded = new Date(post.date_added);
          return (
            <Article
              key={post.id}
              id={post.id}
              title={post.title}
              date={dateAdded.toLocaleDateString()}
              photo={post.photo}
            />
          );
        })}
      </div>
    </div>
  );
}
