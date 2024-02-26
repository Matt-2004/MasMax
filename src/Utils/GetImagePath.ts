export const getImagePath = (size: number, imagePath?: string) => {
  return imagePath
    ? `http://image.tmdb.org/t/p/w400/${imagePath}`
    : "https://links.papareact.com/o8z";
};
export const getLargeImagePath = (imagePath?: string) => {
  return imagePath
    ? `http://image.tmdb.org/t/p/original/${imagePath}`
    : "https://links.papareact.com/o8z";
};
