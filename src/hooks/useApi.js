import { useEffect, useState } from "react";

const useApi = (params) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const fetchApi = (data) => {

    fetch(params.url, {
        method: params.method,
        headers: {
            Authorization: params.Authorization
        }
    }) // 
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setLoading(false);
        setData(json);
      });
  };

  useEffect(() => {
    fetchApi();
  },[]);

  return { loading, data };
};

export default useApi;