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
  connectCandidatsAndPackage: (packageId: number, candidatId: number) => void
) => {
  if (checked) {
    sendToast(true, "Talent already in package");
    return;
  } else {
    connectCandidatsAndPackage(packId, candidatId);
  }
};
export const generateTextFromCandidats = (
  candidats: [candidats: { attributes: { Email: string } }]
) => {
  const emails = candidats?.map((candidat) => candidat?.attributes?.Email);
  const allEmail = emails.join(",");
  return allEmail;
};
