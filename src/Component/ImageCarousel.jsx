import React from 'react';
import { Carousel } from 'react-bootstrap';
import useCarouselImages from '../AdminComponents/hooks/useCarouselImage';
import OptimizedImage from './OptimizedImage';
import '../Css/CarouselCss.css';

function ImageCarousel() {
  const { data: images, loading, error } = useCarouselImages();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading carousel images.</p>;

  return (
    <Carousel>
      {images.map((imageObj, index) => (
        <Carousel.Item key={index}>
          <OptimizedImage
            className="d-block w-100"
            src={imageObj.url}   // ✅ Fixed here: use imageObj.url
            alt={`Carousel image ${index + 1}`}
            width={1400}
            loading={index === 0 ? 'eager' : 'lazy'}
            style={{ aspectRatio: '4 / 3', objectFit: 'cover' }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ImageCarousel;
