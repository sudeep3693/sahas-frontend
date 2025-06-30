import MembersDetail from '../Component/MembersDetail';
import About from '../Component/About';
import NewsNotice from '../Component/NewsNotice';
import PaymentPartner from '../Component/PaymentPartner';
import ContactForm from '../Component/ContactUs';
import CarouselAndService from '../Component/CarouselAndService';
import Popup from '../Component/Popup/Popup';
import ProductsandMesage from '../Component/ProductsandMessage';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function Body({ productsRef, contactRef }) {
  const [showPopup, setShowPopup] = useState(false);
  const location = useLocation();

useEffect(() => {
  const hasSeenNotice = sessionStorage.getItem("hasSeenNotice");

  if (!hasSeenNotice) {
    setShowPopup(true); // Show your notice popup
    sessionStorage.setItem("hasSeenNotice", "true"); // Mark it shown for this session
  }
}, []);


 useEffect(() => {
  if (location.state?.scrollToProducts && productsRef?.current) {
    productsRef.current.scrollIntoView({ behavior: 'smooth' });
    window.history.replaceState({}, document.title);
  } else if (location.state?.scrollToContact && contactRef?.current) {
    contactRef.current.scrollIntoView({ behavior: 'smooth' });
    window.history.replaceState({}, document.title);
  }
}, [location.state, productsRef, contactRef]);

  return (
    <>
      {showPopup && <Popup onClose={() => setShowPopup(false)} />}
      <CarouselAndService />
      <MembersDetail />
      <div ref={productsRef}>
        <ProductsandMesage />
      </div>
      <hr />
      <About />
      <NewsNotice />
      <PaymentPartner />
      <div ref={contactRef}>
      <ContactForm />
      </div>
    </>
  );
}

export default Body;
