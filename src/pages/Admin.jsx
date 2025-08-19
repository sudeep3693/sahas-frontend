import { Container, Row, Col, Accordion, Card } from "react-bootstrap";
import AdminNavBar from "../AdminComponents/AdminNavbar.jsx";
import { Outlet } from "react-router-dom";
import ChangePassword from "../Authentication/ChangePassword.jsx";

function Admin() {
  return (
    <div>
      <AdminNavBar />
      <Container fluid className="mt-3">
        <Row>
          <Col>
            <Outlet /> {/* Nested routes render here */}
          </Col>
        </Row>

        <Row className="mt-4">
          <Col md={{ span: 8, offset: 2 }}>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>🔐 Credentials Settings</Accordion.Header>
                <Accordion.Body>
                  <Card className="shadow-sm border-0">
                    <Card.Body>
                      <h4 className="mb-3">Change Password</h4>
                      <ChangePassword />
                    </Card.Body>
                  </Card>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Admin;
