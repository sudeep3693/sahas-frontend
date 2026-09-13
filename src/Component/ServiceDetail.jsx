import "../Css/ServiceDetail.css";
import { useNavigate } from "react-router-dom";

function ServiceDetail({ title, headerImage, otherImage, description, id }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/serviceDetails/${id}`);
  };

  return (
    <div className="service-detail-container" onClick={handleClick}>
      <div className="service-card">
        <div className="image-wrapper">
          <img src={headerImage} alt={title} className="service-image" />
        </div>
        <h3 className="service-title">{title}</h3>
        <div className="service-explore-link">
          <span>विस्तृत जानकारी</span>
          <span className="service-arrow">&rarr;</span>
        </div>
      </div>
    </div>
  );
}

export default ServiceDetail;
