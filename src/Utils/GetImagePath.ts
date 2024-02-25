export const getImagePath = (imagePath?: string, size) => {
  return imagePath
    ? `http://image.tmdb.org/t/p/w300/${imagePath}`
    : "https://links.papareact.com/o8z";
};
export const getLargeImagePath = (imagePath?: string, size) => {
  return imagePath
    ? `http://image.tmdb.org/t/p/w300/${imagePath}`
    : "https://links.papareact.com/o8z";
};
