import axios from "axios";

export const createPackage = async (data: Record<string, any>, jwt: string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/packages?populate=*`,
      {
        data: {
          users_permissions_user: data.users_permissions_user, // Modify here to create the relation
          Nom: data.Nom,
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
export const getPackagesById = async (id: string, jwt: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/packages?filters[users_permissions_user]=${id}&populate=*`,
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
export const associateCandidatsWithPackage = async (
  id: number,
  data: Record<string, any>,
  jwt: string
) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/packages/${id}?populate=*`,
      {
        data: {
          candidats: {
            connect: data.candidats,
          },
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
export const updatePackageName = async (
  id: number,
  packName: string,
  jwt: string
) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/packages/${id}?populate=*`,
      {
        data: {
          Nom: packName,
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
