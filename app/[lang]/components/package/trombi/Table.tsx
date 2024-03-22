import useTrombi from "@/hooks/Zip/useTrombi";
import TBody from "./TBody";
import { CurrentPackProps, TableTh } from "./TrombiLayout";

const Table = ({
  tableTh,
  currentPack,
  isCasting,
}: {
  isCasting: boolean;
  tableTh: TableTh;
  currentPack: CurrentPackProps;
}) => {
  const {
    handleTimeChange,
    editedCandidates,
    sortCandidatesByTime,
    handleRoleChange,
  } = useTrombi(currentPack?.attributes?.candidats?.data);
  return (
    <table className="table-fixed	border-[1px]" id="pdf-content">
      <caption className="text-center uppercase text-2xl mx-auto font-bold border w-full p-2">
        {currentPack?.attributes?.Nom
          ? `${currentPack?.attributes?.Nom}`
          : "Packages"}
      </caption>

      <thead className=" font-bold uppercase border-[1px]  bg-gray-100">
        <tr>
          {Object.keys(tableTh).map((keyName, i) => {
            const label = tableTh[keyName].label;
            const isAdmin = tableTh[keyName].admin;
            if (keyName === "hour") {
              return (
                <th className="w-max p-4 border-[1px]" key={i}>
                  <button onClick={sortCandidatesByTime}>{label}</button>
                </th>
              );
            } else if (!isCasting && !isAdmin) {
              return (
                <th className="w-max p-4 border-[1px]" key={i}>
                  {label}
                </th>
              );
            } else if (isCasting) {
              return (
                <th className="w-max p-4 border-[1px]" key={i}>
                  {label}
                </th>
              );
            }

            return null; // Don't render <th> if conditions are not met
          })}
        </tr>
      </thead>
      <TBody
        isCasting={isCasting}
        editedCandidates={editedCandidates}
        handleTimeChange={handleTimeChange}
        handleRoleChange={handleRoleChange}
      />
    </table>
  );
};

export default Table;
