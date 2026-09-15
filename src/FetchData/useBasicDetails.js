// src/hooks/useBasicDetails.js
import { useEffect, useState } from 'react';
import config from '../Constants/config';
import { getCached } from './requestCache';

function useBasicDetails() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBasicDetails = async () => {
      try {
        const result = await getCached(`${config.baseUrl}/api/getBasicDetails`);
        setData(result[0] || {});
      } catch (err) {
        setError(err);
        console.error("Error fetching basic details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBasicDetails();
  }, []);

  return { data, loading, error };
}

export default useBasicDetails;
