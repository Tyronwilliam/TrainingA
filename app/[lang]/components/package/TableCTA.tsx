import { Dictionary } from "@/types/dictionary";
import { PackSchema } from "@/types/package";
import { useSession } from "next-auth/react";

interface TableCTAProps {
  pack: PackSchema;
  dictionary: Dictionary;
  // handleCopyUrlClipBoard: (pack: any, packName: string) => void;
  handleCopyUrlClipBoard: (pack: any) => void;
  trashPackage: (packId: number) => void;
  toggleModalForm: () => void;
  toggleModalTable: () => void;
  setCurrentPack: (pack: PackSchema) => void;
  downloadAllFiles: (candidat: any, packName: string | null) => void;
  handleCopyAllEmail: (candidats: any) => void;
}
const TableCTA = ({
  pack,
  dictionary,
  handleCopyUrlClipBoard,
  trashPackage,
  toggleModalForm,
  setCurrentPack,
  downloadAllFiles,
  toggleModalTable,
  handleCopyAllEmail,
}: TableCTAProps) => {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col gap-4 w-fit">
      {pack?.attributes?.candidats?.data?.length > 0 && (
        <>
          <button
            className="boutonSlideCommon p-2 radius w-fit uppercase"
            onClick={() => handleCopyUrlClipBoard(pack?.id)}
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
              <button
                className="boutonSlideCommon p-2 radius w-fit uppercase"
                onClick={() =>
                  handleCopyAllEmail(pack.attributes.candidats?.data)
                }
              >
                Liste des emails
              </button>
            </>
          )}
        </>
      )}

      <button
        onClick={() => trashPackage(pack?.id)}
        className="boutonSlideCommon p-2 radius w-fit uppercase"
      >
        {dictionary?.genre?.page?.package?.cta[2]}
      </button>
    </div>
  );
};

export default TableCTA;
