import { getImagePath } from "@/Utils/GetImagePath";
import { MovieResult } from "@/Utils/Interfaces";
import { useNavigate } from "react-router-dom";

const ImageUI = ({ data }: { data: MovieResult[] }) => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-wrap gap-4 cursor-pointer mb-3 lg:w-[62.5rem] md:w-[48.12rem] sm:w-[40rem] max-sm:w-[24rem] justify-between max-sm:justify-evenly'>
      {data.slice(0, 4).map((p: MovieResult) => (
        <div key={p.id} className='relative'>
          <div
            onClick={() => {
              localStorage.setItem("id", p.id.toString()),
                navigate(`/movie/${p.id}`);
            }}
          >
            <Image path={p.poster_path} title={p.title} />
          </div>
        </div>
      ))}
    </div>
  );
};

interface IImage {
  path: string;
  title: string;
}

export function Image({ path, title }: IImage) {
  return (
    <>
      <img
        src={getImagePath(300, path)}
        alt={title}
        loading='lazy'
        className='rounded-md mb-2  transition-all duration-200 lg:w-[14.37rem] md:w-[11.25rem] sm:w-[8.75rem] max-sm:w-[11.5rem]'
      />
    </>
  );
}

export function ImageUIContainer({ children }: any) {
  return (
    <div className='w-[100%] mt-16 mb-8 max-sm:mt-1 flex justify-center'>
      <div className='flex flex-col'>{children}</div>
    </div>
  );
}

export function ImageTitleContainer({ titleName }: { titleName: any }) {
  return (
    <div className='flex justify-between mx-2'>
      <div className='mb-8 lg:text-3xl font-bold  md:text-2xl sm:text-xl max-sm:text-3xl text-[#2eade7]'>
        {titleName}
      </div>
    </div>
  );
}

export default ImageUI;
