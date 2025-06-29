import React from "react";
import { useNavigate } from "react-router-dom";
import '../Css/Details.css';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // This is required

function Details({ title, subtitle, headerImage, description, id, others }) {
  const navigate = useNavigate();

  const wordLimit = 15;
  const words = description.trim().split(/\s+/);
  const isOverLimit = words.length > wordLimit;
  const truncatedText = words.slice(0, wordLimit).join(" ") + (isOverLimit ? "..." : "");

  const handleReadMore = () => {
    navigate(`/details/${id}`);
  };

   useEffect(() => {
    AOS.init({
      duration: 500,  // animation duration in ms
    });
  }, []);



  return (
    <div
      className="details-card"
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      style={{ cursor: "pointer", overflowX:"hidden" }}
      data-aos = 'fade-right'
    >
      <img
        src={headerImage}
        alt="Product"
        className="details-image"
      />
      <div className="details-content">
        <h5 className="details-title">{title}</h5>
        <p className="details-description">{truncatedText}</p>
        <button
          onClick={handleReadMore}
          className="details-btn"
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 6px 16px rgba(40, 167, 69, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(40, 167, 69, 0.3)";
          }}
        >
          Read more
        </button>
      </div>
    </div>
  );
}

export default Details;
