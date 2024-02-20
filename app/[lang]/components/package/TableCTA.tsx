import { Dictionary } from "@/types/dictionary";
import { PackSchema } from "@/types/package";
import React from "react";

interface TableCTAProps {
  pack: PackSchema;
  dictionary: Dictionary;
  handleCopyUrlClipBoard: (pack: any, packName: string) => void;
  useDeletePackage: (packId: number) => void;
}
const TableCTA = ({
  pack,
  dictionary,
  handleCopyUrlClipBoard,
  useDeletePackage,
}: TableCTAProps) => {
  return (
    <div className="flex flex-col gap-4 w-fit">
      <button
        className="boutonSlideCommon p-2 radius w-fit uppercase"
        onClick={() =>
          handleCopyUrlClipBoard(
            pack.attributes.candidats?.data,
            pack.attributes.Nom
          )
        }
      >
        {dictionary?.genre?.page?.package?.cta[0]}
      </button>
      {/* SEULEMENT POUR ADMIN */}
      <button className="boutonSlideCommon p-2 radius w-fit uppercase">
        {dictionary?.genre?.page?.package?.cta[1]}
      </button>
      <button
        onClick={() => useDeletePackage(pack?.id)}
        className="boutonSlideCommon p-2 radius w-fit uppercase"
      >
        {dictionary?.genre?.page?.package?.cta[2]}
      </button>
    </div>
  );
};

export default TableCTA;
