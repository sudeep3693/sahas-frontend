import React from 'react';
import { Carousel } from 'react-bootstrap';
import useCarouselImages from '../AdminComponents/hooks/useCarouselImage';
import '../Css/CarouselCss.css';
import config from '../Constants/config';
function ImageCarousel() {
  const { data: images, loading, error } = useCarouselImages();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading carousel images.</p>;

  return (
    <Carousel>
      {images.map((filename, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={`${config.baseUrl}/uploads/carousel/${filename}`}
            alt={`Carousel image ${index + 1}`}
            style={{ aspectRatio: '4 / 3', objectFit: 'cover' }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ImageCarousel;
