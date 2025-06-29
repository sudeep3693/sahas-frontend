import ServiceDetail from "./ServiceDetail";
import { Container, Col, Row } from "react-bootstrap";
import Service from '../Data/ServiceData';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // This is required

function Services() {

  useEffect(() => {
      AOS.init({
        duration: 2000,  // animation duration in ms
      });
    }, []);
  
  
  return (
    <Container fluid className="p-2 p-xs-1 p-md-1" data-aos = 'fade-up'>
      <Row className="g-3">
        {Service.map((service, id) => (
          <Col key={id} xs={6} sm={4} md={6}>
            <ServiceDetail title ={service.title} headerImage={service.headerImage} otherImage={service.image} description={service.description} id={service.id} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Services;
