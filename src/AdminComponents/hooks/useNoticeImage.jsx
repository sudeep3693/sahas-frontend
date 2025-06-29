import useFetch from './useFetch';
import config from '../../Constants/config';
const useNoticeImages = () => {
  return useFetch(`${config.baseUrl}/notice`);
};

export default useNoticeImages;
