import React, { useCallback, useEffect, useState } from "react";
import { useParams, redirect } from "react-router-dom";
import { getBlogsById, getBlogComments } from "../api.rest";

const BlogDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchComments = useCallback(async (id) => {
    setLoading(true);
    try {
      const response = await getBlogComments();
      const comments = response.filter((res) => res.postId === id);
      setComments(comments);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getBlogsById(id);
      setData(response);
      fetchComments(response.userId);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id, fetchComments]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return (
    <div className="details-container">
      {loading ? (
        <h1>loading</h1>
      ) : (
        <>
          <div className="details-card">
            <h1>{data.title}</h1>
            <p>{data.body}</p>
          </div>

          <div className="comments-container">
            <h1 className="comments-header">Comments :</h1>
            {comments.map(({ id, name, email, body }) => (
              <div key={id} className="comments-card">
                <div className="comments-card-header">
                  <h1>{name}</h1>
                  <h2>Email : <a href={`mailto: ${email}`}>{email}</a> </h2>
                </div>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default BlogDetails;
