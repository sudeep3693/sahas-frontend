import React, { useState, useEffect } from "react";
import { Container, Col, Row, Form, Card, Button } from "react-bootstrap";
import axios from "axios";
import config from '../../Constants/config';
import {useNavigate} from 'react-router-dom';

function ContactDetails() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telephone: "",
    mobile: "",
    location: "",
    district: "",
    province: "",
    fax: "",
    pbox: "",
  });

useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${config.baseUrl}/api/getBasicDetails`);
        const data = res.data[0]; 
        setFormData(data);
         } 
         
         catch (error) {
        console.error("Unable to fetch financial data:", error);
      }
    };

    fetchData();
  }, []);

  const provinces = [
    "Province 1", "Province 2", "Bagmati", "Gandaki", "Lumbini", "Karnali", "Sudurpashchim"
  ];

  const districts = [
    "Kathmandu", "Lalitpur", "Bhaktapur", "Pokhara", "Biratnagar", "Butwal"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.baseUrl}/api/basicDetails`, formData);
      console.log("Success:", response.data);
      alert("Form submitted successfully!");
      navigate('/admin');
    } catch (error) {
      console.error("Submission error:", error);
      alert("There was an error submitting the form.");
    }
  };
  return (
    <div className="py-5 bg-light min-vh-100">
      <Container>
        <Card className="shadow-lg border-0 p-4 rounded-4">
          <h3 className="mb-4 text-primary fw-bold text-center">Contact Details</h3>

          <Form onSubmit={handleSubmit}>
            <Row className="g-4">
              <Col xs={12} md={6} lg={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Name of Cooperative</Form.Label>
                  <Form.Control
                    size="lg"
                    type="text"
                    placeholder="Name of Cooperative"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={6} lg={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Email of Cooperative</Form.Label>
                  <Form.Control
                    size="lg"
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={6} lg={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Telephone Number</Form.Label>
                  <Form.Control
                    size="lg"
                    type="number"
                    inputMode="numeric"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    placeholder="Telephone Number"
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={6} lg={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Mobile Number</Form.Label>
                  <Form.Control
                    size="lg"
                    type="number"
                    inputMode="numeric"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Mobile Number"
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={6} lg={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Location</Form.Label>
                  <Form.Control
                    size="lg"
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Tole, Street, ..."
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={6} lg={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">District</Form.Label>
                  <Form.Select
                    size="lg"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                  >
                    <option disabled value="">Select District</option>
                    {districts.map((d, idx) => (
                      <option key={idx} value={d}>{d}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col xs={12} md={6} lg={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Province</Form.Label>
                  <Form.Select
                    size="lg"
                    name="province"
                    value={formData.province}
                    onChange={handleChange}
                  >
                    <option disabled value="">Select Province</option>
                    {provinces.map((p, idx) => (
                      <option key={idx} value={p}>{p}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col xs={12} md={6} lg={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Fax Number</Form.Label>
                  <Form.Control
                    size="lg"
                    type="number"
                    inputMode="numeric"
                    name="fax"
                    value={formData.fax}
                    onChange={handleChange}
                    placeholder="Fax Number"
                  />
                </Form.Group>
                </Col>
              <Col xs={12} md={6} lg={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">P.O Number</Form.Label>
                  <Form.Control
                    size="lg"
                    type="number"
                    inputMode="numeric"
                    name="pbox"
                    value={formData.pbox}
                    onChange={handleChange}
                    placeholder="Post box number"
                  />
                </Form.Group>
              </Col>
               <Col xs={12} md={6} lg={4}>
              <Form.Group>
                  <Button type="submit" size="lg" className="mt-2 w-100">
                    Submit
                  </Button>
                </Form.Group>
                </Col>
            </Row>
          </Form>
        </Card>
      </Container>
    </div>
  );
}

export default ContactDetails;
