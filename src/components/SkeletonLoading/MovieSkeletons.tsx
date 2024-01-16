const MovieSkeletons = () => {
  return (
    <div className="" mb-4>
      <div className="flex justify-between ml-3 mr-3">
        <div className="w-[90px] animate-pulse h-[20px] bg-gray-500 mt-7" />
        <div className="w-[90px] animate-pulse h-[27px] bg-gray-500 mt-7" />
      </div>
      <div className="flex flex-row overflow-hidden gap-6 mx-2 pt-4 mb-6">
        <div className="w-[300px] h-[150px] animate-pulse bg-gray-500" />
        <div className="w-[100px] h-[150px] animate-pulse bg-gray-500" />
      </div>
    </div>
  );
};

export default MovieSkeletons;
