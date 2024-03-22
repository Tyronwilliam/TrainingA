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
}: {
  prenom: string;
  nom: string | undefined;
  classStyle: string;
  containerStyle: string;
  isPackage?: boolean;
  toggle?: () => void;
  candidatId?: number;
  handleClientDetachPack?: (packId: number, candidatId: number) => void;
  packId?: string;
  existsInDislikes?: boolean;
}) => {
  const packIdToNumber = packId ? parseInt(packId) : null;
  return (
    <div className={`flex gap-2 ${containerStyle}`}>
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
          />
        )
      )}
    </div>
  );
};

export default Name;
