import { Locale } from "@/i18n-config";

import HeaderImage from "@/app/HeaderImage";
import PreviousNavHistory from "@/app/PreviousNavHistory";
import { getDictionary } from "@/get-disctionary";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "À propos - Agence Graziani",
  description:
    "Découvrez l'Agence Graziani, une agence de casting situé à Marseille offrant un service complet sur toute la France, de la recherche de profils aux auditions jusqu'aux contrats. Fondée par Naïs Graziani, réalisatrice et directrice de casting expérimentée, Agence Graziani se distingue par son expertise en casting sauvage et son engagement envers l'inclusion et la diversité. Le cinéma parle à tout le monde et de tout le monde.",
};
const viewImage = {
  en: (
    <HeaderImage
      filename="https://lula-aws-s3-bucket.s3.eu-west-3.amazonaws.com/%24R62FRCV.png"
      alt="About us"
      classStyle="max-w-[629px]"
    />
  ),
  fr: (
    <HeaderImage
      filename="https://lula-aws-s3-bucket.s3.eu-west-3.amazonaws.com/%24RN0C1WJ.png"
      alt="A propos"
      classStyle="max-w-[629px]"
    />
  ),
};
export default async function AboutUs({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
//   await delay(5000);

  const CurrentView = viewImage[lang];
  const dictionary = await getDictionary(lang);

  return (
    <>
      <PreviousNavHistory />
      <main className="w-full h-fit m-auto pt-5">
        {CurrentView}
        <section className="w-full flex items-center justify-center grow-1">
          <div className="w-[90%] max-w-[650px] flex flex-col gap-6 leading-8 p-4 md:text-xl md:leading-9">
            <p>
              <strong className="mr-[4px]">{dictionary.about.sian}</strong>
              {dictionary.about.p1}
            </p>
            <p>
              <strong className="mr-[4px]">{dictionary.about.sian}</strong>{" "}
              {dictionary.about.p2}
            </p>
            <p>{dictionary.about.p3}</p>
            <p>{dictionary.about.p4}</p>
            <p>{dictionary.about.p5}</p>
            <p>{dictionary.about.p6}</p>
          </div>
        </section>
      </main>
    </>
  );
}
