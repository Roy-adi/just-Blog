/* eslint-disable no-unused-vars */
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import AuthModal from "./Components/AuthModal";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function NavMenu() {
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const storedName = localStorage.getItem("name");

    if (token && storedName) {
      setIsLoggedIn(true);
      setUserName(storedName);
    } else {
      setIsLoggedIn(false);
      setUserName("");
    }
  }, []); // You may add dependencies if you use global state later

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("name");
    localStorage.removeItem("user"); // if you're storing the full user object
    setIsLoggedIn(false);
    setUserName("");
    window.location.reload(); // optional: force UI refresh
  };

   const handleLoginSuccess = (name) => {
    setIsLoggedIn(true);
    setUserName(name);
    setShowModal(false);
  };

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

    const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      {/* Desktop Nav */}
      <nav
      className={`navbar navbar-expand-lg ${
        isHome ? "navbar-light bg-transparent" : "navbar-dark bg-black"
      } px-4`}
      style={
        isHome
          ? { position: "absolute", width: "100%", zIndex: 10 }
          : { width: "100%" }
      }
    >
        <a className="navbar-brand text-white fw-bold" href="#">
          <span style={{ fontSize: "24px" }}>🌐 justBlog</span>
        </a>
        <button
          className="navbar-toggler text-white"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarNav"
        >
          <ul className="navbar-nav mx-auto">
            <li className="nav-item me-5">
              <a className="nav-link text-white" href="/">
                Home
              </a>
            </li>
            <li className="nav-item me-5">
              <a className="nav-link text-white" href="/about">
                About Us
              </a>
            </li>
            <li className="nav-item me-5">
              <a className="nav-link text-white" href="/contact">
                Contact Us
              </a>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            <input
              type="text"
              placeholder="Search destination..."
              className="form-control me-5"
              style={{
                width: "220px",
                borderRadius: "20px",
                padding: "5px 15px",
              }}
            />

            {!isLoggedIn ? (
              <button
                className="btn btn-light btn-sm rounded-pill"
                onClick={() => setShowModal(true)}
                style={{ fontWeight: "bold" }}
              >
                Login
              </button>
            ) : (
              <>
                <span style={{ marginRight: "15px", fontWeight: "bold" }}>
                  Welcome, {userName}
                </span>
                <Button
                  variant="danger"
                  size="sm"
                  className="rounded-pill"
                  onClick={handleLogout}
                  style={{ fontWeight: "bold" }}
                >
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>
      {/* Mobile Nav */}
      <nav
        className="navbar navbar-expand-lg navbar-dark d-flex d-lg-none"
        style={{
          backgroundColor: "rgb(0 0 0 / 70%)",
          padding: "10px 15px",
          position: "absolute",
          width: "100%",
          zIndex: 10,
        }}
      >
        <a className="navbar-brand fw-bold text-white" href="#">
          <span style={{ fontSize: "20px" }}>🌐 Horizon</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mobileNav"
          aria-controls="mobileNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mobileNav">
          <ul className="navbar-nav text-center">
            <li className="nav-item">
              <a className="nav-link text-white" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#">
                About Us
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#">
                Blog
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#">
                Login
              </a>
            </li>
          </ul>

          <div className="d-flex flex-column align-items-start gap-2 mt-3">
            <input
              type="text"
              placeholder="Search destination..."
              className="form-control"
              style={{ borderRadius: "20px", padding: "5px 15px" }}
            />
          </div>
        </div>
      </nav>

      {/* Auth Modal Called Here */}
      <AuthModal show={showModal} handleClose={handleClose} onLoginSuccess={handleLoginSuccess}  />
    </>
  );
}

export default NavMenu;
