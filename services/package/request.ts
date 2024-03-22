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
      `${process.env.NEXT_PUBLIC_API_URL}/packages?filters[users_permissions_user]=${id}&populate[0]=candidats.Portfolio.Portfolio&populate[1]=candidats.Photo_de_presentation&populate[2]=candidats.Bande_Demo&populate[3]=candidats.Video_Presentation&populate[4]=candidats.Physionomie&populate[5]=candidats.Infos_Administrative.Securite_sociale&populate[6]=candidats.Agence&populate[7]=candidats.Lieu_de_Naissance&populate[8]=candidats.Location`,
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
  jwt: string,
  isDislike: boolean
) => {
  const connectProperty = isDislike ? "dislikes" : "candidats";
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/packages/${id}?populate=*`,
      {
        data: {
          [connectProperty]: {
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
export const deletePackage = async (id: number, jwt: string) => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/packages/${id}?populate=*`,
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
export const deleteCandidat = async (
  id: number,
  data: Record<string, any>,
  jwt: string,
  isDislike: boolean
) => {
  const connectProperty = isDislike ? "dislikes" : "candidats";

  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/packages/${id}?populate=*`,
      {
        data: {
          [connectProperty]: {
            disconnect: data.candidats,
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
export const getOnePackageById = async (id: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/packages/${id}?populate[0]=candidats&populate[1]=dislikes`
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
