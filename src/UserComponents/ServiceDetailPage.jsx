import { Col, Container, Row, Card } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import Services from '../Data/ServiceData';
import '../Css/Service.css';
import bgLogo from '../Images/logoOnly.png';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function ServiceDetailsPage() {
  const { id } = useParams();
  const service = Services.find((s) => s.id === id);

  useEffect(() => {
    AOS.init({
      duration: 700,
    });
  }, []);

  if (!service) {
    return (
      <Container className="text-center py-5">
        <h3 className="text-danger mb-3">सेवा फेला परेन</h3>
        <Link to="/" className="btn btn-outline-success">
          गृहपृष्ठमा फर्कनुहोस्
        </Link>
      </Container>
    );
  }

  const paragraphs = service.description ? service.description.split('\n\n') : [];

  return (
    <div className="service-details-bg py-4">
      <Container>
        {/* Navigation & Header */}
        <div className="mb-4 d-flex align-items-center justify-content-between flex-wrap gap-2">
          <Link to="/" className="service-back-link">
            &larr; गृहपृष्ठमा फर्कनुहोस्
          </Link>
          <span className="service-category-badge">साहस सहकारी सेवा</span>
        </div>

        <Row className="g-4 align-items-stretch">
          {/* Image Column */}
          <Col xs={12} md={5}>
            <Card className="service-image-card shadow-sm border-0 h-100">
              <div className="service-image-container">
                <img
                  src={service.image}
                  alt={service.title}
                  className="service-detail-img"
                />
              </div>
              <Card.Body className="text-center p-3">
                <div className="service-detail-icon-wrap">
                  <img src={service.headerImage} alt={service.title} className="service-detail-icon" />
                </div>
                <h4 className="service-hero-title mt-2">{service.title}</h4>
              </Card.Body>
            </Card>
          </Col>

          {/* Content Column */}
          <Col xs={12} md={7}>
            <Card className="service-content-card shadow-sm border-0 h-100 position-relative">
              <div className="watermark-overlay">
                <img src={bgLogo} alt="Watermark" className="watermark-img" />
              </div>

              <Card.Body className="p-4 position-relative" style={{ zIndex: 1 }}>
                <h3 className="service-content-header mb-3" data-aos="fade-right">
                  {service.title}
                </h3>

                <div className="service-text-content">
                  {paragraphs.map((para, index) => (
                    <p key={index} className="service-paragraph" data-aos="fade-up">
                      {para}
                    </p>
                  ))}
                </div>

                {service.link1 && service.link2 && (
                  <div className="service-app-download-section mt-4 pt-3 border-top">
                    <h6 className="service-app-title mb-3">हाम्रो मोबाइल एप डाउनलोड गर्नुहोस्:</h6>
                    <div className="d-flex gap-3 flex-wrap">
                      <a
                        href={service.link1}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="app-store-badge-link"
                      >
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                          alt="Get it on Google Play"
                          style={{ height: '46px' }}
                        />
                      </a>

                      <a
                        href={service.link2}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="app-store-badge-link"
                      >
                        <img
                          src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                          alt="Download on the App Store"
                          style={{ height: '46px' }}
                        />
                      </a>
                    </div>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ServiceDetailsPage;
