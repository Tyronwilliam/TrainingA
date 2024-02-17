import { usePackage } from "@/hooks/Package/usePackage";
import React from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";

const ButtonAdd = ({ toggle }: { toggle: () => void }) => {
  const { fetchPackageById } = usePackage();

  return (
    <button
      type="button"
      className="relative group"
      onClick={() => {
        toggle();
        fetchPackageById();
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
