import { useState, useEffect } from "react";

type SetValue<T> = (value: T | ((val: T) => T)) => void;

const useLocalStorage = <T,>(
  key: string,
  initialValue: T
): [T, SetValue<T>] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.error(`Error fetching from localStorage: ${error}`);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error saving to localStorage: ${error}`);
    }
  }, [key, storedValue]);

  const setValue: SetValue<T> = (value) => {
    try {
      setStoredValue(
        value instanceof Function
          ? (value as (val: T) => T)(storedValue)
          : value
      );
    } catch (error) {
      console.error(`Error setting localStorage value: ${error}`);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
