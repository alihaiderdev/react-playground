import axios from "axios";
import { useEffect, useState } from "react";

export const useFetchData = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState({});

  const getData = async (url) => {
    try {
      setIsLoading(true);
      const { data } = await axios(url);
      setData(data.data);
      setMeta(data.meta);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(async () => {
    await getData(url);
  }, [url]);

  return { isLoading, error, data, meta };
};
