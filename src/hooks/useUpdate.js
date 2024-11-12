import { useState } from "react";
import axios from "axios";
export const useUpdate = (initialValue, urlTemplate) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const updateValue = async (newValue,statusID) => {
    try {
      console.log("New Value", newValue);
      const url = `${urlTemplate}${statusID}`;
      console.log("URL", url);
      setLoading(true);
      setError(null);
      const response = axios.put(url, newValue);
      setValue(response.data);
    } catch (error) {
      setError({ message: error.message });
    } finally {
      setLoading(false);
    }
  };
  return {
    value,
    updateValue,
    error,
    loading,
  };
};
