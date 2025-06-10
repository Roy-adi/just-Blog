/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useApiCallContext } from "../context/ApiCallProvider";
import { useNavigate, useParams } from "react-router-dom";
import demoImg from "../assets/blogHero.jpg";
import EditBlogModal from "./EditBlogModal";
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
  const [showModal, setShowModal] = useState(false);
  const username = localStorage.getItem("username");
  const {
    getBlogDetails,
    BlogDetails,
    getBlogCommentList,
    BlogCommentList,
    Createcomment,deletecomment,deleteBlog
  } = useApiCallContext();
  const navigate = useNavigate()
  const { id } = useParams();
  const handleClose = () => setShowModal(false);

  // Fetch blog details when the component mounts

  useEffect(() => {
    getBlogDetails(id);
    getBlogCommentList(id);
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim() === "") {
      return; // Prevent empty comments
    }
    const commentData = {
      text: newComment,
      id: id,
    };
    await Createcomment(commentData);
    setNewComment("");
    getBlogCommentList(id);
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

  function formatTimestamp(dateString) {
    const now = new Date();
    const commentDate = new Date(dateString);
    const secondsAgo = Math.floor((now - commentDate) / 1000);

    if (secondsAgo < 60) return `${secondsAgo} sec ago`;
    if (secondsAgo < 3600) return `${Math.floor(secondsAgo / 60)} min ago`;
    if (secondsAgo < 86400) return `${Math.floor(secondsAgo / 3600)} hours ago`;
    return commentDate.toLocaleDateString("en-IN", { dateStyle: "medium" });
  }

  function handledelete(id) {
    deleteBlog(id)
    navigate('/')
  }

  function handlecommentDelete(commentId) {
    // Confirm and call API to delete
    deletecomment(commentId)
    console.log("Delete clicked", commentId);
    getBlogCommentList(id);
  }

  return (
    <>
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
          <h2
            className="text-center"
            style={{ fontWeight: "700", fontSize: "2.5rem" }}
          >
            {BlogDetails?.title || "No Title Available"}
          </h2>

          {/* Metadata */}
          <p className="text-center text-muted" style={{ margin: "1rem 0" }}>
            {BlogDetails?.authorname} • {getDaysAgo(BlogDetails?.createdAt)}
            {username === BlogDetails?.authorname && (
            <div className="mt-4"> 
            <button
                onClick={() => setShowModal(true)}
                className="btn btn-sm btn-outline-primary ms-3"
              >
                Edit Blog
              </button>
              <button
                onClick={() => handledelete(id)}
                className="btn btn-sm btn-outline-primary ms-3"
              >
                Delete Blog
              </button>
            </div>  
            )}
          </p>

          {/* Image */}
          <div className="mb-4">
            <img
              src={BlogDetails?.blogImg || demoImg}
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
            <h2
              style={{ fontWeight: "700", fontSize: "2rem" }}
              className="mb-4"
            >
              Leave your Comments
            </h2>

            {/* Comment Form */}
            <div className="bg-light p-4 rounded shadow-sm mb-4">
              <form onSubmit={handleCommentSubmit}>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    id="commentText"
                    rows="4"
                    value={newComment}
                    placeholder="Write your comment here..."
                    onChange={(e) => setNewComment(e.target.value)}
                    required
                  />
                </div>
                <button className="btn btn-primary btn-lg" type="submit">
                  Post
                </button>
              </form>
            </div>

            {/* Comment List */}

            {BlogCommentList?.length > 0 ? (
              <div
                style={{
                  maxHeight: "300px",
                  overflowY: "auto",
                  paddingRight: "10px",
                }}
              >
                {BlogCommentList?.map((comment) => {
                  const username = localStorage.getItem("username");
                  const isOwnComment = comment.username === username;

                  return (
                    <div
                      key={comment._id}
                      className="card mb-3 p-3 border-0 position-relative"
                    >
                      {/* Username and Time */}
                      <div className="d-flex justify-content-between align-items-start mb-1">
                        <div className="d-flex flex-wrap align-items-center gap-2">
                          <span style={{ fontWeight: 600 }}>
                            @{comment.username}
                          </span>
                          <span
                            className="text-muted"
                            style={{ fontSize: "0.875rem" }}
                          >
                            {formatTimestamp(comment.createdAt)}
                          </span>
                        </div>

                        {/* Three-dot menu only for logged-in user */}
                        {isOwnComment && (
                          <div className="dropdown">
                            <button
                              className="btn btn-lg"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                              style={{
                                border: "none",
                                background: "transparent",
                              }}
                            >
                              &#8942;
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end">
                              
                              <li>
                                <button
                                  className="dropdown-item text-danger"
                                  onClick={() => handlecommentDelete(comment._id)}
                                >
                                  Delete
                                </button>
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Comment Text */}
                      <p className="mb-0">{comment.text}</p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-muted">
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>
        </div>
      </div>
      <EditBlogModal
        show={showModal}
        handleClose={handleClose}
        BlogDetails={BlogDetails}
      />
    </>
  );
};

export default BlogDetails;
