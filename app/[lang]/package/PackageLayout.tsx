"use client";
import useToggle from "@/hooks/Basic/useToggle";
import { usePackage } from "@/hooks/Package/usePackage";
import { Dictionary } from "@/types/dictionary";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import LoginForm from "../auth/connexion/LoginForm";
import TalentsLayout from "../choix/genre/[gender]/Candidat/TalentsLayout";
import Modal from "../components/package/Modal";
import { comparerPrenom } from "./function";

const PackageLayout = ({
  packName,
  candidats,
  dictionary,
  packId,
  dislikesCandidat,
}: {
  packName: string;
  candidats: any[];
  dictionary: Dictionary;
  packId: string;
  dislikesCandidat: any[];
}) => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const { open, toggle } = useToggle();
  const { detachCandidat, connectCandidatsAndPackage } = usePackage();

  const sortedCandidat = candidats?.slice()?.sort(comparerPrenom);

  const handleClientDetachPack = async (packId: number, candidatId: number) => {
    if (!session) {
      toggle();
    } else {
      const candidatToDetache = candidats.find(
        (candidat) => candidat.id === candidatId
      );
      if (candidatToDetache) {
        const isDisliked = dislikesCandidat.some(
          (dislike) => dislike.id === candidatId
        );
        if (isDisliked) {
          await detachCandidat(packId!, candidatId!, true);
          await connectCandidatsAndPackage(packId!, candidatId!, false);
        } else {
          await detachCandidat(packId!, candidatId!, false);
          await connectCandidatsAndPackage(packId!, candidatId!, true);
        }
        router.refresh();
      } else {
        console.error("Candidat non trouvé.");
      }
    }
  };

  return (
    <section>
      <h1 className="text-center text-5xl mb-12 font-bold">{packName}</h1>
      <Modal
        open={open}
        toggle={toggle}
        classSection="fixed w-full h-full top-0 left-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
        classDialog="text-white bg-black border-[1px] border-gray-800 radius w-[90%] max-w-[666px] min-w-64 flex flex-col gap-4 p-5 translate-y-[-40%] md:translate-y-0"
        classIcone="z-50 absolute right-1 top-2 fill-white w-6 h-6 cursor-pointer hover:opacity-50 transition-all duration-200 ease-out"
      >
        <LoginForm dictionary={dictionary} isPack={true} toggle={toggle} />
      </Modal>

      {sortedCandidat?.length > 0 ? (
        <TalentsLayout
          candidat={sortedCandidat}
          pathname={pathname}
          isPackagePage={true}
          handleClientDetachPack={handleClientDetachPack}
          packId={packId}
          dislikesCandidat={dislikesCandidat}
        />
      ) : (
        <p className="text-center text-3xl font-bold uppercase">
          No talent available
        </p>
      )}
    </section>
  );
};

export default PackageLayout;
