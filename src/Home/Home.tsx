import NavBar from "./NavBar";
import SwiperMovies from "./SwiperMovies";

const Home = () => {
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div className="flex justify-center ">
        <div className="lg:h-[15rem] md:h-[10rem] sm:h-[5rem] max-sm:h-[13.125rem] relative flex flex-col justify-around items-center mb-20">
          <input
            type="text"
            className="outline-none placeholder:font-normal placeholder:opacity-80 placeholder:font-roboto flex justify-center md:w-[44rem] sm:w-[37.5rem] max-sm:w-[26.87rem] h-[2.2rem] rounded-md pl-6 "
            placeholder="Search"
          />
          <span className="font-titillium z-20 lg:text-5xl md:text-4xl sm:text-3xl max-sm:text-5xl lg:w-[51rem] md:w-[38rem] sm:w-[32rem] max-sm:w-[25rem] text-center text-white font-bold italic">
            Explore the Million of Movies
          </span>{" "}
        </div>
      </div>
      <SwiperMovies />
    </div>
  );
};

export default Home;
