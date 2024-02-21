"use client";
import useToggle from "@/hooks/Basic/useToggle";
import { Dictionary } from "@/types/dictionary";
import { capitalizeFirstLetter } from "../function";
import CarouselLayout from "./CarouselLayout";
import DetailsLayout from "./DetailsLayout";
import ImageLayout from "./ImageLayout";
import { combineArrays } from "./function";
import useZipDownload from "@/hooks/Zip/useZipDownload";

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
  const { downloadAllFiles } = useZipDownload();
  return (
    <section className="flex flex-wrap w-full max-w-6xl min-h-[590px] justify-center items-center shrink-0 gap-6 m-auto pt-14 pb-5 px-5 md:items-start lg:gap-24">
      <ImageLayout
        candidat={candidat}
        letterLastName={letterLastName}
        toggleModal2={toggleModal2}
        image={image}
      />
      <DetailsLayout
        candidat={candidat}
        letterLastName={letterLastName}
        dictionary={dictionary}
        competence={competence}
        toggleModal1={toggleModal1}
        videos={videos}
        downloadAllFiles={downloadAllFiles}
      />
      <CarouselLayout
        toggleModal1={toggleModal1}
        isOpenModal1={isOpenModal1}
        videos={videos}
        toggleModal2={toggleModal2}
        isOpenModal2={isOpenModal2}
        photoPresention={photoPresention}
        portfolio={portfolio}
        letterLastName={letterLastName}
        candidat={candidat}
      />
    </section>
  );
};

export default SingleCandidatLayout;
