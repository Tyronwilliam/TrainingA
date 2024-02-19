import axios from "axios";

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
