import config from '../Constants/config';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // This is required

function News({ imageName, heading, date, description, id }) {


  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/news-details/${id}`);
  };
  return (
    <div
      className="rounded shadow-sm d-flex flex-column align-items-center"
      data-aos="fade-up"
      style={{
        backgroundColor: '#F5F5F5',
        width: '100%',
        maxWidth: '350px',
        margin: 'auto',
        padding: '16px',
        transition: 'transform 0.2s ease-in-out',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      <img
        src={`${imageName}`}
        alt={heading}
        className="rounded"
        style={{ width: '100%', height: '160px', objectFit: 'cover' }}
      />
      <div className="mt-3 w-100 text-center">
        <h5 className="mb-2" style={{ fontSize: '0.9rem', color: '#2E8B57' }}>
          {date}
        </h5>
<p
  className="mb-1"
  style={{
    fontSize: '0.92rem',
    color: '#006400',
    fontWeight: 'bold',
    textAlign: 'justify',
    display: '-webkit-box',
    WebkitLineClamp: 2,      
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  }}
>
  {heading}
</p>

<p
  className="mb-1"
  style={{
    fontSize: '0.9rem',
    color: '#006400',
    textAlign: 'justify',
    display: '-webkit-box',
    WebkitLineClamp: 2,      
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  }}
>
  {description}
</p>

        <div className="text-center mt-2">
          <button
            className="btn px-4 py-2"
            style={{
              fontSize: '1rem',
              borderRadius: '0.5rem',
              backgroundColor: '#228B22',
              color: '#fff',
              border: 'none',
            }}
            onClick={handleReadMore}
          >
            Read more
          </button>
        </div>
      </div>
    </div>
  );
}

export default News;
