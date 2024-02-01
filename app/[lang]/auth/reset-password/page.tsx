import { getDictionary } from "@/get-disctionary";
import { Locale } from "@/i18n-config";
import { Metadata } from "next";
import React from "react";
import ResetFormLayout from "./ResetFormLayout";

export const metadata: Metadata = {
  title: "Réinitialisation de mot de passe",
  description:
    "Réinitialisez votre mot de passe dès maintenant pour accéder à votre compte. Suivez les étapes simples pour sécuriser votre compte et reprendre l'accès à nos services.",
};

const ResetPasswordPage = async ({ params }: { params: { lang: Locale } }) => {
  const dictionary = await getDictionary(params.lang);

  return (
    <main className="w-full h-full m-auto pt-5 mb-10 flex flex-col items-center justify-center">
      <ResetFormLayout dictionary={dictionary} />{" "}
    </main>
  );
};

export default ResetPasswordPage;
