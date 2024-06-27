"use client";

import { useState } from "react";
import Article from "../article/Article";
import AutoCompleteSearch from "../autoCompleteSearch/AutoCompleteSearch";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function BlogsData({ blogData }: { blogData: BlogData[] }) {
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 5;

  const filteredBlogs = blogData.filter(
    (b: BlogData) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.description.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBlogs.length / postsPerPage);

  const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = filteredBlogs.slice(
    startIndex,
    startIndex + postsPerPage
  );

  return (
    <div className="blogs-data">
      <AutoCompleteSearch blogData={blogData} setSearch={setSearch} />
      <div>
        {currentPosts.map((post) => {
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
      </div>{" "}
      <Stack spacing={2} alignItems="center">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handleChangePage}
          color="secondary"
        />
      </Stack>
    </div>
  );
}
