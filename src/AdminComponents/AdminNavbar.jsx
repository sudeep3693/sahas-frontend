import{ useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { FiLogOut } from "react-icons/fi";
import logo from '../Images/headerLogo.png';
import '../Css/App.css';
import { AuthContext } from '../Authentication/AuthContext';

function AdminNavBar() {

  const { logout } = useContext(AuthContext);
  const handleLogout = () => {
    logout();

    console.log("logged out");
  };

  return (
    <Navbar expand="md" className="bg-body-tertiary">
      <Container fluid className="d-flex justify-content-between align-items-center px-3">

        <Container fluid className="d-flex justify-content-between align-items-center px-3">
          <Navbar.Brand href="#home" className="d-flex align-items-center ms-lg-5 ms-md-auto">
            <img
              src={logo}
              alt="Sahas Cooperative Logo"
              className="img-fluid"
              style={{ maxHeight: '110px', width: '80%' }}
            />
          </Navbar.Brand>

          <button
            onClick={handleLogout}
            className="btn btn-outline-danger d-flex align-items-center justify-content-center px-2 py-1"
            style={{ fontSize: '0.7rem', borderRadius: '8px', width: '40px', height: '36px' }}
            title="Log Out"
          >
            <FiLogOut size={18} />
          </button>

        </Container>
      </Container>
    </Navbar>
  );
}

export default AdminNavBar;
