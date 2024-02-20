import { Dictionary } from "@/types/dictionary";
import React from "react";
import { BsFillTrashFill } from "react-icons/bs";

const CandidateTable = ({
  candidates,
  dictionary,
  onDeleteCandidate,
}: {
  candidates: any;
  dictionary: Dictionary;
  onDeleteCandidate?: () => void;
}) => {
  return (
    <div className="max-h-36 overflow-y-scroll my-4 overflow-x-scroll md:overflow-x-hidden">
      <table className="table-auto w-full ">
        <thead className="text-left font-bold uppercase">
          <tr>
            <th> {dictionary?.genre?.page?.package?.table?.name}</th>
            <th> {dictionary?.genre?.page?.package?.table?.firstname}</th>
            <th> {dictionary?.genre?.page?.package?.table?.gender}</th>
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
            ?.map((candidat: any) => (
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
                <td>
                  <BsFillTrashFill
                    className="mx-auto cursor-pointer hover:opacity-55"
                    // onClick={() => onDeleteCandidate(candidat.id)}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default CandidateTable;
