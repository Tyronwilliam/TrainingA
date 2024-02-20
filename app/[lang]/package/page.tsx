import React from "react";
import { Metadata } from "next";
import { getAllCandidatsByIds } from "./action";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/get-disctionary";
import PackageLayout from "./PackageLayout";

export const metadata: Metadata = {
  title: "Package - Agence Graziani",
  description:
    "Découvrez nos packages de casting personnalisés, mettant en lumière les talents sélectionnés pour vos projets cinématographiques.",
};
export default async function PackagePage({
  searchParams,
  params,
}: {
  searchParams: { talentIds: string; name: string };
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(params.lang);

  const talentIds = searchParams?.talentIds?.split(",") || [];
  const packName = searchParams?.name || "Package";
  const allCandidats = await getAllCandidatsByIds(talentIds);

  return (
    <main className="pt-[80px] relative mx-auto w-full min-h-full">
      <PackageLayout
        candidats={allCandidats}
        dictionary={dictionary}
        packName={packName}
      />
    </main>
  );
}
