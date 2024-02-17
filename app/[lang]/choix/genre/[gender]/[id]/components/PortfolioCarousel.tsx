import Carousel from "@/app/[lang]/components/Carousel";
import Image from "next/image";
import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { SwiperSlide } from "swiper/react";
import Name from "../../Candidat/Name";

const PortfolioCarousel = ({
  toggle,
  open,
  portfolio,
  presentation,
  nom,
  candidat,
}: {
  toggle: () => void;
  open: boolean;
  portfolio: any[];
  presentation: string;
  nom: string | undefined;
  candidat: any;
}) => {
  const elementsParDeux = portfolio?.reduce((acc: any, val: any, idx: any) => {
    idx % 2 === 0 ? acc.push([val]) : acc[acc.length - 1].push(val);
    return acc;
  }, []);
  console.log(portfolio, "ELEMENT");
  return (
    open && (
      <dialog
        open={open}
        className="main__container__carousel pt-20 md:pt-4 px-4 pb-4"
      >
        <AiFillCloseCircle
          className="z-50 absolute right-6 top-6 fill-white w-6 h-6 cursor-pointer hover:opacity-50 transition-all duration-200 ease-out"
          onClick={toggle}
        />{" "}
        <Name
          prenom={candidat?.attributes?.Prenom}
          nom={nom}
          classStyle="max-w-[263px] text-5xl"
          containerStyle="justify-center items-center z-50 "
        />
        <Carousel myStyle="relative container__swiper  ">
          <SwiperSlide>
            <div className="max-w-[895px]  max-h-full mx-auto flex">
              <div className="relative w-full h-full max-h-[600px] z-50 lg:h-[600px]">
                <Image
                  src={`${presentation}`}
                  quality={80}
                  width={400}
                  height={600}
                  priority={true}
                  alt="picture model"
                  className="w-full h-full z-50 max-h-[600px] object-cover"
                  sizes="(max-width: 768px) 50%, (max-width: 1382px) 50%, 50%"
                />
              </div>
            </div>
          </SwiperSlide>
          {elementsParDeux?.length > 0 &&
            elementsParDeux?.map((photoPair: any[], index: number) => {
              return (
                <SwiperSlide key={index}>
                  <div className="max-w-[895px]  max-h-full mx-auto flex">
                    {photoPair.map((pair: any) => (
                      <div
                        key={pair?.id}
                        className="relative shrink-0 grow-0 basis-2/4  max-h-[600px] mx-auto z-50 lg:h-[600px]"
                      >
                        <Image
                          src={`${pair?.attributes?.url}`}
                          quality={80}
                          width={400}
                          height={600}
                          priority={true}
                          alt="picture model"
                          className="w-full h-full z-50 max-h-[600px] object-cover object-top"
                          sizes="(max-width: 768px) 50%, (max-width: 1382px) 50%, 50%"
                        />
                      </div>
                    ))}
                  </div>
                </SwiperSlide>
              );
            })}
        </Carousel>
      </dialog>
    )
  );
};

export default PortfolioCarousel;
