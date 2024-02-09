import NavBar from "./NavBar";

const Home = () => {
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div className='flex justify-center '>
        <div className='lg:h-[400px] md:h-[350px] sm:h-[300px] max-sm:h-[210px] relative flex flex-col justify-around items-center'>
          <input
            type='text'
            className='outline-none placeholder:font-normal placeholder:opacity-80 placeholder:font-roboto flex justify-center lg:w-[1000px] md:w-[800px] sm:w-[600px] max-sm:w-[350px] h-[2.2rem] rounded-md pl-6 '
            placeholder='Search'
          />
          <span className='font-titillium z-20 lg:text-9xl md:text-8xl sm:text-7xl max-sm:text-5xl lg:w-[1000px] md:w-[800px] sm:w-[600px] max-sm:w-[368px] text-center text-white font-bold italic'>
            Explore the Million of Movies
          </span>
          <div className='bg-[#0FDDD6] z-10 lg:w-[700px] md:w-[600px] sm:w-[500px] max-sm:w-[500px] lg:h-[150px] md:h-[120px] sm:h-[100px] max-sm:h-[70px] absolute blur-3xl top-[50%]' />
        </div>
      </div>
    </div>
  );
};

export default Home;
