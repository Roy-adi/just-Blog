import React, { useEffect, useState } from "react";
import { useApiCallContext } from "../context/ApiCallProvider";
import { useParams } from "react-router-dom";

const BlogDetails = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Alice Johnson",
      text: "Great insights into corporate travel! Very helpful.",
      timestamp: "2025-06-07T10:30:00Z",
    },
    {
      id: 2,
      author: "Bob Williams",
      text: "I agree, blending luxury with functionality is key for modern business trips.",
      timestamp: "2025-06-07T14:45:00Z",
    },
  ]);
  const [newComment, setNewComment] = useState("");
  const [newCommentAuthor, setNewCommentAuthor] = useState("");
  const { getBlogDetails, BlogDetails } = useApiCallContext();
  const { id } = useParams();

  // Fetch blog details when the component mounts

  useEffect(() => {
    getBlogDetails(id);
  }, [id]);

  console.log(BlogDetails, "BlogDetails");

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() && newCommentAuthor.trim()) {
      const newCommentObj = {
        id: comments.length + 1,
        author: newCommentAuthor,
        text: newComment,
        timestamp: new Date().toISOString(),
      };
      setComments([...comments, newCommentObj]);
      setNewComment("");
      setNewCommentAuthor("");
    }
  };

  const getDaysAgo = (createdAt) => {
    const createdDate = new Date(createdAt);
    const now = new Date();
    const diffTime = Math.abs(now - createdDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    return diffDays === 0
      ? "Today"
      : diffDays === 1
      ? "1 day ago"
      : `${diffDays} days ago`;
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div
      className="container"
      style={{
        fontFamily: "sans-serif",
        color: "#212529",
        padding: "3rem 1rem",
      }}
    >
      {/* Blog Details Section */}
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* Title */}
        <h1
          className="text-center"
          style={{ fontWeight: "700", fontSize: "2.5rem" }}
        >
          {BlogDetails?.title || "No Title Available"}
        </h1>

        {/* Metadata */}
        <p className="text-center text-muted" style={{ margin: "1rem 0" }}>
          {BlogDetails?.authorname} • {getDaysAgo(BlogDetails?.createdAt)}
        </p>

        {/* Image */}
        <div className="mb-4">
          <img
            src={BlogDetails?.blogImg || "https://via.placeholder.com/800x400"}
            alt="Corporate Building"
            className="img-fluid rounded"
            style={{ width: "100%", height: "auto", objectFit: "cover" }}
          />
        </div>

        {/* Content */}
        <div
          className="mb-5"
          style={{ fontSize: "1.125rem", lineHeight: "1.8" }}
        >
          <p>
            {BlogDetails?.description ||
              "No description available for this blog post."}
          </p>
        </div>

        {/* Comments */}
        <div className="border-top pt-5">
          <h2 style={{ fontWeight: "700", fontSize: "2rem" }} className="mb-4">
            Comments
          </h2>

          {/* Comment Form */}
          <div className="bg-light p-4 rounded shadow-sm mb-4">
            <h4 className="mb-3" style={{ fontWeight: "600" }}>
              Leave a Comment
            </h4>
            <form onSubmit={handleCommentSubmit}>
              <div className="mb-3">
                <label htmlFor="commentAuthor" style={{ fontWeight: "500" }}>
                  Your Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="commentAuthor"
                  value={newCommentAuthor}
                  onChange={(e) => setNewCommentAuthor(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="commentText" style={{ fontWeight: "500" }}>
                  Your Comment
                </label>
                <textarea
                  className="form-control"
                  id="commentText"
                  rows="4"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  required
                />
              </div>
              <button className="btn btn-primary btn-lg" type="submit">
                Post Comment
              </button>
            </form>
          </div>

          {/* Comment List */}
          {comments.length > 0 ? (
            <div>
              {comments.map((comment) => (
                <div key={comment.id} className="card mb-3 p-3">
                  <h6 className="mb-1" style={{ fontWeight: "700" }}>
                    {comment.author}
                  </h6>
                  <p
                    className="text-muted mb-2"
                    style={{ fontSize: "0.875rem" }}
                  >
                    {formatTimestamp(comment.timestamp)}
                  </p>
                  <p className="text-secondary mb-0">{comment.text}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted">
              No comments yet. Be the first to comment!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
