"use server";
export async function getCandidat(gender: string, pageNumber: number) {
  try {
    const pagin = pageNumber
      ? `&pagination[page]=${pageNumber}`
      : `&pagination[page]=1`;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/candidats?filters[Sexe][$eq]=${gender}&filters[valide][$eq]=true[populate][Physionomie]=*&[populate][Role_Candidat][populate][Competence]=*&[populate][Photo_de_presentation]=*&[populate][Portfolio][populate][Portfolio]=*&sort[0]=Prenom:asc${pagin}&pagination[pageSize]=2`;
    const response = await fetch(url, { next: { revalidate: 0 } });
    if (!response.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    const talent = await data;
    return talent;
  } catch (err) {
    console.error(err);
  }
}
