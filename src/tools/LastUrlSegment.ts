import { useLocation } from "react-router-dom";

/**
 * Returns the last segment of the URL path.
 * Example: /Content/Item → "Item"
 */
export const useLastUrlSegment = (): string | null => {
  const { pathname } = useLocation();
  const segments = pathname.split('/').filter(Boolean);
  return segments.length > 0 ? segments[segments.length - 1] : null;
};

/**
 * Returns the penultimate segment of the URL path.
 * Example: /Content/Item/Branch → "Item"
 */
export const usePenultimateUrlSegment = (): string | null => {
  const { pathname } = useLocation();
  const segments = pathname.split('/').filter(Boolean);
  return segments.length > 1 ? segments[segments.length - 2] : null;
};



export const getLastUrlSegment = (): string | null => {
  const pathname = window.location.pathname;
  const segments = pathname.split('/').filter(Boolean);
  return segments.length > 0 ? segments[segments.length - 1] : null;
};

export const getPenultimateUrlSegment = (): string | null => {
  const pathname = window.location.pathname;
  const segments = pathname.split('/').filter(Boolean);
  return segments.length > 1 ? segments[segments.length - 2] : null;
};
