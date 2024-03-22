import { CastingInfos } from "@/app/[lang]/auth/profil/type";
import axios from "axios";

export const associateToCasting = async (
  id: number,
  data: Record<string, any>,
  jwt: string,
  Date_Casting: string,
  infosId: number,
  newInfos: CastingInfos[]
) => {
  const infosToAdd = {
    id: infosId,
    liste_dispo: {
      connect: data.candidats,
    },
    liste_indispo: {
      disconnect: data.candidats,
    },
    Date_Casting: Date_Casting,
  };

  try {
    const indexToInsert = newInfos.findIndex((info) => info.id > infosId);
    if (indexToInsert !== -1) {
      //@ts-ignore
      newInfos.splice(indexToInsert, 0, infosToAdd);
    } else {
      //@ts-ignore
      newInfos.push(infosToAdd);
    }
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/castings/${id}?populate[0]=Informations.liste_dispo&populate[1]=Informations.liste_indispo`,
      {
        data: {
          Informations: newInfos,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    return response;
  } catch (error: any) {
    console.error(
      "Une erreur s'est produite lors de la requête :",
      error.message
    );
    return error;
  }
};
export const dissociateToCasting = async (
  id: number,
  data: Record<string, any>,
  jwt: string,
  Date_Casting: string,
  infosId: number,
  newInfos: CastingInfos[]
) => {
  const infosToAdd = {
    id: infosId,
    liste_dispo: {
      disconnect: data.candidats,
    },
    liste_indispo: {
      connect: data.candidats,
    },
    Date_Casting: Date_Casting,
  };
  try {
    const indexToInsert = newInfos.findIndex((info) => info.id > infosId);
    if (indexToInsert !== -1) {
      //@ts-ignore
      newInfos.splice(indexToInsert, 0, infosToAdd);
    } else {
      //@ts-ignore
      newInfos.push(infosToAdd);
    }

    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/castings/${id}?populate[0]=Informations.liste_dispo&populate[1]=Informations.liste_indispo`,
      {
        data: {
          Informations: newInfos,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    return response;
  } catch (error: any) {
    console.error(
      "Une erreur s'est produite lors de la requête :",
      error.message
    );
    return error;
  }
};
