import classNames from "classnames";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { FaHeart, FaHeartBroken } from "react-icons/fa";
import { FaFire } from "react-icons/fa6";
import { ImFire } from "react-icons/im";

const DetachFromPackage = ({
  detachCandidat,
  packId,
  candidatId,
  isPack,
  existsInDislikes,
  existsInLikes,
}: {
  detachCandidat: (
    packId: number,
    candidatId: number,
    isLike?: boolean
  ) => void;
  packId: number | null;
  candidatId?: number;
  isPack: boolean;
  existsInDislikes?: boolean;
  existsInLikes?: boolean;
}) => {
  return !isPack ? (
    <BsFillTrashFill
      className="mx-auto cursor-pointer hover:opacity-55"
      onClick={() => detachCandidat(packId!, candidatId!)}
    />
  ) : (
    <div className="flex gap-2  basis-full items-center justify-center">
      <button
        disabled={existsInDislikes}
        type="button"
        onClick={() => detachCandidat(packId!, candidatId!, false)}
      >
        <FaHeartBroken
          className={classNames({
            "w-5 h-5 hover:opacity-55 fill-red-500": true,
            "opacity-35": existsInDislikes,
          })}
        />
      </button>{" "}
      <button
        disabled={!existsInLikes && !existsInDislikes}
        type="button"
        onClick={() => detachCandidat(packId!, candidatId!, undefined)}
      >
        <FaHeart
          className={classNames({
            "fill-blue-300": true,
            "w-5 h-5 hover:opacity-55 ": existsInLikes || existsInDislikes,
            "opacity-35 w-5 h-5 ": !existsInLikes && !existsInDislikes,
          })}
        />
      </button>
      <button
        disabled={existsInLikes}
        type="button"
        onClick={() => detachCandidat(packId!, candidatId!, true)}
      >
        <ImFire
          className={classNames({
            "w-5 h-5 hover:opacity-55 fill-green-500": true,
            "opacity-35": existsInLikes,
          })}
        />
      </button>
    </div>
  );
};

export default DetachFromPackage;
