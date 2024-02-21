import ButtonAdd from "@/app/[lang]/components/package/ButtonAdd";

const Name = ({
  prenom,
  nom,
  classStyle,
  containerStyle,
  isPackage,
  toggle,
  candidatId,
}: {
  prenom: string;
  nom: string | undefined;
  classStyle: string;
  containerStyle: string;
  isPackage?: boolean;
  toggle?: () => void;
  candidatId?: number;
}) => {
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
      {isPackage && <ButtonAdd toggle={toggle!} candidatId={candidatId!} />}
    </div>
  );
};

export default Name;
