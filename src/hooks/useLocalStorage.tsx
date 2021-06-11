import { useEffect, useState } from "react";

const getSavedValue = (
  key: string,
  initValue: string | User.tokenObjectInterface | {} | null
) => {
  const savedValue = localStorage.getItem(key);
  if (savedValue) {
    return JSON.parse(savedValue);
  }
  return initValue;
};

const useLocalStorage: (
  key: string,
  initValue: string | User.tokenObjectInterface | {} | null
) => [any, (arg0: any) => void] = (key, initValue) => {
  const [data, setData] = useState(() => getSavedValue(key, initValue));
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data));
  }, [data, key]);

  return [data, setData];
};

export default useLocalStorage;
