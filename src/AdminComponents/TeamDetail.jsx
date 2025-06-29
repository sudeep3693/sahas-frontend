import React, { useState } from 'react';
import { Form, Button, Card, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import config from '../Constants/config';
import TeamRecordList from './TeamRecordList';

const TeamDetail = () => {
  const [entries, setEntries] = useState([{ name: '', position: '', image: null }]);
  const [category, setCategory] = useState('board-of-directors');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const categories = [
    { label: 'Board of Directors', value: 'board-of-directors' },
    { label: 'Workers', value: 'workers' },
    { label: 'Account Team', value: 'account-team' },
    { label: 'Management', value: 'management' },
    { label: 'Support Staff', value: 'support-staff' }
  ];

  const handleChange = (index, e) => {
    const { name, value, files } = e.target;
    const updated = [...entries];
    updated[index][name] = files ? files[0] : value;
    setEntries(updated);
  };

  const addNewEntry = () => {
    setEntries([...entries, { name: '', position: '', image: null }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    setLoading(true);

    try {
      for (const entry of entries) {
        const data = new FormData();
        data.append('name', entry.name);
        data.append('position', entry.position);
        data.append('image', entry.image);

        await axios.post(
          `${config.baseUrl}/teamDetail/save/${category}`,
          data,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
      }

      setSuccess('All team members added successfully!');
      setEntries([{ name: '', position: '', image: null }]);
      setRefreshKey((prev) => prev + 1);
    } catch (err) {
      console.error(err);
      setError('Failed to add one or more team members.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-lg p-4 rounded-4">
            <h3 className="mb-4 text-center">Add Team Members</h3>
            {success && <Alert variant="success">{success}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              {entries.map((entry, index) => (
                <div key={index} className="border rounded p-3 mb-3">
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={entry.name}
                      onChange={(e) => handleChange(index, e)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Position</Form.Label>
                    <Form.Control
                      type="text"
                      name="position"
                      value={entry.position}
                      onChange={(e) => handleChange(index, e)}
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={(e) => handleChange(index, e)}
                      required
                    />
                  </Form.Group>
                </div>
              ))}

              <div className="d-grid mb-3">
                <Button variant="secondary" onClick={addNewEntry}>Add New Entry</Button>
              </div>

              <div className="d-grid">
                <Button variant="success" type="submit" disabled={loading}>
                  {loading ? <Spinner animation="border" size="sm" /> : 'Save All Members'}
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>

      <TeamRecordList selectedCategory={category} refreshKey={refreshKey} />
    </Container>
  );
};

export default TeamDetail;
