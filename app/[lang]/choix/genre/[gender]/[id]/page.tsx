import { getDictionary } from "@/get-disctionary";
import { Locale } from "@/i18n-config";
import { Metadata } from "next";
import React from "react";
import SingleCandidatLayout from "./SingleCandidatLayout";

type Props = {
  params: { id: string };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL_IMG}/api/candidats/${id}?populate=Physionomie.Confection_Haut,Physionomie.Taille,Physionomie.Confection_Bas,Physionomie.Chaussures,Physionomie.Poids,Portfolio.Portfolio,Role_Candidat.Competence,Photo_de_presentation,demos`
  ).then((res) => res.json());
  return {
    title: `${response?.data?.attributes?.Prenom}`,
  };
}
async function getDataSingleCandidat(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_IMG}/api/candidats/${id}?populate=Physionomie.Confection_Haut,Physionomie.Taille,Physionomie.Confection_Bas,Physionomie.Chaussures,Physionomie.Poids,Portfolio.Portfolio,Role_Candidat.Competence,Photo_de_presentation,Bande_Demo,Video_Presentation`,
      { next: { revalidate: 0 } }
    );

    const data = await response.json();
    return data.data;
  } catch (err) {
    console.error(err);
  }
}
const SingleCandidatPage = async ({
  params,
}: {
  params: { id: string; lang: Locale };
}) => {
  const dictionary = await getDictionary(params.lang);
  const candidat = await getDataSingleCandidat(params.id);
  console.log(candidat);
  return (
    <main
      className="w-full  h-fit pt-5 flex items-center justify-center"
      style={{ minHeight: "calc(100vh - 48px)" }}
    >
      {" "}
      <SingleCandidatLayout candidat={candidat} dictionary={dictionary} />
    </main>
  );
};

export default SingleCandidatPage;
