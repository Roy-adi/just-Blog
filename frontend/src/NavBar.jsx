import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function NavMenu() {
  return (
    <>
      {/* Desktop Nav */}
      <nav
        className="navbar navbar-expand-lg navbar-light bg-transparent px-4"
        style={{ position: "absolute", width: "100%", zIndex: 10 }}
      >
        <a className="navbar-brand text-white fw-bold" href="#">
          <span style={{ fontSize: "24px" }}>🌐 Horizon</span>
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
          <ul className="navbar-nav margin-left" >
            <li className="nav-item me-5">
              <a className="nav-link text-white" href="#">
                Home
              </a>
            </li>
            <li className="nav-item me-5">
              <a className="nav-link text-white" href="#">
                About Us
              </a>
            </li>
            <li className="nav-item me-5">
              <a className="nav-link text-white" href="#">
                Blog
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
           
            
            <button className="btn btn-light btn-sm rounded-pill">
              Sign Up
            </button>
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
    </>
  );
}

export default NavMenu;
