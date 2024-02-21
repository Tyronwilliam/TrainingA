import { Dictionary } from "@/types/dictionary";
import Modal from "./Modal";
import NewItemForm from "./NewItemForm";
import PacksDisplay from "./PacksDisplay";

interface DialogPackageProps {
  openModal: boolean;
  openInput: boolean;
  toggleModal: () => void;
  toggleInput: () => void;
  allPack: any[];
  candidatId: number | null;
  connectCandidatsAndPackage: (
    packageId: number,
    candidatId: number
  ) => void;
  packName: string;
  useCreatePackage: () => void;
  handleInputChange: () => void;
  dictionary: Dictionary;
}
const DialogPackage = ({
  openModal,
  openInput,
  toggleModal,
  toggleInput,
  allPack,
  candidatId,
  connectCandidatsAndPackage,
  handleInputChange,
  packName,
  useCreatePackage,
  dictionary,
}: DialogPackageProps) => {
  const handleToggle = () => {
    toggleModal();
    openInput && toggleInput();
  };
  return (
    <Modal
      open={openModal}
      toggle={handleToggle}
      classSection="fixed w-full h-full top-0 left-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      classDialog="text-white background__grey w-[90%] max-w-md min-w-64 flex flex-col gap-4 p-5"
      classIcone="z-50 absolute right-4 top-3 fill-white w-6 h-6 cursor-pointer hover:opacity-50 transition-all duration-200 ease-out"
    >
      <div className="">
        <span>{dictionary?.genre?.page?.package?.save}</span>
      </div>
      <PacksDisplay
        candidatId={candidatId}
        allPack={allPack}
        connectCandidatsAndPackage={connectCandidatsAndPackage}
      />
      <NewItemForm
        isOpen={openInput}
        toggle={toggleInput}
        handleInputChange={handleInputChange}
        itemValue={packName}
        onSubmit={useCreatePackage}
        placeholder="Ex: Acteur Casting Plage"
        label={dictionary?.genre?.page?.package?.form?.label}
        isUpdate={false}
        buttonText={dictionary?.genre?.page?.package?.create}
        dictionary={dictionary}
      />
    </Modal>
  );
};

export default DialogPackage;
