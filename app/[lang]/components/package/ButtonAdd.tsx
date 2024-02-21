import { usePackage } from "@/hooks/Package/usePackage";
import React from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";

const ButtonAdd = ({
  toggle,
  candidatId,
}: {
  toggle: () => void;
  candidatId: number;
}) => {
  const { fetchPackageById, setCandidatId } = usePackage();

  return (
    <button
      type="button"
      className="relative group"
      onClick={() => {
        toggle();
        fetchPackageById();
        setCandidatId(candidatId);
      }}
    >
      <AiOutlinePlusCircle className="w-6 h-6 hover:opacity-55" />
      <span className="group-hover:block radius hidden w-[120px] p-1 absolute text-black bg-white z-50 text-sm">
        Ajouter au package
      </span>
    </button>
  );
};

export default ButtonAdd;
