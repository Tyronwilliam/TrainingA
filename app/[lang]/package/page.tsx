import React from "react";
import { Metadata } from "next";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/get-disctionary";
import PackageLayout from "./PackageLayout";
import axios from "axios";
import { getOnePackageById } from "@/services/package/request";
import { getAllCandidatsByIds } from "./function";

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
  // searchParams: { talentIds: string; name: string };
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(params.lang);
  // Fetch candidatId
  const packResponse = await getOnePackageById(searchParams?.pack)
    .then((res) => {
      return res?.data?.data?.attributes;
    })
    .catch((err) => {
      console.error("Error fetching candidatId:", err);
      return []; // Return an empty array if there's an error
    });

  // Check if candidatIdResponse is not null or undefined
  const candidatId = packResponse?.candidats?.data || [];
  const packName = packResponse?.Nom || "Package";
  // If candidatId is not empty, fetch allCandidats
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
    <main className="pt-[80px] relative mx-auto w-full min-h-full">
      <PackageLayout
        candidats={allCandidats}
        dictionary={dictionary}
        packName={packName}
      />
    </main>
  );
}
