import { Dictionary } from "@/types/dictionary";
import React, { ReactNode } from "react";
import { capitalizeFirstLetter } from "../function";
import Name from "../Candidat/Name";
import ImageCandidat from "../Candidat/ImageCandidat";
import CardCandidat from "../Candidat/CardCandidat";

const SingleCandidatLayout = ({
  candidat,
  dictionary,
}: {
  candidat: any;
  dictionary: Dictionary;
}) => {
  const letterLastName = capitalizeFirstLetter(candidat?.attributes?.Nom);
  const image =
    candidat?.attributes?.Photo_de_presentation?.data?.attributes?.url;
  return (
    <section className="flex flex-wrap w-full max-w-6xl min-h-[590px] justify-center items-center shrink-0 gap-6 m-auto pt-14 pb-5 px-5 md:items-start md:justify-around">
      <div className="relative max-h-[540px] w-full max-w-[333.3px] shrink-0">
        <CardCandidat talent={candidat} nom={letterLastName} showName={false}>
          <ImageCandidat image={image} />
        </CardCandidat>
      </div>
      <div className="flex flex-col gap-5 h-fit w-full max-w-[333.3px] ">
        <Name
          prenom={candidat?.attributes?.Prenom}
          nom={letterLastName}
          classStyle="max-w-[380px]"
        />
        {Object.entries(dictionary?.singleTalent.page.physionomie)?.map(
          ([key, value]) =>
            candidat.attributes?.Physionomie[key] !== undefined && (
              <div
                key={key}
                className="flex justify-between items-center text-lg"
              >
                <p>{value as ReactNode}: </p>
                <p>{`${candidat.attributes.Physionomie[key]}`}</p>
              </div>
            )
        )}
      </div>
    </section>
  );
};

export default SingleCandidatLayout;
