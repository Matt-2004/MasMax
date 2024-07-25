import { MovieResult } from "@/Utils/Interfaces";
import {
  FavouriteBtn,
  Poster_path,
  roundNumber,
} from "../Detils/DetilsComponents";
import PlusOutlined from "@ant-design/icons/PlusOutlined";
import StarFilled from "@ant-design/icons/StarFilled";

const ImageUI = ({ data }: { data: MovieResult[] }) => {
  return (
    <div className='flex flex-wrap gap-4  mb-3 lg:w-[62.5rem] md:w-[48.12rem] sm:w-[40rem] max-sm:w-[24rem] justify-between max-sm:justify-evenly'>
      {data.slice(0, 4).map((p: MovieResult) => (
        <div key={p.id} className='relative'>
          <div>
            <div>
              <Image path={p.poster_path} movie_id={p.id.toString()} />
              <section className=' w-full text-white font-roboto sm:h-[18rem] max-sm:h-[15.62rem] md:h-[20rem] lg:h-[10rem] bg-gray-800'>
                <div className=''>
                  <p className='flex pl-3 py-3 items-center '>
                    <StarFilled className='text-yellow-400 text-sm' />
                    <p className='pl-1 text-gray-300'>
                      {roundNumber(p.vote_average)}
                    </p>
                  </p>
                  <p className='pl-3 cursor-pointer  font-normal text-lg  pb-3'>
                    {p.original_title}
                  </p>
                  <div className='flex justify-center cursor-pointer'>
                    <div className='w-[80%]  text-[#5799ef] font-semibold text-[0.9rem] '>
                      <FavouriteBtn
                        hover_color='bg-gray-600'
                        color='bg-gray-700'
                        text='Watchlist'
                        width='3'
                        icon={
                          <PlusOutlined className='text-[1.1rem] font-semibold' />
                        }
                      />
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

interface IImage {
  path: string;
  movie_id: string;
}

export function Image({ path, movie_id }: IImage) {
  return (
    <>
      <Poster_path poster_path={path} width={22} movie_id={movie_id} />
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
