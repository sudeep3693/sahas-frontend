import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import config from '../Constants/config';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import logo from "../Images/logoOnly.png";
import AOS from 'aos';
import 'aos/dist/aos.css'; // This is required

function NewsDetailPage() {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  useEffect(() => {
    AOS.init({
      duration: 1000,  // animation duration in ms
    });
  }, []);


  useEffect(() => {
    const fetchSingleNews = async () => {
      try {
        const res = await axios.get(`${config.baseUrl}/news/all`);
        const found = res.data.find((item) => item.id === id);
        setNews(found);
      } catch (error) {
        console.error('Error fetching news detail:', error);
      }
    };

    fetchSingleNews();
  }, [id]);

  if (!news) return <p className="text-center mt-5">Loading...</p>;

  return (
    <Container className="py-5 position-relative" style={{ minHeight: '100vh' }}>
      <img
        src={logo}
        alt="watermark"
        style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: 0.08,
          zIndex: 0,
          width: '50%',
        }}
      />

      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold text-success text-center" style={{ fontSize: '2rem' }} data-aos = 'fade-right'>
            {news.heading}
          </h2>
        </Col>
      </Row>

      <Row className="justify-content-end mb-3">
        <Col xs="auto">
          <p className="text-muted" style={{ whiteSpace: "pre-line", color: '#2E8B57' }} data-aos = 'fade-left'>
            Published on: <strong>{news.date}</strong>
          </p>
        </Col>
      </Row>

      <Row>
        <Col>
          <p
            style={{
              fontSize: '1.1rem',
              color: '#006400',
              textAlign: 'justify',
              lineHeight: '1.8',
              zIndex: 1,
              position: 'relative',
              whiteSpace: 'pre-wrap', // ✅ Important: preserve whitespace and line breaks
            }}
            data-aos = 'fade-up'
          >
            {news.description}
          </p>

        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <img
            src={`${news.imageName}`}
            alt="News"
            className="img-fluid rounded shadow"
            style={{ width: '100%', maxHeight: '1500px', objectFit: 'cover' }}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default NewsDetailPage;
