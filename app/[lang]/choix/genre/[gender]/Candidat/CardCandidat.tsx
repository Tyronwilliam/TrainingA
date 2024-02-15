import { ReactNode } from "react";
import Name from "./Name";

const CardCandidat = ({
  talent,
  children,
  nom,
}: {
  talent: any;
  children: ReactNode;
  nom: string | undefined;
}) => {
  return (
    <div
      style={{ flexBasis: "calc(33.33% - 20px)" }}
      className="flex flex-col items-center justify-center gap-4"
      key={talent?.id}
    >
      <div
        className={`relative w-full h-auto  max-h-[435px] cursor-pointer overflow-hidden shrink-0 `}
      >
        {children}
      </div>
      <Name prenom={talent?.attributes?.Prenom} nom={nom} />
    </div>
  );
};

export default CardCandidat;
