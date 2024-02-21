"use server";

export async function getAllCandidatsByIds(ids: string[]) {
  try {
    const candidatsPromises = ids.map(async (id) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/candidats/${id}?populate=Physionomie.Confection_Haut,Physionomie.Taille,Physionomie.Confection_Bas,Physionomie.Chaussures,Physionomie.Poids,Portfolio.Portfolio,Role_Candidat.Competence,Photo_de_presentation,demos`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error(
          `Une erreur s'est produite lors de la requête : ${response.statusText}`
        );
      }

      const data = await response.json();
      const resData = data?.data;
      return resData;
    });

    const candidats = await Promise.all(candidatsPromises);
    return candidats;
  } catch (error: any) {
    console.error(
      "Une erreur s'est produite lors de la requête :",
      error.message
    );
    return error;
  }
}
