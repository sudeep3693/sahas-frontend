import React, { useRef, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import emailjs from '@emailjs/browser';
import '../Css/Contact.css';
import AOS from 'aos';
import 'aos/dist/aos.css'; // This is required


const ContactForm = () => {
  const formRef = useRef();

  useEffect(() => {
    AOS.init({
      duration: 500,  // animation duration in ms
    });
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'testing',       // Replace with your EmailJS service ID
      'template_dzgjyfk',      // Replace with your EmailJS template ID
      formRef.current,
      'JGaSP9UiZTKnAhTix'        // Replace with your EmailJS public key
    )
      .then(() => {
        alert("Message sent successfully!");
        formRef.current.reset();
      })
      .catch((error) => {
        alert("Failed to send message: " + error.text);
      });
  };

  return (

    <div className="contact-section py-5" style={{overflowX:'hidden'}}>
      <Container>
        <Row className="justify-content-center mb-4 text-center">
          <Col lg={8}>
            <h2 className="fw-bold mb-2" style={{ color: "#001F3F" }} data-aos = 'fade-left'>Contact Us</h2>
            <p className="text-muted" data-aos = 'fade-left'>
              Get connected with us by simply filling up info below.
            </p>
          </Col>
        </Row>
        <Form ref={formRef} onSubmit={sendEmail}>
          <Row className="mb-3">
            <Col md={6} className="mb-3 mb-md-0">
              <Form.Control
                type="text"
                name="first_name"
                placeholder="First Name"
                required
              />
            </Col>
            <Col md={6}>
              <Form.Control
                type="text"
                name="last_name"
                placeholder="Last Name"
                required
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                required
              />
            </Col>
          </Row>
          <Row className="mb-4">
            <Col>
              <Form.Control
                as="textarea"
                name="message"
                rows={6}
                placeholder="Your Message"
                required
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                type="submit"
                variant="success"
                className="px-5 py-2 text-uppercase fw-semibold"
                
              >
                Contact Us
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default ContactForm;
