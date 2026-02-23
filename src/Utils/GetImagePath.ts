// TMDB available poster widths (ascending)
const POSTER_WIDTHS = [92, 154, 185, 342, 500, 780] as const;
// TMDB available backdrop widths
const BACKDROP_WIDTHS = [300, 780, 1280] as const;

export const getImagePath = (size: number, imagePath?: string) => {
  return imagePath
    ? `https://image.tmdb.org/t/p/w${size}/${imagePath}`
    : "https://links.papareact.com/o8z";
};

export const getLargeImagePath = (imagePath?: string) => {
  return imagePath
    ? `https://image.tmdb.org/t/p/w1280/${imagePath}`
    : "https://links.papareact.com/o8z";
};

/**
 * Returns a `srcset` string for poster images using TMDB's discrete widths.
 * Usage: <img srcSet={getPosterSrcSet(path)} sizes="..." />
 */
export const getPosterSrcSet = (imagePath?: string): string => {
  if (!imagePath) return "";
  return POSTER_WIDTHS.map(
    (w) => `https://image.tmdb.org/t/p/w${w}/${imagePath} ${w}w`,
  ).join(", ");
};

/**
 * Returns a `srcset` string for backdrop / hero images.
 */
export const getBackdropSrcSet = (imagePath?: string): string => {
  if (!imagePath) return "";
  return BACKDROP_WIDTHS.map(
    (w) => `https://image.tmdb.org/t/p/w${w}/${imagePath} ${w}w`,
  ).join(", ");
};

/**
 * Tiny 92px poster — used as a blur-up `src` while the real image loads.
 */
export const getTinyPosterPath = (imagePath?: string): string => {
  if (!imagePath) return "https://links.papareact.com/o8z";
  return `https://image.tmdb.org/t/p/w92/${imagePath}`;
};
