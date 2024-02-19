import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import axios from "axios";
import { MovieResult, fetchUpComingMoive } from "@/Utils/FetchAPI";
import getImagePath from "@/Utils/GetImagePath";

const SwiperMovies = () => {
  const [upcoming, setUpComing] = useState([]);
  //   const swiper = new Swiper(".swiper", {
  //     modules: [Navigation, Pagination],

  //     direction: "vertical",
  //     loop: true,

  //     // If we need pagination
  //     pagination: {
  //       el: ".swiper-pagination",
  //     },

  //     // Navigation arrows
  //     navigation: {
  //       nextEl: ".swiper-button-next",
  //       prevEl: ".swiper-button-prev",
  //     },
  //   });

  useEffect(() => {
    const upComingMovies = async () => {
      const movies = await fetchUpComingMoive();
      setUpComing(movies);
    };
    upComingMovies();
  }, []);

  return (
    <div className="flex justify-center">
      <Swiper
        className="swiper_container"
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={2}
        pagination={{ el: ".swiper-pagination", clickable: true }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
      >
        {upcoming.map((data: MovieResult) => (
          <SwiperSlide>
            <div className="flex">
              <img
                src={getImagePath(data.poster_path)}
                className="rounded-sm"
                width={300}
                height={500}
              />
              <span className="text-center w-[400px] pt-2 text-xl font-medium font-roboto text-white">
                {data.original_title}
              </span>
            </div>
          </SwiperSlide>
        ))}
        <div className="slider-controller">
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>
    </div>
  );
};

export default SwiperMovies;
