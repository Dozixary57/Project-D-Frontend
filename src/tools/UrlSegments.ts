import { useLocation } from "react-router-dom";

/**
 * Returns URL segment by level index (0-based)
 * @param level - Segment level (0 = first segment after domain)
 * @returns Segment value or null if level doesn't exist
 * 
 * Example: 
 * URL: "https://example.com/a/b/c"
 * getUrlSegment(0) → "a"
 * getUrlSegment(1) → "b"
 * getUrlSegment(2) → "c"
 * getUrlSegment(3) → null
 */
export const useUrlSegment = (level: number): string | null => {
  const { pathname } = useLocation();

  // Split and filter empty segments
  const segments = pathname.split('/').filter(segment => segment !== '');

  // Handle negative indices (counting from end)
  if (level < 0) {
    const adjustedLevel = segments.length + level;
    return adjustedLevel >= 0 ? segments[adjustedLevel] : null;
  }

  // Handle positive indices
  return segments.length > level ? segments[level] : null;
};

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

// export const getLastUrlSegment = (): string | null => {
//   const pathname = window.location.pathname;
//   const segments = pathname.split('/').filter(Boolean);
//   return segments.length > 0 ? segments[segments.length - 1] : null;
// };

// export const getPenultimateUrlSegment = (): string | null => {
//   const pathname = window.location.pathname;
//   const segments = pathname.split('/').filter(Boolean);
//   return segments.length > 1 ? segments[segments.length - 2] : null;
// };
