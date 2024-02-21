import { useEffect } from "react";

const useDebounce = (
  callback: () => void,
  delay: number,
  dependcies: unknown[]
) => {
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      callback();
    }, delay);
    return () => clearTimeout(delayDebounceFn);
  }, [...dependcies]);
};
export default useDebounce;
