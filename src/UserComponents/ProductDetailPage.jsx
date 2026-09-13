import { useParams, Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import Products from '../Data/ProductData';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../Css/ProductDetailPage.css';
import bgLogo from '../Images/logoOnly.png';
import AOS from 'aos';
import 'aos/dist/aos.css';

function DetailsPage() {
  const { id } = useParams();
  const product = Products.find((s) => s.productId === id);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    AOS.init({
      duration: 700,
    });
  }, []);

  const topicRefs = useRef([]);

  if (!product) {
    return (
      <Container className="text-center py-5">
        <h3 className="text-danger mb-3">उत्पादन फेला परेन</h3>
        <Link to="/" className="btn btn-outline-success">
          गृहपृष्ठमा फर्कनुहोस्
        </Link>
      </Container>
    );
  }

  const handleTopicClick = (index) => {
    setSelectedIndex(index);
    if (topicRefs.current[index]) {
      topicRefs.current[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Container fluid className="py-4 px-3 px-md-4 details-bg">
      {/* Breadcrumb / Back Link */}
      <div className="mb-3 d-flex align-items-center justify-content-between">
        <Link to="/" className="details-back-link">
          &larr; गृहपृष्ठमा फर्कनुहोस्
        </Link>
        <span className="details-category-pill">
          {product.productTitle}
        </span>
      </div>

      <Row className="g-4">
        {/* Left Column - Topics Sidebar */}
        <Col xs={12} md={4} lg={3}>
          <div className="topics-sidebar-card shadow-sm" data-aos="fade-right">
            <h5 className="topics-sidebar-header">योजनाहरूको सूची</h5>
            <div className="topics-list">
              {product.Topics.map((item, i) => (
                <div
                  key={i}
                  className={`topic-sidebar-item ${selectedIndex === i ? 'topic-active' : ''}`}
                  onClick={() => handleTopicClick(i)}
                >
                  <span className="topic-bullet">{i + 1}.</span>
                  <span className="topic-text">{item.innerTitle}</span>
                </div>
              ))}
            </div>
          </div>
        </Col>

        {/* Right Column - Topic Details */}
        <Col xs={12} md={8} lg={9} style={{ maxHeight: '85vh', overflowY: 'auto' }} className="custom-scrollbar">
          <Card className="product-main-card shadow-sm border-0">
            <Card.Body className="p-4">
              <div className="product-header-section mb-4 pb-3 border-bottom">
                <span className="product-tag">{product.productTitle}</span>
                <h2 className="product-headline mt-2" data-aos="fade-right">
                  {product.productSubTitle}
                </h2>
                <p className="product-intro-desc text-muted" data-aos="fade-up">
                  {product.productDescription}
                </p>
              </div>

              {product.Topics.map((item, i) => (
                <div
                  key={i}
                  ref={(el) => (topicRefs.current[i] = el)}
                  className={`product-unit-card mb-4 ${selectedIndex === i ? 'product-unit-highlighted' : ''}`}
                >
                  {/* Watermark */}
                  <div className="watermark-overlay">
                    <img src={bgLogo} alt="Watermark" className="watermark-img" />
                  </div>

                  <div className="d-flex flex-column flex-md-row align-items-start gap-3 position-relative" style={{ zIndex: 1 }}>
                    <div className="product-icon-frame flex-shrink-0">
                      <img
                        src={item.productInnerImage}
                        alt={item.innerTitle}
                        className="product-topic-img rounded"
                      />
                    </div>
                    <div className="flex-grow-1">
                      <h5 className="product-topic-title">{item.innerTitle}</h5>
                      <p className="product-topic-desc">{item.innerDescription}</p>
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
