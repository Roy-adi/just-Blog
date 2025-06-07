import React, { useState } from "react";

const categories = [
  "All",
  "Destination",
  "Culinary",
  "Lifestyle",
  "Tips",
];

const blogPosts = [
  {
    id: 1,
    category: "Destination",
    date: "30 Jan 2024",
    readTime: "10 mins read",
    title: "Unveiling the Secrets Beyond the Tourist Trails",
    description:
      "Dive into the local culture, discover hidden spots, and experience the authentic charm that often...",
    image:
      "https://plus.unsplash.com/premium_photo-1742893873488-074f2f28820d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDF8RnpvM3p1T0hONnd8fGVufDB8fHx8fA%3D%3D",
    author: "Seraphina Isabella",
    authorImg: "https://i.pravatar.cc/32?img=1",
  },
  {
    id: 2,
    category: "Lifestyle",
    date: "29 Jan 2024",
    readTime: "5 mins read",
    title: "A Fashionista's Guide to Wanderlust",
    description:
      "Explore the intersection of fashion and travel as we delve into the wardrobes of globetrotters...",
    image:
      "https://plus.unsplash.com/premium_photo-1732538263855-f683642f0799?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE3fEZ6bzN6dU9ITjZ3fHxlbnwwfHx8fHw%3D",
    author: "Maximilian Bartholomew",
    authorImg: "https://i.pravatar.cc/32?img=2",
  },
  {
    id: 3,
    category: "Tips & Hacks",
    date: "26 Jan 2024",
    readTime: "15 mins read",
    title: "Top 5 Apps and Gadgets That Will Transform Your Journeys",
    description:
      "Explore the latest in travel technology with our guide to must-have apps and gadgets. From nav...",
    image:
      "https://images.unsplash.com/photo-1748499429963-85c58cb2b95e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIzfEZ6bzN6dU9ITjZ3fHxlbnwwfHx8fHw%3D",
    author: "Anastasia Evangeline",
    authorImg: "https://i.pravatar.cc/32?img=3",
  },
  {
    id: 3,
    category: "Tips & Hacks",
    date: "26 Jan 2024",
    readTime: "15 mins read",
    title: "Top 5 Apps and Gadgets That Will Transform Your Journeys",
    description:
      "Explore the latest in travel technology with our guide to must-have apps and gadgets. From nav...",
    image:
      "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?fit=crop&w=800&q=80",
    author: "Anastasia Evangeline",
    authorImg: "https://i.pravatar.cc/32?img=3",
  },
];

const BlogSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(3);

  const filteredPosts =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

  return (
    <div className="container py-5">
      <h2 className="mb-2 fw-semibold">Blog</h2>
      <p className="text-muted mb-4">
        Here, we share travel tips, destination guides, and stories that inspire
        your next adventure.
      </p>

      {/* Categories & Sort */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <div className="d-flex flex-wrap gap-2 mb-2 mb-md-0">
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
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="dropdown">
          <button
            className="btn btn-sm dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{ fontSize: "0.85rem" }}
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
      <div className="row">
        {filteredPosts.slice(0, visibleCount).map((post) => (
          <div key={post.id} className="col-12 col-md-6 col-lg-4 mb-4 d-flex">
            <div
              className="card shadow-sm w-100"
              style={{
                border: "none",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              <div style={{ position: "relative" }}>
                <img
                  src={post.image}
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
                <p className="text-muted mb-1" style={{ fontSize: "0.85rem" }}>
                  {post.date} &bull; {post.readTime}
                </p>
                <h5 className="card-title mb-2" style={{ fontWeight: "600" }}>
                  {post.title}
                </h5>
                <p
                  className="card-text text-muted"
                  style={{ fontSize: "0.9rem", flexGrow: 1 }}
                >
                  {post.description}
                </p>
                <div className="d-flex align-items-center mt-3">
                  <img
                    src={post.authorImg}
                    alt={post.author}
                    className="rounded-circle me-2"
                    style={{ width: "32px", height: "32px" }}
                  />
                  <small className="text-muted">{post.author}</small>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Load More Button */}
        {visibleCount < filteredPosts.length && (
          <div className="col-12 d-flex justify-content-center mt-3">
            <button
              onClick={() => setVisibleCount((prev) => prev + 8)}
              className="btn btn-dark px-4 py-2"
              style={{
                borderRadius: "30px",
                fontWeight: "500",
                fontSize: "0.95rem",
              }}
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogSection;
