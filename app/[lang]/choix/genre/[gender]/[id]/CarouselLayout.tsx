import React from "react";
import VideoCarousel from "./components/VideoCarousel";
import PortfolioCarousel from "./components/PortfolioCarousel";

const CarouselLayout = ({
  toggleModal1,
  isOpenModal1,
  videos,
  toggleModal2,
  isOpenModal2,
  photoPresention,
  portfolio,
  letterLastName,
  candidat,
}: {
  toggleModal1: () => void;
  isOpenModal1: boolean;
  videos: any[];
  toggleModal2: () => void;
  isOpenModal2: boolean;
  photoPresention: string;
  portfolio: any[];
  letterLastName: string | undefined;
  candidat: any;
}) => {
  return (
    <>
      {" "}
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
    </>
  );
};

export default CarouselLayout;
