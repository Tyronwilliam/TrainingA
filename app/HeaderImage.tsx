import Image from "next/image";
import React from "react";
type EnteteImageProps = {
  filename: string;
  alt: string;
  classStyle?: string;
};

const HeaderImage = ({ filename, alt, classStyle }: EnteteImageProps) => {
  return (
    <div className={`relative w-full h-auto mx-auto ${classStyle}`}>
      <Image
        src={filename}
        alt={alt}
        priority={true}
        width={0}
        height={0}
        sizes="(max-width: 768px) 100%, (max-width: 950px) 70%, 70vw"
        style={{ width: "100%", height: "auto" }} // optional
      />
    </div>
  );
};

export default HeaderImage;
