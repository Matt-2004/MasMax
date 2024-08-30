import { DetilsResult } from "@/Utils/Interfaces";
import { fetchSearchMovie } from "../../Utils/FetchAPI";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchOutlined from "@ant-design/icons/SearchOutlined";

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
    // fetch data -> selectEnglishTypeMovie => enMovie -> descendingOrder => autoCompleteMovi
    const fetching = async () => {
      // fetch the data first
      const res = await fetchSearchMovie(searchValue);
      // filter only English Video and the result push to #enMovie
      selectEnglishTypeMovie(res);
      // descend order of enMovie => put result to #autoCompleteValue
      descendingOrder();
    };
    fetching();
  }, [searchValue]);

  function handleSearch(e: any) {
    e.preventDefault();
    navigate(`/search/${searchValue}`, { state: { searchValue: searchValue } });
  }

  return (
    <div
      className='flex items-center sm:flex-row-reverse gap-5'
      onMouseLeave={() => setSearchValue("")}
    >
      <form
        onSubmit={(e) => {
          handleSearch(e);
        }}
        className=''
      >
        <input
          id='search'
          type='text'
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder='Search...'
          autoComplete='off'
          className=' py-[3px] rounded-sm pl-2 text-[#26262e] placeholder:text-[#26262e] text-md font-roboto relative outline-none   sm:w-[14rem]'
        />
        <SearchOutlined className='text-xl text-[#26262e] pr-5' />
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
      <div className='h-[100%] rounded-lg border border-[#2eade7] w-full '>
        {autoCompleteValue.slice(0, 7).map((value: DetilsResult) => (
          <div
            className='flex hover:bg-slate-500 cursor-pointer'
            onClick={() => setIdAndNavigate(value.id)}
          >
            <h1 className=' w-[17rem] pl-5 py-1 hover:bg-gray-500 font-roboto overflow-hidden text-md'>
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
    <div className='absolute top-[5%] z-30 bg-[#26262e] w-[17rem]  '>
      {children}
    </div>
  );
}
