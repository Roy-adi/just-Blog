import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useApiCallContext } from "../context/ApiCallProvider";

const AddBlogModal = ({ show, handleClose }) => {
  const { CreateBlog } = useApiCallContext();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
  });

  const categories = [
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  const data = new FormData();
  data.append("title", formData.title);
  data.append("description", formData.description);
  data.append("category", formData.category);
  if (formData.image) {
    data.append("image", formData.image);
  }

    // Submit to API here
   await CreateBlog(data); 
    handleClose();
    setFormData({ title: "", description: "", category: "" });
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Add Blog</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="blogTitle">
            <Form.Label>Blog Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter blog title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="blogCategory">
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="blogDescription">
            <Form.Label>Blog Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter blog description"
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="blogImage">
            <Form.Label>Blog Image</Form.Label>
            <Form.Control
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Blog
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddBlogModal;
