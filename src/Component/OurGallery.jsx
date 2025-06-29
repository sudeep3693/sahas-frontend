import React, { useState, useEffect, useRef } from 'react';
import useGallaryImage from '../AdminComponents/hooks/useGallaryImage.jsx';
import '../Css/OurGallery.css';
import config from '../Constants/config.js';
import AOS from 'aos';
import 'aos/dist/aos.css'; // This is required

const OurGallery = () => {
  const { data: images, loading, error } = useGallaryImage();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const startX = useRef(null);

  const openModal = (index) => {
    console.log("Image clicked, index:", index);
    setSelectedIndex(index);
  };

  const closeModal = () => setSelectedIndex(null);

  const showPrev = () =>
    setSelectedIndex((prev) =>
      prev > 0 ? prev - 1 : images.length - 1
    );

  const showNext = () =>
    setSelectedIndex((prev) =>
      prev < images.length - 1 ? prev + 1 : 0
    );

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex !== null) {
        if (e.key === 'ArrowLeft') showPrev();
        else if (e.key === 'ArrowRight') showNext();
        else if (e.key === 'Escape') closeModal();
      }
    };

    

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

      useEffect(() => {
        AOS.init({
          duration: 1000,  // animation duration in ms
        });
      }, []);
  // Touch support
  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const delta = startX.current - endX;

    if (delta > 50) showNext();     // swipe left
    if (delta < -50) showPrev();    // swipe right
  };

  if (loading) return <p>Loading gallery...</p>;
  if (error) return <p>Error loading images: {error.message}</p>;

  return (
    <>
      <div className="gallery">
        {images && images.length > 0 ? (
          images.map((filename, index) => (
            <img
              key={index}
              src={`${config.baseUrl}/uploads/gallery/${filename}`}
              alt={`img-${index}`}
              onClick={() => openModal(index)}
              className="gallery-image"
            />
          ))
        ) : (
          <p>No images available.</p>
        )}
      </div>

      {selectedIndex !== null && images[selectedIndex] && (
        <div
          className="modal-overlay"
          onClick={closeModal}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-button" onClick={closeModal}>
              &times;
            </button>
            <img
              src={`${config.baseUrl}/uploads/gallery/${images[selectedIndex]}`}
              alt={`modal-img-${selectedIndex}`}
              className="modal-image"
              data-aos = "fade-up"
            />
            <div className="modal-buttons">
              <button onClick={showPrev}>&#10094;</button>
              <button onClick={showNext}>&#10095;</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OurGallery;
