// CarouselAndService.jsx
import { Container, Col, Row } from "react-bootstrap";
import company from '../Data/CompanyRelated';
import ImageCarousel from "./ImageCarousel";
import Services from "./Services";
import "../Css/CarouselAndService.css";

function CarouselAndService() {
  return (
    <Container fluid className="py-4">
      <Row className="g-3 align-items-stretch">
        {/* Carousel Section */}
        <Col xs={12} md={8} className="d-flex">
          <div className="shadow rounded bg-white flex-fill">
            <ImageCarousel />
          </div>
        </Col>

        {/* Services & Vision Section */}
        <Col xs={12} md={4} className="d-flex flex-column">
          {/* Services */}
          <div className="shadow rounded bg-light p-2 mb-3">
            <Services />
          </div>

          {/* Vision */}
          <div className="hide-on-medium d-flex flex-grow-1 mt-2">
            <div className="vision-box w-100 d-flex flex-column justify-content-center">
              <h4 className="fw-bold mb-2">{company.visionTitle}</h4>
              <p className="mb-0 fst-italic">{company.vision}</p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default CarouselAndService;
