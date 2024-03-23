import classNames from "classnames";
import { useSession } from "next-auth/react";
import { ReactNode } from "react";
import { FaHeartBroken } from "react-icons/fa";
import { ImFire } from "react-icons/im";
import Name from "./Name";

const CardCandidat = ({
  talent,
  children,
  nom,
  showName,
  showFolio,
  toggle,
  isPackagePage,
  handleClientDetachPack,
  packId,
  existsInDislikes,
  existsInLikes,
}: {
  talent: any;
  children: ReactNode;
  nom: string | undefined;
  showName: boolean;
  isPackagePage: boolean;
  showFolio?: boolean;
  toggle?: () => void;
  handleClientDetachPack?: (
    packId: number,
    candidatId: number,
    isLike?: boolean
  ) => void;
  packId?: string;
  existsInDislikes?: boolean;
  existsInLikes?: boolean;
}) => {
  const { data: session } = useSession();

  return (
    <div
      style={{ flexBasis: "calc(33.33% - 20px)" }}
      className={classNames({
        "flex flex-col items-center justify-center gap-4 apparition__opacity relative":
          true,
      })}
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
        <FaHeartBroken
          className={classNames({
            "icone_hide red_heart": true,
            icone_show: existsInDislikes,
          })}
        />
        <ImFire
          className={classNames({
            "icone_hide green_heart": true,
            "icone_show green_heart": existsInLikes,
          })}
        />
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
          isPackage={
            //@ts-ignore
            (session?.user?.role === "Admin" && !isPackagePage) ||
            //@ts-ignore
            (session?.user.filtre && !isPackagePage)
          }
          handleClientDetachPack={handleClientDetachPack!}
          packId={packId!}
          toggle={toggle}
          candidatId={talent?.id}
          existsInDislikes={existsInDislikes}
          existsInLikes={existsInLikes}
        />
      )}
    </div>
  );
};

export default CardCandidat;
