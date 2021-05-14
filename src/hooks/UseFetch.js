import {useEffect, useState} from 'react';

const UseFetch = url => {
  const [statusData, setstatusData] = useState({
    data: null,
    isLoaded: false,
    error: null,
  });

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(url);
      const data = await response.json();
      setstatusData({
        data: data,
        isLoaded: true,
        error: null,
      });
    }
    fetchData();
  }, [url]);

  return statusData;
};

export {UseFetch};
