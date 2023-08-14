import {useState, useEffect, useCallback} from 'react';
import axios from 'axios';

interface UseFetchDataOptionsProps {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: {};
}

const useFetchData = (
  url: string,
  options: UseFetchDataOptionsProps = {method: 'GET'},
) => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      let response;
      const parameters = {
        headers: {
          'Content-Type': 'application/json',
        },
        body: options.body,
      };

      switch (options.method) {
        case 'GET':
          response = await axios.get(url);
          break;
        case 'POST':
          response = await axios.post(url, parameters);
          break;
        case 'PUT':
          response = await axios.put(url, parameters);
          break;
        default:
          break;
      }
      const apiData = response?.data;
      setData(apiData);
    } catch (error) {
      setError(`Error occurred while fetching data: ${error}`);
    } finally {
      setIsLoading(false);
    }
  }, [url, options.method, options.body]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {data, isLoading, error};
};

export default useFetchData;
