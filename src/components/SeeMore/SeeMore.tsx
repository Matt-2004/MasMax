import { SeeMoreResult } from "@/Utils/FetchAPI";
import getImagePath from "@/Utils/GetImagePath";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const SeeMore = ({ data, title }: SeeMoreResult) => {
  // ToDo: When click right and left btn, initpage value have to change +1 or -1;
  // That change indicate the page url and then fetch from api with url last

  const navigate = useNavigate();
  const [initPage, setInitPage] = useState([1, 2, 3, 4]);

  // const [pagesValid, setPageValid] = useState(false);

  function increasePage(e: string) {
    if (e === "increase") {
      navigate(`/seemore/page/${initPage[1]}`);
      initPage[3] !== 20
        ? setInitPage((prev) => prev.map((p) => p + 1))
        : console.log("Reach limit");
    } else {
      navigate(`/seemore/page/${initPage[0]}`);
      initPage[0] !== 1
        ? setInitPage((prev) => prev.map((p) => p - 1))
        : console.log("Reach Limit");
    }
  }

  return (
    <div className='w-[75%] h-[100%] '>
      <div className='flex justify-start text-3xl font-bold my-7 text-[#ffffff]'>
        {title}
      </div>
      <div className='flex flex-wrap justify-center gap-10'>
        {data ? (
          data.map((datas) => (
            <div className='cursor-pointer'>
              <img
                src={getImagePath(datas.poster_path)}
                alt={datas.title}
                width={250}
                className='rounded-md'
              />
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <div className='flex justify-center mt-6 mb-4 text-white'>
        <FontAwesomeIcon
          icon={faChevronLeft}
          onClick={() => increasePage("decrease")}
          className='py-4 px-4 mr-3 border rounded-md  text-[#2eade7] transition-colors duration-300 hover:text-[#26262e] border-gray-600 hover:bg-[#2eade7]'
        />
        {initPage.map((num) => (
          <div className='w-14  text-center flex flex-col justify-center border text-lg text-[#2eade7] transition-colors duration-300 hover:text-[#26262e] border-gray-600 hover:bg-[#2eade7] rounded-md mr-3'>
            {num}
          </div>
        ))}
        <DialogTag />
        <FontAwesomeIcon
          icon={faChevronRight}
          onClick={() => increasePage("increase")}
          className='py-4 px-4 ml-3 border border-gray-600 rounded-md  text-[#2eade7] transition-colors duration-300 hover:text-[#26262e] hover:bg-[#2eade7]'
        />
      </div>
    </div>
  );
};

function DialogTag() {
  const [pages, setPages] = useState(1);
  // ToDo: Check the input value for valid.
  // If valid, don't show error message, if not show message
  // After that indicate page number of the input
  if (pages > 20) console.log("page's value has higher than 20");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className='px-4 py-2 border text-lg text-[#2eade7] transition-colors duration-300 hover:text-[#26262e] border-gray-600 hover:bg-[#2eade7] rounded-md'>
          ...
        </button>
      </DialogTrigger>
      <DialogContent className='w-[400px]'>
        <DialogHeader>
          <DialogTitle>Pages</DialogTitle>
          <DialogDescription>You can go within 20 pages.</DialogDescription>
        </DialogHeader>
        <div className='text-white'>
          <input
            type='number'
            max='2'
            min='1'
            onChange={(e) => setPages(parseInt(e.target.value))}
            className='outline-none text-black px-3 py-1 rounded-md mr-4 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
          />
          <span>/ 20</span>
        </div>
        <DialogFooter>
          <Button type='submit'>Go</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default SeeMore;
