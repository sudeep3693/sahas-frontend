import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { FaImage, FaCalendarAlt, FaHeading, FaRegNewspaper } from "react-icons/fa";
import axios from 'axios';
import config from '../Constants/config';
import { useNavigate } from "react-router-dom";
import "../Css/UploadNews.css";
import NewsGallery from "./NewsGallery";

function UploadNews() {
  const navigate = useNavigate();

  const [news, setNews] = useState({
    heading: "",
    date: "",
    detail: "",
    image: null,
    preview: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNews((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNews((prev) => ({
        ...prev,
        image: file,
        preview: URL.createObjectURL(file)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("heading", news.heading);
      formData.append("date", news.date);
      formData.append("detail", news.detail);
      formData.append("image", news.image);

      const res = await axios.post(`${config.baseUrl}/news/save`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 200 || res.status === 201) {
        alert("News added successfully!");
        navigate("/admin");
      } else {
        alert("Failed to upload news.");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Upload failed.");
    }
  };

  return (
    <div>
<Container className="upload-news-container py-5">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card className="p-4 shadow-lg upload-news-card">
            <h3 className="mb-4 text-center text-primary">Upload News</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label><FaHeading className="me-2" />Heading</Form.Label>
                <Form.Control
                  type="text"
                  name="heading"
                  placeholder="Enter news heading"
                  value={news.heading}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label><FaCalendarAlt className="me-2" />Upload Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={news.date}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label><FaRegNewspaper className="me-2" />News Details</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="detail"
                  placeholder="Enter full news details"
                  value={news.detail}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label><FaImage className="me-2" />Upload Image</Form.Label>
                <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
              </Form.Group>

              {news.preview && (
                <div className="mb-4 text-center">
                  <img src={news.preview} alt="Preview" className="img-thumbnail" style={{ maxHeight: "200px" }} />
                </div>
              )}

              <div className="d-grid">
                <Button variant="primary" type="submit">
                  Submit News
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>

    <Container>
      <NewsGallery/>
    </Container>
    </div>
    
  );
}

export default UploadNews;
