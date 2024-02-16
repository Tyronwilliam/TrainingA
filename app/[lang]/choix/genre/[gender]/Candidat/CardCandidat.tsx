import { ReactNode } from "react";
import Name from "./Name";
import classNames from "classnames";

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
      className="flex flex-col items-center justify-center gap-4 "
      key={talent?.id}
    >
      <div
        className={classNames({
          "relative w-full h-auto cursor-pointer overflow-hidden shrink-0":
            true,
          " max-h-[435px] ": showName,
          " max-h-[540px]  grow": !showName,
        })}
      >
        {children}
      </div>
      {showName && (
        <Name
          prenom={talent?.attributes?.Prenom}
          nom={nom}
          classStyle="max-w-[163px]"
          containerStyle="justify-center items-center"
        />
      )}
    </div>
  );
};

export default CardCandidat;
