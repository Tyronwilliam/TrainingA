"use client";
import useToggle from "@/hooks/Basic/useToggle";
import { Dictionary } from "@/types/dictionary";
import CardCandidat from "../Candidat/CardCandidat";
import ImageCandidat from "../Candidat/ImageCandidat";
import Name from "../Candidat/Name";
import { capitalizeFirstLetter } from "../function";
import PhysonomieInfos from "./PhysonomieInfos";
import Skills from "./Skills";
import Carousel from "@/app/[lang]/components/Carousel";
import { SwiperSlide } from "swiper/react";
import { combineArrays } from "./function";
import { AiFillCloseCircle } from "react-icons/ai";

const SingleCandidatLayout = ({
  candidat,
  dictionary,
}: {
  candidat: any;
  dictionary: Dictionary;
}) => {
  const { open, toggle } = useToggle();
  const letterLastName = capitalizeFirstLetter(candidat?.attributes?.Nom);
  const image =
    candidat?.attributes?.Photo_de_presentation?.data?.attributes?.url;
  const competence = candidat?.attributes?.Role_Candidat?.Competence?.Autres;
  const bandeDemo = candidat?.attributes?.Bande_Demo?.data;
  const videoPresentation = candidat?.attributes?.Video_Presentation?.data;
  const videos = combineArrays(bandeDemo, videoPresentation);
  return (
    <section className="flex flex-wrap w-full max-w-6xl min-h-[590px] justify-center items-center shrink-0 gap-6 m-auto pt-14 pb-5 px-5 md:items-start lg:gap-24">
      <div className="relative max-h-[540px] w-full max-w-[333.3px] shrink-0 grow">
        <CardCandidat talent={candidat} nom={letterLastName} showName={false}>
          <ImageCandidat image={image} />
        </CardCandidat>
      </div>
      <div className="flex flex-col justify-between gap-5 h-fit md:max-h-[540px] md:gap-8 w-full max-w-[333.3px] ">
        <Name
          prenom={candidat?.attributes?.Prenom}
          nom={letterLastName}
          classStyle="max-w-[380px]"
          containerStyle="items-center justify-center md:items-start md:justify-start"
        />
        <PhysonomieInfos dictionary={dictionary} candidat={candidat} />
        <Skills dictionary={dictionary} competence={competence} />
        <button
          type="button"
          onClick={toggle}
          className="w-fit font-bold text-xl extraWide uppercase hover:opacity-50 transition-all duration-200 ease-out"
        >
          {dictionary?.singleTalent?.page?.videos}
        </button>
      </div>{" "}
      {open && (
        <dialog
          open={open}
          className="w-full h-full  z-50 flex items-center justify-center fixed border-2 border-red-500 top-0 left-0 bg-black"
        >
          {" "}
          <AiFillCloseCircle
            className="z-50 absolute right-6 top-6 fill-white w-6 h-6 cursor-pointer hover:opacity-50 transition-all duration-200 ease-out"
            onClick={toggle}
          />
          <Carousel myStyle="relative container__swiper">
            {videos?.length > 0 &&
              videos?.map((demo: any) => {
                return (
                  <SwiperSlide key={demo?.id}>
                    <video
                      preload="true"
                      className="w-full h-full max-h-[710px]"
                      controls
                      controlsList="nodownload"
                    >
                      <source src={demo?.attributes?.url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </SwiperSlide>
                );
              })}
          </Carousel>
        </dialog>
      )}
    </section>
  );
};

export default SingleCandidatLayout;
