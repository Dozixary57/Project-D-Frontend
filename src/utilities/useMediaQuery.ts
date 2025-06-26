import { useState, useEffect } from 'react';

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);

    mediaQueryList.addEventListener('change', handler);
    return () => mediaQueryList.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

export function useElementMediaQuery<T extends HTMLElement>(
  ref: React.RefObject<T>,
  query: (size: { width: number; height: number }) => boolean
) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    const updateMatch = () => {
      const rect = element.getBoundingClientRect();
      setMatches(query({ width: rect.width, height: rect.height }));
    };

    updateMatch(); // проверить сразу

    const resizeObserver = new ResizeObserver(() => {
      updateMatch();
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, [ref, query]);

  return matches;
}