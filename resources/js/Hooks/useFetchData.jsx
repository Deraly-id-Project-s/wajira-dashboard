import { useState, useEffect } from "react";

/**
 * Custom hook universal for data fetch (support params, deps, dan error-safe)
 *
 * @param {string} url - endpoint API
 * @param {object} [options={}] - fetch config opsional
 * @param {Array} [dependencies=[]] - dependency array untuk refetch
 */
export default function useFetchData(url, options = {}, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    let isMounted = true;
    setLoading(true);
    setError(null);

    fetch(url, options)
      .then(async (res) => {
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
        const json = await res.json();
        if (isMounted) setData(json);
      })
      .catch((err) => {
        if (isMounted) setError(err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [url, ...dependencies]);

  return { data, loading, error };
}
