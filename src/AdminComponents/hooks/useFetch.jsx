import { useCallback, useEffect, useState } from 'react';
import { getCached, invalidateRequest } from '../../FetchData/requestCache';

const useFetch = (url, { cache = true, ttl } = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async ({ force = false } = {}) => {
    if (!url) {
      setLoading(false);
      return [];
    }

    setLoading(true);
    try {
      const result = cache
        ? await getCached(url, { ttl, force })
        : await getCached(url, { force: true });
      setData(result);
      setError(null);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [cache, ttl, url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = async () => {
    invalidateRequest(url);
    return fetchData({ force: true });
  };

  return { data, setData, loading, error, refetch };
};

export default useFetch;
