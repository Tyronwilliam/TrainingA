import Link from "next/link";
import { capitalizeFirstLetter } from "../function";
import CardCandidat from "./CardCandidat";
import ImageCandidat from "./ImageCandidat";

const TalentsLayout = ({
  candidat,
  pathname,
  toggle,
  isPackagePage,
  handleClientDetachPack,
  packId,
  dislikesCandidat,
}: {
  candidat: any;
  pathname: string;
  toggle?: () => void;
  isPackagePage: boolean;
  handleClientDetachPack?: (packId: number, candidatId: number) => void;
  packId?: string;
  dislikesCandidat: any[];
}) => {
  return (
    <section className="flex flex-wrap justify-center items-center flex-col md:flex-row w-full h-fit gap-10 md:gap-5 md:justify-start p-5 md:gap-y-[50px] max-w-[1100px] mx-auto">
      {candidat?.length > 0 &&
        candidat?.map((talent: any) => {
          const image =
            talent?.attributes?.Photo_de_presentation?.data?.attributes?.url;
          const letterLastName = capitalizeFirstLetter(talent?.attributes?.Nom);
          const existsInDislikes = dislikesCandidat?.some((dislike: any) => {
            return dislike?.id === talent?.id;
          });
          return (
            <CardCandidat
              talent={talent}
              nom={letterLastName}
              key={talent?.id}
              showName={true}
              toggle={toggle}
              isPackagePage={isPackagePage}
              handleClientDetachPack={handleClientDetachPack}
              packId={packId}
              existsInDislikes={existsInDislikes}
            >
              <Link href={`${pathname}/${talent?.id}`}>
                <ImageCandidat image={image} />
              </Link>
            </CardCandidat>
          );
        })}
    </section>
  );
};

export default TalentsLayout;
