import ButtonAdd from "@/app/[lang]/components/package/ButtonAdd";
import DetachFromPackage from "@/app/[lang]/components/package/DetachFromPackage";
import { usePackage } from "@/hooks/Package/usePackage";
import { useSearchParams } from "next/navigation";

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
}: {
  prenom: string;
  nom: string | undefined;
  classStyle: string;
  containerStyle: string;
  isPackage?: boolean;
  toggle?: () => void;
  candidatId?: number;
  handleClientDetachPack: (packId: number, candidatId: number) => void;
  packId: string;
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
        <DetachFromPackage
          detachCandidat={handleClientDetachPack}
          candidatId={candidatId}
          packId={packIdToNumber}
          isPack={true}
        />
      )}
    </div>
  );
};

export default Name;
