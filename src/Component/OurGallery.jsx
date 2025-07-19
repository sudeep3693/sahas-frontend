import React, { useState, useEffect, useRef } from 'react';
import useGallaryImage from '../AdminComponents/hooks/useGallaryImage.jsx';
import '../Css/OurGallery.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const OurGallery = () => {
  const { data: images, loading, error } = useGallaryImage();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const startX = useRef(null);

  const openModal = (index) => {
    setSelectedIndex(index);
  };

  const closeModal = () => {
    setSelectedIndex(null);
  };

  const showPrev = () =>
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));

  const showNext = () =>
    setSelectedIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));

  // Keyboard navigation
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
  }, [selectedIndex, images.length]);

  // Handle browser back button
  useEffect(() => {
    if (selectedIndex !== null) {
      window.history.pushState({ modalOpen: true }, "");
      const handlePopState = () => closeModal();
      window.addEventListener("popstate", handlePopState);
      return () => window.removeEventListener("popstate", handlePopState);
    }
  }, [selectedIndex]);

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // Touch swipe support
  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const delta = startX.current - endX;

    if (delta > 50) showNext();
    if (delta < -50) showPrev();
  };

  if (loading) return <p>Loading gallery...</p>;
  if (error) return <p>Error loading images: {error.message}</p>;

  return (
    <>
      <div className="gallery">
        {images && images.length > 0 ? (
          images.map((image, index) => (
            <img
              key={index}
              src={image.url}
              alt={`gallery-img-${index}`}
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
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="close-button" onClick={closeModal}>
              &times;
            </button>

            <img
              src={images[selectedIndex].url}
              alt={`modal-img-${selectedIndex}`}
              className="modal-image"
              data-aos="fade-up"
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
