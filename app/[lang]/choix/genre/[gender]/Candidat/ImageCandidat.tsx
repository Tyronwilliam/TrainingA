import Image from "next/image";
import React from "react";

const ImageCandidat = ({ image }: { image: string }) => {
  return (
    <Image
      src={`${image}`}
      alt="Modèle"
      priority
      width={333}
      height={500}
      quality={80}
      className="object-cover object-top w-full max-h-[435px] h-auto hover:scale-100 scale-110 transition-all ease-in duration-200	  	"
    />
  );
};

export default ImageCandidat;
