const Home = () => {
  return (
    <div className='flex justify-center'>
      <div className='lg:h-[300px] md:h-[280px] sm:h-[250px] max-sm:h-[220px] relative flex flex-col justify-around items-center'>
        <input
          type='text'
          className='outline-none flex justify-center lg:w-[800px] md:w-[600px] sm:w-[500px] max-sm:w-[350px] h-[30px] rounded-lg pl-6 '
          placeholder='Search'
        />
        <span className='font-titillium z-20 lg:text-7xl md:text-6xl sm:text-5xl max-sm:text-4xl lg:w-[600px] md:w-[500px] sm:w-[400px] max-sm:w-[400px] text-center text-white font-bold italic'>
          Explore the Million of Movies
        </span>
        <div className='bg-[#0FDDD6] z-10 lg:w-[500px] md:w-[400px] sm:w-[300px] max-sm:w-[300px] lg:h-[150px] md:h-[120px] sm:h-[100px] max-sm:h-[70px] absolute blur-3xl top-[50%]' />
      </div>
    </div>
  );
};

export default Home;
