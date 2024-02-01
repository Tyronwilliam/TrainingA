import PreviousNavHistory from "@/app/PreviousNavHistory";
import { getDictionary } from "@/get-disctionary";
import { Locale } from "@/i18n-config";

import React from "react";
import ForgotForm from "./ForgotFormLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mot de passe oublié - Agence Graziani",
  description:
    "Réinitialisez votre mot de passe en quelques étapes simples. Ne vous inquiétez pas si vous avez oublié votre mot de passe, nous sommes là pour vous aider à récupérer l'accès à votre compte en toute sécurité.",
};
const ForgotPage = async ({
  params: { lang },
}: {
  params: { lang: Locale };
}) => {
  const dictionary = await getDictionary(lang);

  return (
    <>
      <PreviousNavHistory />
      <main className="w-full h-full m-auto pt-5 mb-10 flex flex-col items-center justify-center">
        <ForgotForm dictionary={dictionary} />
      </main>
    </>
  );
};

export default ForgotPage;
