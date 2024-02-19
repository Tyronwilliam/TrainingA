import { AiFillCloseCircle } from "react-icons/ai";
import NewItemForm from "./NewItemForm";
import PacksDisplay from "./PacksDisplay";

const DialogPackage = ({
  openModal,
  openInput,
  toggleModal,
  toggleInput,
  allPack,
  candidatId,
  useAssociateCandidatsWithPackage,
  handleInputChange,
  packName,
  useCreatePackage,
}: {
  openModal: boolean;
  openInput: boolean;
  toggleModal: () => void;
  toggleInput: () => void;
  allPack: any[];
  candidatId: number | null;
  useAssociateCandidatsWithPackage: (
    packageId: number,
    candidatId: number
  ) => void;
  packName: string;
  useCreatePackage: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    openModal && (
      <section className="fixed w-full h-full top-0 left-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <dialog
          open={openModal}
          className="text-white background__grey w-[90%] max-w-md min-w-64 flex flex-col gap-4 p-5"
        >
          <AiFillCloseCircle
            className="z-50 absolute right-4 top-3 fill-white w-6 h-6 cursor-pointer hover:opacity-50 transition-all duration-200 ease-out"
            onClick={() => {
              toggleModal();
              openInput && toggleInput();
            }}
          />
          <div className="">
            <span>Enregistrer dans ...</span>
          </div>
          <PacksDisplay
            candidatId={candidatId}
            allPack={allPack}
            useAssociateCandidatsWithPackage={useAssociateCandidatsWithPackage}
          />
          <NewItemForm
            isOpen={openInput}
            toggle={toggleInput}
            handleInputChange={handleInputChange}
            itemValue={packName}
            onSubmit={useCreatePackage}
            placeholder="Ex: Acteur Casting Plage"
            label="Nom:*"
            isUpdate={false}
            buttonText="Créer"
          />
        </dialog>
      </section>
    )
  );
};

export default DialogPackage;
