import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../Images/headerLogo.png';
import SocialIcons from '../Component/SocialMedia';
import ContactIcons from '../Component/HeaderContact';
import '../Css/Navbar.css';
import useBasicDetails from '../FetchData/useBasicDetails';


function NavBar({ onProductsClick, onContactClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClose = () => {
    setMenuOpen(false);
    setAboutOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') handleClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('navbar-menu-open', menuOpen);
    return () => document.body.classList.remove('navbar-menu-open');
  }, [menuOpen]);

  const handleProductsClick = (e) => {
    e.preventDefault();
    handleClose();

    if (location.pathname === '/') {
      setTimeout(() => {
        onProductsClick();
      }, 400);
    } else {
      navigate('/', { state: { scrollToProducts: true } });
    }
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    handleClose();

    if (location.pathname === '/') {
      setTimeout(() => {
        onContactClick();
      }, 400);
    } else {
      navigate('/', { state: { scrollToContact: true } });
    }
  };

  const handleDownloadsClick = (e) => {

    e.preventDefault();
    handleClose();
    navigate(`/downloads`);

  }
  const handleGalleryClick = (e) => {

    e.preventDefault();
    handleClose();
    navigate(`/gallery`);

  }

  const handleReportClick = (e) => {

    e.preventDefault();
    handleClose();
    navigate(`/reports`);

  }

  const teamDetail = (e) => {

    e.preventDefault();
    handleClose();
    navigate(`team`);
  }


  const handleHome = (e) => {
    handleClose();
    e.preventDefault();
    navigate(`/`);
  }

  const about = (e) => {
    handleClose();
    e.preventDefault();
    navigate(`/aboutDetail`);
  }

  const { data: formData, loading, error } = useBasicDetails();

  if (loading) return null;
  if (error) return <p className="text-danger text-center">Error loading contact details.</p>;

  const isActive = (path) => location.pathname === path;

  return (
    <header className="premium-navbar">
      <div className="premium-navbar__inner">
        <button type="button" className="premium-navbar__brand" onClick={handleHome} aria-label="Go to home">
          <img src={logo} alt="Sahas Cooperative Logo" />
        </button>

        <button
          type="button"
          className={`premium-navbar__menu-toggle ${menuOpen ? 'is-open' : ''}`}
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`premium-navbar__panel ${menuOpen ? 'is-open' : ''}`}>
          <nav id="primary-navigation" className="premium-navbar__links" aria-label="Primary navigation">
            <div className={`premium-navbar__dropdown ${aboutOpen ? 'is-open' : ''}`}>
              <button
                type="button"
                className="premium-navbar__link premium-navbar__dropdown-trigger"
                onClick={() => setAboutOpen((open) => !open)}
                aria-expanded={aboutOpen}
              >
                About Us <span aria-hidden="true">⌄</span>
              </button>
              <div className="premium-navbar__dropdown-menu">
                <button type="button" onClick={about}>Introduction</button>
                <button type="button" onClick={teamDetail}>Our Team</button>
              </div>
            </div>

            <button type="button" className={`premium-navbar__link ${isActive('/') ? 'is-active' : ''}`} onClick={handleProductsClick}>Products</button>
            <button type="button" className="premium-navbar__link" onClick={handleContactClick}>Contact Us</button>
            <button type="button" className={`premium-navbar__link ${isActive('/gallery') ? 'is-active' : ''}`} onClick={handleGalleryClick}>Our Gallery</button>
            <button type="button" className={`premium-navbar__link ${isActive('/reports') ? 'is-active' : ''}`} onClick={handleReportClick}>Reports</button>
            <button type="button" className={`premium-navbar__link ${isActive('/downloads') ? 'is-active' : ''}`} onClick={handleDownloadsClick}>Downloads</button>
          </nav>

          <div className="premium-navbar__utility">
            <SocialIcons />
            <div className="premium-navbar__contact">
              <ContactIcons phone={formData.telephone || 'N/A'} email={formData.email || 'N/A'} />
            </div>
          </div>
        </div>
      </div>
      {menuOpen && <button type="button" className="premium-navbar__backdrop" onClick={handleClose} aria-label="Close navigation menu" />}
    </header>
  );
}

export default NavBar;
