import HeaderImage from "@/app/[lang]/components/HeaderImage";
import PreviousNavHistory from "@/app/[lang]/components/PreviousNavHistory";
import { getDictionary } from "@/get-disctionary";
import { Locale } from "@/i18n-config";
import React from "react";
import GenreLayout from "./GenreLayout";
import { getCandidat } from "./action";
import { Gender } from "@/hooks/Filter/useFilter";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import { redirect } from "next/navigation";

const GenrePage = async ({
  params,
  searchParams,
}: {
  params: { gender: Gender; lang: Locale };
  searchParams: {
    Compétence: string;
    Age: string;
    Taille: string;
    Type: string;
    Unique: string;
    Role: string;
  };
}) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/restreint");
  }
  if (
    //@ts-ignore
    session.user.role === "Regular" ||
    //@ts-ignore
    (!session.user.actif && session.user.role !== "Admin")
  ) {
    redirect("/restreint");
  }
  const dictionary = await getDictionary(params.lang);
  const talents = await getCandidat({
    gender: params?.gender,
    properStart: 0,
    competence: searchParams?.Compétence,
    age: searchParams?.Age,
    taille: searchParams?.Taille,
    type: searchParams?.Type,
    unique: searchParams?.Unique,
    role: searchParams?.Role,
  });

  return (
    <>
      <PreviousNavHistory />
      <main className="pt-[80px] relative min-h-full">
        <HeaderImage
          filename="https://lula-aws-s3-bucket.s3.eu-west-3.amazonaws.com/%24R6JJ7JQ.png"
          alt="Talents"
          classStyle="max-w-[550px] self-baseline"
        />
        <GenreLayout
          talents={talents?.data}
          metaInitial={talents?.meta?.pagination?.total}
          dictionary={dictionary}
          gender={params?.gender}
        />
      </main>
    </>
  );
};

export default GenrePage;
