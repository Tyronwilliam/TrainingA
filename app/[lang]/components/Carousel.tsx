import React, { useEffect, useRef, useState } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper } from "swiper/react";
const Carousel = ({
  children,
  myStyle,
}: {
  children: React.ReactNode;
  myStyle: string;
}) => {
  const navigationPrevRef = useRef<HTMLDivElement | null>(null);
  const navigationNextRef = useRef<HTMLDivElement | null>(null);
  const [swiper, setSwiper] = useState<any | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    if (swiper) {
      swiper.on("slideChange", () => {
        const previousSlideIndex = swiper.previousIndex;
        pauseVideo(previousSlideIndex);
        setCurrentSlideIndex(swiper.realIndex);
      });
    }
  }, [swiper]);

  const pauseVideo = (slideIndex: number) => {
    const videoElement = document.querySelector(`#video-${slideIndex}`);
    if (videoElement instanceof HTMLVideoElement && !videoElement.paused) {
      videoElement.pause();
    }
  };
  return (
    <Swiper
      //@ts-ignore
      modules={[Pagination, Navigation]}
      slidesPerView={1}
      pagination={{ clickable: true }}
      onSwiper={(swiper: any) => setSwiper(swiper)}
      className={myStyle}
      loop={React.Children.count(children) > 1} // Set loop to true if there is more than 1 child
      navigation={{
        prevEl: navigationPrevRef?.current,
        nextEl: navigationNextRef?.current,
      }}
    >
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child as React.ReactElement, {
          key: index,
        })
      )}
      {React.Children.count(children) > 1 && (
        <div className="flex justify-between items-center  z-50 absolute top-2/4 w-full h-fit">
          <div
            className="fill-white w-10 h-20 z-50 bg-black cursor-pointer"
            ref={navigationPrevRef}
          >
            <SlArrowLeft className="fill-white w-full h-full " />
          </div>
          <div
            className="fill-white w-10 h-20 z-50 bg-black cursor-pointer"
            ref={navigationNextRef}
          >
            <SlArrowRight className="fill-white w-full h-full " />
          </div>
        </div>
      )}
    </Swiper>
  );
};

export default Carousel;
