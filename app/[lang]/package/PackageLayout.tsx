"use client";
import useToggle from "@/hooks/Basic/useToggle";
import usePackagePage from "@/hooks/Package/usePackagePage";
import { Dictionary } from "@/types/dictionary";
import { sendToast } from "@/utils/toast";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { FaHeart, FaHeartBroken } from "react-icons/fa";
import { ImFire } from "react-icons/im";
import LoginForm from "../auth/connexion/LoginForm";
import TalentsLayout from "../choix/genre/[gender]/Candidat/TalentsLayout";
import Modal from "../components/package/Modal";
import { comparerPrenom } from "./function";
const PackageLayout = ({
  packName,
  candidats,
  dictionary,
  packId,
  allClient,
  currentClient,
}: {
  packName: string;
  candidats: any[];
  dictionary: Dictionary;
  packId: string;
  allClient: any;
  currentClient: any;
}) => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const { open, toggle } = useToggle();
  const { clientLikeCandidat, currentClientEtat, setCurrentClientEtat } =
    usePackagePage(currentClient);
  const sortedCandidat = candidats?.slice()?.sort(comparerPrenom);
  const handleClientDetachPack = async (
    packId: number,
    candidatId: number,
    isLike?: boolean
  ) => {
    if (!session) {
      toggle();
    } else {
      if (
        currentClientEtat?.client === undefined || //@ts-ignore
        currentClientEtat?.client?.data?.id !== session?.user?.id
      ) {
        sendToast(true, "Ce package ne vous a pas été attribué");
        return;
      }
      await clientLikeCandidat(
        packId,
        candidatId,
        //@ts-ignore
        session?.user?.jwt,
        currentClient,
        allClient,
        isLike!, //@ts-ignore
        session?.user?.id
      );
      router.refresh();
    }
  };
  return (
    <section>
      <h1 className="text-center text-5xl mb-12 font-bold">{packName}</h1>
      {sortedCandidat?.length > 0 && (
        <div className="flex flex-col mx-auto w-full  gap-2 items-center justify-center">
          <div className="flex  items-center justify-center gap-2">
            <ImFire className="w-5 h-5 hover:opacity-55 fill-green-500" />:
            <span>Coup de coeur</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <FaHeart className="w-5 h-5 hover:opacity-55 fill-blue-300" />:
            <span>Neutre</span>
          </div>
          <div className="flex  items-center justify-center gap-2">
            <FaHeartBroken className="w-5 h-5 hover:opacity-55 fill-red-500" />:
            <span>Ne me convient pas</span>
          </div>
        </div>
      )}
      {/* @ts-ignore */}
      {session?.user?.role === "Admin" && allClient?.length > 0 && (
        <div className="flex gap-2 w-full max-w-[1100px] mx-auto p-5 flex-wrap">
          {allClient.map((client: any) => {
            return currentClientEtat?.id !== client?.id ? (
              <button
                key={client?.id}
                className="boutonSlideCommon p-2 radius"
                onClick={() => setCurrentClientEtat(client)}
              >
                {client?.client?.data?.attributes?.username}
              </button>
            ) : null;
          })}
        </div>
      )}

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
          currentClient={currentClientEtat}
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
