import React, { useState } from 'react';
import { Button, Card, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AllImages from '../DetailImages';

function HandleImages({ getLink, postLink, selectionHeader, displayHeader, usedIn }) {
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const newFiles = selectedFiles.map(file => ({ file }));
    setImages(prev => [...prev, ...newFiles]);
  };

  const handleRemove = (index) => {
    const updated = [...images];
    updated.splice(index, 1);
    setImages(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    images.forEach(item => {
      if (item.file) {
        formData.append('images', item.file);
      }
    });

    try {
      await axios.post(postLink, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Upload successful!');
      navigate('/admin');
    } catch (error) {
      console.error(error);
      alert('Upload failed.');
    }
  };

  return (
    <>
      <div className="container my-5">
        <h2 className="mb-4 text-success">{selectionHeader}</h2>
        <Form onSubmit={handleSubmit}>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Row className="align-items-center">
                <Col md={6}>
                  <Form.Group controlId="formFile">
                    <Form.Label><strong>Select Images</strong></Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {images.length > 0 && (
            <Row className="mb-4">
              {images.map((item, index) => (
                <Col key={index} md={4} className="mb-3">
                  <Card className="shadow-sm">
                    <Card.Img
                      variant="top"
                      src={URL.createObjectURL(item.file)}
                      style={{ maxHeight: '200px', objectFit: 'cover' }}
                    />
                    <Card.Body className="text-center">
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleRemove(index)}
                      >
                        Remove
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}

          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Submit All
            </Button>
          </div>
        </Form>
      </div>

      <hr />

      <AllImages
        usedIn={usedIn}
        getLink={getLink}
        postLink={postLink}
        displayHeader={displayHeader}
      />
    </>
  );
}

export default HandleImages;
