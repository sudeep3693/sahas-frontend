// src/hooks/useBasicDetails.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../Constants/config';

function useBasicDetails() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBasicDetails = async () => {
      try {
        const res = await axios.get(`${config.baseUrl}/api/getBasicDetails`);
        setData(res.data[0] || {});
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
