/* eslint-disable no-unused-vars */
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import AuthModal from "./Components/AuthModal";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

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
  } px-4 d-none d-lg-flex`} // hides on mobile, shows on desktop
  style={
    isHome
      ? { position: "absolute", width: "100%", zIndex: 10 }
      : { width: "100%" }
  }
    >
        <Link className="navbar-brand text-white fw-bold" to="/">
          <span style={{ fontSize: "24px" }}>🌐 justBlog</span>
        </Link>
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
              <Link className="nav-link text-white" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item me-5">
              <Link className="nav-link text-white" to="/about">
                About Us
              </Link>
            </li>
            <li className="nav-item me-5">
              <Link className="nav-link text-white" to="/contact">
                Contact Us
              </Link>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            <input
              type="text"
              placeholder="Search..."
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
                <span className={`${isHome ? 'text-black' : "text-white"}`} style={{ marginRight: "15px", fontWeight: "bold" }}>
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
      className={`navbar navbar-expand-lg ${
    isHome ? "navbar-light bg-transparent" : "navbar-dark bg-black"
  } px-4 d-flex d-lg-none`} // visible on mobile, hidden on desktop
  style={
    isHome
      ? { position: "absolute", width: "100%", zIndex: 10 }
      : { width: "100%" }
  }
>
        <Link className="navbar-brand fw-bold text-white" to="#">
          <span style={{ fontSize: "20px" }}>🌐 justBlog</span>
        </Link>
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
              <Link className="nav-link text-white" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/about">
                About Us
              </Link>
            </li>
            
          </ul>

          <div className="d-flex flex-column align-items-center gap-2 mt-3 text-center">
            <input
              type="text"
              placeholder="Search..."
              className="form-control"
              style={{ borderRadius: "20px", padding: "5px 15px",maxWidth:"70%" }}
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
                <span className={`${isHome ? 'text-black' : "text-white"}`} style={{ marginRight: "15px", fontWeight: "bold" }}>
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

      {/* Auth Modal Called Here */}
      <AuthModal show={showModal} handleClose={handleClose} onLoginSuccess={handleLoginSuccess}  />
    </>
  );
}

export default NavMenu;
