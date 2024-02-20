import React, { FormEvent } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import CandidateTable from "./CandidateTable"; // Adjust the import path
import NewItemForm from "./NewItemForm";
import { PackSchema } from "@/types/package";
import { usePackage } from "@/hooks/Package/usePackage";
import classNames from "classnames";
interface PackageItemProps {
  pack: PackSchema;
  openPackId: number | null;
  handleToggle: (packId: number, packNom?: string) => void;
  handleInputChange: () => void;
  useUpdatePackageName: (packId: number) => void; // Adjust the type as per your function signature
  handleTogglePack: (packId: number) => void;
  packName: string;
}
const PackageItem = ({
  pack,
  openPackId,
  handleToggle,
  handleInputChange,
  useUpdatePackageName,
  handleTogglePack,
  packName,
}: PackageItemProps) => {
  const {
    currentTable,
    handleCurrentTable,
    handleCopyUrlClipBoard,
    useDeletePackage,
  } = usePackage();
  return (
    <div
      key={pack.id}
      className="border-[1px] w-[95%] border-white border-opacity-55 radius cursor-pointer p-4 background__grey custom__hover"
      onClick={() => handleCurrentTable(pack?.id)}
    >
      <div
        className={classNames({
          "flex justify-between   font-bold gap-4 items-center": true,
          "border-b-[1px] border-white pb-2": currentTable === pack?.id,
        })}
      >
        <NewItemForm
          isOpen={openPackId === pack.id}
          toggle={() => handleToggle(pack.id, pack.attributes.Nom)}
          handleInputChange={handleInputChange}
          itemValue={packName}
          onSubmit={() => useUpdatePackageName(pack.id)}
          placeholder={pack.attributes.Nom}
          label=""
          isUpdate={true}
          buttonText={pack.attributes.Nom}
        />
        <div onClick={() => handleTogglePack(pack.id)}>
          {currentTable === pack?.id ? (
            <FaChevronDown className="w-4 h-4" />
          ) : (
            <FaChevronRight className="w-4 h-4" />
          )}
        </div>
      </div>
      {currentTable === pack?.id && (
        <>
          <CandidateTable candidates={pack.attributes.candidats?.data} />
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
              GéNéRER LE LIEN
            </button>
            {/* SEULEMENT POUR ADMIN */}
            <button className="boutonSlideCommon p-2 radius w-fit uppercase">
              GéNéRER LES CONTRATS
            </button>
            <button
              onClick={() => useDeletePackage(pack?.id)}
              className="boutonSlideCommon p-2 radius w-fit uppercase"
            >
              SUPPRIMER LE PACKAGE
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PackageItem;
