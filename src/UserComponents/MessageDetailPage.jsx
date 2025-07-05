import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MessageBox from "../Component/MessageBox";
import config from "../Constants/config";
import axios from "axios";
import "../Css/MessageDetailPage.css";
import AOS from 'aos';
import 'aos/dist/aos.css'; // This is required

function MessageDetailPage() {
  const { id } = useParams();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);


    useEffect(() => {
      AOS.init({
        duration: 1000,  // animation duration in ms
      });
    }, []);
  

  useEffect(() => {
    fetchMessage();
  }, []);

  const fetchMessage = async () => {
    try {
      const res = await axios.get(`${config.baseUrl}/messages/all`);
      const found = res.data.find((msg) => msg._id === id);
      if (found) {
        setMessage(found);
      }
    } catch (error) {
      console.error("Failed to fetch message:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center mt-5">Loading message...</p>;
  }

  if (!message) {
    return <p className="text-center mt-5">Message not found.</p>;
  }

  return (
    <div className="message-detail-bg py-5">
      <Container>
        <Row>
          <Col sm={12} md={4}>
            <MessageBox
              position={message.position}
              image={message.imageName}
              descriptionList={[
                `Name: ${message.name}`,
                `Email: ${message.email}`,
                `Contact: ${message.contact}`,
              ]}
            />
          </Col>

          <Col sm={12} md={8}>
            <div className="message-oath-box p-4">
              <h4 className="mb-3" data-aos = 'fade-right'>Message</h4>
              <p className="text-muted" style={{ whiteSpace: "pre-line" }} data-aos = 'fade-up'>
                {message.message}
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MessageDetailPage;
