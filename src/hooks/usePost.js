import { useState } from "react";
import axios from "axios";

export const usePost = (url, defaultData = []) => {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = async (newData) => {
    try {
      setLoading(true);
      const response = await axios.post(url, newData);

      setData(response.data);
      setLoading(false);
      setError(null);
    } catch (error) {
      const { message, error: serverError } = error.response.data;
      setError({ message: `${serverError} \n ${message}` });
      setLoading(false);
    }
  };
  return {
    data,
    loading,
    error,
    postData,
  };
};
