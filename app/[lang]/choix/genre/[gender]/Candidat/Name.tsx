import ButtonAdd from "@/app/[lang]/components/package/ButtonAdd";
import DetachFromPackage from "@/app/[lang]/components/package/DetachFromPackage";

const Name = ({
  prenom,
  nom,
  classStyle,
  containerStyle,
  isPackage,
  toggle,
  candidatId,
  handleClientDetachPack,
  packId,
  existsInDislikes,
  existsInLikes,
}: {
  prenom: string;
  nom: string | undefined;
  classStyle: string;
  containerStyle: string;
  isPackage?: boolean;
  toggle?: () => void;
  candidatId?: number;
  handleClientDetachPack?: (
    packId: number,
    candidatId: number,
    isLike?: boolean
  ) => void;
  packId?: string;
  existsInDislikes?: boolean;
  existsInLikes?: boolean;
}) => {
  const packIdToNumber = packId ? parseInt(packId) : null;
  return (
    <div className={`flex gap-2 flex-wrap ${containerStyle}`}>
      <span
        className={`${classStyle} text-white select-none  uppercase font-bold inline-block  truncate whitespace-nowrap text-ellipsis`}
      >
        {prenom}
      </span>
      <span
        className={`${classStyle} select-none  uppercase font-bold opacity-50 text-white`}
      >
        {nom && nom}.
      </span>
      {isPackage ? (
        <ButtonAdd toggle={toggle!} candidatId={candidatId!} />
      ) : (
        packId && (
          <DetachFromPackage
            detachCandidat={handleClientDetachPack!}
            candidatId={candidatId}
            packId={packIdToNumber}
            isPack={true}
            existsInDislikes={existsInDislikes}
            existsInLikes={existsInLikes}
          />
        )
      )}
    </div>
  );
};

export default Name;
