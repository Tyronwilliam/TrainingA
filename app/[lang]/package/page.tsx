import React from "react";
import { Metadata } from "next";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/get-disctionary";
import PackageLayout from "./PackageLayout";
import { getOnePackageById } from "@/services/package/request";
import { getAllCandidatsByIds } from "./function";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";

export const metadata: Metadata = {
  title: "Package - Agence Graziani",
  description:
    "Découvrez nos packages de casting personnalisés, mettant en lumière les talents sélectionnés pour vos projets cinématographiques.",
};
export default async function PackagePage({
  searchParams,
  params,
}: {
  searchParams: { pack: string };
  params: { lang: Locale };
}) {
  const session = await getServerSession(authOptions);
  const dictionary = await getDictionary(params.lang);
  const packResponse = await getOnePackageById(searchParams?.pack)
    .then((res) => {
      return res?.data?.data?.attributes;
    })
    .catch((err) => {
      console.error("Error fetching candidatId:", err);
      return [];
    });

  const allClient = packResponse?.Client || [];
  const currentClient = allClient.find((item: any) => {
    //@ts-ignore
    return item.client?.data?.id === session?.user?.id;
  });
  const candidatId = [
    ...(packResponse?.candidats?.data ?? []),
    ...(packResponse?.dislikes?.data ?? []),
  ];
  const packName = packResponse?.Nom || "Package";
  let allCandidats = [];
  if (candidatId.length > 0) {
    allCandidats = await Promise?.all(
      candidatId.map(async (item: any) => {
        const response = await getAllCandidatsByIds(item.id);
        return response;
      })
    );
  }

  return (
    <main className="pt-[50px] relative mx-auto w-full min-h-full">
      <PackageLayout
        candidats={allCandidats}
        dictionary={dictionary}
        packName={packName}
        packId={searchParams?.pack}
        allClient={allClient}
        currentClient={currentClient}
      />
    </main>
  );
}
