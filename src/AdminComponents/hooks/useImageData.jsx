import useFetch from './useFetch';
import config from '../../Constants/config';

const useImageData = ({ usedIn }) => {
  const endpoints = {
    carousel: `${config.baseUrl}/images/carousel`,
    gallery: `${config.baseUrl}/gallery`,
    notice: `${config.baseUrl}/notice`,
  };
  const url = endpoints[usedIn];
  const result = useFetch(url);

  if (!url) {
    console.warn(`Unknown usedIn value: ${usedIn}`);
    return { ...result, data: [], loading: false, error: null };
  }
  return result;
};

export default useImageData;
