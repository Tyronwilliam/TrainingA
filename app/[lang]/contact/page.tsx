import HeaderImage from "@/app/HeaderImage";
import PreviousNavHistory from "@/app/PreviousNavHistory";
import { getDictionary } from "@/get-disctionary";
import { Locale } from "@/i18n-config";
import { Metadata } from "next";
import ContactFormLayout from "./ContactFormLayout";

export const metadata: Metadata = {
  title: "Contactez-nous - Agence Graziani",
  description:
    "N'hésitez pas à nous contacter pour avoir accès à nos talents, toute question, demande de renseignements ou collaboration. Notre équipe est là pour vous répondre et vous assister dans vos besoins.",
};
const viewImage = {
  en: (
    <HeaderImage
      filename="https://lula-aws-s3-bucket.s3.eu-west-3.amazonaws.com/%24RG7UVOE.png"
      alt="Contact us"
      classStyle="max-w-[555px]"
    />
  ),
  fr: (
    <HeaderImage
      filename="https://lula-aws-s3-bucket.s3.eu-west-3.amazonaws.com/%24RIT6MIG.png"
      alt="Contactez-nous "
      classStyle="max-w-[555px]"
    />
  ),
};
export default async function ContactPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const CurrentView = viewImage[lang];

  const dictionary = await getDictionary(lang);

  return (
    <>
      <PreviousNavHistory />
      <main className="w-full min-h-full h-fit m-auto mb-10 pt-5  flex flex-col">
        {CurrentView}
        <ContactFormLayout dictionary={dictionary} />
      </main>
    </>
  );
}
