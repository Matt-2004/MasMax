import Carousels from "../Carousel/Carousels";
import MovieCard from "./MovieCard";

import Trending from "./Trending";

const MovieCards = () => {
  return (
    <div>
      <Carousels />
      {/* Add Favourite div 
      
      1. Check The database the user have favourite shceme

      if(true) show FavorutieComponents
      if not() dont show
      
      */}
      <Trending />
      <MovieCard />
    </div>
  );
};

export default MovieCards;
