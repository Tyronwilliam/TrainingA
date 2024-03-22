import {
  associateToDislikes,
  associateToLikes,
  dissociateToAll,
} from "@/services/package/pageRequest";
import { sendToast } from "@/utils/toast";

const usePackagePage = () => {
  const clientLikeCandidat = async (
    packId: number,
    candidatId: number,
    jwt: string,
    currentClient: any,
    allClient: any,
    isLike: boolean,
    userId: string
  ) => {
    const data = {
      candidats: [candidatId],
    };
    try {
      let response;
      const filterAllClient = async () => {
        return allClient.filter((item: any) => item.id !== currentClient?.id);
      };
      const newInfos = await filterAllClient();
      if (isLike === true) {
        response = await associateToLikes(
          packId,
          data,
          jwt,
          currentClient,
          newInfos,
          userId
        );
      } else if (isLike === false) {
        response = await associateToDislikes(
          packId,
          data,
          jwt,
          currentClient,
          newInfos,
          userId
        );
      } else if (isLike === undefined) {
        response = await dissociateToAll(
          packId,
          data,
          jwt,
          currentClient,
          newInfos,
          userId
        );
      }
      if (response?.status === 200) {
        sendToast(false, "Updated");
      } else {
        sendToast(
          true,
          response?.response?.data?.error?.message ?? "Error occured"
        );
      }
    } catch (error: any) {
      console.error(
        "Une erreur s'est produite lors de la requête :",
        error.message
      );
      sendToast(true, "An error occured");
    }
  };

  return { clientLikeCandidat };
};

export default usePackagePage;
