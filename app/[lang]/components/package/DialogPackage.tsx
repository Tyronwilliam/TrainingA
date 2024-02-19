import { AiFillCloseCircle } from "react-icons/ai";
import PacksDisplay from "./PacksDisplay";
import { CgFolderAdd } from "react-icons/cg";

const DialogPackage = ({
  openModal,
  openInput,
  toggleModal,
  toggleInput,
  allPack,
  candidatId,
  useAssociateCandidatsWithPackage,
}: {
  openModal: boolean;
  openInput: boolean;
  toggleModal: () => void;
  toggleInput: () => void;
  allPack: any[];
  candidatId: number | null;
  useAssociateCandidatsWithPackage: (
    packageId: number,
    candidatId: number,
  ) => void;
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
            onClick={toggleModal}
          />
          <div className="">
            <span>Enregistrer dans ...</span>
          </div>
          <PacksDisplay
            candidatId={candidatId}
            allPack={allPack}
            useAssociateCandidatsWithPackage={useAssociateCandidatsWithPackage}
          />
          {openInput ? (
            <form>
              <div className="flex flex-col mb-2">
                <label htmlFor="name">Nom:*</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Ex: Acteur Casting Plage"
                  className="max-w-52"
                />
              </div>
              <button type="submit" className="boutonSlideCommon p-2 radius">
                Créer
              </button>
            </form>
          ) : (
            <div className="flex items-center gap-2 text-lg h-fit">
              <CgFolderAdd className="w-6 h-6" />
              <button
                type="button"
                className="hover:underline"
                onClick={toggleInput}
              >
                Créer un package
              </button>
            </div>
          )}
        </dialog>
      </section>
    )
  );
};

export default DialogPackage;
