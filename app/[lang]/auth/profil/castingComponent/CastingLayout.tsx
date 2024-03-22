import React from "react";
import { Casting, CastingLayoutProps } from "../type";
import CastingCard from "./CastingCard";

const CastingLayout: React.FC<CastingLayoutProps> = ({
  castings,
  candidat,
  connectCandidat,
  dissociateCandidat,
}) => {
  return (
    <>
      {castings && castings.length > 0 && (
        <section className="w-full h-fit max-w-[730px] mt-6">
          <h2 className="text-2xl font-bold mb-4">Casting</h2>
          <section className="w-full h-full flex flex-wrap gap-4 ">
            {castings.map((casting: Casting) => {
              return (
                <div
                  className="flex flex-col gap-4 border-[1px] border-white w-full h-fit p-5 radius max-w-[230px] grow shrink-0"
                  key={casting?.id}
                >
                  <div>
                    <h2 className="text-xl font-bold mb-2">
                      {casting?.attributes?.Titre}
                    </h2>
                  </div>
                  {casting?.attributes?.Informations?.length > 0 &&
                    casting?.attributes?.Informations?.map((infos) => {
                      const dateString = infos?.Date_Casting;
                      const formattedDate = dateString
                        ?.split("-")
                        ?.reverse()
                        ?.join("/");
                      const alreadyDisponible = infos?.disponibles?.data?.some(
                        (talent) => talent?.id === candidat?.id
                      );
                      const alreadyIndisponible =
                        infos?.indisponibles?.data?.some(
                          (talent) => talent?.id === candidat?.id
                        );

                      return (
                        <CastingCard
                          key={infos?.id}
                          lieu={casting?.attributes?.Lieu}
                          formattedDate={formattedDate}
                          alreadyDisponible={alreadyDisponible}
                          alreadyIndisponible={alreadyIndisponible}
                          connectCandidat={connectCandidat}
                          dissociateCandidat={dissociateCandidat}
                          disponibleText={infos?.Disponible}
                          indisponibleText={infos?.Indisponible}
                          castingId={casting?.id}
                          candidatId={candidat?.id}
                          dateString={dateString}
                          Informations={casting?.attributes?.Informations}
                          infosId={infos?.id}
                        />
                      );
                    })}
                </div>
              );
            })}
          </section>{" "}
        </section>
      )}
    </>
  );
};

export default CastingLayout;
