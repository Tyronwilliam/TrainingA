import { getDictionary } from "@/get-disctionary";
import { Locale } from "@/i18n-config";
import { Metadata } from "next";
import React from "react";
import ProfilLayout from "./ProfilLayout";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import PreviousNavHistory from "../../components/PreviousNavHistory";
import { redirect } from "next/navigation";
import { getCandidatPreview } from "./actions";

export const metadata: Metadata = {
  title: "Mon profil - Agence Graziani",
  description: "Actualiser vos informations",
};

async function getSingleTalent(jwt: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_IMG}/api/users/me?populate[0]=candidat.Physionomie.Confection_Haut&populate[1]=candidat.Physionomie.Taille&populate[2]=candidat.Physionomie.Confection_Bas&populate[3]=candidat.Physionomie.Chaussures&populate[4]=candidat.Physionomie.Poids&populate[5]=candidat.Infos_Administrative.RIB&populate[7]=candidat.Location&populate[8]=candidat.Role_Candidat.Competence&populate[9]=candidat.Data_intermittent&populate[10]=candidat.Data_intermittent.CMB&populate[11]=candidat.age&populate[12]=candidat.Sexe&populate[13]=candidat.Nom_de_naissance&populate[14]=candidat.Date_de_naissance&populate[15]=candidat.Lieu_de_Naissance&populate[16]=candidat.Infos_Administrative.Nationalite&populate[17]=candidat.Physionomie.Yeux&populate[18]=candidat.Physionomie.Origin&populate[19]=candidat.Photo_Candidature.Video_Presentation&populate[20]=candidat.Portfolio.Portfolio&populate[21]=candidat.Photo_de_presentation&populate[22]=candidat.Bande_Demo&populate[23]=candidat.Video_Presentation&populate[24]=candidat.demos&populate[25]=candidat.Photo_Candidature.Nouvelle_photos&populate[26]=candidat.Agence.En_Agence&populate[27]=candidat.Agence.Agence_Infos&populate[28]=candidat.Role_Candidat.PHYSIQUE`,
      {
        next: { revalidate: 0 },
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
}
async function getAllCasting(jwt: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/castings?populate[0]=Informations.liste_dispo&populate[1]=Informations.liste_indispo`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data?.data;
  } catch (error: any) {
    console.error(
      "Une erreur s'est produite lors de la requête :",
      error.message
    );
    return error;
  }
}

const ProfilPage = async ({
  params: { lang },
}: {
  params: { lang: Locale };
}) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/restreint");
  } //@ts-ignore
  if (session && session.user.role !== "Regular") {
    redirect("/restreint");
  }
  //@ts-ignore
  const candidat = await getSingleTalent(session?.user?.jwt);
  //@ts-ignore
  const castings = await getAllCasting(session?.user?.jwt);
  const dictionary = await getDictionary(lang);
  return (
    <>
      <PreviousNavHistory />
      <main className=" relative w-full min-h-full h-fit m-auto pt-5 mb-10 flex flex-col items-center justify-center">
        {candidat?.candidat === null ? (
          <p className="text-2xl">{dictionary?.general?.candidatEmmpty}</p>
        ) : (
          <>
            <h1 className="text-3xl mb-6 uppercase">
              {dictionary?.general?.greeting} {candidat?.candidat?.Prenom}
            </h1>
            <ProfilLayout
              dictionary={dictionary}
              candidat={candidat?.candidat}
              getCandidatPreview={getCandidatPreview}
              castings={castings}
            />
          </>
        )}
      </main>
    </>
  );
};

export default ProfilPage;
