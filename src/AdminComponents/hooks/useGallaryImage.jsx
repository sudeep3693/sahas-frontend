import useFetch from './useFetch';
import config from '../../Constants/config';
const useGalleryImages = () => {
  return useFetch(`${config.baseUrl}/gallery`);
};

export default useGalleryImages;
