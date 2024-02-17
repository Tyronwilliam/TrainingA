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
  packId: number
) => {
  if (checked) {
    sendToast(true, "Talent already in package");
    return;
  } else {
    console.log("FUNCTION ADD TO PACKAGE");
    // addRelationToPackage(packId, candidatId);
  }
};
