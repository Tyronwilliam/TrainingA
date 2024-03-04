import { Locale } from "@/i18n-config";
import React from "react";
import SingleCandidatPage from "../../choix/genre/[gender]/[id]/page";

const SingleTalentPagePackage = ({
  params,
}: {
  params: { id: string; lang: Locale };
}) => {
  return <SingleCandidatPage params={params} />;
};

export default SingleTalentPagePackage;
