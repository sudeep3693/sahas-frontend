import useCarouselImages from '../hooks/useCarouselImage';
import useGalleryImages from '../hooks/useGallaryImage';
import useNoticeImages from './useNoticeImage';

const useImageData = ({ usedIn }) => {
  const carousel = useCarouselImages();
  const gallery = useGalleryImages();
  const notice = useNoticeImages();

  if (usedIn === 'carousel') return carousel;
  if (usedIn === 'gallery') return gallery;
  if (usedIn === 'notice') return notice;

  console.warn(`Unknown usedIn value: ${usedIn}`);
  return { data: [], setData: () => {}, refetch: () => {}, loading: false, error: null };
};

export default useImageData;
