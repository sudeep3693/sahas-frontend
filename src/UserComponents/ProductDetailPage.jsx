import { useParams } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import Products from '../Data/ProductData';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../Css/ProductDetailPage.css';
import bgLogo from '../Images/logoOnly.png';
import AOS from 'aos';
import 'aos/dist/aos.css'; // This is required

function DetailsPage() {
  const { id } = useParams();
  const product = Products.find((s) => s.productId === id);

  const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
      AOS.init({
        duration: 1000,  // animation duration in ms
      });
    }, []);
  
  // Create an array of refs, one for each topic
  const topicRefs = useRef([]);

  if (!product) {
    return <div className="text-center mt-5">Product not found</div>;
  }

  const handleTopicClick = (index) => {
    setSelectedIndex(index);

    // Scroll to the topic description element smoothly
    if (topicRefs.current[index]) {
      topicRefs.current[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Container fluid className="py-4 px-3 details-bg text-light">
      <Row className="g-4">
        {/* Left Column - Topics */}
        <Col xs={12} md={4}>
          <div className="p-3 rounded shadow-sm bg-dark-subtle">
            <h4 className="text-info mb-3">Topics</h4>
            {product.Topics.map((item, i) => (
              <div
                key={i}
                className={`hover-title mb-3 border-bottom pb-2 ${
                  selectedIndex === i ? 'selected-topic' : ''
                }`}
                style={{ cursor: 'pointer' }}
                onClick={() => handleTopicClick(i)}
                data-aos = 'fade-right'
              >
                <h6 className="m-0">{item.innerTitle}</h6>
              </div>
            ))}
          </div>
        </Col>

        {/* Right Column - All Topics with refs */}
        <Col xs={12} md={8} style={{ maxHeight: '80vh', overflowY: 'auto' }}>
          <Card className="bg-light text-dark shadow position-relative">
            <Card.Body>
              <h2 className="mb-3" style={{color:'#001F3F'}} data-aos = 'fade-right'>{product.productSubTitle}</h2>
              <p className="mb-4" style={{ textAlign: 'justify' }} data-aos = 'fade-up'>
                {product.productDescription}
              </p>

              {product.Topics.map((item, i) => (
                <div
                  key={i}
                  ref={el => (topicRefs.current[i] = el)}
                  className="mb-4 product-unit position-relative"
                  style={{
                    border: selectedIndex === i ? '2px solid #28A745' : 'none',
                    borderRadius: '8px',
                    padding: '1rem',
                    scrollMarginTop: '80px' // For offset if you have sticky headers
                  }}
                >
                  {/* Watermark */}
                  <div className="watermark-overlay">
                    <img src={bgLogo} alt="Watermark" className="watermark-img" />
                  </div>

                  {/* Mobile */}
                  <div
                    className="d-flex d-md-none flex-column align-items-center mb-3"
                    style={{ textAlign: 'justify' }}
                    
                  >
                    <img
                      src={item.productInnerImage}
                      alt="Product"
                      className="rounded"
                      style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                    />
                    <h5 className="text-dark mt-2">{item.innerTitle}</h5>
                    <p style={{ whiteSpace: 'pre-line' }} >{item.innerDescription}</p>
                  </div>

                  {/* Desktop */}
                  <div className="d-none d-md-flex align-items-start gap-3" >
                    <img
                      src={item.productInnerImage}
                      alt="Product"
                      className="rounded"
                      style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                    />
                    <div>
                      <h5 className="text-dark">{item.innerTitle}</h5>
                      <p style={{ whiteSpace: 'pre-line' }}>{item.innerDescription}</p>
                    </div>
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default DetailsPage;
