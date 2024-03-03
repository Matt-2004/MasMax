import Carousels from "../Carousel/Carousels";
import PopularCard from "../Cards/PopularCard";
import TopRatedCard from "../Cards/TopRatedCard";
import Trending from "./Trending";

const MovieCards = () => {
  return (
    <div>
      <Carousels />
      <Trending />
      <PopularCard />
      <TopRatedCard />
    </div>
  );
};

export default MovieCards;
