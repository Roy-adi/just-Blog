/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import AddBlogModal from "./AddBlogModal";
import { useApiCallContext } from "../context/ApiCallProvider";
import demoImg from "../assets/blogHero.jpg";
import userimg from "../assets/user.jpg";
import { useNavigate } from "react-router-dom";
const categories = [
  "All",
  "Technology",
  "Health",
  "Lifestyle",
  "Travel",
  "Food",
  "Education",
  "Finance",
  "Entertainment",
  "Sports",
];

const BlogSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(3);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShowModal(false);

  const { getBlogPostList, blogData } = useApiCallContext();

  // Fetch blog posts when the component mounts
  useEffect(() => {
    const datatoSend = {
      category: activeCategory === "All" ? "" : activeCategory,
    };
    getBlogPostList(datatoSend);
  }, [activeCategory]);

  console.log(blogData, "blogData");

  return (
    <>
      <div className="container py-5">
        <h2 className="mb-2 fw-semibold">Blog</h2>
        <p className="text-muted mb-4">
          Here, we share travel tips, destination guides, and stories that
          inspire your next adventure.
        </p>

        {/* Categories & Sort */}
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
          <div className="col-12 col-md-10 d-flex flex-wrap gap-2 mb-2 mb-md-0">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`btn btn-sm ${
                  activeCategory === cat ? "btn-dark" : "btn-outline-secondary"
                }`}
                onClick={() => setActiveCategory(cat)}
                style={{
                  borderRadius: "20px",
                  fontSize: "0.85rem",
                  padding: "6px 14px",
                  width: "10%",
                }}
              >
                {cat}
              </button>
            ))}
            <button
              className="btn btn-sm btn-dark"
              style={{
                borderRadius: "20px",
                fontSize: "0.85rem",
                padding: "6px 14px",
                width: "15%",
              }}
              onClick={() => setShowModal(true)}
            >
              Add Blog{" "}
              <span className="ms-1 font-weight-bold fs-6">
                <CiCirclePlus />
              </span>
            </button>
          </div>

          <div className="dropdown col-12 col-md-2 d-flex justify-content-end">
            <button
              className="btn btn-sm btn-outline-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{
                borderRadius: "20px",
                fontSize: "0.85rem",
                padding: "6px 14px",
                width: "80%",
              }}
            >
              Sort by: Newest
            </button>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#">
                  Newest
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Oldest
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Blog Cards */}
        {/* Blog Cards */}
        <div className="row">
          {blogData?.blogs?.length === 0 ? (
            <div className="col-12 text-center py-5">
              <h5 className="text-muted">
                No Blogs are posted on this category
              </h5>
            </div>
          ) : (
            <>
              {blogData?.blogs?.slice(0, visibleCount).map((post) => (
                <div
                  key={post.id}
                  className="col-12 col-md-6 col-lg-4 mb-4 d-flex"
                  onClick={() => navigate(`/blog-details/${post._id}`)}
                >
                  <div
                    className="card shadow-sm w-100"
                    style={{
                      border: "none",
                      borderRadius: "12px",
                      overflow: "hidden",
                      cursor: "pointer",
                    }}
                  >
                    <div style={{ position: "relative" }}>
                      <img
                        src={post.blogImg || demoImg}
                        alt={post.title}
                        className="card-img-top"
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                      <span
                        className="badge bg-light text-dark"
                        style={{
                          position: "absolute",
                          top: "10px",
                          left: "10px",
                          padding: "5px 10px",
                          fontSize: "0.8rem",
                          borderRadius: "20px",
                        }}
                      >
                        {post.category}
                      </span>
                    </div>
                    <div className="card-body d-flex flex-column">
                      <p
                        className="text-muted mb-1"
                        style={{ fontSize: "0.85rem" }}
                      >
                        {new Date(post.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>

                      <h5
                        className="card-title mb-2"
                        style={{ fontWeight: "600" }}
                      >
                        {post.title}
                      </h5>
                      <p
                        className="card-text text-muted"
                        style={{ fontSize: "0.9rem", flexGrow: 1 }}
                      >
                        {post.description.length > 185
                          ? `${post.description.slice(0, 185)}... read more`
                          : post.description}
                      </p>

                      <div className="d-flex align-items-center mt-3">
                        <img
                          src={post.userimg || userimg}
                          alt={post.author}
                          className="rounded-circle me-2"
                          style={{ width: "32px", height: "32px" }}
                        />
                        <small className="text-muted">{post.authorname}</small>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Load More Button */}
              {visibleCount < blogData?.blogs?.length && (
                <div className="col-12 d-flex justify-content-center mt-3">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 8)}
                    className="btn btn-dark px-4 py-2"
                    style={{
                      borderRadius: "30px",
                      fontWeight: "500",
                      fontSize: "0.95rem",
                      width: "10%",
                    }}
                  >
                    Load More
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* add blog Modal Called Here */}
      <AddBlogModal show={showModal} handleClose={handleClose} />
    </>
  );
};

export default BlogSection;
