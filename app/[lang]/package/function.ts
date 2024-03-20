export function comparerPrenom(candidat1: any, candidat2: any) {
  // Compare first names (Prenom) first
  const prenomComparison = candidat1.attributes?.Prenom.localeCompare(
    candidat2.attributes?.Prenom,
    "fr",
    {
      sensitivity: "base",
    }
  );

  // If first names are the same, compare last names (Nom)
  if (prenomComparison === 0) {
    return candidat1.attributes?.Nom.localeCompare(
      candidat2.attributes?.Nom,
      "fr",
      {
        sensitivity: "base",
      }
    );
  }

  return prenomComparison;
}
export async function getAllCandidatsByIds(id: string) {
  try {
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
  } catch (error: any) {
    console.error(
      "Une erreur s'est produite lors de la requête :",
      error.message
    );
    return error;
  }
}
