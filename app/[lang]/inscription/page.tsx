import HeaderImage from "@/app/[lang]/components/HeaderImage";
import { getDictionary } from "@/get-disctionary";
import { Locale } from "@/i18n-config";
import { Metadata } from "next";
import React from "react";
import InscriptionLayout from "./InscriptionLayout";

export const metadata: Metadata = {
  title: "Inscription Talent.",
  description:
    "Inscrivez-vous pour faire partie de notre base de données accessible aux professionnels du cinéma. (réalisateurs et producteurs)",
};
const viewImage = {
  en: (
    <HeaderImage
      filename="https://lula-aws-s3-bucket.s3.eu-west-3.amazonaws.com/%24R0RJMLK.png"
      alt="TALENT REGISTRATION"
      classStyle="max-w-[555px] self-start"
    />
  ),
  fr: (
    <HeaderImage
      filename="https://lula-aws-s3-bucket.s3.eu-west-3.amazonaws.com/%24RQ4TPUO.png"
      alt="INSCRIPTION TALENT"
      classStyle="max-w-[555px] self-baseline"
    />
  ),
};
const InscriptionPage = async ({
  params: { lang },
}: {
  params: { lang: Locale };
}) => {
  const CurrentView = viewImage[lang];

  const dictionary = await getDictionary(lang);
  return (
    <main
      className="w-full  h-fit m-auto pt-5  flex flex-col "
      style={{ minHeight: "calc(100vh - 48px)" }}
    >
      {" "}
      {CurrentView}
      <InscriptionLayout dictionary={dictionary} />
    </main>
  );
};

export default InscriptionPage;
