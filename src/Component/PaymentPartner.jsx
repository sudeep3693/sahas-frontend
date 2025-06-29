import { Container, Row, Col } from 'react-bootstrap';
import Partner from './Payment';
import { useState, useEffect } from 'react';
import esewa from '../Images/PaymentPartner/esewa.png';
import khalti from '../Images/PaymentPartner/khalti.jpeg';
import '../Css/App.css';
import AOS from 'aos';
import 'aos/dist/aos.css'; // This is required

function PaymentPartner() {
  const [partner, setPartner] = useState([esewa, khalti]);
 useEffect(() => {
    AOS.init({
      duration: 500,  // animation duration in ms
    });
  }, []);
  return (
    <div className="position-relative">
      <div className="payment-header d-md-flex flex-column align-items-center text-center">
        <div className="pt-5 px-3 text-md-white text-black">
          <h2 className="fw-bold display-6">Seamless Transactions</h2>
          <p className="lead mb-0">Powering your payments through our trusted partners</p>
        </div>
      </div>

      <div className="partner-container" style={{overflowX:'hidden'}}>
        <Container>
          <Row className="mb-4 text-center" style={{color:'#001F3F'}}>
            <h3 className=" fs-1 fw-bold" data-aos = 'fade-left'>Our Payment Partners</h3>
            <p className="text-muted"data-aos = 'fade-left'>Trusted gateways to make your experience smoother and secure</p>
          </Row>

          <Row className="g-4 justify-content-center mb-4">
            {partner.map((p, i) => (
              <Col key={i} xs={12} sm={6} md={6} lg={4} className="text-center">
                <Partner partner={p} />
              </Col>
            ))}
          </Row>
        </Container>
      </div>
      <hr/>
    </div>
  );
}

export default PaymentPartner;
