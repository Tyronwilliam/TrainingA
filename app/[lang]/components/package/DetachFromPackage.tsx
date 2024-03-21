import { useRouter } from "next/navigation";
import React from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { CiCircleMinus } from "react-icons/ci";

const DetachFromPackage = ({
  detachCandidat,
  packId,
  candidatId,
  isPack,
}: {
  detachCandidat: (packId: number, candidatId: number) => void;
  packId: number | null;
  candidatId?: number;
  isPack: boolean;
}) => {
  const handleDetach = async () => {
    detachCandidat(packId!, candidatId!);
  };
  return !isPack ? (
    <BsFillTrashFill
      className="mx-auto cursor-pointer hover:opacity-55"
      onClick={handleDetach}
    />
  ) : (
    <button type="button" className="relative group" onClick={handleDetach}>
      <CiCircleMinus className="w-6 h-6 hover:opacity-55" />
      <span className="group-hover:block radius hidden w-[120px] p-1 absolute text-black bg-white z-50 text-sm">
        Supprimer
      </span>
    </button>
  );
};

export default DetachFromPackage;
