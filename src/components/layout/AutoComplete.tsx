import { DetilsResult } from "@/lib/Interfaces";
import { fetchSearchMovie } from "@/lib/FetchAPI";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/** Inline replacement for @ant-design/icons SearchOutlined */
function SearchOutlined({ className }: { className?: string }) {
  return (
    <svg
      viewBox="64 64 896 896"
      className={className}
      fill="currentColor"
      aria-hidden="true"
      width="1em"
      height="1em"
    >
      <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.3 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z" />
    </svg>
  );
}

function AutoComplete() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [autoCompleteValue, setAutoCompleteValue] = useState<DetilsResult[]>(
    [],
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
      className="flex items-center sm:flex-row-reverse gap-5"
      onMouseLeave={() => setSearchValue("")}
    >
      <form
        onSubmit={(e) => {
          handleSearch(e);
        }}
        className=""
      >
        <input
          id="search"
          type="text"
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search..."
          autoComplete="off"
          className=" py-[3px] rounded-sm pl-2 text-[#26262e] placeholder:text-[#5a5a66] text-md font-roboto relative outline-none   sm:w-[14rem]"
        />
        <SearchOutlined className="text-xl text-[#26262e] pr-5" />
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
      <h1 className="font-roboto h-[2rem] mt-3 text-center">
        Not Found the result
      </h1>
    </ResultContainer>
  );
}

function ShowAutoCompleteUI({ autoCompleteValue }: any) {
  function setIdAndNavigate(id: number) {
    (navigate(`/movie/${id}`), localStorage.setItem("id", id.toString()));
  }
  const navigate = useNavigate();
  return (
    <ResultContainer>
      <div className="h-[100%] rounded-lg border border-[#2eade7] w-full ">
        {autoCompleteValue.slice(0, 7).map((value: DetilsResult) => (
          <div
            key={value.id}
            className="flex hover:bg-slate-500 cursor-pointer min-h-[44px] items-center"
            onClick={() => setIdAndNavigate(value.id)}
          >
            <h1 className=" w-[17rem] pl-5 py-1 hover:bg-gray-500 font-roboto overflow-hidden text-md">
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
    <div className="absolute top-[5%] z-30 bg-[#26262e] w-[17rem]  ">
      {children}
    </div>
  );
}
