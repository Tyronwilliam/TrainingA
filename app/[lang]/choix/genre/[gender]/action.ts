"use server";

import {
  generateAgeFilter,
  generateFilterQuery,
  generateTailleFilter,
  generateTypeFilter,
} from "./function";
export interface getCandidatParams {
  gender: string;
  properStart: number;
  competence?: string;
  age?: string;
  taille?: string;
  type?: string;
  unique?: string;
  role?: string;
}
export async function getCandidat({
  gender,
  properStart,
  competence,
  age,
  taille,
  type,
  unique,
  role,
}: getCandidatParams) {
  try {
    const start = `&pagination[start]=${properStart}`;
    let filters = ``;
    //OK
    if (competence !== undefined) {
      let encoded;
      if (competence?.includes(" ")) {
        encoded = encodeURIComponent(competence.replace(/ /g, "_"));
      } else {
        encoded = competence;
      }
      filters += generateFilterQuery(encoded);
    }
    //OK
    if (age !== undefined) {
      const ageValues = age.split(",");
      filters += generateAgeFilter(ageValues);
    }
    //PAS OK
    if (taille !== undefined) {
      const tailleValues = taille.split(",");
      filters += generateTailleFilter(tailleValues);
    }
    // OK
    if (type !== undefined) {
      const typeValue = type.split(",");
      filters += generateTypeFilter(typeValue);
    }
    // OK
    if (role !== undefined) {
      filters += `&filters[Role_Candidat][${role}][$eq]=true`;
    }
    // OK
    if (unique !== undefined) {
      filters += `&filters[Role_Candidat][Unique][$eq]=true`;
    }

    const url = `${process.env.NEXT_PUBLIC_API_URL}/candidats?filters[Sexe][$eq]=${gender}&filters[valide][$eq]=true[populate][Physionomie]=*&[populate][Role_Candidat][populate][Competence]=*&[populate][Photo_de_presentation]=*&[populate][Portfolio][populate][Portfolio]=*${filters}&sort[0]=Prenom:asc${start}&pagination[limit]=2`;
    const response = await fetch(url);
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
// { next: { revalidate: 0 } }
