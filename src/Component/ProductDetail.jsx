import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../Css/Details.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Details({ title, subtitle, headerImage, description, id, others }) {
  const navigate = useNavigate();

  const wordLimit = 18;
  const words = description.trim().split(/\s+/);
  const isOverLimit = words.length > wordLimit;
  const truncatedText = words.slice(0, wordLimit).join(" ") + (isOverLimit ? "..." : "");

  const handleReadMore = (e) => {
    e.stopPropagation();
    navigate(`/details/${id}`);
  };

  useEffect(() => {
    AOS.init({
      duration: 600,
    });
  }, []);

  return (
    <div
      className="details-card"
      onClick={() => navigate(`/details/${id}`)}
      data-aos="fade-up"
    >
      <div className="details-image-container">
        <img
          src={headerImage}
          alt={title}
          className="details-image"
        />
        <div className="details-badge">
          {id === "1" ? "बचत योजना" : "कर्जा सुविधा"}
        </div>
      </div>
      <div className="details-content">
        <div className="details-subtitle">{subtitle}</div>
        <h5 className="details-title">{title}</h5>
        <p className="details-description">{truncatedText}</p>
        <button
          type="button"
          onClick={handleReadMore}
          className="details-btn"
        >
          थप विवरण हेर्नुहोस् &rarr;
        </button>
      </div>
    </div>
  );
}

export default Details;
