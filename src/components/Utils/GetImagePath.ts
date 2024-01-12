const getImagePath = (imagePath?: string) => {
    return imagePath 
    ? `http://image.tmdb.org/t/p/original/${imagePath}` 
    : "https://links.papareact.com/o8z"
}

export default getImagePath;