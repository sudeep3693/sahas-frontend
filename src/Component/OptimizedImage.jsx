import React from 'react';

function getOptimizedUrl(src, width) {
  if (!src || !src.includes('res.cloudinary.com') || !src.includes('/upload/')) return src;
  return src.replace('/upload/', `/upload/f_auto,q_auto,w_${width}/`);
}

const OptimizedImage = ({ src, alt, width = 1200, loading = 'lazy', ...props }) => (
  <img
    {...props}
    src={getOptimizedUrl(src, width)}
    alt={alt}
    loading={loading}
    decoding="async"
  />
);

export default OptimizedImage;