import useFetch from './useFetch';
import config from '../../Constants/config';

const useCarouselImages = () => {
  return useFetch(`${config.baseUrl}/images/carousel`);
};

export default useCarouselImages;
