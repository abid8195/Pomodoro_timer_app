import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook that syncs state with localStorage.
 * Returns a stateful value and a setter that persists to localStorage.
 *
 * @param {string} key - localStorage key
 * @param {*} initialValue - fallback value if nothing is stored
 */
export default function useLocalStorage(key, initialValue) {
  // Lazy initializer: read from localStorage once on mount
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // Persist to localStorage whenever the value changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch {
      // Silently fail if localStorage is full or unavailable
    }
  }, [key, storedValue]);

  // Memoised setter so it's stable across renders
  const setValue = useCallback((value) => {
    setStoredValue((prev) => (typeof value === 'function' ? value(prev) : value));
  }, []);

  return [storedValue, setValue];
}
