import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Spinner, Button } from 'react-bootstrap';
import axios from 'axios';
import config from '../Constants/config';

const TeamRecordList = ({ selectedCategory, refreshKey }) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${config.baseUrl}/teamDetail/category/${selectedCategory}`);
      setRecords(response.data);
    } catch (err) {
      console.error('Failed to fetch records:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, imageName) => {
    if (!window.confirm('Are you sure you want to delete this member?')) return;
    setDeletingId(id);
    try {
      await axios.delete(`${config.baseUrl}/teamDetail/delete/${id}`, {
        data: { imageName }
      });
      setRecords(records.filter((rec) => rec._id !== id));
    } catch (err) {
      console.error('Failed to delete record:', err);
      alert('Failed to delete record.');
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [selectedCategory, refreshKey]);

  return (
    <div className="mt-5">
      <h4 className="mb-4 text-center">Current Members: {selectedCategory.replace(/-/g, ' ')}</h4>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : records.length === 0 ? (
        <p className="text-center text-muted">No members found.</p>
      ) : (
        <Row>
          {records.map((record) => (
            <Col md={4} sm={6} key={record._id} className="mb-4">
              <Card className="position-relative shadow-sm">
                <Button
                  variant="danger"
                  size="sm"
                  className="position-absolute top-0 end-0 m-2"
                  onClick={() => handleDelete(record._id, record.imageName)}
                  disabled={deletingId === record._id}
                >
                  ❌
                </Button>
                <Card.Img
                  variant="top"
                  src={`${config.baseUrl}/uploads/team/${record.imageName}`}
                  style={{ height: '220px', objectFit: 'cover' }}
                />
                <Card.Body>
                  <Card.Title>{record.name}</Card.Title>
                  <Card.Text className="text-muted">{record.position}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default TeamRecordList;