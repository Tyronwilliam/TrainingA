import React, { FormEvent } from "react";
import PackageItem from "./PackageItem"; // Adjust the import path
import { PackSchema } from "@/types/package";
interface PackageListProps {
  allPack: Array<PackSchema>;
  openPackId: number | null;
  handleToggle: (packId: number, packNom?: string) => void;
  handleInputChange: () => void;
  useUpdatePackageName: () => void; // Adjust the type as per your function signature
  handleTogglePack: (packId: number) => void;
  packName: string;
}
const PackageListLayout = ({
  allPack,
  openPackId,
  handleToggle,
  handleInputChange,
  useUpdatePackageName,
  handleTogglePack,
  packName,
}: PackageListProps) => {
  return (
    <>
      {allPack?.length === 0 ? (
        <p className="text-center">Vous n'avez créé aucun package.</p>
      ) : (
        allPack?.length > 0 && (
          <div className="flex flex-col gap-3 max-h-80 overflow-y-scroll">
            {allPack?.map((pack: PackSchema) => (
              <PackageItem
                key={pack.id}
                pack={pack}
                openPackId={openPackId}
                handleToggle={handleToggle}
                handleInputChange={handleInputChange}
                useUpdatePackageName={useUpdatePackageName}
                handleTogglePack={handleTogglePack}
                packName={packName}
              />
            ))}
          </div>
        )
      )}
    </>
  );
};

export default PackageListLayout;
