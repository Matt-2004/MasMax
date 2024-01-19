import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

function DialogTag() {
  const navigate = useNavigate();
  const btn = useRef<HTMLButtonElement>(null);
  const [pages, setPages] = useState(1);
  const [error, setError] = useState("");

  // ToDo:
  // when input change the btn of initpage have to change
  useEffect(() => {
    if (pages > 20) {
      btn.current?.setAttribute("disabled", "true");
      setError(`Can't go pages of ${pages}, have to type within 20`);
    } else {
      btn.current?.removeAttribute("disabled");
      setError("");
    }
  }, [pages]);

  function exitAndHandleLoader(pages: number) {
    navigate(`/seemore/page/${pages}`);
  }

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
        <div className='text-red-600'>{error}</div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type='submit'
              onClick={() => exitAndHandleLoader(pages)}
              ref={btn}
            >
              Go
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DialogTag;
