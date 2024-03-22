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
    disponibles: {
      connect: data.candidats,
    },
    indisponibles: {
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
      `${process.env.NEXT_PUBLIC_API_URL}/castings/${id}?populate=*`,
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
    disponibles: {
      disconnect: data.candidats,
    },
    indisponibles: {
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
      `${process.env.NEXT_PUBLIC_API_URL}/castings/${id}?populate=*`,
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
