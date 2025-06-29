import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../Css/Footer.css';
import cooperative from '../Data/AboutSahas';
import { useNavigate } from 'react-router-dom';
import useBasicDetails from '../FetchData/useBasicDetails';
import SocialIcons from './SocialMedia';

const Footer = () => {
  const navigate = useNavigate();

  const handlDownload = ()=>{
     navigate(`/downloads`);
  }

   const handleReport = ()=>{
     navigate(`/reports`);
  }



  const handleHome = ()=>{
    navigate(`/`);
  }

  const handleGallery = ()=>{

    navigate(`/gallery`);
  }
  const { data: formData, loading, error } = useBasicDetails();

  if (loading) return null;
  if (error) return <p className="text-danger text-center">Error loading contact details.</p>;

  return (
    <footer className="footer-section text-dark py-5">
      <Container>
        <Row className="gy-5">
          <Col xs={12} md={6} lg={4}>
            <h5 className="footer-title">About Us</h5>
            <p className="footer-text">
              {cooperative.shortDetail}
            </p>
            <div style={{float:'left'}}><SocialIcons/></div>
          </Col>

          <Col xs={12} sm={6} md={6} lg={4}>
            <h5 className="footer-title">Navigate</h5>
            <ul className="footer-list">
              <li onClick={handleHome}>Home</li>
              <li onClick={handlDownload}>Downloads</li>
              <li onClick={handleReport}>Reports</li>
              <li onClick={handleGallery}>Our Gallery</li>
              <li>
                <a href="/login" className="text-decoration-none text-white">Admin</a>
              </li>

            </ul>
          </Col>

          <Col xs={12} md={6} lg={4}>
            <h5 className="footer-title">Contact Us</h5>
            <address className="footer-text small">
              {formData.location} {formData.district}<br />
              {formData.province}, Nepal<br />
              P.O. Box: {formData.pbox}<br />
              Phone: {formData.telephone}, {formData.mobile}<br />
              Fax: {formData.fax}<br />
              Email: {formData.email}
            </address>
          </Col>
        </Row>

        <hr className="footer-divider my-4" />

        <div className="text-center small mt-3 footer-copy">
          © {new Date().getFullYear()} Sahas Saving and Credit Cooperative Limited. All Rights Reserved.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
