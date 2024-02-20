import { ReactNode } from "react";
import Name from "./Name";
import classNames from "classnames";
import { useSession } from "next-auth/react";

const CardCandidat = ({
  talent,
  children,
  nom,
  showName,
  showFolio,
  toggle,
}: {
  talent: any;
  children: ReactNode;
  nom: string | undefined;
  showName: boolean;
  showFolio?: boolean;
  toggle?: () => void;
}) => {
  const { data: session } = useSession();
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
          "max-h-[435px]": showName,
          "max-h-[540px] grow": !showName,
        })}
      >
        {showFolio && (
          <div className="group absolute z-50 w-full h-full top-0 left-0 flex items-center justify-center bg-white bg-opacity-0 hover:bg-opacity-10 transition-opacity duration-300 group-hover:bg-opacity-10">
            <span className="text-3xl font-bold text-center text-black opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              PORTFOLIO
            </span>
          </div>
        )}
        {children}
      </div>
      {showName && (
        <Name
          prenom={talent?.attributes?.Prenom}
          nom={nom}
          classStyle="max-w-[163px] text-3xl"
          containerStyle="justify-center items-center"
          //@ts-ignore
          isPackage={session?.user?.role === "Admin" || session?.user.filtre}
          toggle={toggle}
          candidatId={talent?.id}
        />
      )}
    </div>
  );
};

export default CardCandidat;
