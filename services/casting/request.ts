import axios from "axios";

export const associateOrDissociateToCasting = async (
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
