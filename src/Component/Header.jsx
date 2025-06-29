import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { IoMdClose, IoIosArrowDown } from "react-icons/io";
import SocialIcons from "../Component/SocialMedia";
import ContactIcons from "./HeaderContact";
import "../Css/Header.css";
import useBasicDetails from '../FetchData/useBasicDetails';

function Header() {
  const [visible, setVisible] = useState(true);
  const { data: formData, loading, error } = useBasicDetails();

  if (loading) return null;
  if (error) return <p className="text-danger text-center">Error loading contact details.</p>;

  return (
    <>
      <div className={`header-wrapper d-none d-md-block ${visible ? "show" : "hide"}`}>
        <Container fluid className=" text-white py-2 position-relative" style={{backgroundColor:'#002B5B'}}>
          <Row className="justify-content-between align-items-center">
            <Col md={6}>
              <ContactIcons
                phone={formData.telephone || "N/A"}
                email={formData.email || "N/A"}
              />
            </Col>
            <Col md={6} className="text-end">
              <SocialIcons />
            </Col>
          </Row>

          <IoMdClose
            size={24}
            className="position-absolute top-0 end-0 m-3 z-3 text-white cursor-pointer"
            onClick={() => setVisible(false)}
          />
        </Container>
      </div>

      {!visible && (
        <IoIosArrowDown
          size={36}
          className="position-absolute top-0 end-0 m-2 z-3 bg-light p-2 rounded shadow cursor-pointer d-none d-md-block"
          onClick={() => setVisible(true)}
          title="Show Header"
        />
      )}
    </>
  );
}

export default Header;
