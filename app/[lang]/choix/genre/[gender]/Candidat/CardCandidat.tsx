import { ReactNode } from "react";
import Name from "./Name";

const CardCandidat = ({
  talent,
  children,
  nom,
  showName,
}: {
  talent: any;
  children: ReactNode;
  nom: string | undefined;
  showName: boolean;
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
      {showName && (
        <Name
          prenom={talent?.attributes?.Prenom}
          nom={nom}
          classStyle="max-w-[163px]"
        />
      )}
    </div>
  );
};

export default CardCandidat;
