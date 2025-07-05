import React, { useState } from 'react';
import { Button, Card, Form, Row, Col, Spinner } from 'react-bootstrap';
import axios from 'axios';
import useFetch from '../hooks/useFetch'; // or '../AdminComponents/hooks/useFetch'

function HandleImages({ getLink, postLink, title = "Upload Images" }) {
  const { data: images, setData: setImages, loading, error, refetch } = useFetch(getLink);
  const [previewImages, setPreviewImages] = useState([]);
  const [toDelete, setToDelete] = useState([]);

  const handleChange = (e) => {
    const files = Array.from(e.target.files);
    setPreviewImages(prev => [...prev, ...files]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    previewImages.forEach(file => formData.append('images', file));

    try {
      await axios.post(postLink, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Upload successful!');
      setPreviewImages([]);
      refetch();
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Upload failed');
    }
  };

  const handleRemove = (publicId) => {
    setToDelete(prev => [...prev, publicId]);
    setImages(prev => prev.filter(img => img.public_id !== publicId));
  };

  const handleDelete = async () => {
    try {
      await Promise.all(
        toDelete.map(id => axios.delete(`${postLink}/${encodeURIComponent(id)}`))
      );
      alert('Images deleted!');
      setToDelete([]);
      refetch();
    } catch (err) {
      console.error('Failed to delete images:', err);
      alert('Failed to delete images');
    }
  };

  return (
    <div className="container my-5">
      <h3 className="mb-4 text-primary">{title}</h3>

      <Form onSubmit={handleUpload}>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label><strong>Select Images</strong></Form.Label>
          <Form.Control type="file" multiple accept="image/*" onChange={handleChange} />
        </Form.Group>
        <Button type="submit" variant="success" className="mb-4">Upload</Button>
      </Form>

      <Row>
        {previewImages.map((file, idx) => (
          <Col md={4} key={idx} className="mb-3">
            <Card>
              <Card.Img variant="top" src={URL.createObjectURL(file)} style={{ height: '200px', objectFit: 'cover' }} />
            </Card>
          </Col>
        ))}
      </Row>

      <hr />

      <h4 className="mb-4">Uploaded Images</h4>
      {loading ? <Spinner animation="border" /> : (
        <Row>
          {images.map((img, idx) => (
            <Col md={4} key={idx} className="mb-3 position-relative">
              <Card>
                <Button
                  variant="danger"
                  size="sm"
                  className="position-absolute top-0 end-0 m-2"
                  onClick={() => handleRemove(img.public_id)}
                >
                  ×
                </Button>
                <Card.Img variant="top" src={img.url} style={{ height: '200px', objectFit: 'cover' }} />
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {error && <p className="text-danger">Failed to load images.</p>}

      {toDelete.length > 0 && (
        <div className="text-center mt-3">
          <Button variant="warning" onClick={handleDelete}>Confirm Delete</Button>
        </div>
      )}
    </div>
  );
}

export default HandleImages;
