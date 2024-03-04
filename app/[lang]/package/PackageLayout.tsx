"use client";
import { Dictionary } from "@/types/dictionary";
import { usePathname } from "next/navigation";
import React from "react";
import TalentsLayout from "../choix/genre/[gender]/Candidat/TalentsLayout";
import { comparerPrenom } from "./function";

const PackageLayout = ({
  packName,
  candidats,
  dictionary,
}: {
  packName: string;
  candidats: any[];
  dictionary: Dictionary;
}) => {
  const pathname = usePathname();

  const sortedCandidat = candidats?.slice()?.sort(comparerPrenom);

  return (
    <section>
      <h1 className="text-center text-5xl mb-12 font-bold">{packName}</h1>
      <TalentsLayout
        candidat={sortedCandidat}
        pathname={pathname}
        isPackagePage={true}
      />
    </section>
  );
};

export default PackageLayout;
