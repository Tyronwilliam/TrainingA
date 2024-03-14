"use server";

export async function getCandidatPreview(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_IMG}/api/candidats/${id}?populate=Physionomie.Confection_Haut,Physionomie.Taille,Physionomie.Confection_Bas,Physionomie.Chaussures,Physionomie.Poids,Portfolio.Portfolio,Role_Candidat.Competence,Photo_de_presentation,Bande_Demo,Video_Presentation`,
      { next: { revalidate: 0 } }
    );
    if (!response.ok) {
      return response.json();
    }

    const data = await response.json();
    return data.data;
  } catch (err: any) {
    throw err;
  }
}
