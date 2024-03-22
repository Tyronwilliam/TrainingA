import { BsFillTrashFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { FaHeartBroken } from "react-icons/fa";

const DetachFromPackage = ({
  detachCandidat,
  packId,
  candidatId,
  isPack,
  existsInDislikes,
}: {
  detachCandidat: (packId: number, candidatId: number) => void;
  packId: number | null;
  candidatId?: number;
  isPack: boolean;
  existsInDislikes?: boolean;
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
      {existsInDislikes ? (
        <FaHeart className="w-5 h-5 hover:opacity-55" />
      ) : (
        <FaHeartBroken className="w-5 h-5 hover:opacity-55" />
      )}
    </button>
  );
};

export default DetachFromPackage;
