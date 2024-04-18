import { useEffect, useState } from "react"

const useFetch = (url) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    try {
        setLoading(true);
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
    } catch (error) {
      setError(error);
    } finally {
        setLoading(false);
    }
  }
  fetchData();
}, [url])

  return [data, error, loading]
}

export default useFetch