import React, { useEffect, useState } from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import TeamDetail from "./TeamDetail";
import config from "../Constants/config";
import axios from "axios";

function TeamDetailContainer() {
  const [headings, setHeadings] = useState([]);
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    axios.get(`${config.baseUrl}/teamDetail/categories`)
      .then(res => {
        setHeadings(res.data);
        if (res.data.length > 0) {
          setSelectedType(res.data[0]); // default selection
        }
      })
      .catch(err => console.error("Failed to load headings", err));
  }, []);

  return (
    <Container fluid className="py-4">
      <Row>
        {/* Right column (on small screens comes first) */}
        <Col md={4} sm={12} className="mb-4">
          <h5 className="mb-3">Select Category</h5>
          <ListGroup>
            {headings.map((heading, idx) => (
              <ListGroup.Item
                key={idx}
                action
                active={heading === selectedType}
                onClick={() => setSelectedType(heading)}
                style={{ textTransform: 'capitalize' }}
              >
                {heading}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        {/* Left column */}
        <Col md={8} sm={12}>
          <TeamDetail type={selectedType} />
        </Col>
      </Row>
    </Container>
  );
}

export default TeamDetailContainer;
