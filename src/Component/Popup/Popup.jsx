import React, { useState, useEffect } from "react";
import "../../Css/Popup.css";
import useNoticeImage from "../../AdminComponents/hooks/useNoticeImage";
import OptimizedImage from '../OptimizedImage';

const Popup = ({ onClose }) => {
  const { data: images, loading, error } = useNoticeImage();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images && images.length > 0) {
      setCurrentIndex(0);
    }
  }, [images]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading images</div>;
  if (!images || images.length === 0) return <div>No images found</div>;

  const handleClose = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex((index) => index + 1);
      return;
    }
    onClose();
  };

  return (
    <div className="popup-overlay" role="dialog" aria-modal="true" aria-label="Latest notices">
      <div className="popup-image-container">
        <button
          type="button"
          className="close-btn"
          onClick={handleClose}
          aria-label={currentIndex < images.length - 1 ? 'Show next notice' : 'Close notices'}
        >
          <span aria-hidden="true">&times;</span>
        </button>

        <div className="popup-image-frame">
          <OptimizedImage
            src={images[currentIndex]?.url}
            alt={`Notice ${currentIndex + 1} of ${images.length}`}
            width={1000}
            loading="eager"
          />
        </div>

      </div>
    </div>
  );
};

export default Popup;  
