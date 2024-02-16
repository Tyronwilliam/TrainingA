"use client";
import useToggle from "@/hooks/Basic/useToggle";
import { Dictionary } from "@/types/dictionary";
import CardCandidat from "../Candidat/CardCandidat";
import ImageCandidat from "../Candidat/ImageCandidat";
import Name from "../Candidat/Name";
import { capitalizeFirstLetter } from "../function";
import PhysonomieInfos from "./PhysonomieInfos";
import Skills from "./Skills";
import { combineArrays } from "./function";
import VideoCarousel from "./VideoCarousel";
import PortfolioCarousel from "./PortfolioCarousel";

const SingleCandidatLayout = ({
  candidat,
  dictionary,
}: {
  candidat: any;
  dictionary: Dictionary;
}) => {
  const { open: isOpenModal1, toggle: toggleModal1 } = useToggle();
  const { open: isOpenModal2, toggle: toggleModal2 } = useToggle();
  const letterLastName = capitalizeFirstLetter(candidat?.attributes?.Nom);
  const image =
    candidat?.attributes?.Photo_de_presentation?.data?.attributes?.url;
  const competence = candidat?.attributes?.Role_Candidat?.Competence?.Autres;
  const bandeDemo = candidat?.attributes?.Bande_Demo?.data;
  const videoPresentation = candidat?.attributes?.Video_Presentation?.data;
  const videos = combineArrays(bandeDemo, videoPresentation);
  const photoPresention =
    candidat?.attributes?.Photo_de_presentation?.data?.attributes?.url;
  const portfolio = candidat?.attributes?.Portfolio?.Portfolio?.data;

  return (
    <section className="flex flex-wrap w-full max-w-6xl min-h-[590px] justify-center items-center shrink-0 gap-6 m-auto pt-14 pb-5 px-5 md:items-start lg:gap-24">
      <div
        onClick={toggleModal2}
        className="relative max-h-[540px] w-full max-w-[333.3px] shrink-0 grow"
      >
        <CardCandidat
          talent={candidat}
          nom={letterLastName}
          showName={false}
          showFolio={true}
        >
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
        {videos?.length > 0 && (
          <button
            type="button"
            onClick={toggleModal1}
            className="w-fit  font-bold text-xl extraWide uppercase hover:opacity-50 transition-all duration-200 ease-out"
          >
            {dictionary?.singleTalent?.page?.videos}
          </button>
        )}
      </div>{" "}
      <VideoCarousel
        toggle={toggleModal1}
        open={isOpenModal1}
        videos={videos}
      />
      <PortfolioCarousel
        toggle={toggleModal2}
        open={isOpenModal2}
        presentation={photoPresention}
        portfolio={portfolio}
        nom={letterLastName}
        candidat={candidat}
      />
    </section>
  );
};

export default SingleCandidatLayout;
