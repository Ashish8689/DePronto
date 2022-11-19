import React, { useEffect, useState } from "react";
import { getBlogs } from "../api.rest";
import BlogItem from "./BlogItem";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await getBlogs();
      setBlogs(response);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return loading ? (
    <h1>Loading....</h1>
  ) : (
    <div className="blog-container">
      {blogs.map((blog) => (
        <BlogItem key={blog.id} data={blog} />
      ))}
    </div>
  );
};

export default Blog;
