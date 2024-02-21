import { Dictionary } from "@/types/dictionary";
import { PackSchema } from "@/types/package";
import { useSession } from "next-auth/react";
import React from "react";

interface TableCTAProps {
  pack: PackSchema;
  dictionary: Dictionary;
  handleCopyUrlClipBoard: (pack: any, packName: string) => void;
  useDeletePackage: (packId: number) => void;
  toggleModalForm: () => void;
  setCurrentPack: (pack: PackSchema) => void;
  downloadAllFiles: (candidat: any, packName: string | null) => void;
}
const TableCTA = ({
  pack,
  dictionary,
  handleCopyUrlClipBoard,
  useDeletePackage,
  toggleModalForm,
  setCurrentPack,
  downloadAllFiles,
}: TableCTAProps) => {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col gap-4 w-fit">
      {pack?.attributes?.candidats?.data?.length > 0 && (
        <>
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
          {/* @ts-ignore */}
          {session?.user.role === "Admin" && (
            <>
              <button
                className="boutonSlideCommon p-2 radius w-fit uppercase"
                onClick={() => {
                  toggleModalForm();
                  setCurrentPack(pack);
                }}
              >
                {dictionary?.genre?.page?.package?.cta[1]}
              </button>
              <button
                className="boutonSlideCommon p-2 radius w-fit uppercase"
                onClick={() =>
                  downloadAllFiles(
                    pack.attributes.candidats?.data,
                    pack.attributes.Nom
                  )
                }
              >
                Download media
              </button>
            </>
          )}
        </>
      )}

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
