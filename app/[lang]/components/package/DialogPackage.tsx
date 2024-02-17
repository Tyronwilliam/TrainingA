import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import {
  handleAddToPack,
  isCandidatInPack,
} from "../../choix/genre/[gender]/functionPackage";

const DialogPackage = ({
  open,
  toggle,
  allPack,
  candidatId,
}: {
  open: boolean;
  toggle: () => void;
  allPack: any[];
  candidatId: number | null;
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
              console.log(candidatId);
              const checked =
                candidatId !== null && isCandidatInPack(pack, candidatId);
              return (
                <div key={pack.id}>
                  <input
                    type="checkbox"
                    id={pack.id}
                    checked={checked}
                    onChange={() => {
                      candidatId !== null &&
                        handleAddToPack(checked, candidatId, pack.id);
                    }}
                  />
                  <label htmlFor={pack.id}>
                    <p>{pack.attributes.Nom}</p>
                  </label>
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
