import { Col, Container, Row, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Services from '../Data/ServiceData';
import '../Css/Service.css';
import bgLogo from '../Images/logoOnly.png';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // This is required

function ServiceDetailsPage() {
    const { id } = useParams();
    const service = Services.find((s) => s.id === id);

    const paragraphs = service.description.split('\n\n');

      useEffect(() => {
        AOS.init({
          duration: 1000,  // animation duration in ms
        });
      }, []);
    
    if (!service) {
        return <h2 className="text-center text-danger my-5">Service not found</h2>;
    }

    return (
        <>
            <Container className="py-4">
                {/* Title */}
                <h2 className="text-center fw-bold mb-4" data-aos = 'fade-right'>{service.title}</h2>

                <Row className="g-4 align-items-start">
                    {/* Image Section */}
                    <Col xs={12} md={5}>
                        <Card className="shadow border-0">
                            <div className="overflow-hidden rounded" data-aos = 'fade-up'>
                                <img
                                    src={service.image}
                                    alt="Service"
                                    className="img-fluid w-100"
                                    style={{
                                        objectFit: 'cover',
                                        transition: 'transform 0.4s ease',
                                    }}
                                    onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                                    onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                                />
                            </div>
                        </Card>
                    </Col>

                    {/* Description Section */}
                    <Col xs={12} md={7}>
                        <Card className="bg-light shadow border-0 h-100">
                            <Card.Body>
                                <div className="watermark-overlay">
                                    <img
                                        src={bgLogo}
                                        alt="Watermark"
                                        className="watermark-img"
                                    />
                                </div>
                                {
                                    paragraphs.map((para, index) => (
                                        <Card.Text key={index} className="fs-5 text-muted" style={{textAlign: 'justify'}} data-aos = 'fade-up'>
                                            {para}
                                        </Card.Text>
                                    ))


                                }
                            </Card.Body>

                            {service.link1 && service.link2 && (
                                <div className="p-3 d-flex gap-3 flex-wrap">
                                    <a
                                        href={service.link1}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                                            alt="Get it on Google Play"
                                            style={{ height: '50px' }}
                                        />
                                    </a>

                                    <a
                                        href={service.link2}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                                            alt="Download on the App Store"
                                            style={{ height: '50px' }}
                                        />
                                    </a>
                                </div>
                            )}

                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default ServiceDetailsPage;
