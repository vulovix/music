import { useLayoutEffect, useMemo, useRef } from "react";

function debounce(func, timeout = 320) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

function useDebounce(callback, delay) {
  const callbackRef = useRef(callback);
  useLayoutEffect(() => {
    callbackRef.current = callback;
  });
  return useMemo(
    () => debounce((...args) => callbackRef.current(...args), delay),
    [delay]
  );
}

export default useDebounce;
