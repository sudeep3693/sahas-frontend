import React, { useEffect, useState } from 'react';
import { Table, Spinner, Button, Badge } from 'react-bootstrap';
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

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this member?')) return;
    setDeletingId(id);
    try {
      await axios.delete(`${config.baseUrl}/teamDetail/delete/${id}`);
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

  const categoryLabel = selectedCategory
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="mt-5">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h5 className="mb-0">
          Current Members: <span className="text-success">{categoryLabel}</span>
        </h5>
        <Badge bg="secondary" pill>{records.length} member{records.length !== 1 ? 's' : ''}</Badge>
      </div>

      {loading ? (
        <div className="text-center py-4">
          <Spinner animation="border" variant="success" />
        </div>
      ) : records.length === 0 ? (
        <p className="text-center text-muted py-3">No members found in this category.</p>
      ) : (
        <div className="table-responsive rounded-3 shadow-sm">
          <Table bordered hover className="mb-0 align-middle">
            <thead className="table-dark">
              <tr>
                <th style={{ width: '40px' }}>#</th>
                <th>Name</th>
                <th>Position / Role</th>
                <th>Contact</th>
                <th style={{ width: '80px' }}>Order</th>
                <th style={{ width: '80px' }} className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr key={record._id}>
                  <td className="text-muted">{index + 1}</td>
                  <td className="fw-semibold">{record.name}</td>
                  <td>{record.position}</td>
                  <td>
                    {record.contactNumber ? (
                      <a href={`tel:${record.contactNumber}`} className="text-decoration-none text-success">
                        📞 {record.contactNumber}
                      </a>
                    ) : (
                      <span className="text-muted">—</span>
                    )}
                  </td>
                  <td className="text-center">
                    <Badge bg="light" text="dark">{record.positionOrder ?? 0}</Badge>
                  </td>
                  <td className="text-center">
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(record._id)}
                      disabled={deletingId === record._id}
                    >
                      {deletingId === record._id ? <Spinner animation="border" size="sm" /> : '🗑️'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default TeamRecordList;