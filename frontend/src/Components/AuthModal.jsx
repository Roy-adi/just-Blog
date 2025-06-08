/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Button, Form, Modal, Row, Col } from "react-bootstrap";
import { useApiCallContext } from "../context/ApiCallProvider";

function AuthModal({ show, handleClose,onLoginSuccess }) {
  const [isSignup, setIsSignup] = useState(false);
  const { SignUpUser, loginUser } = useApiCallContext();

  const [logindata, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [signupdata, setSignupData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    gender: "",
  });

  const handleChangeLogin = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeSignup = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isSignup) {
        await SignUpUser(signupdata);
      } else {
       const res = await loginUser(logindata);
        if (res?.success) {
      onLoginSuccess(res.user.name); // ✅ immediately update UI in NavMenu
  }
      }
      handleClose(); // Close modal on success
    } catch (error) {
      console.error("Auth error:", error);
      // Optionally show error feedback here
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontWeight: "bold" }}>
            {isSignup ? "Create Account" : "Login"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {isSignup && (
              <>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter full name"
                    name="name"
                    value={signupdata.name}
                    onChange={handleChangeSignup}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Choose a username"
                    name="username"
                    value={signupdata.username}
                    onChange={handleChangeSignup}
                    required
                  />
                </Form.Group>
              </>
            )}

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="test123@gmail.com"
                name="email"
                value={isSignup ? signupdata.email : logindata.email}
                onChange={isSignup ? handleChangeSignup : handleChangeLogin}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="********"
                name="password"
                value={isSignup ? signupdata.password : logindata.password}
                onChange={isSignup ? handleChangeSignup : handleChangeLogin}
                required
              />
            </Form.Group>

            {isSignup && (
              <Form.Group className="mb-3" controlId="formGender">
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  name="gender"
                  value={signupdata.gender}
                  onChange={handleChangeSignup}
                  required
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Form.Select>
              </Form.Group>
            )}

            <Button
              variant="primary"
              type="submit"
              className="w-100 mb-2"
              style={{
                background: "linear-gradient(to right, #6a11cb, #2575fc)",
                border: "none",
                fontWeight: "bold",
              }}
            >
              {isSignup ? "Sign Up" : "Log In"}
            </Button>
          </Form>
        </Modal.Body>

        <Modal.Footer className="d-flex flex-column align-items-start">
          <div className="w-100 text-center">
            {isSignup ? (
              <span>
                Already have an account?{" "}
                <span
                  onClick={() => setIsSignup(false)}
                  style={{
                    color: "#6a11cb",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  Login
                </span>
              </span>
            ) : (
              <span>
                Don't have an account?{" "}
                <span
                  onClick={() => setIsSignup(true)}
                  style={{
                    color: "#6a11cb",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  Create an account
                </span>
              </span>
            )}
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AuthModal;
