import { Dictionary } from "@/types/dictionary";
import { PackSchema } from "@/types/package";
import PackageItem from "./PackageItem"; // Adjust the import path
interface PackageListProps {
  allPack: Array<PackSchema>;
  openPackId: number | null;
  handleToggle: (packId: number, packNom?: string) => void;
  handleInputChange: () => void;
  toggleModalForm: () => void;
  editPackageName: () => void; // Adjust the type as per your function signature
  handleTogglePack: (packId: number) => void;
  packName: string;
  dictionary: Dictionary;
  toggleModalTable: () => void;
}
const PackageListLayout = ({
  allPack,
  openPackId,
  handleToggle,
  handleInputChange,
  editPackageName,
  handleTogglePack,
  packName,
  dictionary,
  toggleModalForm,
  toggleModalTable,
}: PackageListProps) => {
  return (
    <>
      {allPack?.length === 0 ? (
        <p className="text-center">{dictionary?.genre?.page?.package?.empty}</p>
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
                editPackageName={editPackageName}
                handleTogglePack={handleTogglePack}
                packName={packName}
                dictionary={dictionary}
                toggleModalForm={toggleModalForm}
                toggleModalTable={toggleModalTable}
              />
            ))}
          </div>
        )
      )}
    </>
  );
};

export default PackageListLayout;
