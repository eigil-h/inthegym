import { useEffect, useRef } from 'react';

/**
 * https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 */
export function useInterval(callback, timeout) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    const id = setInterval(tick, timeout);
    return () => clearInterval(id);
  }, [timeout]);
}

export function usePrevious(val) {
  const ref = useRef(null);

  useEffect(() => {
    ref.current = val;
  }, [val]);

  return ref.current;
}

export function noop() {}

/**
 * Makes a shallow copy of arr and pushes obj to its end.
 * Returns the new Array
 */
export function cpPush(arr, obj) {
  const newArray = Array.from(arr || []);
  newArray.push(obj);
  return newArray;
}
