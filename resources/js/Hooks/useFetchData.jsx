import { useState, useEffect } from "react";
import axios from "axios";

/**
 * Custom hook using Axios.
 *
 * @param {string} url - API endpoint (ex: "/api/links")
 * @param {object} [options] - optional Axios config (params, headers, dsb)
 */
export default function useFetchData(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    let isMounted = true;

    setLoading(true);
    axios
      .get(url, options)
      .then((res) => {
        if (isMounted) {
          setData(res.data);
          setError(null);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error(`Error fetching ${url}:`, err);
          setError(err);
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, loading, error };
}
