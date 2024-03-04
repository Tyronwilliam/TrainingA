import { Dictionary } from "@/types/dictionary";
import { useSession } from "next-auth/react";
import { BsFillTrashFill } from "react-icons/bs";
import DownloadButton from "../../choix/genre/[gender]/DownloadButton";

const CandidateTable = ({
  candidates,
  dictionary,
  detachCandidat,
  packId,
  packName,
  downloadAllFiles,
}: {
  candidates: any;
  dictionary: Dictionary;
  detachCandidat: (packId: number, candidatId: number) => void;
  packId: number;
  packName: string;
  downloadAllFiles: (candidat: any, packName: string | null) => void;
}) => {
  const { data: session } = useSession();

  return (
    <div className="max-h-36 overflow-y-scroll my-4 overflow-x-scroll md:overflow-x-hidden">
      <table className="table-auto w-full ">
        <thead className="text-left font-bold uppercase">
          <tr>
            <th> {dictionary?.genre?.page?.package?.table?.name}</th>
            <th> {dictionary?.genre?.page?.package?.table?.firstname}</th>
            <th> {dictionary?.genre?.page?.package?.table?.gender}</th>
            {/* @ts-ignore */}
            {session?.user?.role === "Admin" && (
              <th className="text-center"> DOWNLOAD</th>
            )}
            <th className="text-center">
              {dictionary?.genre?.page?.package?.table?.delete}
            </th>
          </tr>
        </thead>
        <tbody>
          {candidates
            ?.sort((a: any, b: any) =>
              a?.attributes?.Nom.localeCompare(b?.attributes?.Nom)
            )
            ?.map((candidat: any) => {
              return (
                <tr key={candidat.id}>
                  <td>
                    <span>{candidat.attributes.Nom}</span>
                  </td>
                  <td>
                    <span>{candidat.attributes.Prenom}</span>
                  </td>
                  <td>
                    <span>{candidat.attributes.Sexe}</span>
                  </td>
                  {/* @ts-ignore */}
                  {session?.user?.role === "Admin" && (
                    <td className="flex items-center justify-center">
                      <DownloadButton
                        dictionary={dictionary}
                        candidat={candidat}
                        downloadAllFiles={downloadAllFiles}
                        packName={packName}
                        iconeClass="w-4 h-4"
                      />
                    </td>
                  )}
                  <td>
                    <BsFillTrashFill
                      className="mx-auto cursor-pointer hover:opacity-55"
                      onClick={() => detachCandidat(packId, candidat.id)}
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default CandidateTable;
