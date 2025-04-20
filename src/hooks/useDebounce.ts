// hooks/useDebounce.ts
import { useEffect, useState } from 'react';

/**
 * Custom hook that debounces a value
 * @param value The value to debounce
 * @param delay Delay in milliseconds (default: 300ms)
 * @returns The debounced value
 */
export const useDebounce = <T>(value: T, delay: number = 300): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set up the timer
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up the timer on unmount or value change
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};