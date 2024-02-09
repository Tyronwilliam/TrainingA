import HeaderImage from "@/app/[lang]/components/HeaderImage";
import PreviousNavHistory from "@/app/[lang]/components/PreviousNavHistory";
import { getDictionary } from "@/get-disctionary";
import { Locale } from "@/i18n-config";
import React from "react";
import GenreLayout from "./GenreLayout";
import { getCandidat } from "./action";

const GenrePage = async ({
  params,
}: {
  params: { gender: string; lang: Locale };
}) => {
  const dictionary = await getDictionary(params.lang);
  const talents = await getCandidat(params?.gender, 0);
  console.log(talents?.data, "hey");
  return (
    <>
      <PreviousNavHistory />
      <main className="pt-[80px]">
        <HeaderImage
          filename="https://lula-aws-s3-bucket.s3.eu-west-3.amazonaws.com/%24R6JJ7JQ.png"
          alt="Talents"
          classStyle="max-w-[550px] self-baseline"
        />
        <GenreLayout
          talents={talents?.data}
          meta={talents?.meta}
          dictionary={dictionary}
        />
      </main>
    </>
  );
};

export default GenrePage;
