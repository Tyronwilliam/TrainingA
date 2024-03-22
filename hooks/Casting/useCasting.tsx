import { CastingInfos } from "@/app/[lang]/auth/profil/type";
import {
  associateToCasting,
  dissociateToCasting,
} from "@/services/casting/request";
import { sendToast } from "@/utils/toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const useCasting = () => {
  const { data: session } = useSession();
  const router = useRouter();
  // @ts-ignore
  const userId = session?.user?.id; // @ts-ignore
  const jwt = session?.user?.jwt;

  const connectCandidat = async (
    castingId: number,
    candidatId: number,
    Date_Casting: string,
    Informations: CastingInfos[],
    infosId: number
  ) => {
    const data = {
      candidats: [candidatId],
    };
    const filterCastingInfos = async (infos: CastingInfos[]) => {
      return infos.filter((info) => info.id !== infosId);
    };
    const newInfos = await filterCastingInfos(Informations);
    try {
      const response = await associateToCasting(
        castingId,
        data,
        jwt,
        Date_Casting,
        infosId,
        newInfos
      );

      if (response?.status === 200) {
        router.refresh();
        sendToast(false, "Updated");
      } else {
        sendToast(true, response?.response?.data?.error?.message);
      }
    } catch (error: any) {
      console.error(
        "Une erreur s'est produite lors de la requête :",
        error.message
      );
    }
  };
  const dissociateCandidat = async (
    castingId: number,
    candidatId: number,
    Date_Casting: string,
    Informations: CastingInfos[],
    infosId: number
  ) => {
    const data = {
      candidats: [candidatId],
    };
    const filterCastingInfos = async (infos: CastingInfos[]) => {
      return infos.filter((info) => info.id !== infosId);
    };
    const newInfos = await filterCastingInfos(Informations);

    try {
      const responseDissociate = await dissociateToCasting(
        castingId,
        data,
        jwt,
        Date_Casting,
        infosId,
        newInfos
      );
      if (responseDissociate?.status === 200) {
        router.refresh();
        sendToast(false, "Updated");
      } else {
        sendToast(true, responseDissociate?.response?.data?.error?.message);
      }
    } catch (error: any) {
      console.error(
        "Une erreur s'est produite lors de la requête :",
        error.message
      );
    }
  };
  return { connectCandidat, dissociateCandidat };
};

export default useCasting;
