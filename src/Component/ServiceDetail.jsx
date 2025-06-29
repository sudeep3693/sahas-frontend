import "../Css/ServiceDetail.css";
import { useNavigate } from "react-router-dom";

function ServiceDetail({ title, headerImage, otherImage, description, id }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/serviceDetails/${id}`);
  };

  return (
    <div className="service-detail-container" onClick={handleClick}>
      <div className="service-card transition">
        <div className="image-wrapper">
          <img src={headerImage} alt="Service" className="service-image" />
        </div>
        <h2 className="service-title">{title}</h2>
      </div>
    </div>
  );
}

export default ServiceDetail;
