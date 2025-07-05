import { Container, Row, Col } from "react-bootstrap";
import MessageBox from "./MessageBox";
import { useState, useEffect } from "react";
import config from "../Constants/config";
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css'; // This is required

function MessageContainer() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 400,  // animation duration in ms
    });
  }, []);


  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${config.baseUrl}/messages/all`);
      setMessages(res.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  return (
    <Container
      fluid
      className="py-4 px-3 rounded-4"
      style={{
        backgroundColor: "#F5F5F5",
        border: "1px solid #ddd",
        overflowX: 'hidden'
      }}
    >
      <Row className="mb-3 px-2">
        <Col>
          <h4
            className="fw-bold"
            style={{
              color: "#002B5B",
              borderBottom: "2px solid #FFA500",
              display: "inline-block",
              paddingBottom: "4px",
            }}

            data-aos='fade-left'
          >
            Message from Our Team
          </h4>
        </Col>
      </Row>

      {messages.map((msg) => (
        <MessageBox
          key={msg._id}
          id={msg._id}
          position={msg.position}
          image={msg.imageName}   // Use as-is
          descriptionList={[
            `Name: ${msg.name}`,
            `Contact: ${msg.contact}`,
            `Email: ${msg.email}`,
          ]}
        />

      ))}
    </Container>
  );
}

export default MessageContainer;
