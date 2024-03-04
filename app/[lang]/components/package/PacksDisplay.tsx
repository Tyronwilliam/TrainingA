import React from "react";
import {
  handleAddToPack,
  isCandidatInPack,
} from "../../choix/genre/[gender]/functionPackage";

const PacksDisplay = ({
  allPack,
  candidatId,
  connectCandidatsAndPackage,
}: {
  allPack: any[];
  candidatId: number | null;
  connectCandidatsAndPackage: (packageId: number, candidatId: number) => void;
}) => {
  return (
    <div className="flex flex-col gap-4 max-h-40 overflow-y-scroll">
      {allPack?.length > 0 ? (
        allPack?.map((pack: any) => {
          const checked =
            candidatId !== null && isCandidatInPack(pack, candidatId);
          return (
            <div key={pack.id} className="flex gap-2 items-center">
              <input
                type="checkbox"
                id={pack.id}
                checked={checked}
                onChange={() => {
                  candidatId !== null &&
                    handleAddToPack(
                      checked,
                      candidatId,
                      pack.id,
                      connectCandidatsAndPackage
                    );
                }}
              />
              <label htmlFor={pack.id}>
                <p>{pack.attributes.Nom}</p>
              </label>
            </div>
          );
        })
      ) : (
        <p className="text-center text-lg">
          Création de &quot;Package&quot; requis
        </p>
      )}
    </div>
  );
};

export default PacksDisplay;
