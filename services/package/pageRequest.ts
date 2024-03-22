import axios from "axios";
import { connect } from "http2";

export const associateToLikes = async (
  id: number,
  data: Record<string, any>,
  jwt: string,
  currentClient: any,
  allClient: any,
  userId: string
) => {
  const infosToAdd = {
    id: currentClient?.id,
    dislikes: {
      disconnect: data.candidats,
    },
    likes: {
      connect: data.candidats,
    },
    client: currentClient?.client?.data?.id,
  };
  try {
    const indexToInsert = allClient?.findIndex(
      (info: any) => info.id > currentClient?.id
    );
    if (indexToInsert !== -1) {
      allClient.splice(indexToInsert, 0, infosToAdd);
    } else {
      allClient.push(infosToAdd);
    }
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/packages/${id}?populate=*`,
      {
        data: {
          Client: allClient,
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
export const associateToDislikes = async (
  id: number,
  data: Record<string, any>,
  jwt: string,
  currentClient: any,
  allClient: any,
  userId: string
) => {
  const infosToAdd = {
    id: currentClient?.id,
    dislikes: {
      connect: data.candidats,
    },
    likes: {
      disconnect: data.candidats,
    },
    client: currentClient?.client?.data?.id,
  };
  try {
    const indexToInsert = allClient?.findIndex(
      (info: any) => info.id > currentClient?.id
    );
    if (indexToInsert !== -1) {
      allClient.splice(indexToInsert, 0, infosToAdd);
    } else {
      allClient.push(infosToAdd);
    }
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/packages/${id}?populate=*`,
      {
        data: {
          Client: allClient,
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
export const dissociateToAll = async (
  id: number,
  data: Record<string, any>,
  jwt: string,
  currentClient: any,
  allClient: any,
  userId: string
) => {
  const infosToAdd = {
    id: currentClient?.id,
    dislikes: {
      disconnect: data.candidats,
    },
    likes: {
      disconnect: data.candidats,
    },
    client: currentClient?.client?.data?.id,
  };
  try {
    const indexToInsert = allClient?.findIndex(
      (info: any) => info.id > currentClient?.id
    );
    if (indexToInsert !== -1) {
      allClient.splice(indexToInsert, 0, infosToAdd);
    } else {
      allClient.push(infosToAdd);
    }
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/packages/${id}?populate=*`,
      {
        data: {
          Client: allClient,
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
