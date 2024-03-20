import { usePackage } from "@/hooks/Package/usePackage";
import { Dictionary } from "@/types/dictionary";
import { PackSchema } from "@/types/package";
import classNames from "classnames";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import CandidateTable from "./CandidateTable"; // Adjust the import path
import NewItemForm from "./NewItemForm";
import TableCTA from "./TableCTA";
interface PackageItemProps {
  pack: PackSchema;
  openPackId: number | null;
  handleToggle: (packId: number, packNom?: string) => void;
  handleInputChange: () => void;
  toggleModalForm: () => void;
  editPackageName: (packId: number) => void; // Adjust the type as per your function signature
  handleTogglePack: (packId: number) => void;
  packName: string;
  dictionary: Dictionary;
}
const PackageItem = ({
  pack,
  openPackId,
  handleToggle,
  handleInputChange,
  editPackageName,
  handleTogglePack,
  packName,
  dictionary,
  toggleModalForm,
}: PackageItemProps) => {
  const {
    currentTable,
    handleCurrentTable,
    handleCopyUrlClipBoard,
    trashPackage,
    detachCandidat,
    setCurrentPack,
    downloadAllFiles,
    handleCopyAllEmail,
  } = usePackage();
  return (
    <div
      key={pack.id}
      className=" border-[1px] w-[95%] border-white border-opacity-55 radius cursor-pointer p-4 background__grey custom__hover"
    >
      <div
        className={classNames({
          "flex justify-between   font-bold gap-4 items-center": true,
          "border-b-[1px] border-white pb-2": currentTable === pack?.id,
        })}
        onClick={() => handleCurrentTable(pack?.id)}
      >
        <NewItemForm
          isOpen={openPackId === pack.id}
          toggle={() => handleToggle(pack.id, pack.attributes.Nom)}
          handleInputChange={handleInputChange}
          itemValue={packName}
          onSubmit={() => editPackageName(pack.id)}
          placeholder={pack.attributes.Nom}
          label=""
          isUpdate={true}
          buttonText={pack.attributes.Nom}
          dictionary={dictionary}
        />
        <div
          onClick={(e) => {
            e.stopPropagation();
            handleCurrentTable(pack?.id);
            // handleTogglePack(pack.id);
          }}
        >
          {currentTable === pack?.id ? (
            <FaChevronDown className="w-4 h-4" />
          ) : (
            <FaChevronRight className="w-4 h-4" />
          )}
        </div>
      </div>
      {currentTable === pack?.id && (
        <>
          <CandidateTable
            candidates={pack.attributes.candidats?.data}
            dictionary={dictionary}
            detachCandidat={detachCandidat}
            packId={pack?.id}
            packName={pack.attributes.Nom}
            downloadAllFiles={downloadAllFiles}
          />
          <TableCTA
            dictionary={dictionary}
            pack={pack}
            handleCopyUrlClipBoard={handleCopyUrlClipBoard}
            trashPackage={trashPackage}
            toggleModalForm={toggleModalForm}
            setCurrentPack={setCurrentPack}
            downloadAllFiles={downloadAllFiles}
            handleCopyAllEmail={handleCopyAllEmail}
          />
        </>
      )}
    </div>
  );
};

export default PackageItem;
