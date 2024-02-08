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
  const talents = await getCandidat(params?.gender, 1);
  return (
    <>
      <PreviousNavHistory />
      <main>
        <HeaderImage
          filename="https://lula-aws-s3-bucket.s3.eu-west-3.amazonaws.com/%24R6JJ7JQ.png"
          alt="Talents"
          classStyle="max-w-[350px] self-baseline"
        />
        <GenreLayout talents={talents?.data} meta={talents?.meta} />
      </main>
    </>
  );
};

export default GenrePage;
