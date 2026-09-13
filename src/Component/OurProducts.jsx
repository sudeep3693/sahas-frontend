import { useEffect, useRef } from 'react';
import { Container } from 'react-bootstrap';
import Details from './ProductDetail'; 
import Products from '../Data/ProductData';
import '../Css/OurProducts.css';
import AOS from 'aos';
import 'aos/dist/aos.css'; // This is required


function OurProducts() {
  const scrollRef = useRef(null);
  const shouldAutoScroll = Products.length >= 3;

  useEffect(() => {
    if (!shouldAutoScroll) return;

    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const card = scrollContainer.querySelector('.product-card');
    const cardWidth = card ? card.offsetWidth + 16 : 240;
    let scrollIndex = 0;

    const scrollStep = () => {
      if (!scrollContainer) return;

      if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - 1) {
        scrollIndex = 0;
        scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollContainer.scrollBy({ left: cardWidth, behavior: 'smooth' });
        scrollIndex += 1;
      }
    };

    const interval = setInterval(scrollStep, 3000);
    return () => clearInterval(interval);
  }, [shouldAutoScroll]);

  
    useEffect(() => {
      AOS.init({
        duration: 500,  // animation duration in ms
      });
    }, []);
  
  return (
    <div className="position-relative" style={{ backgroundColor: '#E6F4EA' /* Soft Green BG */ }}>
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #002B5B 0%, #001F3F 100%)',
          minHeight: '220px',
          color: 'white',
          zIndex: 1,
          paddingTop: '2rem',
          paddingBottom: '5rem',
        }}
        className="d-flex flex-column align-items-center text-center px-3"
      >
        <div 
          style={{ 
            backgroundColor: 'rgba(40, 167, 69, 0.2)', 
            color: '#7DDF92', 
            border: '1px solid rgba(40, 167, 69, 0.4)',
            padding: '4px 16px', 
            borderRadius: '20px', 
            fontSize: '0.85rem', 
            fontWeight: '600',
            marginBottom: '8px'
          }}
          data-aos="fade-down"
        >
          साहस बचत तथा ऋण योजनाहरू
        </div>
        <div className="fs-2 fw-bold text-white mb-2" data-aos="fade-left">हाम्रा उत्पादनहरू</div>
        <div style={{ color: '#D1E7DD', fontSize: '1rem', maxWidth: '600px' }} data-aos="fade-left">
          तपाईंको आवश्यकता अनुसार भरपर्दो बचत र सरल कर्जा योजनाहरू
        </div>
      </div>

      {/* Scrollable or Centered Cards */}
      <div
        style={{
          marginTop: '-90px',
          zIndex: 2,
          position: 'relative',
        }}
      >
        <Container fluid>
          <div
            ref={scrollRef}
            className={`horizontal-scroll px-3 ${shouldAutoScroll ? 'overflow-auto' : ''}`}
          >
            <div className={`d-flex gap-4 ${shouldAutoScroll ? 'flex-nowrap' : 'justify-content-center flex-wrap'}`} >
              {Products.map((product) => (
                <Details
                  key={product.productId}
                  title={product.productTitle}
                  subtitle={product.productSubTitle}
                  headerImage={product.productTitleImage}
                  description={product.productDescription}
                  id={product.productId}
                  others={product.Topics}
                />
              ))}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
export default OurProducts;
