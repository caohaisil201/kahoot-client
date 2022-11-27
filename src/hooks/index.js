import { useEffect, useRef } from 'react';

export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title;
  }, []);
}

export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
