import Carousel from "@/app/[lang]/components/Carousel";
import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { SwiperSlide } from "swiper/react";

const VideosCarousel = ({
  videos,
  toggle,
  open,
}: {
  videos: any[];
  toggle: () => void;
  open: boolean;
}) => {
  return (
    open && (
      <dialog
        open={open}
        className="w-full h-full  z-50 flex items-center justify-center fixed top-0 left-0 bg-black"
      >
        {" "}
        <AiFillCloseCircle
          className="z-50 absolute right-6 top-6 fill-white w-6 h-6 cursor-pointer hover:opacity-50 transition-all duration-200 ease-out"
          onClick={toggle}
        />
        <Carousel myStyle="relative container__swiper">
          {videos?.length > 0 &&
            videos?.map((demo: any, index: number) => {
              return (
                <SwiperSlide key={index}>
                  <video
                    preload="true"
                    className="w-full h-full max-h-[710px]"
                    controls
                    controlsList="nodownload"
                    id={`video-${index}`}
                  >
                    <source src={demo?.attributes?.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </SwiperSlide>
              );
            })}
        </Carousel>
      </dialog>
    )
  );
};

export default VideosCarousel;
