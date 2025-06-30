import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import News from './News';
import config from '../Constants/config';
import axios from 'axios';
import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // This is required

function NewsNotice() {
  const [newsList, setNewsList] = useState([]);
  const navigate = useNavigate();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
      AOS.init({
        duration: 800,  // animation duration in ms
      });
    }, []);
  
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

    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    handleResize(); // On mount
    window.addEventListener('resize', handleResize); // On resize
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const visibleNews = isSmallScreen ? 2 : 4;

  const handleShowMore = () => {
    navigate('/all-news');
  };

  return (
    <div className="position-relative" style={{ backgroundColor: '#E6F4EA', overflow:'hidden' }}>
      <div className="d-flex flex-column align-items-center pt-4 text-center" style={{ height: '220px' }}>
        <div className="fs-2 fw-bold" style={{color:'#001F3F'}} data-aos = 'fade-left'>News/Notice</div>
        <div className="mb-1 text-secondary" data-aos = 'fade-left'>Get Latest Updates and Achievements of our Organization</div>
      </div>

      <div
        style={{
          marginTop: '-100px',
          position: 'relative',
          backgroundColor: '#F5F5F5',
          paddingTop: '20px',
        }}
      >
        <Container>
          <Row className="g-4 justify-content-center mb-4" style={{overflow:'hidden'}}>
            {newsList.slice(0, visibleNews).map((item, i) => (
              <Col key={item.id} xs={12} sm={6} md={4} lg={3} className="text-center">
                <News
                  imageName={item.imageName}
                  heading={item.heading}
                  date={item.date}
                  description={item.description}
                  id={item.id}
                />
              </Col>
            ))}
          </Row>

          {newsList.length > visibleNews && (
            <div className="text-center mb-4">
              <Button
                variant="success"
                style={{ backgroundColor: '#006400', borderColor: '#28A745', marginBottom:'10px' }}
                onClick={handleShowMore}
              >
                Show More News
              </Button>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
}

export default NewsNotice;
