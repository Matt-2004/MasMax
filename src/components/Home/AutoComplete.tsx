import { DetilsResult } from "@/Utils/Interfaces";
import { fetchSearchMovie } from "../../Utils/FetchAPI";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getImagePath } from "@/Utils/GetImagePath";

function AutoComplete() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [autoCompleteValue, setAutoCompleteValue] = useState<DetilsResult[]>(
    []
  );
  const [enMovie, setEnMovie] = useState<DetilsResult[]>([]);

  function selectEnglishTypeMovie(values: DetilsResult[]) {
    const result = values.filter((value) => {
      return value.original_language === "en" && value.poster_path !== null;
    });
    setEnMovie(result);
  }

  function descendingOrder() {
    const sort = enMovie.sort((a, b) => {
      const dataA = new Date(a.release_date);
      const dataB = new Date(b.release_date);
      return dataB.getTime() - dataA.getTime();
    });
    setAutoCompleteValue(sort);
  }

  useEffect(() => {
    const fetching = async () => {
      const res = await fetchSearchMovie(searchValue); // res => EnMovie => AutoComplete
      selectEnglishTypeMovie(res);
      descendingOrder();
    };
    fetching();
    console.log(autoCompleteValue);
  }, [searchValue]);

  function handleSearch(e: any) {
    e.preventDefault();
    navigate(`/search/${searchValue}`, { state: { searchValue: searchValue } });
  }
  return (
    <div className='flex sm:flex-row-reverse gap-5'>
      <form
        onSubmit={(e) => {
          handleSearch(e);
        }}
        className='flex h-[2.25rem] sm:w-[17rem] max-sm:w-[12rem] rounded-md items-center border border-gray-600'
      >
        <input
          id='search'
          type='text'
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder='Search...'
          autoComplete='off'
          className='py-1 bg-[#26262e] relative outline-none pl-3  sm:w-[17rem] max-sm:w-[12rem]'
        />
        {searchValue.length > 0 && (
          <>
            {autoCompleteValue.length > 0 ? (
              <ShowAutoCompleteUI autoCompleteValue={autoCompleteValue} />
            ) : (
              <NotFound />
            )}
          </>
        )}
      </form>
    </div>
  );
}

export default AutoComplete;

function NotFound() {
  return (
    <ResultContainer>
      <h1 className='font-roboto h-[2rem] mt-3 text-center'>
        Not Found the result
      </h1>
    </ResultContainer>
  );
}

function ShowAutoCompleteUI({ autoCompleteValue }: any) {
  function setIdAndNavigate(id: number) {
    navigate(`/movie/${id}`), localStorage.setItem("id", id.toString());
  }
  const navigate = useNavigate();
  return (
    <ResultContainer>
      <div className='h-[100%] '>
        {autoCompleteValue.slice(0, 7).map((value: DetilsResult) => (
          <div
            className='flex  hover:bg-slate-500 cursor-pointer'
            onClick={() => setIdAndNavigate(value.id)}
          >
            <img
              className='w-[4rem] h-fit'
              src={getImagePath(200, value.poster_path)}
              alt={value.original_title}
            />
            <h1 className=' w-[17rem] pl-3  overflow-hidden text-md'>
              {value.original_title}
            </h1>
          </div>
        ))}
      </div>
    </ResultContainer>
  );
}

function ResultContainer({ children }: any) {
  return (
    <div className='absolute top-[85%] z-30 bg-[#26262e] w-[17rem] '>
      {children}
    </div>
  );
}
