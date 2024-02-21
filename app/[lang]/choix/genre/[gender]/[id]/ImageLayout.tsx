import React from "react";
import CardCandidat from "../Candidat/CardCandidat";
import ImageCandidat from "../Candidat/ImageCandidat";

const ImageLayout = ({
  toggleModal2,
  candidat,
  letterLastName,
  image,
}: {
  toggleModal2: () => void;
  candidat: any;
  letterLastName: string | undefined;
  image: string;
}) => {
  return (
    <div
      onClick={toggleModal2}
      className="relative max-h-[540px] w-full max-w-[333.3px] shrink-0 grow apparition__opacity"
    >
      <CardCandidat
        talent={candidat}
        nom={letterLastName}
        showName={false}
        showFolio={true}
        isPackagePage={false}
      >
        <ImageCandidat image={image} />
      </CardCandidat>
    </div>
  );
};

export default ImageLayout;
