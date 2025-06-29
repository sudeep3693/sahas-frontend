import { Row, Col, Container } from "react-bootstrap";
import OurProducts from "./OurProducts";
import MessageContainer from "./MessageContainer";
import '../Css/ProductAndMessage.css'; // Custom CSS (optional)

function ProductsandMessage() {
  return (
    <div style={{ backgroundColor: "#f9f9ff", padding: "10px 0" }}>
      <Container fluid="md" className="py-2">
        <Row className="g-3">
          {/* Left Side: Our Products */}
          <Col md={12} lg={7} xl={8} sm={12}>
            <div className="rounded-4 shadow-sm p-2 bg-white h-100">
              <OurProducts />
            </div>
          </Col>

          {/* Right Side: Message From */}
          <Col md={12} lg={5} xl={4} sm={12} style={{ justifyContent: "center" }}>
            <div
              className="rounded-4 shadow-sm p-2 h-100"
              style={{
                color: "white",

              }}
            >
              <MessageContainer />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ProductsandMessage;
