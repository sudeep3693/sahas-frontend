import { useState,useEffect } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function InstitutionalDetail() {

   const navigate = useNavigate();
    const [formData, setFormData] = useState({
    members: "",
    sharecapital: "",
    reservefund: "",
    deposit: "",
    loan: "",
    totalassets: "",
    academicYear: "",
  });

useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3001/financial/getAll");
        const data = res.data[0]; 
        setFormData(data);
         } 
         
         catch (error) {
        console.error("Unable to fetch financial data:", error);
      }
    };

    fetchData();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/financial/add", formData);
      if (res.status === 200 || res.status === 201) {
        alert("Institutional data submitted successfully!");
         navigate(`/admin`);
      }
      else{
        alert(res.error);
      }

   
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Error submitting data");
    }
  };

  return (

    <Container className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <Card className="p-4 shadow-lg w-100" style={{ maxWidth: "600px" }}>
        <Card.Body>
          <Card.Title className="text-center mb-4 text-primary">
            Institution Details
          </Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="members">
              <Form.Label>Members</Form.Label>
              <Form.Control
                type="number"
                name="members"
                value={formData.members}
                onChange={handleChange}
                placeholder="Total Members"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="sharecapital">
              <Form.Label>Share Capital</Form.Label>
              <Form.Control
                type="number"
                name="sharecapital"
                value={formData.sharecapital}
                onChange={handleChange}
                placeholder="Share Capital"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="reservefund">
              <Form.Label>Reserve Fund</Form.Label>
              <Form.Control
                type="number"
                name="reservefund"
                value={formData.reservefund}
                onChange={handleChange}
                placeholder="Reserve Fund"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="deposit">
              <Form.Label>Deposit</Form.Label>
              <Form.Control
                type="number"
                name="deposit"
                value={formData.deposit}
                onChange={handleChange}
                placeholder="Deposit"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="loan">
              <Form.Label>Loan</Form.Label>
              <Form.Control
                type="number"
                name="loan"
                value={formData.loan}
                onChange={handleChange}
                placeholder="Loan"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="totalassets">
              <Form.Label>Total Assets</Form.Label>
              <Form.Control
                type="number"
                name="totalassets"
                value={formData.totalassets}
                onChange={handleChange}
                placeholder="Total Assets"
                required
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="academicYear">
              <Form.Label>Academic Year</Form.Label>
              <Form.Control
                type="text"
                name="academicYear"
                value={formData.academicYear}
                onChange={handleChange}
                placeholder="e.g., 2022/2023"
                pattern="\d{4}/\d{4}"
                title="Format should be 2022/2023"
                required
              />
            </Form.Group>

            <div className="d-grid">
              <Button variant="primary" type="submit" size="lg">
                Submit
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
    
  );
}

export default InstitutionalDetail;
