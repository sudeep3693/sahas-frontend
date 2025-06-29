import { Col, Container, Row } from "react-bootstrap";
import cooperative from "../Data/AboutSahas";
import "../Css/AboutDetail.css";
import bgLogo from '../Images/logoOnly.png';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // This is required

function AboutDetail() {
  const paragraphs = cooperative.detail.split('\n\n'); // Split content into paragraphs
  useEffect(() => {
    AOS.init({
      duration: 1000,  // animation duration in ms
    });
  }, []);

  return (
    <div className="about-detail-bg py-3">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={12} lg={12}>
            <div className="about-content-box p-4 rounded-4 shadow-sm position-relative">
              
              {/* Watermark Logo */}
              <div className="watermark-overlay">
                <img
                  src={bgLogo}
                  alt="Watermark"
                  className="watermark-img"
                />
              </div>

              {/* Content */}
              <h2 className="text-center mb-4 about-title" data-aos = 'fade-right'>{cooperative.topic}</h2>
              {paragraphs.map((para, index) => (
                <p key={index} className="about-text" data-aos = 'fade-up'>
                  {para}
                </p>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AboutDetail;
