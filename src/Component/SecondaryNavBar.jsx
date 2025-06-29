import React, { useState, useEffect } from 'react';
import { Link, useNavigate ,useLocation } from 'react-router-dom';
import '../Css/SecondaryNavBar.css'; // we'll define custom styles here
const SecondaryNavBar = ({ onProductsClick, onContactClick }) => {

  const navigate = useNavigate();
   const location = useLocation();
  const [show, setShow] = useState(false);


  const handleProductsClick = (e) => {
    e.preventDefault();
   

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
   

    if (location.pathname === '/') {
      setTimeout(() => {
        onContactClick();
      }, 400);
    } else {
      navigate('/', { state: { scrollToProducts: true } });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const isMediumOrLarger = window.innerWidth >= 768;
      const isScrolledPast100vh = window.scrollY > window.innerHeight;

      setShow(isMediumOrLarger && isScrolledPast100vh);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <>
      {show && (
        <div className="secondary-navbar">
          <nav className="nav-links">
            <Link to="/">Home</Link>
            <Link
              onClick={handleProductsClick}
            >
              Products
            </Link>
            <Link
              onClick={handleContactClick}
            >
             Contact Us
            </Link>
            <Link to="/downloads">Downloads</Link>
            <Link to="/reports">Reports</Link>
             <Link to="/gallery">Gallery</Link>
          </nav>
        </div>
      )}
    </>
  );
};

export default SecondaryNavBar;
