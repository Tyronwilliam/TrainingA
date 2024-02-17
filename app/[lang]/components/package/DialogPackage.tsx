import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";

const DialogPackage = ({
  open,
  toggle,
  allPack,
}: {
  open: boolean;
  toggle: () => void;
  allPack: any[];
}) => {
  return (
    open && (
      <section className="fixed w-full h-full top-0 left-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <dialog
          open={open}
          className="text-white background__grey w-[90%] max-w-md min-w-64 flex flex-col gap-4 p-5"
        >
          <AiFillCloseCircle
            className="z-50 absolute right-6 top-6 fill-white w-6 h-6 cursor-pointer hover:opacity-50 transition-all duration-200 ease-out"
            onClick={toggle}
          />{" "}
          <div className="">
            <span>Enregistrer dans ...</span>
          </div>
          {/* PACK CONTENT */}
          <div className="box__middle-package">
            {allPack?.map((pack: any) => {
              // const checked = checkIsTalentAdded(item, idTalent);
              return (
                <div key={pack.id}>
                  <input
                    type="checkbox"
                    id={pack.id}
                    // checked={checked}
                    onChange={() => {
                      // if (checked) {
                      //   sendMessageToClient(false, "Talent déjà ajouté");
                      //   return;
                      // } else {
                      //   addRelationToPackage(item.id, idTalent);
                      // }
                    }}
                  />{" "}
                  <p>{pack.attributes.Nom}</p>
                </div>
              );
            })}
          </div>
        </dialog>
      </section>
    )
  );
};

export default DialogPackage;
