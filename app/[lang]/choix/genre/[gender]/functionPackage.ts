import { sendToast } from "@/utils/toast";

export const isCandidatInPack = (pack: any, id: number) => {
  for (const subItem of pack.attributes?.candidats?.data || []) {
    if (subItem.id === id) {
      return true;
    }
  }
  return false;
};
export const handleAddToPack = (
  checked: boolean,
  candidatId: number,
  packId: number,
  useAssociateCandidatsWithPackage: (
    packageId: number,
    candidatId: number
  ) => void
) => {
  if (checked) {
    sendToast(true, "Talent already in package");
    return;
  } else {
    useAssociateCandidatsWithPackage(packId, candidatId);
  }
};
export const generateUrlFromCandidats = (
  candidats: [candidats: { id: number }],
  packName: string
) => {
  const talentIDs = candidats?.map((candidat) => candidat?.id);
  const talentIDsString = talentIDs.join(",");
  const baseURL = `${process.env.NEXT_PUBLIC_FRONT_URL}/fr/package?`;
  const url = baseURL + "talentIds=" + talentIDsString + "&name=" + packName;
  return url;
};
