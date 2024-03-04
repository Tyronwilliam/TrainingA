import { Dictionary } from "@/types/dictionary";
import React, { ReactNode } from "react";

const PhysonomieInfos = ({
  dictionary,
  candidat,
}: {
  dictionary: Dictionary;
  candidat: any;
}) => {
  return (
    <div className="flex flex-col gap-5">
      {Object.entries(dictionary?.singleTalent.page.physionomie)?.map(
        ([key, value]) =>
          candidat.attributes?.Physionomie[key] !== undefined && (
            <div
              key={key}
              className="flex justify-between items-center text-lg select-none"
            >
              <p>{value as ReactNode}: </p>
              <p className="inline-block w-[100px]">{`${candidat.attributes.Physionomie[key]}`}</p>
            </div>
          )
      )}
    </div>
  );
};

export default PhysonomieInfos;
