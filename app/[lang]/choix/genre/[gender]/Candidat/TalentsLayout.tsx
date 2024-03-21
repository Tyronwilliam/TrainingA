import React from "react";
import { capitalizeFirstLetter } from "../function";
import Link from "next/link";
import ImageCandidat from "./ImageCandidat";
import CardCandidat from "./CardCandidat";

const TalentsLayout = ({
  candidat,
  pathname,
  toggle,
  isPackagePage,
  handleClientDetachPack,
  packId,
}: {
  candidat: any;
  pathname: string;
  toggle?: () => void;
  isPackagePage: boolean;
  handleClientDetachPack?: (packId: number, candidatId: number) => void;
  packId?: string;
}) => {
  return (
    <section className="flex flex-wrap justify-center items-center flex-col md:flex-row w-full h-fit gap-10 md:gap-5 md:justify-start p-5 md:gap-y-[50px] max-w-[1100px] mx-auto">
      {candidat?.length > 0 &&
        candidat?.map((talent: any) => {
          const image =
            talent?.attributes?.Photo_de_presentation?.data?.attributes?.url;
          const letterLastName = capitalizeFirstLetter(talent?.attributes?.Nom);
          return (
            <CardCandidat
              talent={talent}
              nom={letterLastName}
              key={talent?.id}
              showName={true}
              toggle={toggle}
              isPackagePage={isPackagePage}
              handleClientDetachPack={handleClientDetachPack}
              packId={packId}
            >
              <Link href={`${pathname}/${talent?.id}`}>
                <ImageCandidat image={image} />
              </Link>
            </CardCandidat>
          );
        })}
    </section>
  );
};

export default TalentsLayout;
