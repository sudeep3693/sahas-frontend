import React, { useState, useEffect } from "react";
import "../../Css/Popup.css";
import useNoticeImage from "../../AdminComponents/hooks/useNoticeImage";
import { Container } from "react-bootstrap";
import config from "../../Constants/config";
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
      setCurrentIndex(currentIndex + 1);
    } else {
      onClose();
    }
  };

  return (
    <Container fluid className="popup-overlay">
      <div
        className="popup-image-container"
        style={{
          position: "relative",
          width: "800px",
          height: "700px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f8f9fa", // Optional: a background to fill extra space
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          borderRadius: "10px",
        }}
      >
        <span
          className="close-btn"
          onClick={handleClose}
          style={{
            position: "absolute",
            top: "20px",
            right: "15px",
            fontSize: "30px",
            cursor: "pointer",
            zIndex: 10,
          }}
        >
          &times;
        </span>
        <img
          src={`${config.baseUrl}/uploads/notice/${images[currentIndex]}`}
          alt="Popup"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
          }}
        />
      </div>
    </Container>
  );
};

export default Popup;
