import ImageCandidat from "@/app/[lang]/choix/genre/[gender]/Candidat/ImageCandidat";
import useTrombi from "@/hooks/Zip/useTrombi";
import { ChangeEvent, useEffect, useState } from "react";
import { CurrentPackProps } from "./TrombiLayout";

const TBody = ({
  currentPack,
  isCasting,
}: {
  currentPack: CurrentPackProps;
  isCasting: boolean;
}) => {
  const { handleTimeChange, handleRoleChange, saveChanges, editedCandidates } =
    useTrombi();
  return (
    <tbody>
      {currentPack?.attributes?.candidats?.data?.length > 0 &&
        currentPack?.attributes?.candidats?.data?.map((candidat: any) => {
          return (
            <tr key={candidat?.id}>
              <td className="p-4 border-[1px]">
                <input
                  className="text-black max-w-20 placeholder:text-gray-500 focus:text-black"
                  type="text"
                  value={editedCandidates[candidat.id]?.heure || ""}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleTimeChange(candidat.id, e.target.value)
                  }
                  placeholder="Heure"
                />
              </td>
              <td className="p-4 border-[1px]">
                <input
                  className="text-black max-w-20 placeholder:text-gray-500 focus:text-black"
                  type="text"
                  value={editedCandidates[candidat.id]?.role || ""}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleRoleChange(candidat.id, e.target.value)
                  }
                  placeholder="Rôle"
                />
              </td>
              <td className="p-[5px] border-[1px] max-h-28 max-w-20">
                {candidat?.attributes?.Photo_de_presentation?.data?.attributes
                  ?.formats?.medium?.url ? (
                  <FetchImage
                    image={
                      candidat?.attributes?.Photo_de_presentation?.data
                        ?.attributes?.formats?.medium?.url
                    }
                  />
                ) : (
                  <FetchImage
                    image={
                      candidat?.attributes?.Photo_de_presentation?.data
                        ?.attributes?.url
                    }
                  />
                )}
              </td>
              <td className="p-4 border-[1px]">
                {candidat?.attributes?.Prenom}
              </td>
              <td className="p-4 border-[1px]">
                {candidat?.attributes?.Nom && candidat.attributes.Nom.charAt(0)}
              </td>
              <td className="p-4 border-[1px] text-nowrap">
                {candidat?.attributes?.Age} ans/years
              </td>
              <td className="p-4 border-[1px] text-nowrap">
                {candidat?.attributes?.Date_de_naissance} à{" "}
                {candidat?.attributes?.Lieu_de_Naissance?.Ville}
              </td>
              <td className="p-4 border-[1px]">
                {candidat?.attributes?.Physionomie?.Taille}
              </td>
              <td className="p-4 border-[1px] flex flex-col gap-1 items-center justify-center">
                <p>
                  Haut/Top:
                  {candidat?.attributes?.Physionomie?.Confection_Haut}
                </p>
                <p>
                  Bas/Bottom:
                  {candidat?.attributes?.Physionomie?.Confection_Bas}
                </p>
                <p>
                  Chaussures/Shoes:
                  {candidat?.attributes?.Physionomie?.Chaussures}
                </p>
              </td>
              <td className="p-4 border-[1px]">
                {candidat?.attributes?.Location?.Ville}
                {/* CITY */}
              </td>
              {isCasting && (
                <>
                  <td className="p-4 border-[1px]">
                    {candidat?.attributes?.Telephone
                      ? `0${candidat?.attributes?.Telephone}`
                      : ""}
                  </td>
                  <td className="p-4 border-[1px]">
                    {candidat?.attributes?.Email}
                  </td>
                </>
              )}
              <td className="p-4 border-[1px]">
                {candidat?.attributes?.Agence?.En_Agence ? (
                  <div>
                    {`Oui ${candidat?.attributes?.Agence?.Agence_Infos}`}
                  </div>
                ) : (
                  "NON"
                )}
              </td>
              {isCasting && (
                <td className="p-4 border-[1px]">
                  {candidat?.attributes?.Infos_Administrative?.Securite_sociale}
                </td>
              )}
            </tr>
          );
        })}
    </tbody>
  );
};

export default TBody;
function FetchImage({ image }: { image: string }) {
  const [imageSrc, setImageSrc] = useState<undefined | string>(undefined);
  useEffect(() => {
    if (image) {
      fetch("/api/fetchImage", {
        method: "POST",
        body: JSON.stringify({ body: { image } }), // Assuming your server expects a JSON body
        headers: {
          "Content-Type": "application/json", // Specify the content type as JSON
        },
      })
        .then(async (response) => {
          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || "Failed to fetch image");
          }

          setImageSrc(data.res);
        })
        .catch((error) => console.error("Error fetching image:", error));
    }
  }, [image]);
  return imageSrc && <ImageCandidat image={imageSrc} />;
}
