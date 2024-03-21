import HeaderImage from "@/app/[lang]/components/HeaderImage";
import { InputString } from "@/app/[lang]/components/form/InputLabel";
import PreviousNavHistory from "@/app/[lang]/components/PreviousNavHistory";
import { getDictionary } from "@/get-disctionary";
import { Locale } from "@/i18n-config";
import { Metadata } from "next";
import React from "react";
import LoginForm from "./LoginForm";
export const metadata: Metadata = {
  title: "Connexion - Agence Graziani",
  description:
    "Connectez-vous pour accéder à notre base de données de talents ou gérer votre profil.",
};
const viewImage = {
  en: (
    <HeaderImage
      filename="https://lula-aws-s3-bucket.s3.eu-west-3.amazonaws.com/%24RJ7A3WR.png"
      alt="welcome back"
      classStyle="max-w-[555px]"
    />
  ),
  fr: (
    <HeaderImage
      filename="https://lula-aws-s3-bucket.s3.eu-west-3.amazonaws.com/%24RDAVN31.png"
      alt="BIENVENUE"
      classStyle="max-w-[555px]"
    />
  ),
};
const ConnexionPage = async ({
  params: { lang },
}: {
  params: { lang: Locale };
}) => {
  const CurrentView = viewImage[lang];

  const dictionary = await getDictionary(lang);
  return (
    <>
      <PreviousNavHistory />
      <main className="w-full h-full m-auto pt-5 mb-10 flex flex-col items-center justify-center">
        {CurrentView}
        <LoginForm dictionary={dictionary} isPack={false} />
      </main>
    </>
  );
};

export default ConnexionPage;
