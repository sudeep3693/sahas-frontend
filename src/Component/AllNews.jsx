import { Container, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';
import News from './News';
import config from '../Constants/config';

function AllNews() {
  const [newsList, setNewsList] = useState([]);

  const fetchNews = async () => {
    try {
      const res = await axios.get(`${config.baseUrl}/news/all`);
      setNewsList(res.data);
    } catch (error) {
      console.error("Failed to fetch news:", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">All News & Notices</h2>
      <Row className="g-4">
        {newsList.map((item) => (
          <Col key={item.id} xs={12} sm={6} md={4} lg={3}>
            <News
              imageName={item.imageName}
              heading={item.heading}
              date={item.date}
              description={item.description}
              id = {item.id}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default AllNews;
