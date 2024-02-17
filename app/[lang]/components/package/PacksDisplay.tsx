import React from "react";
import {
  handleAddToPack,
  isCandidatInPack,
} from "../../choix/genre/[gender]/functionPackage";

const PacksDisplay = ({
  allPack,
  candidatId,
}: {
  allPack: any[];
  candidatId: number | null;
}) => {
  return (
    <div className="">
      {allPack?.map((pack: any) => {
        const checked =
          candidatId !== null && isCandidatInPack(pack, candidatId);
        return (
          <div key={pack.id}>
            <input
              type="checkbox"
              id={pack.id}
              checked={checked}
              onChange={() => {
                candidatId !== null &&
                  handleAddToPack(checked, candidatId, pack.id);
              }}
            />
            <label htmlFor={pack.id}>
              <p>{pack.attributes.Nom}</p>
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default PacksDisplay;
